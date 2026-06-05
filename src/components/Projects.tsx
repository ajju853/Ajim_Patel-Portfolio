import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, FolderGit, Cpu, Layers, X, Calendar, ArrowRight, Eye } from "lucide-react";
import { PROJECTS_LIST } from "../data";
import { Project } from "../types";
import GithubCalendar from "./GithubCalendar";

const getProjectImgUrl = (id: string) => {
  switch (id) {
    case "proj_1":
      return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=600&h=800&q=80"; // Java / Developer Integration Coding Stack
    case "proj_kafka":
      return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fit=crop&w=600&h=800&q=80"; // Kafka event cluster data stream
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

const PROJECT_CATEGORIES: Record<string, string[]> = {
  proj_1: ["Backend", "Cloud"],
  proj_kafka: ["Backend", "Cloud", "Open Source"],
  proj_2: ["Backend"],
  proj_3: ["Backend", "Open Source"],
  proj_4: ["Cloud"]
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<"All" | "Backend" | "Cloud" | "Open Source">("All");

  const filteredProjects = PROJECTS_LIST.filter((proj) => {
    if (activeCategory === "All") return true;
    return (PROJECT_CATEGORIES[proj.id] || []).includes(activeCategory);
  });

  // Prevent scroll propagation when project modal is in view
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Container for child stagger actions
  const rightContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
      className="py-24 px-6 bg-[#F5F2EB] dark:bg-[#0A1828] relative overflow-hidden transition-colors duration-300"
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
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] dark:text-[#FAF9F6] tracking-tight">
            Personal Projects
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
          <p className="text-xs font-mono text-[#0B192C]/50 dark:text-[#FAF9F6]/40 mt-3 text-center uppercase tracking-wider">
            * Click any card to launch a full architectural deep-dive analysis
          </p>
        </div>

        {/* Category Filters Switches */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-14" id="projects-category-filters">
          {(["All", "Backend", "Cloud", "Open Source"] as const).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${
                  isActive
                    ? "bg-[#0B192C] text-[#C5A85C] border border-[#C5A85C]/30 scale-102"
                    : "bg-white dark:bg-[#112235] text-[#0B192C]/80 dark:text-[#FAF9F6]/85 hover:bg-[#0B192C]/5 dark:hover:bg-white/5 border border-[#0B192C]/5 dark:border-white/10"
                }`}
                id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-12" id="projects-grid">
          {filteredProjects.map((proj) => {
            const projIdx = PROJECTS_LIST.findIndex(p => p.id === proj.id);
            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                onClick={() => setSelectedProject(proj)}
                className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#112235] rounded-3xl shadow-xl hover:shadow-2xl border border-[#0B192C]/5 dark:border-white/10 group overflow-hidden transition-all duration-300 cursor-pointer hover:border-[#C5A85C]/40"
              >
                {/* 1. LEFT PANEL */}
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
                      className="w-full h-full object-cover filter grayscale aspect-[3/4]"
                      loading="lazy"
                      width={600}
                      height={800}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#0B192C]/70 mix-blend-multiply" />
                  </div>

                  <div className="absolute inset-x-0 -bottom-10 h-32 bg-[#C5A85C]/10 group-hover:bg-[#C5A85C]/25 group-hover:scale-110 blur-xl transition-all duration-500 rounded-full pointer-events-none z-0" />

                  <div className="relative z-10">
                    <span className="font-mono text-[10px] text-[#C5A85C] font-black tracking-widest uppercase block mb-3">
                      PROJECT 0{projIdx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A85C] mb-6">
                      <FolderGit className="w-6 h-6" />
                    </div>
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
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[#C5A85C] hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                        id={`project-github-link-${proj.id}`}
                      >
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* 2. RIGHT PANEL */}
                <motion.div
                  variants={rightContentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between"
                  id={`project-right-panel-${proj.id}`}
                >
                  <div>
                    {/* Title with expand on hover */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3
                        className="text-2xl sm:text-3xl font-display font-extrabold text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-tight group-hover:text-[#C5A85C] transition-colors duration-300"
                        id={`project-title-${proj.id}`}
                      >
                        {proj.title}
                      </h3>
                      <div className="p-2 rounded-lg bg-[#FAF9F6] dark:bg-[#0B1E33] border border-[#0B192C]/5 dark:border-white/10 text-[#C5A85C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm shrink-0">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/85 leading-relaxed mb-6" id={`project-desc-${proj.id}`}>
                      {proj.description}
                    </p>

                    {/* Outcome Metric Cards */}
                    <div className="mb-6">
                      <h4 className="font-display font-bold text-xs text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-widest mb-3.5 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[#C5A85C]" />
                        Key Outbound Outcomes
                      </h4>
                      <div className="grid grid-cols-1 gap-3.5" id={`project-outcomes-${proj.id}`}>
                        {proj.keyOutcomes.slice(0, 2).map((outcome, oIdx) => (
                          <div
                            key={oIdx}
                            className="flex items-start gap-4 p-4 bg-[#FAF9F6] dark:bg-[#0B1E33] rounded-xl border border-[#0B192C]/5 dark:border-white/5 transition-all shadow-sm"
                            id={`outcome-box-${proj.id}-${oIdx}`}
                          >
                            <span className="w-6 h-6 shrink-0 rounded bg-[#0B192C] dark:bg-[#C5A85C] text-[#C5A85C] dark:text-[#0B192C] flex items-center justify-center font-mono text-xs font-black">
                              {oIdx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/80 leading-relaxed">
                              {outcome}
                            </p>
                          </div>
                        ))}
                        {proj.keyOutcomes.length > 2 && (
                          <p className="text-[10px] font-mono font-bold text-[#C5A85C]/90 uppercase tracking-widest pl-1 mt-1">
                            + {proj.keyOutcomes.length - 2} more high impact outcome(s) inside analysis
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Technology Pills */}
                  <div className="border-t border-[#0B192C]/5 dark:border-white/10 pt-5 mt-4">
                    <h5 className="font-mono text-[10px] text-[#C5A85C] uppercase tracking-widest font-black mb-3.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      DEPLOYMENT PLATFORM & TECH STACK
                    </h5>
                    <div className="flex flex-wrap gap-2" id={`project-tech-${proj.id}`}>
                      {proj.technologies.slice(0, 5).map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3.5 py-1.5 rounded-full bg-[#0B192C]/5 dark:bg-white/5 text-[#0B192C] dark:text-[#FAF9F6]/90 font-mono text-[11px] font-bold border border-[#0B192C]/10 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 5 && (
                        <span className="px-3 py-1.5 rounded-full bg-[#C5A85C]/15 text-[#C5A85C] font-mono text-[10px] font-extrabold border border-[#C5A85C]/35">
                          + {proj.technologies.length - 5} MORE
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* GitHub Calendar Visualization Widget */}
        <GithubCalendar />
      </div>

      {/* PORTFOLIO PROJECT DETAIL MODAL WINDOW */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="project-modal-mask">
            {/* Soft semi-blind glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#112235] border border-[#C5A85C]/35 rounded-3xl shadow-2xl z-10 p-6 sm:p-10 scrollbar-thin scrollbar-thumb-gold-satin scrollbar-track-ivory"
              id="project-modal-body"
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-[#0B192C] dark:bg-[#FAF9F6] text-[#C5A85C] dark:text-[#0B192C] hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-lg z-50"
                id="btn-close-project-modal"
                aria-label="Close project modal view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Decoration Accent */}
              <div className="absolute top-0 left-0 w-2 h-24 bg-gradient-to-b from-[#C5A85C] to-transparent rounded-tr-xl pointer-events-none" />

              {/* Upper Section Summary details */}
              <div className="mb-8 border-b border-[#0B192C]/5 dark:border-white/10 pb-6 pr-8">
                <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A85C] tracking-widest font-black uppercase block mb-1">
                  ARCHITECTURAL ANALYSIS CASE STUDY
                </span>
                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#0B192C] dark:text-[#FAF9F6]/95 uppercase tracking-tight">
                  {selectedProject.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 mt-4 text-[11px] font-mono text-[#0B192C]/60 dark:text-[#FAF9F6]/60">
                  <div className="flex items-center gap-1.5 bg-[#FAF9F6] dark:bg-[#0B1E33] px-3 py-1.5 rounded-lg border border-[#0B192C]/5 dark:border-white/5">
                    <span className="w-2 h-2 rounded-full bg-[#C5A85C]" />
                    <span className="font-semibold text-[#0B192C] dark:text-[#FAF9F6]/90">{selectedProject.type}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#FAF9F6] dark:bg-[#0B1E33] px-3 py-1.5 rounded-lg border border-[#0B192C]/5 dark:border-white/5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A85C]" />
                    <span>{selectedProject.duration}</span>
                  </div>
                </div>
              </div>

              {/* High density paragraphs description */}
              <div className="mb-8 md:grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4 rounded-2xl bg-[#0B192C] p-6 text-[#FAF9F6] h-full flex flex-col justify-between relative overflow-hidden mb-6 md:mb-0">
                  <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                    <img 
                      src={getProjectImgUrl(selectedProject.id)} 
                      alt="" 
                      className="w-full h-full object-cover filter blur aspect-[3/4]"
                      loading="lazy"
                      width={600}
                      height={800}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="relative z-10 flex flex-col gap-4 h-full justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#C5A85C] uppercase tracking-widest font-black block mb-2">Target Client Base</span>
                      <p className="text-sm font-sans tracking-tight leading-relaxed text-white/90">
                        Automated high reliability pipelines optimized for production client operations.
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-6">
                      <span className="font-mono text-[9px] text-[#C5A85C] uppercase tracking-widest font-black block mb-2">Database Layer</span>
                      <strong className="block text-xs font-mono uppercase text-white">Relational / Isolated Storage</strong>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <h4 className="font-display font-black text-xs text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-widest mb-3.5 pl-1">
                    Introduction & Objective
                  </h4>
                  <p className="text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/85 leading-relaxed bg-[#FAF9F6] dark:bg-[#0B1E33] p-5 rounded-2xl border border-[#0B192C]/5 dark:border-white/5">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Complete Key Outbound Outcomes List */}
              <div className="mb-8">
                <h4 className="font-display font-black text-xs text-[#0B192C] dark:text-[#FAF9F6] uppercase tracking-widest mb-4 flex items-center gap-2 pl-1">
                  <Cpu className="w-4 h-4 text-[#C5A85C]" />
                  Verified Engineering Outcomes ({selectedProject.keyOutcomes.length})
                </h4>
                <div className="grid grid-cols-1 gap-3.5">
                  {selectedProject.keyOutcomes.map((outcome, oIdx) => (
                    <motion.div
                      key={oIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: oIdx * 0.08 }}
                      className="flex items-start gap-4 p-4.5 bg-[#FAF9F6] dark:bg-[#0B1E33] rounded-2xl border border-[#0B192C]/5 dark:border-white/5 shadow-sm"
                    >
                      <span className="w-6.5 h-6.5 shrink-0 rounded bg-[#0B192C] dark:bg-[#C5A85C] text-[#C5A85C] dark:text-[#0B192C] flex items-center justify-center font-mono text-xs font-extrabold shadow-sm">
                        {oIdx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 dark:text-[#FAF9F6]/80 leading-relaxed text-left">
                        {outcome}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* All Technologies Pills Block */}
              <div className="mb-10 border-t border-[#0B192C]/5 dark:border-white/10 pt-6">
                <h4 className="font-mono text-[10px] text-[#C5A85C] uppercase tracking-widest font-black mb-4 flex items-center gap-1.5 pl-1">
                  <Layers className="w-3.5 h-3.5" />
                  FULL REVENUE-GRADE TECHNOLOGIES ORCHESTRATION STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3.5 py-1.5 rounded-full bg-[#0B192C]/5 dark:bg-white/5 text-[#0B192C] dark:text-[#FAF9F6]/90 font-mono text-[11px] font-bold border border-[#0B192C]/10 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer action buttons inside Modal */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3.5 border-t border-[#0B192C]/5 dark:border-white/10 pt-6">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-3 bg-[#FAF9F6] dark:bg-[#0B1E33] hover:bg-[#F5F2EB]/80 dark:hover:bg-white/5 text-[#0B192C] dark:text-[#FAF9F6]/80 rounded-xl font-display text-xs font-semibold uppercase tracking-wider transition-all border border-[#0B192C]/10 dark:border-white/10 cursor-pointer"
                >
                  Dismiss Analysis
                </button>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 bg-[#0B192C] text-white hover:bg-emerald-600 rounded-xl font-display text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-900/10"
                  >
                    <Github className="w-4 h-4" />
                    <span>Browse Github Source</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
