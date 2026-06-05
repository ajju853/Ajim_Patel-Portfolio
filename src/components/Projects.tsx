import React from "react";
import { motion } from "motion/react";
import { Github, FolderGit, Cpu, Layers } from "lucide-react";
import { PROJECTS_LIST } from "../data";

const getProjectImgUrl = (id: string) => {
  switch (id) {
    case "proj_1":
      return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=600&h=800&q=80"; // Java / Developer Integration Coding Stack
    case "proj_2":
      return "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?fit=crop&w=600&h=800&q=80"; // Tech/Automotive robotic line production system
    case "proj_3":
      return "https://images.unsplash.com/photo-1677442136019-21780efad99a?fit=crop&w=600&h=800&q=80"; // AI network & language model abstraction layers
    case "proj_4":
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=600&h=800&q=80"; // SaaS SaaS dashboard invoicing billing
    default:
      return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=600&h=800&q=80";
  }
};

export default function Projects() {
  // Container for child stagger actions
  const rightContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3 // 0.3s delay before right content elements fade in
      }
    }
  };

  const outcomeVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 15 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 15
      }
    }
  };

  const techTagVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 11
      }
    }
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 bg-[#F5F2EB] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#C5A85C]/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-120 h-120 rounded-full bg-[#0B192C]/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            03 / Code Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            Personal Projects
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-12" id="projects-grid">
          {PROJECTS_LIST.map((proj, projIdx) => {
            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-[#0B192C]/5 group overflow-hidden transition-all duration-300"
              >
                {/* 1. LEFT DARK PANEL - Slides from far left with blur-to-sharp transition */}
                <motion.div
                  initial={{ x: -160, opacity: 0, filter: "blur(8px)" }}
                  whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="lg:col-span-4 bg-[#0B192C] text-[#FAF9F6] p-8 flex flex-col justify-between relative overflow-hidden min-h-[220px] lg:min-h-full"
                  id={`project-left-panel-${proj.id}`}
                >
                  {/* Absolute context-rich overlay tech image */}
                  <div className="absolute inset-0 z-0 opacity-12 group-hover:opacity-22 group-hover:scale-105 transition-all duration-700 pointer-events-none">
                    <img
                      src={getProjectImgUrl(proj.id)}
                      alt={proj.title}
                      className="w-full h-full object-cover filter grayscale"
                      referrerPolicy="no-referrer"
                    />
                    {/* Inner custom dark vignette */}
                    <div className="absolute inset-0 bg-[#0B192C]/70 mix-blend-multiply" />
                  </div>

                  {/* Glowing amber hover ring */}
                  <div className="absolute inset-x-0 -bottom-10 h-32 bg-[#C5A85C]/10 group-hover:bg-[#C5A85C]/25 group-hover:scale-110 blur-xl transition-all duration-500 rounded-full pointer-events-none z-0" />

                  <div className="relative z-10">
                    <span className="font-mono text-[10px] text-[#C5A85C] font-black tracking-widest uppercase block mb-3">
                      PROJECT 0{projIdx + 1}
                    </span>
                    <motion.div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A85C] mb-6">
                      <FolderGit className="w-6 h-6" />
                    </motion.div>
                    <span className="font-mono text-[10px] text-[#FAF9F6]/50 uppercase tracking-wider block">
                      SYSTEM ARCHITECTURE
                    </span>
                    <span className="font-display font-medium text-xs text-[#C5A85C]">
                      {proj.type}
                    </span>
                  </div>

                  <div className="relative z-10 border-t border-white/10 pt-4 mt-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#FAF9F6]/40">
                      {proj.duration}
                    </span>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#C5A85C] hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                        id={`project-github-link-${proj.id}`}
                      >
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* 2. RIGHT PANEL - Fades in at opacity 0 with 0.3s delay plus child stagger */}
                <motion.div
                  variants={rightContentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between"
                  id={`project-right-panel-${proj.id}`}
                >
                  <div>
                    {/* Title with expanded letter-spacing on hover */}
                    <motion.h3
                      className="text-2xl sm:text-3xl font-display font-extrabold text-[#0B192C] mb-2 cursor-default uppercase tracking-tight group-hover:tracking-wide transition-all duration-500"
                      id={`project-title-${proj.id}`}
                    >
                      {proj.title}
                    </motion.h3>

                    <p className="text-sm font-sans text-[#0B192C]/80 leading-relaxed mb-6" id={`project-desc-${proj.id}`}>
                      {proj.description}
                    </p>

                    {/* Outcome Metric Cards (dealt card pop-in sequentially) */}
                    <div className="mb-6">
                      <h4 className="font-display font-bold text-xs text-[#0B192C] uppercase tracking-widest mb-3.5 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[#C5A85C]" />
                        Key Outbound Outcomes
                      </h4>
                      <div className="grid grid-cols-1 gap-3.5" id={`project-outcomes-${proj.id}`}>
                        {proj.keyOutcomes.map((outcome, oIdx) => (
                          <motion.div
                            key={oIdx}
                            variants={outcomeVariants}
                            viewport={{ once: true }}
                            className="flex items-start gap-4 p-4 bg-[#FAF9F6] rounded-xl border border-[#0B192C]/5 hover:border-[#C5A85C]/20 transition-all shadow-sm"
                            id={`outcome-box-${proj.id}-${oIdx}`}
                          >
                            <span className="w-6 h-6 shrink-0 rounded bg-[#0B192C] text-[#C5A85C] flex items-center justify-center font-mono text-xs font-black">
                              {oIdx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 leading-relaxed">
                              {outcome}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Technology Pills: Bounces with rubber-band elastic effects + hover shimmers */}
                  <div className="border-t border-[#0B192C]/5 pt-5 mt-4">
                    <h5 className="font-mono text-[10px] text-[#C5A85C] uppercase tracking-widest font-black mb-3.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      DEPLOYMENT PLATFORM & TECH STACK
                    </h5>
                    <div className="flex flex-wrap gap-2" id={`project-tech-${proj.id}`}>
                      {proj.technologies.map((tech, techIdx) => (
                        <motion.span
                          key={techIdx}
                          variants={techTagVariants}
                          whileHover={{ y: -2, z: 10, transition: { duration: 0.1 } }}
                          viewport={{ once: true }}
                          className="px-3.5 py-1.5 rounded-full bg-[#0B192C]/5 text-[#0B192C] font-mono text-[11px] font-bold border border-[#0B192C]/10 cursor-default hover:bg-[#C5A85C] hover:text-[#FAF9F6] hover:border-transparent hover:shadow-md transition-all duration-200"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
