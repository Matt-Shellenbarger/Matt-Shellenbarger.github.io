import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import { Filter } from "bad-words";
import { db } from "@workspace/db";
import { guestbookEntriesTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import {
  GetGuestbookResponse,
  PostGuestbookBody,
  PostGuestbookResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Max 5 submissions per IP per hour
const guestbookRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again in an hour." },
});

const profanityFilter = new Filter();

router.get("/guestbook", async (_req, res) => {
  const entries = await db
    .select()
    .from(guestbookEntriesTable)
    .orderBy(desc(guestbookEntriesTable.createdAt))
    .limit(100);

  const data = GetGuestbookResponse.parse(entries);
  res.json(data);
});

router.post("/guestbook", guestbookRateLimit, async (req, res) => {
  const body = PostGuestbookBody.parse(req.body);

  if (profanityFilter.isProfane(body.name) || profanityFilter.isProfane(body.message)) {
    res.status(400).json({ error: "Your submission contains inappropriate content." });
    return;
  }

  const [entry] = await db
    .insert(guestbookEntriesTable)
    .values(body)
    .returning();

  const data = PostGuestbookResponse.parse(entry);
  res.status(201).json(data);
});

export default router;
