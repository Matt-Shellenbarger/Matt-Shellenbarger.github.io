import React from 'react';

export function EmploymentPortfolio() {
  return (
    <div className="min-h-screen bg-[#111214] text-[#e8e6e1] font-sans selection:bg-[#c4714a]/30 border-t-2 border-[#c4714a]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />
      
      <div className="max-w-[860px] mx-auto px-6 py-16 md:py-24 space-y-24">
        
        {/* 1. Hero */}
        <header className="flex flex-col-reverse md:flex-row items-start justify-between gap-12">
          <div className="flex-1">
            <h1 className="font-serif text-5xl md:text-[4.5rem] font-medium tracking-tight leading-[1.05] text-[#e8e6e1] mb-4">
              Matt Shellenbarger
            </h1>
            <h2 className="text-[#c4714a] text-lg md:text-xl font-medium tracking-wide mb-6">
              Infrastructure & Systems · Cybersecurity
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#8a8f9a] mb-8 font-mono">
              <span>10+ Years Experience</span>
              <span className="text-[#3a3d42]">•</span>
              <span>200+ Servers Managed</span>
              <span className="text-[#3a3d42]">•</span>
              <span>Zero Unplanned Downtime</span>
            </div>
            
            <p className="text-base md:text-lg leading-relaxed text-[#e8e6e1]/90 font-light max-w-xl mb-10">
              Building and securing scalable server environments with zero compromises on reliability. 10+ years driving uptime across VMware, Azure, and critical infrastructure.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#experience" className="px-6 py-3 bg-[#c4714a] text-[#111214] font-medium hover:bg-[#d8845d] transition-colors text-sm">View Experience</a>
              <a href="#contact" className="px-6 py-3 bg-[#1a1c1f] text-[#e8e6e1] border border-[#2a2d32] hover:border-[#c4714a] transition-colors text-sm">Contact Me</a>
            </div>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
            <img 
              src="/__mockup/images/matt.jpg" 
              alt="Matt Shellenbarger" 
              className="w-full md:w-[280px] h-[340px] object-cover object-top border border-[#c4714a] bg-[#1a1c1f] block"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="340" viewBox="0 0 280 340"><rect width="280" height="340" fill="%231a1c1f"/><text x="140" y="170" font-family="sans-serif" font-size="32" fill="%238a8f9a" text-anchor="middle">MS</text></svg>';
              }}
            />
          </div>
        </header>

        {/* 2. Highlights Reel */}
        <section>
          <h3 className="font-serif text-2xl mb-8 text-[#e8e6e1]">Notable Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* PKI */}
            <div className="border-l-2 border-[#c4714a] border border-[#2a2d32] bg-[#1a1c1f] p-6 hover:border-[#c4714a]/50 transition-colors">
              <svg className="text-[#c4714a] mb-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <h4 className="text-base font-semibold text-[#e8e6e1] mb-2">PKI at Scale</h4>
              <p className="text-sm text-[#8a8f9a] leading-relaxed">Managed 200+ certificate renewals annually across all systems with zero coverage lapses or service disruptions.</p>
            </div>

            {/* VMware */}
            <div className="border-l-2 border-[#c4714a] border border-[#2a2d32] bg-[#1a1c1f] p-6 hover:border-[#c4714a]/50 transition-colors">
              <svg className="text-[#c4714a] mb-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
              <h4 className="text-base font-semibold text-[#e8e6e1] mb-2">VMware Infrastructure</h4>
              <p className="text-sm text-[#8a8f9a] leading-relaxed">Sole administrator of a 200+ server ESXi environment across production, staging, and sandbox tiers at UPMC.</p>
            </div>

            {/* Incident Response */}
            <div className="border-l-2 border-[#c4714a] border border-[#2a2d32] bg-[#1a1c1f] p-6 hover:border-[#c4714a]/50 transition-colors">
              <svg className="text-[#c4714a] mb-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <h4 className="text-base font-semibold text-[#e8e6e1] mb-2">Incident Response</h4>
              <p className="text-sm text-[#8a8f9a] leading-relaxed">Monitored SIEM queues and led cybersecurity alert triage at CNB Bank, improving mean time to resolution.</p>
            </div>
          </div>
        </section>

        <hr className="border-[#2a2d32]" />

        {/* 3. Experience timeline */}
        <section id="experience">
          <h3 className="font-serif text-2xl mb-10 text-[#e8e6e1]">Experience</h3>
          
          <div className="relative border-l border-[#2a2d32] ml-2 space-y-12 pb-4">
            
            {/* Job 1 (UPMC) */}
            <div className="relative pl-8">
              <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-[#c4714a] shadow-[0_0_0_4px_#111214]" />
              <h4 className="text-lg font-medium text-[#e8e6e1] mb-3">UPMC</h4>
              
              <div className="p-6 rounded-sm border border-[#c4714a]/40 bg-[#1a1c1f] shadow-[0_4px_20px_-10px_rgba(196,113,74,0.1)]">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4 gap-2">
                  <h5 className="font-medium text-[#e8e6e1]">Associate Software Engineer (Infrastructure & Systems)</h5>
                  <span className="text-sm text-[#8a8f9a] font-mono whitespace-nowrap">May 2023 – Oct 2025</span>
                </div>
                <ul className="text-sm text-[#8a8f9a] space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Administered VMware ESXi (v7.0/v8.0), ~200 virtual servers, 99.9%+ uptime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Managed PKI certificate lifecycle: ~200 renewals/year, zero lapses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Responded to network security alerts, coordinated remediation with security team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Monthly OS patching, datacenter host provisioning, Dell IDPA backup administration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Authored runbooks, operational procedures, system documentation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Job 2 (CNB Bank) */}
            <div className="relative pl-8">
              <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-[#c4714a] shadow-[0_0_0_4px_#111214]" />
              <h4 className="text-lg font-medium text-[#e8e6e1] mb-3">CNB Bank</h4>
              
              <div className="p-6 rounded-sm border border-[#2a2d32] bg-[#1a1c1f]">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4 gap-2">
                  <h5 className="font-medium text-[#e8e6e1]">Jr. Incident Response Analyst (contract)</h5>
                  <span className="text-sm text-[#8a8f9a] font-mono whitespace-nowrap">Feb 2023 – May 2023</span>
                </div>
                <ul className="text-sm text-[#8a8f9a] space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Monitored SIEM queues, triaged cybersecurity alerts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Contributed to incident response playbook improvements</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Job 3 (Marquette Savings Bank) */}
            <div className="relative pl-8">
              <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-[#c4714a] shadow-[0_0_0_4px_#111214]" />
              <h4 className="text-lg font-medium text-[#e8e6e1] mb-3">Marquette Savings Bank</h4>
              
              <div className="p-6 rounded-sm border border-[#2a2d32] bg-[#1a1c1f] space-y-6">
                <div>
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2 gap-2">
                    <h5 className="font-medium text-[#e8e6e1]">Application Systems Analyst II</h5>
                    <span className="text-[13px] text-[#8a8f9a] font-mono whitespace-nowrap">Jan 2022 – Feb 2023</span>
                  </div>
                  <p className="text-sm text-[#8a8f9a] leading-relaxed pl-3 border-l-2 border-[#2a2d32]">
                    Led banking system enhancement projects, purple teaming with security auditors, SIEM monitoring
                  </p>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2 gap-2">
                    <h5 className="font-medium text-[#e8e6e1]">Application Systems Analyst I</h5>
                    <span className="text-[13px] text-[#8a8f9a] font-mono whitespace-nowrap">Jul 2020 – Jan 2022</span>
                  </div>
                  <p className="text-sm text-[#8a8f9a] leading-relaxed pl-3 border-l-2 border-[#2a2d32]">
                    System projects coordination, root cause analysis, performance optimization
                  </p>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2 gap-2">
                    <h5 className="font-medium text-[#e8e6e1]">System Operator</h5>
                    <span className="text-[13px] text-[#8a8f9a] font-mono whitespace-nowrap">Jul 2018 – Jul 2020</span>
                  </div>
                  <p className="text-sm text-[#8a8f9a] leading-relaxed pl-3 border-l-2 border-[#2a2d32]">
                    BOSS batch processing, backups, Active Directory, workstation deployment
                  </p>
                </div>
              </div>
            </div>

            {/* Job 4 (Mercyhurst University) */}
            <div className="relative pl-8">
              <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-[#c4714a] shadow-[0_0_0_4px_#111214]" />
              <h4 className="text-lg font-medium text-[#e8e6e1] mb-3">Mercyhurst University</h4>
              
              <div className="p-6 rounded-sm border border-[#2a2d32] bg-[#1a1c1f]">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4 gap-2">
                  <h5 className="font-medium text-[#e8e6e1]">Library Computer Support Specialist</h5>
                  <span className="text-sm text-[#8a8f9a] font-mono whitespace-nowrap">Aug 2014 – Jul 2020</span>
                </div>
                <ul className="text-sm text-[#8a8f9a] space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Sole systems admin for 10+ library platforms (Koha ILS, OCLC, EBSCO EDS, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#c4714a] mr-2 mt-0.5 font-bold">›</span>
                    <span>Maintained Drupal/SharePoint web properties, trained staff, SQL reporting</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        <hr className="border-[#2a2d32]" />

        {/* Skills & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h3 className="font-serif text-xl mb-6 text-[#e8e6e1]">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['VMware ESXi', 'Azure', 'Active Directory', 'PKI/Certificate Management', 'SIEM', 'Incident Response', 'Backup & DR', 'OS Patching', 'Runbook Authoring', 'Drupal', 'SharePoint', 'SQL'].map(skill => (
                <span key={skill} className="px-3 py-1.5 text-xs font-medium bg-[#1a1c1f] border border-[#2a2d32] text-[#8a8f9a] rounded-sm hover:border-[#c4714a]/50 hover:text-[#e8e6e1] transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-serif text-xl mb-6 text-[#e8e6e1]">Education</h3>
            <div className="space-y-4">
              <div className="p-5 rounded-sm border border-[#2a2d32] bg-[#1a1c1f]">
                <h4 className="text-sm font-medium text-[#e8e6e1] mb-1">B.S. Cyber Security</h4>
                <p className="text-xs text-[#8a8f9a] font-mono">Southern New Hampshire University</p>
              </div>
              <div className="p-5 rounded-sm border border-[#2a2d32] bg-[#1a1c1f]">
                <h4 className="text-sm font-medium text-[#e8e6e1] mb-1">A.S. Computer Information Systems</h4>
                <p className="text-xs text-[#8a8f9a] font-mono">Tri-State Business Institute</p>
              </div>
            </div>
          </section>
        </div>
        
        {/* 4. Contact CTA */}
        <section id="contact" className="py-12 text-center bg-[#1a1c1f] border border-[#2a2d32] rounded-sm px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[#e8e6e1] font-medium tracking-tight">Let's build something reliable.</h2>
          <p className="text-[#8a8f9a] mb-10 max-w-lg mx-auto text-sm md:text-base">
            Open to new opportunities in infrastructure, systems engineering, and cybersecurity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:mattda9@gmail.com" className="px-8 py-3.5 bg-[#c4714a] text-[#111214] font-medium hover:bg-[#d8845d] transition-colors text-sm">
              mattda9@gmail.com
            </a>
            <a href="https://linkedin.com/in/mjshellenbarger" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-[#111214] text-[#e8e6e1] border border-[#2a2d32] hover:border-[#c4714a] transition-colors text-sm flex items-center justify-center gap-2">
              LinkedIn <span>→</span>
            </a>
          </div>
        </section>

        <div className="pt-8 border-t border-[#2a2d32] flex justify-between items-center text-xs text-[#8a8f9a]">
          <p>© {new Date().getFullYear()} Matt Shellenbarger.</p>
        </div>
      </div>
    </div>
  );
}
