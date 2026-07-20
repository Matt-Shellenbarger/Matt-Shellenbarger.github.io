import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db/schema";
import { openrouter } from "@workspace/integrations-openrouter-ai";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are an AI assistant representing Matt Shellenbarger's professional portfolio. Answer questions about his background, experience, and skills accurately and concisely. Be professional and helpful.

Here is Matt's complete professional background:

NAME: Matt Shellenbarger
TITLE: Infrastructure & Systems Engineer · Cybersecurity
SUMMARY: IT professional with 10+ years across systems administration, virtualization, and cybersecurity, spanning healthcare, banking, and higher education. Zero unplanned downtime across a 200+ server VMware environment at UPMC.

EXPERIENCE:

1. UPMC — Associate Software Engineer (Infrastructure & Systems) | May 2023 – Oct 2025
   - Administered VMware ESXi environments (v7.0/v8.0) spanning ~200 virtual servers — maintaining 99.9%+ uptime.
   - Managed PKI certificate lifecycle, ~200 renewals per year with zero lapses.
   - Responded to network security alerts, coordinated remediation with the security team.
   - Monthly OS patching, datacenter host provisioning, Dell IDPA backup administration.
   - Authored runbooks, operational procedures, and system documentation.

2. CNB Bank — Jr. Incident Response Analyst (contract) | Feb 2023 – May 2023
   - Monitored SIEM queues, triaged cybersecurity alerts.
   - Contributed to incident response playbook improvements.

3. Marquette Savings Bank | Jul 2018 – Feb 2023
   - Application Systems Analyst II (Jan 2022 – Feb 2023): Led banking system enhancements, purple teaming with security auditors, SIEM monitoring.
   - Application Systems Analyst I (Jul 2020 – Jan 2022): System projects, root cause analysis, performance optimization.
   - System Operator (Jul 2018 – Jul 2020): BOSS batch processing, backups, Active Directory, workstation deployment.

4. Mercyhurst University — Library Computer Support Specialist | Aug 2014 – Jul 2020
   - Sole systems admin for 10+ library platforms and five web properties.
   - SQL reporting, staff training, hardware management.

EDUCATION:
- B.S. Cyber Security — Southern New Hampshire University
- A.S. Computer Information Systems — Tri-State Business Institute

TECHNICAL SKILLS: VMware ESXi, Azure, Active Directory, PKI/Certificate Management, SIEM, Incident Response, Backup & DR, OS Patching, Runbook Authoring, Drupal, SharePoint, SQL, Dell IDPA, Windows Server

CONTACT: mattda9@gmail.com | linkedin.com/in/mjshellenbarger

Only answer questions related to Matt's professional background. If asked about unrelated topics, politely redirect.`;

router.get("/openrouter/conversations", async (_req, res) => {
  const convs = await db.select().from(conversations).orderBy(conversations.createdAt);
  res.json(convs);
});

router.post("/openrouter/conversations", async (req, res) => {
  const { title } = req.body as { title: string };
  const [conv] = await db.insert(conversations).values({ title }).returning();
  res.status(201).json(conv);
});

router.get("/openrouter/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json({ ...conv, messages: msgs });
});

router.delete("/openrouter/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  await db.delete(conversations).where(eq(conversations.id, id));
  res.status(204).send();
});

router.get("/openrouter/conversations/:id/messages", async (req, res) => {
  const id = parseInt(req.params.id);
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json(msgs);
});

router.post("/openrouter/conversations/:id/messages", async (req, res) => {
  const convId = parseInt(req.params.id);
  const { content } = req.body as { content: string };

  if (!content?.trim()) {
    res.status(400).json({ error: "content is required" });
    return;
  }

  const [conv] = await db.select().from(conversations).where(eq(conversations.id, convId));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  await db.insert(messages).values({ conversationId: convId, role: "user", content: content.trim() });

  const history = await db.select().from(messages).where(eq(messages.conversationId, convId)).orderBy(messages.createdAt);
  const chatMessages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  const stream = await openrouter.chat.completions.create({
    model: "google/gemma-4-31b-it:free",
    max_tokens: 8192,
    messages: chatMessages,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullResponse += content;
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  await db.insert(messages).values({ conversationId: convId, role: "assistant", content: fullResponse });

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default router;
