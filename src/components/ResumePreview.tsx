import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, RefreshCw, Layers, Award, GraduationCap, Briefcase } from "lucide-react";
import { PERSONAL_INFO, WORK_EXPERIENCE_LIST, EDUCATION_LIST } from "../data";
import { generateResumePDF } from "../utils/resumeGenerator";

export default function ResumePreview() {
  const handleDownload = () => {
    generateResumePDF(false);
  };

  return (
    <section
      id="resume-section"
      className="py-20 px-6 bg-[#FAF9F6] dark:bg-[#0B1E33] relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-[#C5A85C]/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-[#0B192C]/5 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            02 / Curriculm Vitae
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] dark:text-[#FAF9F6] tracking-tight">
            Interactive Resume
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
          <p className="text-sm text-[#0B192C]/70 dark:text-[#FAF9F6]/60 mt-4 max-w-xl mx-auto">
            View the interactive, web-optimized resume or download the exact high-fidelity printed PDF layout designed for global systems teams.
          </p>
        </div>

        {/* Control Bar with Download Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-3 group bg-[#FFFDF9] dark:bg-[#112235] hover:bg-[#0b192c] dark:hover:bg-[#FAF9F6] text-[#0B192C] dark:text-[#FAF9F6] hover:text-[#FAF9F6] dark:hover:text-[#0b192c] border border-[#C5A85C]/30 hover:border-[#112235] rounded-xl font-display text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-lg"
            id="btn-resume-download"
          >
            <Download className="w-4 h-4 text-[#C5A85C]" />
            <span>Download PDF CV</span>
          </button>
        </div>

        {/* Content Panel Area */}
        <div className="relative min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-[#0B192C]/5 dark:border-white/10 bg-white dark:bg-[#112235] p-2">
          <div
            className="p-6 md:p-10 space-y-10 text-left"
            id="web-resume-container"
          >
                {/* Header info */}
                <div className="border-b border-[#0B192C]/5 dark:border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h3 className="text-3xl font-display font-black text-[#0B192C] dark:text-[#FAF9F6] tracking-tight uppercase">
                      {PERSONAL_INFO.fullName}
                    </h3>
                    <p className="font-mono text-[#C5A85C] uppercase tracking-widest text-xs font-bold mt-1">
                      Software Engineer • Backend Specialist
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono text-[#0B192C]/70 dark:text-[#FAF9F6]/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C5A85C]" />
                      <span>{PERSONAL_INFO.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#C5A85C]" />
                      <a href={`mailto:${PERSONAL_INFO.emailId}`} className="hover:text-[#C5A85C] transition-colors">
                        {PERSONAL_INFO.emailId}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#C5A85C]" />
                      <span>{PERSONAL_INFO.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-[#C5A85C]" />
                      <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A85C] transition-colors flex items-center gap-1">
                        ajju853 <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-3">
                  <h4 className="font-display font-extrabold text-sm text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-widest border-b border-[#0B192C]/5 dark:border-white/10 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-[#C5A85C] rounded-sm" />
                    Professional Summary
                  </h4>
                  <p className="text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/85 leading-relaxed bg-[#FAF9F6] dark:bg-[#0B1E33] p-5 rounded-2xl border border-[#0B192C]/5 dark:border-white/5">
                    Software Engineer specialized in designing and building high-performance modern backend systems, microservices, REST APIs, and enterprise integration workflows using Java, Spring Boot, Python, and Flask. Experienced in TIBCO BusinessWorks CE orchestration, Apache Kafka Event-Driven streaming setups, Docker containerization, and schema engineering. Well-versed in troubleshooting production database bottlenecks under high connection load, and contributing to secure, agile enterprise-grade feature deliveries for global manufacturing clients like Wipro and Mahindra.
                  </p>
                </div>

                {/* Core Skills section */}
                <div className="space-y-4">
                  <h4 className="font-display font-extrabold text-sm text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-widest border-b border-[#0B192C]/5 dark:border-white/10 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-[#C5A85C] rounded-sm" />
                    Technical Specializations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-[#0B1E33] border border-[#0B192C]/5 dark:border-white/5">
                      <strong className="block font-mono text-[10px] text-[#C5A85C] uppercase tracking-wider mb-2">Backend & Integration</strong>
                      <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/80 leading-relaxed">
                        Java, Spring Boot, microservices, Spring Security Integration, TIBCO BusinessWorks CE, REST API, OpenAPI Spec / Swagger
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-[#0B1E33] border border-[#0B192C]/5 dark:border-white/5">
                      <strong className="block font-mono text-[10px] text-[#C5A85C] uppercase tracking-wider mb-2">Event Brokerage & DB</strong>
                      <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/80 leading-relaxed">
                        Apache Kafka Message Broker, Confluent Schema Registry, Zookeeper, PostgreSQL, MySQL, Redis Caching
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-[#0B1E33] border border-[#0B192C]/5 dark:border-white/5">
                      <strong className="block font-mono text-[10px] text-[#C5A85C] uppercase tracking-wider mb-2">Infrastructure & DevOps</strong>
                      <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/80 leading-relaxed">
                        Docker, Docker Compose, Git Command suite, GitHub Actions CI/CD workflows, Linux Administration, Bash
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-[#0B1E33] border border-[#0B192C]/5 dark:border-white/5">
                      <strong className="block font-mono text-[10px] text-[#C5A85C] uppercase tracking-wider mb-2">AI Automation & Auth Style</strong>
                      <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/80 leading-relaxed">
                        LangChain, OpenAI API, Gemini LLM SDK, Next.js, React.js, JWT, Role-Based Access Controls (RBAC), AES-256 Symmetric Encryption
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience section */}
                <div className="space-y-4">
                  <h4 className="font-display font-extrabold text-sm text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-widest border-b border-[#0B192C]/5 dark:border-white/10 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-[#C5A85C] rounded-sm" />
                    Employment History
                  </h4>
                  {WORK_EXPERIENCE_LIST.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l border-[#C5A85C] space-y-3 py-1">
                      <div className="absolute w-3 h-3 rounded-full bg-[#0B192C] border-2 border-[#C5A85C] -left-[6px] top-1.5" />
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                        <h5 className="font-display font-bold text-base text-[#0B192C] dark:text-[#FAF9F6]">
                          {exp.designation} <span className="text-[#C5A85C]">@ {exp.company}</span>
                        </h5>
                        <span className="font-mono text-xs text-[#0B192C]/60 dark:text-[#FAF9F6]/60">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#C5A85C]/90 font-bold tracking-wider uppercase">
                        {exp.employmentType} • {exp.location}
                      </p>
                      <ul className="space-y-2 list-none">
                        {exp.keyResponsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs sm:text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/80 leading-relaxed flex items-start gap-2">
                            <span className="text-[#C5A85C] font-mono select-none mt-1">▸</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 bg-[#FAF9F6] dark:bg-[#0B1E33] p-3 rounded-xl border border-[#0B192C]/5 dark:border-white/5">
                        <strong className="block font-mono text-[10px] text-[#C5A85C] uppercase tracking-wider mb-1">Key Impact Outcomes</strong>
                        <ul className="space-y-1 list-none">
                          {exp.keyAchievements.map((ach, aIdx) => (
                            <li key={aIdx} className="text-xs sm:text-sm font-sans text-emerald-600 dark:text-emerald-400 font-medium flex items-start gap-2">
                              <span className="select-none">✓</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education section */}
                <div className="space-y-4">
                  <h4 className="font-display font-extrabold text-sm text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-widest border-b border-[#0B192C]/5 dark:border-white/10 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-[#C5A85C] rounded-sm" />
                    Academic Foundation
                  </h4>
                  {EDUCATION_LIST.map((edu) => (
                    <div key={edu.id} className="relative pl-6 border-l border-[#0B192C]/5 dark:border-white/10 space-y-1.5 py-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                        <h5 className="font-display font-extrabold text-base text-[#0B192C] dark:text-[#FAF9F6]">
                          {edu.qualification}
                        </h5>
                        <span className="font-mono text-xs text-[#0B192C]/60 dark:text-[#FAF9F6]/60">
                          {edu.duration}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-[#0B192C]/80 dark:text-[#FAF9F6]/85">
                        {edu.institution}
                      </p>
                      <span className="inline-flex bg-amber-500/10 text-[#C5A85C] px-3 py-1 rounded-md text-xs font-mono font-black mt-2">
                        CGPA: 7.79 / 10.0
                      </span>
                    </div>
                  ))}
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
