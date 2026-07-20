import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Twitter, Linkedin } from 'lucide-react';
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

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
    },
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    postEntry({ data: { name: name.trim(), message: message.trim() } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 flex justify-between items-center mix-blend-difference text-white"
      >
        <div className="font-serif italic text-lg tracking-wide">MS</div>
        <div className="text-xs font-sans uppercase tracking-[0.18em] flex gap-8">
          <a href="#about" className="hover:text-white/60 transition-colors">About</a>
          <a href="#work" className="hover:text-white/60 transition-colors">Work</a>
          <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-[100dvh] pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">

          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-foreground tracking-tight"
            >
              Matt<br />Shellenbagrer
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 text-muted-foreground"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-px bg-muted-foreground/40" />
                <p className="font-sans text-xs tracking-[0.18em] uppercase">Infrastructure & Systems</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-px bg-muted-foreground/40" />
                <p className="font-sans text-xs tracking-[0.18em] uppercase">Cybersecurity</p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-5 relative order-1 md:order-2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[3/4] lg:aspect-[4/5] relative overflow-hidden rounded-sm"
            >
              <img
                src={heroImage}
                alt="Portrait of Matt Shellenbagrer"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-background/10 mix-blend-multiply" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-border/40">
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
              viewport={{ once: true, margin: "-100px" }}
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

      {/* Experience Section */}
      <section id="work" className="py-32 md:py-48 px-6 md:px-12 bg-card border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24 md:mb-40 flex items-end justify-between"
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-none">Experience</h2>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground hidden md:block">2014 — Present</p>
          </motion.div>

          <div className="flex flex-col divide-y divide-border/40">
            {experience.map((job, jobIndex) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: jobIndex * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-16 md:py-20"
              >
                <div className="md:col-span-4 md:pr-8">
                  <p className="font-serif text-2xl md:text-3xl text-foreground leading-tight mb-2">{job.company}</p>
                  <p className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">{job.period}</p>
                </div>

                <div className="md:col-span-8 flex flex-col gap-12">
                  {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-6">
                        <p className="font-sans text-sm font-medium tracking-wide text-foreground">{role.title}</p>
                        {job.roles.length > 1 && (
                          <p className="font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground/70 shrink-0">{role.period}</p>
                        )}
                      </div>
                      <ul className="flex flex-col gap-3">
                        {role.bullets.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex gap-4 items-start">
                            <span className="mt-[0.55em] w-1 h-1 bg-primary/60 rotate-45 shrink-0" />
                            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed font-normal">{bullet}</p>
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

      {/* Education Section */}
      <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-border/40">
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col divide-y divide-border/40"
            >
              <div className="pb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <p className="font-sans text-base font-medium text-foreground">B.S. Cyber Security</p>
                  <p className="font-sans text-sm text-muted-foreground mt-1">Southern New Hampshire University</p>
                </div>
              </div>
              <div className="pt-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <p className="font-sans text-base font-medium text-foreground">A.S. Computer Information Systems</p>
                  <p className="font-sans text-sm text-muted-foreground mt-1">Tri-State Business Institute</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact + Guestbook */}
      <footer id="contact" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-border/40">

        {/* CTA row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[6rem] mb-12 leading-[0.95] tracking-tight">Let's keep<br />the systems<br />running.</h2>
            <a
              href="mailto:mattda9@gmail.com"
              className="inline-block text-base md:text-lg font-sans font-normal text-muted-foreground hover:text-primary transition-colors border-b border-border/50 hover:border-primary pb-2"
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
            <div className="flex flex-col gap-10">
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Connect</p>
              <div className="flex gap-10">
                <a href="https://x.com/MattShellenbar1" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors hover:-translate-y-1 transform duration-500 ease-[0.16,1,0.3,1]">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/in/mjshellenbarger/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors hover:-translate-y-1 transform duration-500 ease-[0.16,1,0.3,1]">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="mailto:mattda9@gmail.com" className="text-foreground/80 hover:text-primary transition-colors hover:-translate-y-1 transform duration-500 ease-[0.16,1,0.3,1]">
                  <span className="sr-only">Email</span>
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Guestbook */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 md:mt-32 pt-16 border-t border-border/40"
        >
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground mb-10">Guestbook</p>
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

        {/* Copyright bar */}
        <div className="mt-24 pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-sans text-muted-foreground uppercase tracking-[0.15em]">
          <p>© {new Date().getFullYear()} Matt Shellenbagrer</p>
          <p>Designed with intention</p>
        </div>
      </footer>
    </div>
  );
}
