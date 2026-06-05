import React, { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, ChevronRight } from "lucide-react";
import { EDUCATION_LIST } from "../data";

export default function Education() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Extend education dataset with Cloud & Autodidact track to satisfy card-pair motions
  const extendedEducation = [
    {
      ...EDUCATION_LIST[0],
      id: "edu_1",
      iconType: "cap"
    },
    {
      id: "edu_2",
      qualification: "Enterprise Systems & OCI Cloud Mastery",
      institution: "Self-Directed Specialty Deep Dive",
      duration: "2024 - 2025",
      mode: "Independent Certification",
      highlights: [
        "Qualified Multiple professional certifications across Google Cloud, Oracle Cloud Infrastructure (OCI).",
        "Mastered advanced Java microservice caching mechanisms and JWT/OAuth backend auth gateways.",
        "Engineered multiple personal full-stack projects using Supabase, OpenAI, Redis, and LangChain."
      ],
      iconType: "cloud"
    }
  ];

  // Bullet reveal animations from left-to-right
  const bulletContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.6
      }
    }
  };

  const bulletTextVariants = {
    hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      id="education"
      className="py-24 px-6 bg-[#F5F2EB] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-[#C5A85C]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-5 w-80 h-80 rounded-full bg-[#0B192C]/5 blur-2xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            05 / Academic Pedigree
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            Education
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        {/* Simultaneous opposite entrance grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" id="education-dual-cards">
          {extendedEducation.map((edu, eIdx) => {
            const isFirst = eIdx === 0;

            // First Card: Drops from above with a rotation, snaps flat
            // Second Card: Rises from below simultaneously
            const entryVariants = isFirst
              ? {
                  hidden: { y: -150, rotate: -4, opacity: 0 },
                  visible: { y: 0, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 14 } }
                }
              : {
                  hidden: { y: 150, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 14 } }
                };

            return (
              <motion.div
                key={edu.id}
                variants={entryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                onMouseEnter={() => setHoveredCard(edu.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#0B192C]/5 shadow-xl overflow-hidden transition-shadow duration-300"
                id={`education-card-${edu.id}`}
              >
                {/* SVG Tracing Outline Border hover effect */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    rx="14"
                    fill="none"
                    stroke="#C5A85C"
                    strokeWidth="2.5"
                    strokeDasharray="1400"
                    strokeDashoffset={hoveredCard === edu.id ? "0" : "1400"}
                    className="transition-all duration-[1200ms] ease-out"
                  />
                </svg>

                <div>
                  {/* Top line - Icon & Duration */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    {/* Cap Icon toss up-and-rotates slightly on hover */}
                    <div className="w-12 h-12 bg-[#0B192C] text-[#C5A85C] rounded-xl flex items-center justify-center border border-[#C5A85C]/30 shadow-md">
                      {edu.iconType === "cap" ? (
                        <motion.div
                          animate={hoveredCard === edu.id ? { y: -5, rotate: -15 } : { y: 0, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <GraduationCap className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={hoveredCard === edu.id ? { y: -5, rotate: 15 } : { y: 0, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <BookOpen className="w-6 h-6" />
                        </motion.div>
                      )}
                    </div>

                    <span className="font-mono text-xs font-black text-[#C5A85C] bg-[#0B192C]/5 px-3 py-1.5 rounded-full border border-[#0B192C]/5 shadow-inner">
                      {edu.duration}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="mb-6">
                    <span className="font-mono text-[9px] text-[#C5A85C] uppercase tracking-widest font-black block mb-1">
                      {edu.mode}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#0B192C] tracking-tight leading-tight mb-2">
                      {edu.qualification}
                    </h3>
                    <h4 className="font-display font-bold text-sm text-[#0B192C]/75">
                      {edu.institution}
                    </h4>
                  </div>

                  {/* Highlights Bullet draws left-to-right (typewriter reveal style) */}
                  <motion.div
                    variants={bulletContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border-t border-[#0B192C]/5 pt-5 mb-4"
                  >
                    <span className="text-[10px] font-mono text-[#0B192C]/50 uppercase tracking-widest block mb-3.5">
                      Academic Focus Highlights
                    </span>
                    <ul className="space-y-3" id={`education-details-list-${edu.id}`}>
                      {edu.highlights.map((hlt, hIdx) => (
                        <motion.li
                          key={hIdx}
                          variants={bulletTextVariants}
                          className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-[#0B192C]/80 leading-relaxed"
                        >
                          <ChevronRight className="w-4 h-4 text-[#C5A85C] mt-0.5 shrink-0" />
                          <span>{hlt}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Card footer details */}
                <div className="border-t border-[#0B192C]/5 pt-4 mt-auto flex items-center justify-between">
                  {isFirst ? (
                    <span className="font-mono text-[10px] font-bold text-[#0B192C] bg-[#C5A85C]/25 px-2.5 py-1 rounded-md">
                      CGPA: 7.79 / 10.0
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] font-bold text-[#FAF9F6] bg-[#0B192C] px-2.5 py-1 rounded-md">
                      OCI Certified
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-[#0B192C]/30 uppercase">
                    CREDENTIAL SECURED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
