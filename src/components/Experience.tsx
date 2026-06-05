import React from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Building, ChevronRight, Award } from "lucide-react";
import { WORK_EXPERIENCE_LIST } from "../data";

export default function Experience() {
  const isEven = (index: number) => index % 2 === 0;

  // Stagger wrapper for bullet lines
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const bulletVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section
      id="experience"
      className="py-24 px-6 bg-[#FAF9F6] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#0B192C]/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-[#C5A85C]/10 blur-2xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            02 / Work History
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        {/* Experience Timeline Stream */}
        <div className="relative flex flex-col gap-12" id="experience-cards-stream">
          {WORK_EXPERIENCE_LIST.map((exp, index) => {
            const even = isEven(index);

            return (
              <motion.div
                key={exp.id}
                // Custom Slide entry alternating direction
                initial={{ x: even ? -80 : 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                id={`experience-card-${exp.id}`}
                className="group relative bg-[#F5F2EB] rounded-2xl shadow-xl hover:shadow-2xl border border-[#0B192C]/10 hover:border-[#C5A85C]/50 overflow-hidden flex flex-col md:flex-row transition-all duration-300"
              >
                {/* Expanding Left Panel (Curtain opening effect) */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "12px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
                  className="bg-[#0B192C] absolute left-0 top-0 bottom-0 z-10 group-hover:bg-[#C5A85C] transition-colors duration-300"
                  id={`curtain-left-${exp.id}`}
                />

                {/* Main Card Content */}
                <div className="flex-1 p-6 sm:p-8 pl-8 sm:pl-10">
                  {/* Top Bar - Job title, Company, Badges */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#0B192C]/5 pb-5">
                    <div>
                      <div className="flex items-center gap-3.5 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-display font-black text-[#0B192C]">
                          {exp.designation}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0B192C] text-[#FAF9F6] font-mono text-[9px] uppercase tracking-wider font-extrabold group-hover:bg-[#C5A85C] group-hover:text-[#0B192C] transition-colors duration-300" id={`exp-badge-${exp.id}`}>
                          {exp.employmentType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[#0B192C]/80" id={`exp-company-bar-${exp.id}`}>
                        <Building id="company-icon" className="w-4 h-4 text-[#C5A85C] group-hover:animate-pulse" />
                        <span className="font-display font-bold text-[#0B192C]">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col text-left md:text-right gap-1 font-mono text-xs">
                      <div className="font-bold flex items-center gap-1.5 md:justify-end text-[#C5A85C]" id={`exp-duration-${exp.id}`}>
                        <Calendar className="w-3.5 h-3.5 text-[#0B192C]" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="text-[#0B192C]/60 flex items-center gap-1.5 md:justify-end" id={`exp-location-${exp.id}`}>
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body grid: Responsibilities V/S Quantitative Achievements */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Key Responsibilities - Left Column */}
                    <div className="lg:col-span-7 flex flex-col">
                      <h4 className="font-display font-bold text-sm text-[#0B192C] uppercase tracking-wider mb-3">
                        Key Responsibilities
                      </h4>
                      <motion.ul
                        variants={listContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-3"
                      >
                        {exp.keyResponsibilities.map((item, bulletIdx) => (
                          <motion.li
                            key={bulletIdx}
                            variants={bulletVariants}
                            className="flex items-start gap-2.5 text-sm font-sans text-[#0B192C]/80 leading-relaxed"
                          >
                            <ChevronRight className="w-4 h-4 text-[#C5A85C] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    {/* Achievements - Right Column */}
                    <div className="lg:col-span-5 bg-white/40 p-5 rounded-xl border border-[#0B192C]/5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-[#C5A85C]">
                          <Award className="w-5 h-5" />
                          <h4 className="font-display font-bold text-sm text-[#0B192C] uppercase tracking-wider">
                            Quantified Accomplishments
                          </h4>
                        </div>
                        <motion.ul
                          variants={listContainerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="space-y-3"
                        >
                          {exp.keyAchievements.map((ach, achIdx) => (
                            <motion.li
                              key={achIdx}
                              variants={bulletVariants}
                              className="flex items-start gap-2.5 text-sm font-sans text-[#0B192C]/80 leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A85C] shrink-0 mt-2" />
                              <span className="font-medium text-[#0B192C]">
                                {ach}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      {/* Small Bottom Flag */}
                      <div className="border-t border-[#0B192C]/5 pt-3 mt-4 text-[10px] font-mono text-[#0B192C]/40 text-right">
                        VERIFIED · NEXVITECH CORP
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
