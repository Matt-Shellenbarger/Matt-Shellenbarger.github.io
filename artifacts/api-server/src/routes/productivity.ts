import { Router } from "express";
import { pool } from "@workspace/db";
import {
  GetProductivitySummaryResponse,
  GetProductivityByTypeResponse,
  GetProductivityHoursImpactResponse,
  GetProductivityScatterResponse,
  GetProductivityRiskProfileResponse,
  GetProductivityScoreDistributionResponse,
} from "@workspace/api-zod";

const router = Router();

const TABLE = `"sample_second-party_data_-_remote_worker_productivity_-_sheet1"`;

router.get("/productivity/summary", async (req, res): Promise<void> => {
  const { rows } = await pool.query(`
    SELECT
      COUNT(*)::int                                             AS "totalEmployees",
      ROUND(AVG(productivity_score)::numeric, 1)::float        AS "avgProductivity",
      ROUND(AVG(well_being_score)::numeric, 1)::float          AS "avgWellbeing",
      ROUND(AVG(hours_worked_per_week)::numeric, 1)::float     AS "avgHours",
      COUNT(*) FILTER (WHERE employment_type = 'Remote')::int  AS "remoteCount",
      COUNT(*) FILTER (WHERE employment_type = 'In-Office')::int AS "inOfficeCount",
      ROUND(
        AVG(CASE WHEN employment_type = 'Remote'    THEN productivity_score END)::numeric -
        AVG(CASE WHEN employment_type = 'In-Office' THEN productivity_score END)::numeric, 1
      )::float AS "productivityGap",
      ROUND(
        AVG(CASE WHEN employment_type = 'Remote'    THEN well_being_score END)::numeric -
        AVG(CASE WHEN employment_type = 'In-Office' THEN well_being_score END)::numeric, 1
      )::float AS "wellbeingGap"
    FROM ${TABLE}
  `);
  res.json(GetProductivitySummaryResponse.parse(rows[0]));
});

router.get("/productivity/by-type", async (req, res): Promise<void> => {
  const { rows } = await pool.query(`
    SELECT
      employment_type                                          AS "employmentType",
      COUNT(*)::int                                            AS count,
      ROUND(AVG(productivity_score)::numeric, 1)::float       AS "avgProductivity",
      ROUND(AVG(well_being_score)::numeric, 1)::float         AS "avgWellbeing",
      ROUND(AVG(hours_worked_per_week)::numeric, 1)::float    AS "avgHours"
    FROM ${TABLE}
    GROUP BY employment_type
    ORDER BY "avgProductivity" DESC
  `);
  res.json(GetProductivityByTypeResponse.parse(rows));
});

router.get("/productivity/hours-impact", async (req, res): Promise<void> => {
  const { rows } = await pool.query(`
    SELECT
      CASE
        WHEN hours_worked_per_week < 30 THEN 'Under 30h'
        WHEN hours_worked_per_week < 35 THEN '30–34h'
        WHEN hours_worked_per_week < 40 THEN '35–39h'
        WHEN hours_worked_per_week = 40 THEN '40h'
        WHEN hours_worked_per_week <= 45 THEN '41–45h'
        ELSE '46h+'
      END                                                       AS bucket,
      MIN(hours_worked_per_week)::int                           AS "minHours",
      ROUND(AVG(productivity_score)::numeric, 1)::float         AS "avgProductivity",
      ROUND(AVG(well_being_score)::numeric, 1)::float           AS "avgWellbeing",
      COUNT(*)::int                                             AS count
    FROM ${TABLE}
    GROUP BY 1
    ORDER BY MIN(hours_worked_per_week)
  `);
  res.json(GetProductivityHoursImpactResponse.parse(rows));
});

router.get("/productivity/scatter", async (req, res): Promise<void> => {
  const { rows } = await pool.query(`
    SELECT
      employee_id           AS "employeeId",
      employment_type       AS "employmentType",
      hours_worked_per_week AS "hoursWorked",
      productivity_score    AS "productivityScore",
      well_being_score      AS "wellbeingScore"
    FROM ${TABLE}
    ORDER BY RANDOM()
    LIMIT 300
  `);
  res.json(GetProductivityScatterResponse.parse(rows));
});

router.get("/productivity/risk-profile", async (req, res): Promise<void> => {
  const { rows } = await pool.query(`
    SELECT
      employment_type                                                                    AS "employmentType",
      COUNT(*) FILTER (WHERE well_being_score < 50 AND hours_worked_per_week > 45)::int AS "burnoutRisk",
      COUNT(*) FILTER (WHERE productivity_score > 75 AND well_being_score > 75)::int    AS "highPerformers",
      COUNT(*)::int                                                                      AS total
    FROM ${TABLE}
    GROUP BY employment_type
    ORDER BY "burnoutRisk" DESC
  `);
  res.json(GetProductivityRiskProfileResponse.parse(rows));
});

router.get("/productivity/score-distribution", async (req, res): Promise<void> => {
  const { rows: prodRows } = await pool.query(`
    SELECT
      CASE
        WHEN productivity_score < 40 THEN '< 40'
        WHEN productivity_score < 50 THEN '40–49'
        WHEN productivity_score < 60 THEN '50–59'
        WHEN productivity_score < 70 THEN '60–69'
        WHEN productivity_score < 80 THEN '70–79'
        WHEN productivity_score < 90 THEN '80–89'
        ELSE '90+'
      END                                                              AS bucket,
      COUNT(*)::int                                                    AS count,
      COUNT(*) FILTER (WHERE employment_type = 'Remote')::int         AS remote,
      COUNT(*) FILTER (WHERE employment_type = 'In-Office')::int      AS "inOffice"
    FROM ${TABLE}
    GROUP BY 1
    ORDER BY MIN(productivity_score)
  `);

  const { rows: wbRows } = await pool.query(`
    SELECT
      CASE
        WHEN well_being_score < 40 THEN '< 40'
        WHEN well_being_score < 50 THEN '40–49'
        WHEN well_being_score < 60 THEN '50–59'
        WHEN well_being_score < 70 THEN '60–69'
        WHEN well_being_score < 80 THEN '70–79'
        WHEN well_being_score < 90 THEN '80–89'
        ELSE '90+'
      END                                                              AS bucket,
      COUNT(*)::int                                                    AS count,
      COUNT(*) FILTER (WHERE employment_type = 'Remote')::int         AS remote,
      COUNT(*) FILTER (WHERE employment_type = 'In-Office')::int      AS "inOffice"
    FROM ${TABLE}
    GROUP BY 1
    ORDER BY MIN(well_being_score)
  `);

  res.json(
    GetProductivityScoreDistributionResponse.parse({
      productivity: prodRows,
      wellbeing: wbRows,
    })
  );
});

export default router;
