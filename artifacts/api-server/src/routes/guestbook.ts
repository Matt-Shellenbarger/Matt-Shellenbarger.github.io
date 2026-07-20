import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { guestbookEntriesTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import {
  GetGuestbookResponse,
  PostGuestbookBody,
  PostGuestbookResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/guestbook", async (_req, res) => {
  const entries = await db
    .select()
    .from(guestbookEntriesTable)
    .orderBy(desc(guestbookEntriesTable.createdAt))
    .limit(100);

  const data = GetGuestbookResponse.parse(entries);
  res.json(data);
});

router.post("/guestbook", async (req, res) => {
  const body = PostGuestbookBody.parse(req.body);

  const [entry] = await db
    .insert(guestbookEntriesTable)
    .values(body)
    .returning();

  const data = PostGuestbookResponse.parse(entry);
  res.status(201).json(data);
});

export default router;
