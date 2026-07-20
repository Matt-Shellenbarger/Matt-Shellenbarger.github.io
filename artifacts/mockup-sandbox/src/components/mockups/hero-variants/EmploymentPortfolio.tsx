import React from 'react';

export function EmploymentPortfolio() {
  return (
    <div className="min-h-screen bg-[#111214] text-[#e8e6e1] font-sans selection:bg-[#c4714a]/30">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />
      
      <div className="max-w-[860px] mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <img 
              src="/__mockup/images/matt.jpg" 
              alt="Matt Shellenbagrer" 
              className="w-20 h-20 rounded-full object-cover border border-[#2a2d32] bg-[#1a1c1f]"
              onError={(e) => {
                // Fallback if image doesn't exist
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%231a1c1f"/><text x="40" y="45" font-family="sans-serif" font-size="24" fill="%238a8f9a" text-anchor="middle">MS</text></svg>';
              }}
            />
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-2 text-[#e8e6e1]">
                Matt Shellenbagrer
              </h1>
              <h2 className="text-[#c4714a] text-sm md:text-base font-medium tracking-wide">
                Infrastructure & Systems Engineer · Cybersecurity
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 text-sm text-[#8a8f9a] md:text-right mt-2 md:mt-0">
            <a href="mailto:mattda9@gmail.com" className="hover:text-[#c4714a] transition-colors flex items-center md:justify-end gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              mattda9@gmail.com
            </a>
            <a href="https://linkedin.com/in/mjshellenbarger" target="_blank" rel="noopener noreferrer" className="hover:text-[#c4714a] transition-colors flex items-center md:justify-end gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              linkedin.com/in/mjshellenbarger
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-16">
          <p className="text-base md:text-lg leading-relaxed text-[#e8e6e1]/90 font-light">
            10+ years across systems administration, virtualization, and cybersecurity. VMware, Azure, Active Directory, PKI, SIEM. <span className="text-[#e8e6e1] font-medium">Zero unplanned downtime</span> across 200+ server environment at UPMC.
          </p>
        </section>

        <hr className="border-[#2a2d32] mb-12" />

        {/* Experience Timeline */}
        <section className="mb-16">
          <h3 className="font-serif text-2xl mb-10 text-[#e8e6e1]">Experience</h3>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2a2d32] before:to-transparent">
            
            {/* Job 1 (Most Recent) */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-[#111214] bg-[#c4714a] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#111214] z-10 absolute left-0 ml-[2px] md:ml-0 md:left-1/2"></div>
              
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-6 md:ml-0 p-6 rounded-lg border border-[#c4714a]/30 bg-[#1a1c1f] shadow-sm">
                <div className="flex flex-col mb-4 gap-1">
                  <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-1 xl:gap-4">
                    <h4 className="text-lg font-medium text-[#e8e6e1] flex items-center gap-2">
                      UPMC
                    </h4>
                    <span className="text-xs font-medium text-[#c4714a] bg-[#c4714a]/10 px-2 py-0.5 rounded-full w-fit whitespace-nowrap">May 2023 – Oct 2025</span>
                  </div>
                  <h5 className="text-sm text-[#8a8f9a]">Associate Software Engineer (Infrastructure &amp; Systems)</h5>
                </div>
                <ul className="text-sm text-[#8a8f9a] space-y-2.5 list-none">
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Administered VMware ESXi (v7.0/v8.0), ~200 virtual servers, 99.9%+ uptime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Managed PKI certificate lifecycle: ~200 renewals/year, zero lapses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Responded to network security alerts, coordinated remediation with security team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Monthly OS patching, datacenter host provisioning, Dell IDPA backup administration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Authored runbooks, operational procedures, system documentation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Job 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-[#111214] bg-[#2a2d32] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#111214] z-10 absolute left-0 ml-[2px] md:ml-0 md:left-1/2"></div>
              
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-6 md:ml-0 p-6 rounded-lg border border-[#2a2d32] bg-[#1a1c1f]">
                <div className="flex flex-col mb-4 gap-1">
                  <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-1 xl:gap-4">
                    <h4 className="text-base font-medium text-[#e8e6e1]">CNB Bank</h4>
                    <span className="text-xs text-[#8a8f9a] font-mono whitespace-nowrap">Feb 2023 – May 2023</span>
                  </div>
                  <h5 className="text-sm text-[#8a8f9a]">Jr. Incident Response Analyst (contract)</h5>
                </div>
                <ul className="text-sm text-[#8a8f9a] space-y-2.5 list-none">
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Monitored SIEM queues, triaged cybersecurity alerts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Contributed to incident response playbook improvements</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Job 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-[#111214] bg-[#2a2d32] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#111214] z-10 absolute left-0 ml-[2px] md:ml-0 md:left-1/2"></div>
              
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-6 md:ml-0 p-6 rounded-lg border border-[#2a2d32] bg-[#1a1c1f]">
                <div className="flex flex-col mb-4 gap-1">
                  <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-1 xl:gap-4">
                    <h4 className="text-base font-medium text-[#e8e6e1]">Marquette Savings Bank</h4>
                    <span className="text-xs text-[#8a8f9a] font-mono whitespace-nowrap">Jul 2018 – Feb 2023</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm text-[#e8e6e1]/90 font-medium mb-1.5 flex items-center justify-between">
                      Application Systems Analyst II
                      <span className="text-[11px] text-[#8a8f9a] font-normal font-mono">Jan 2022 – Feb 2023</span>
                    </h5>
                    <p className="text-sm text-[#8a8f9a] leading-relaxed pl-3 border-l border-[#2a2d32]">
                      Led banking system enhancement projects, purple teaming with security auditors, SIEM monitoring
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm text-[#e8e6e1]/90 font-medium mb-1.5 flex items-center justify-between">
                      Application Systems Analyst I
                      <span className="text-[11px] text-[#8a8f9a] font-normal font-mono">Jul 2020 – Jan 2022</span>
                    </h5>
                    <p className="text-sm text-[#8a8f9a] leading-relaxed pl-3 border-l border-[#2a2d32]">
                      System projects coordination, root cause analysis, performance optimization
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm text-[#e8e6e1]/90 font-medium mb-1.5 flex items-center justify-between">
                      System Operator
                      <span className="text-[11px] text-[#8a8f9a] font-normal font-mono">Jul 2018 – Jul 2020</span>
                    </h5>
                    <p className="text-sm text-[#8a8f9a] leading-relaxed pl-3 border-l border-[#2a2d32]">
                      BOSS batch processing, backups, Active Directory, workstation deployment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-[#111214] bg-[#2a2d32] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#111214] z-10 absolute left-0 ml-[2px] md:ml-0 md:left-1/2"></div>
              
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-6 md:ml-0 p-6 rounded-lg border border-[#2a2d32] bg-[#1a1c1f]">
                <div className="flex flex-col mb-4 gap-1">
                  <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-1 xl:gap-4">
                    <h4 className="text-base font-medium text-[#e8e6e1]">Mercyhurst University</h4>
                    <span className="text-xs text-[#8a8f9a] font-mono whitespace-nowrap">Aug 2014 – Jul 2020</span>
                  </div>
                  <h5 className="text-sm text-[#8a8f9a]">Library Computer Support Specialist</h5>
                </div>
                <ul className="text-sm text-[#8a8f9a] space-y-2.5 list-none">
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Sole systems admin for 10+ library platforms (Koha ILS, OCLC, EBSCO EDS, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2a2d32] mr-2 mt-0.5 font-bold">›</span>
                    <span>Maintained Drupal/SharePoint web properties, trained staff, SQL reporting</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        <hr className="border-[#2a2d32] mb-12" />

        {/* Skills & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Skills */}
          <section>
            <h3 className="font-serif text-xl mb-6 text-[#e8e6e1]">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['VMware ESXi', 'Azure', 'Active Directory', 'PKI/Certificate Management', 'SIEM', 'Incident Response', 'Backup & DR', 'OS Patching', 'Runbook Authoring', 'Drupal', 'SharePoint', 'SQL'].map(skill => (
                <span key={skill} className="px-3 py-1.5 text-xs font-medium bg-[#1a1c1f] border border-[#2a2d32] text-[#8a8f9a] rounded-md hover:border-[#c4714a]/50 hover:text-[#e8e6e1] transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="font-serif text-xl mb-6 text-[#e8e6e1]">Education</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-[#2a2d32] bg-[#1a1c1f]">
                <h4 className="text-sm font-medium text-[#e8e6e1] mb-1">B.S. Cyber Security</h4>
                <p className="text-xs text-[#8a8f9a]">Southern New Hampshire University</p>
              </div>
              <div className="p-4 rounded-lg border border-[#2a2d32] bg-[#1a1c1f]">
                <h4 className="text-sm font-medium text-[#e8e6e1] mb-1">A.S. Computer Information Systems</h4>
                <p className="text-xs text-[#8a8f9a]">Tri-State Business Institute</p>
              </div>
            </div>
          </section>
          
        </div>

        <div className="mt-20 pt-8 border-t border-[#2a2d32] flex justify-between items-center text-xs text-[#8a8f9a]">
          <p>© {new Date().getFullYear()} Matt Shellenbagrer.</p>
          <a href="#" className="hover:text-[#c4714a] transition-colors">Resume PDF</a>
        </div>
      </div>
    </div>
  );
}
