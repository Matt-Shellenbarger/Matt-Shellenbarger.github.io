import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Twitter, Linkedin, Lock, Server, Shield, ArrowUp, Send, Bot, RotateCcw } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import heroImage from '@assets/me_1784560759993.jpg';
import { useGetGuestbook, usePostGuestbook } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';

type Role = { title: string; period: string; bullets: string[] };
type Job = { company: string; period: string; roles: Role[] };

const experience: Job[] = [
  {
    company: 'UPMC',
    period: 'May 2023 – Oct 2025',
    roles: [
      {
        title: 'Associate Software Engineer (Infrastructure & Systems)',
        period: 'May 2023 – Oct 2025',
        bullets: [
          'Administered VMware ESXi environments (v7.0/v8.0) spanning ~200 virtual servers across production, staging, and sandbox tiers — maintaining 99.9%+ uptime through high-availability configuration and off-peak maintenance windows.',
          'Managed PKI certificate lifecycle for all applicable systems, completing ~200 renewals per year with zero lapses in coverage or service disruption.',
          'Responded to network security alerts, assessed server-level risks, and coordinated remediation with the security team to minimize exposure across the environment.',
          'Executed monthly OS patching, datacenter host provisioning, and Dell IDPA backup administration to ensure stability, compliance, and recoverability.',
          'Authored runbooks, operational procedures, and system documentation to support audit readiness, team onboarding, and knowledge transfer.',
          'Mentored new team members across VMware and backup systems; led UAT for Contact Center Solution projects, validating releases against business requirements.',
        ],
      },
    ],
  },
  {
    company: 'CNB Bank',
    period: 'Feb 2023 – May 2023',
    roles: [
      {
        title: 'Jr. Incident Response Analyst (contract)',
        period: 'Feb 2023 – May 2023',
        bullets: [
          'Monitored SIEM queues and triaged cybersecurity alerts, escalating confirmed incidents to senior analysts while documenting findings and remediation steps.',
          'Served as first-line contact for staff security inquiries and contributed to incident response playbook improvements that reduced mean time to resolution.',
        ],
      },
    ],
  },
  {
    company: 'Marquette Savings Bank',
    period: 'Jul 2018 – Feb 2023',
    roles: [
      {
        title: 'Application Systems Analyst II',
        period: 'Jan 2022 – Feb 2023',
        bullets: [
          'Led end-to-end project lifecycle for banking system enhancements — from requirements gathering and design through deployment — coordinating with internal stakeholders and external vendors.',
          'Collaborated with external security auditors in purple teaming exercises, monitored SIEM dashboards, and identified and mitigated security risks across banking systems.',
        ],
      },
      {
        title: 'Application Systems Analyst I',
        period: 'Jul 2020 – Jan 2022',
        bullets: [
          'Coordinated planning, design, and deployment of system projects and enhancements, ensuring deliverables met business requirements and timelines.',
          'Performed root cause analyses, documented process deficiencies, and recommended solutions to resolve workflow gaps and improve reliability.',
          'Proactively analyzed system behavior to identify and address performance bottlenecks before they impacted end users.',
        ],
      },
      {
        title: 'System Operator',
        period: 'Jul 2018 – Jul 2020',
        bullets: [
          'Administered nightly BOSS batch processing, monitored all application jobs, and reported errors to mitigate operational and financial risk.',
          'Executed end-of-day processing, nightly backups, print/burst operations, and secure file transmission to vendors including FIS (AS/400).',
          'Supported IT operations via Active Directory account management and new hire workstation configuration and deployment.',
        ],
      },
    ],
  },
  {
    company: 'Mercyhurst University',
    period: 'Aug 2014 – Jul 2020',
    roles: [
      {
        title: 'Library Computer Support Specialist',
        period: 'Aug 2014 – Jul 2020',
        bullets: [
          'Sole systems administrator for 10+ library software platforms (Koha ILS, OCLC, EBSCO EDS, Springshare suite, PastPerfect, Refworks) and five Drupal/SharePoint web properties.',
          'Trained and mentored library staff on systems and best practices; developed SQL reports providing actionable usage and collections data.',
          'Maintained hardware inventory, deployed and supported all library computers, and managed workstation configuration across the department.',
        ],
      },
    ],
  },
];

const skills = [
  'VMware ESXi', 'Azure', 'Active Directory', 'PKI / Certificate Management',
  'SIEM', 'Incident Response', 'Backup & DR', 'OS Patching',
  'Runbook Authoring', 'Drupal', 'SharePoint', 'SQL',
  'Dell IDPA', 'Windows Server', 'Koha ILS', 'Purple Teaming',
];

const achievements = [
  {
    icon: Lock,
    title: 'PKI at Scale',
    body: 'Managed 200+ certificate renewals annually across all systems with zero coverage lapses or service disruptions.',
  },
  {
    icon: Server,
    title: 'VMware Infrastructure',
    body: 'Sole administrator of a 200+ server ESXi environment across production, staging, and sandbox tiers at UPMC.',
  },
  {
    icon: Shield,
    title: 'Incident Response',
    body: 'Monitored SIEM queues and led cybersecurity alert triage at CNB Bank, improving mean time to resolution.',
  },
];

export default function Home() {
  const { toast } = useToast();
  const { data: entries = [], refetch } = useGetGuestbook();
  const { mutate: postEntry, isPending } = usePostGuestbook({
    mutation: {
      onSuccess: () => {
        setName('');
        setMessage('');
        refetch();
        toast({ title: 'Thanks for signing!', description: 'Your message has been added to the guestbook.' });
      },
      onError: (error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response?.status;
        if (status === 429) {
          toast({
            title: 'Slow down!',
            description: 'You can sign the guestbook up to 5 times per hour. Please try again later.',
            variant: 'destructive',
          });
        } else if (status === 400) {
          toast({
            title: 'Submission rejected',
            description: 'Your message contains inappropriate content. Please revise and try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Something went wrong',
            description: 'Could not sign the guestbook. Please try again.',
            variant: 'destructive',
          });
        }
      },
    },
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showTop, setShowTop] = useState(false);

  // Q&A state
  type QAMessage = { role: 'user' | 'assistant'; content: string };
  const [qaMessages, setQaMessages] = useState<QAMessage[]>([]);
  const [qaInput, setQaInput] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [convId, setConvId] = useState<number | null>(null);
  const [streamingText, setStreamingText] = useState('');

  const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

  const sendQuestion = useCallback(async (question: string) => {
    if (!question.trim() || qaLoading) return;
    const q = question.trim();
    setQaMessages(prev => [...prev, { role: 'user', content: q }]);
    setQaInput('');
    setQaLoading(true);
    setStreamingText('');

    try {
      let cid = convId;
      if (!cid) {
        const res = await fetch(`${BASE}/api/openrouter/conversations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: q.slice(0, 60) }),
        });
        const conv = await res.json();
        cid = conv.id;
        setConvId(cid);
      }

      const res = await fetch(`${BASE}/api/openrouter/conversations/${cid}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: q }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = JSON.parse(line.slice(6));
          if (data.done) break;
          if (data.content) {
            full += data.content;
            setStreamingText(full);
          }
        }
      }

      setQaMessages(prev => [...prev, { role: 'assistant', content: full }]);
      setStreamingText('');
    } catch {
      setQaMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setQaLoading(false);
    }
  }, [convId, qaLoading, BASE]);

  const resetQA = useCallback(() => {
    setQaMessages([]);
    setQaInput('');
    setConvId(null);
    setStreamingText('');
  }, []);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    postEntry({ data: { name: name.trim(), message: message.trim() } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-foreground border-t-2 border-primary">

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white"
      >
        <div className="font-serif italic text-lg tracking-wide">MS</div>
        <div className="text-xs font-sans uppercase tracking-[0.18em] flex gap-8">
          <a href="#about" className="hover:text-white/60 transition-colors">About</a>
          <a href="#work" className="hover:text-white/60 transition-colors">Work</a>
          <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-start gap-12 md:gap-16">

          {/* Left: text */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight text-foreground mb-4"
            >
              Matt<br />Shellenbarger
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-primary text-base md:text-lg font-sans font-medium tracking-wide mb-5"
            >
              Infrastructure &amp; Systems · Cybersecurity
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-sans font-mono mb-7"
            >
              <span>10+ Years Experience</span>
              <span className="text-border">•</span>
              <span>200+ Servers Managed</span>
              <span className="text-border">•</span>
              <span>Zero Unplanned Downtime</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75 }}
              className="text-base md:text-lg text-muted-foreground font-sans font-normal leading-relaxed max-w-xl mb-10"
            >
              Building and securing scalable server environments with zero compromises on reliability. 10+ years driving uptime across VMware, Azure, and critical infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#work"
                className="px-6 py-3 bg-primary text-background font-sans font-medium text-sm hover:bg-primary/80 transition-colors"
              >
                View Experience
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-card text-foreground border border-border font-sans text-sm hover:border-primary transition-colors"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="shrink-0 w-full md:w-auto"
          >
            <img
              src={heroImage}
              alt="Portrait of Matt Shellenbarger"
              className="w-full md:w-[260px] lg:w-[300px] h-[320px] md:h-[370px] object-cover object-top border border-primary block"
            />
          </motion.div>

        </div>
      </section>

      {/* ── Notable Achievements ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/40">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-2xl md:text-3xl text-foreground mb-10"
        >
          Notable Achievements
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="border-l-2 border-primary border border-border/60 bg-card p-6 hover:border-primary/70 transition-colors"
            >
              <a.icon className="text-primary mb-4 w-5 h-5" strokeWidth={1.5} />
              <h3 className="font-sans font-semibold text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground sticky top-32"
            >
              About Me
            </motion.h2>
          </div>
          <div className="md:col-span-8 md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 max-w-2xl"
            >
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed font-normal">
                IT professional with 10+ years across systems administration, virtualization, and cybersecurity, spanning healthcare, banking, and higher education. Most recently at UPMC, managing a 200+ server VMware environment with zero unplanned downtime.
              </p>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed font-normal">
                What ties my career together is reliability: PKI renewals with zero lapses, SIEM monitoring, and documentation that lets the next person hit the ground running. B.S. in Cyber Security, with hands-on depth in VMware, Azure, Active Directory, and backup &amp; disaster recovery.
              </p>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed font-normal">
                Looking for a role where disciplined infrastructure work serves a clear purpose, not just uptime metrics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="work" className="py-24 md:py-36 px-6 md:px-12 bg-card border-y border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20 flex items-end justify-between"
          >
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none">Experience</h2>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground hidden md:block">2014 — Present</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative border-l border-border/60 ml-2 space-y-14">
            {experience.map((job, jobIndex) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: jobIndex * 0.06 }}
                className="relative pl-10"
              >
                {/* dot */}
                <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--card))]" />

                <p className="font-serif text-xl md:text-2xl text-foreground mb-1">{job.company}</p>
                <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground mb-5">{job.period}</p>

                <div
                  className={`border bg-background rounded-sm p-6 space-y-8 ${
                    jobIndex === 0 ? 'border-primary/40 shadow-[0_4px_24px_-8px_hsl(var(--primary)/0.12)]' : 'border-border/50'
                  }`}
                >
                  {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                        <p className="font-sans text-sm font-medium text-foreground">{role.title}</p>
                        {job.roles.length > 1 && (
                          <p className="font-sans text-xs font-mono text-muted-foreground shrink-0">{role.period}</p>
                        )}
                      </div>
                      <ul className="flex flex-col gap-2.5">
                        {role.bullets.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex gap-3 items-start">
                            <span className="text-primary mt-[0.35em] shrink-0 font-bold text-xs">›</span>
                            <p className="font-sans text-sm text-muted-foreground leading-relaxed font-normal">{bullet}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Skills ── */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-6xl mx-auto border-b border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground sticky top-32"
            >
              Technical Skills
            </motion.h2>
          </div>
          <div className="md:col-span-8 md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-sans font-medium bg-card border border-border text-muted-foreground rounded-sm hover:border-primary/60 hover:text-foreground transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-6xl mx-auto border-b border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground sticky top-32"
            >
              Education
            </motion.h2>
          </div>
          <div className="md:col-span-8 md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col divide-y divide-border/40"
            >
              <div className="pb-8">
                <p className="font-sans text-base font-medium text-foreground">B.S. Cyber Security</p>
                <p className="font-sans text-sm text-muted-foreground mt-1">Southern New Hampshire University</p>
              </div>
              <div className="pt-8">
                <p className="font-sans text-base font-medium text-foreground">A.S. Computer Information Systems</p>
                <p className="font-sans text-sm text-muted-foreground mt-1">Tri-State Business Institute</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact + Guestbook ── */}
      <footer id="contact" className="py-24 md:py-36 px-6 md:px-12 max-w-6xl mx-auto">

        {/* CTA row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-10 leading-[0.95] tracking-tight">
              Let's keep<br />the systems<br />running.
            </h2>
            <a
              href="mailto:mattda9@gmail.com"
              className="inline-block text-base font-sans font-normal text-muted-foreground hover:text-primary transition-colors border-b border-border/50 hover:border-primary pb-2"
            >
              mattda9@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex md:justify-end items-end"
          >
            <div className="flex flex-col gap-4">
              <a
                href="https://www.linkedin.com/in/mjshellenbarger/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 border border-border/60 rounded-sm font-sans text-sm font-normal text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                Connect on LinkedIn
              </a>
              <a
                href="https://x.com/MattShellenbar1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 border border-border/60 rounded-sm font-sans text-sm font-normal text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Twitter className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                Follow on X
              </a>
              <a
                href="mailto:mattda9@gmail.com"
                className="inline-flex items-center gap-3 px-7 py-4 border border-border/60 rounded-sm font-sans text-sm font-normal text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                Send an Email
              </a>
            </div>
          </motion.div>
        </div>

        {/* Ask Me Anything */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 md:mt-32 pt-16 border-t border-border/40"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2">
              <Bot className="w-3.5 h-3.5" />
              Ask Me Anything
            </p>
            {qaMessages.length > 0 && (
              <button
                onClick={resetQA}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
          <p className="font-sans text-sm text-muted-foreground/60 mb-8">
            Powered by Claude — ask about my experience, skills, or background.
          </p>

          {/* Suggested questions */}
          {qaMessages.length === 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                'What was your role at UPMC?',
                'What certifications do you hold?',
                'Tell me about your VMware experience.',
                'What cybersecurity skills do you have?',
                'Are you open to remote work?',
              ].map(q => (
                <button
                  key={q}
                  onClick={() => sendQuestion(q)}
                  className="px-3 py-1.5 text-xs font-sans bg-card border border-border/60 text-muted-foreground rounded-sm hover:border-primary hover:text-foreground transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {qaMessages.length > 0 && (
            <div className="flex flex-col gap-5 mb-8 max-h-[32rem] overflow-y-auto pr-1">
              {qaMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-5 py-3.5 rounded-sm text-sm font-sans leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-background ml-auto'
                        : 'bg-card border border-border/60 text-muted-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {qaLoading && streamingText && (
                <div className="flex gap-3 justify-start">
                  <div className="max-w-[80%] px-5 py-3.5 rounded-sm text-sm font-sans leading-relaxed bg-card border border-border/60 text-muted-foreground">
                    {streamingText}
                    <span className="inline-block w-1 h-3.5 bg-primary/60 ml-0.5 animate-pulse align-middle" />
                  </div>
                </div>
              )}
              {qaLoading && !streamingText && (
                <div className="flex gap-3 justify-start">
                  <div className="px-5 py-3.5 rounded-sm bg-card border border-border/60">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={e => { e.preventDefault(); sendQuestion(qaInput); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={qaInput}
              onChange={e => setQaInput(e.target.value)}
              placeholder="Ask about my experience, skills, or availability..."
              disabled={qaLoading}
              className="flex-1 bg-card border border-border/60 rounded-sm px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={qaLoading || !qaInput.trim()}
              className="px-5 py-3 bg-primary text-background hover:bg-primary/80 transition-colors rounded-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-sans font-medium"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        {/* Guestbook */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 md:mt-32 pt-16 border-t border-border/40"
        >
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground mb-10">Leave Your Mark</p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

            {/* Form */}
            <div className="md:col-span-5">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="gb-name" className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="gb-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    placeholder="Your name"
                    className="bg-card border border-border/60 rounded-sm px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="gb-message" className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="gb-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={500}
                    rows={4}
                    placeholder="Leave a message..."
                    className="bg-card border border-border/60 rounded-sm px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending || !name.trim() || !message.trim()}
                  className="self-start px-8 py-3 bg-foreground text-background font-sans text-xs uppercase tracking-[0.15em] rounded-sm hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Signing…' : 'Sign the Guestbook'}
                </button>
              </form>
            </div>

            {/* Entries */}
            <div className="md:col-span-7">
              {entries.length === 0 ? (
                <p className="font-sans text-sm text-muted-foreground/50 italic">
                  No entries yet — be the first to sign!
                </p>
              ) : (
                <div className="flex flex-col gap-4 max-h-[32rem] overflow-y-auto pr-2">
                  {entries.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                      className="bg-card border border-border/40 rounded-sm px-6 py-5"
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <p className="font-sans text-sm font-semibold text-foreground truncate">{entry.name}</p>
                        <p className="font-sans text-xs text-muted-foreground/60 shrink-0">
                          {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">{entry.message}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="mt-24 pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-sans text-muted-foreground uppercase tracking-[0.15em]">
          <p>© {new Date().getFullYear()} Matt Shellenbarger</p>
          <p>Designed with intention</p>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center border border-border/60 bg-card text-muted-foreground hover:border-primary hover:text-primary transition-colors rounded-sm shadow-lg"
          >
            <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
