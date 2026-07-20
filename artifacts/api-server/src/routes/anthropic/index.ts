import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db/schema";
import { anthropic } from "@workspace/integrations-anthropic-ai";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are an AI assistant representing Matt Shellenbarger's professional portfolio. Answer questions about his background, experience, and skills accurately and concisely. Be professional and helpful.

Here is Matt's complete professional background:

NAME: Matt Shellenbarger
TITLE: Infrastructure & Systems Engineer · Cybersecurity
SUMMARY: IT professional with 10+ years across systems administration, virtualization, and cybersecurity, spanning healthcare, banking, and higher education. Zero unplanned downtime across a 200+ server VMware environment at UPMC.

EXPERIENCE:

1. UPMC — Associate Software Engineer (Infrastructure & Systems) | May 2023 – Oct 2025
   - Administered VMware ESXi environments (v7.0/v8.0) spanning ~200 virtual servers across production, staging, and sandbox tiers — maintaining 99.9%+ uptime.
   - Managed PKI certificate lifecycle, completing ~200 renewals per year with zero lapses in coverage or service disruption.
   - Responded to network security alerts, assessed server-level risks, and coordinated remediation with the security team.
   - Executed monthly OS patching, datacenter host provisioning, and Dell IDPA backup administration.
   - Authored runbooks, operational procedures, and system documentation.
   - Mentored new team members across VMware and backup systems; led UAT for Contact Center Solution projects.

2. CNB Bank — Jr. Incident Response Analyst (contract) | Feb 2023 – May 2023
   - Monitored SIEM queues and triaged cybersecurity alerts, escalating confirmed incidents to senior analysts.
   - Contributed to incident response playbook improvements that reduced mean time to resolution.

3. Marquette Savings Bank | Jul 2018 – Feb 2023
   - Application Systems Analyst II (Jan 2022 – Feb 2023): Led banking system enhancement projects, collaborated with security auditors in purple teaming, monitored SIEM dashboards.
   - Application Systems Analyst I (Jul 2020 – Jan 2022): Coordinated system projects, performed root cause analyses, optimized performance.
   - System Operator (Jul 2018 – Jul 2020): BOSS batch processing, nightly backups, Active Directory account management, workstation deployment.

4. Mercyhurst University — Library Computer Support Specialist | Aug 2014 – Jul 2020
   - Sole systems administrator for 10+ library platforms (Koha ILS, OCLC, EBSCO EDS, Springshare, PastPerfect, Refworks) and five Drupal/SharePoint web properties.
   - Trained library staff and developed SQL reports for usage and collections data.
   - Managed all library hardware, workstation deployment, and configuration.

EDUCATION:
- B.S. Cyber Security — Southern New Hampshire University
- A.S. Computer Information Systems — Tri-State Business Institute

TECHNICAL SKILLS:
VMware ESXi, Azure, Active Directory, PKI/Certificate Management, SIEM, Incident Response, Backup & DR, OS Patching, Runbook Authoring, Drupal, SharePoint, SQL, Dell IDPA, Windows Server, Koha ILS, Purple Teaming

CONTACT:
- Email: mattda9@gmail.com
- LinkedIn: linkedin.com/in/mjshellenbarger

Only answer questions related to Matt's professional background, skills, and experience. If asked about unrelated topics, politely redirect to professional questions.`;

// List conversations
router.get("/anthropic/conversations", async (_req, res) => {
  const convs = await db.select().from(conversations).orderBy(conversations.createdAt);
  res.json(convs);
});

// Create conversation
router.post("/anthropic/conversations", async (req, res) => {
  const { title } = req.body as { title: string };
  const [conv] = await db.insert(conversations).values({ title }).returning();
  res.status(201).json(conv);
});

// Get conversation with messages
router.get("/anthropic/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json({ ...conv, messages: msgs });
});

// Delete conversation
router.delete("/anthropic/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  await db.delete(conversations).where(eq(conversations.id, id));
  res.status(204).send();
});

// List messages
router.get("/anthropic/conversations/:id/messages", async (req, res) => {
  const id = parseInt(req.params.id);
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json(msgs);
});

// Send message — SSE streaming
router.post("/anthropic/conversations/:id/messages", async (req, res) => {
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

  // Save user message
  await db.insert(messages).values({ conversationId: convId, role: "user", content: content.trim() });

  // Build history for context
  const history = await db.select().from(messages).where(eq(messages.conversationId, convId)).orderBy(messages.createdAt);
  const chatMessages = history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: chatMessages,
  });

  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      fullResponse += event.delta.text;
      res.write(`data: ${JSON.stringify({ content: event.delta.text })}\n\n`);
    }
  }

  // Save assistant message
  await db.insert(messages).values({ conversationId: convId, role: "assistant", content: fullResponse });

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default router;
