import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Server, Cloud, ShieldCheck, Sparkles } from "lucide-react";
import { SKILLS_LIST } from "../data";

// Custom component to handle counting up numbers in sync with bar animations
function CountUpNumber({ value, startAnimation }: { value: number; startAnimation: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    let start = 0;
    const duration = 1000; // 1s
    const stepTime = Math.abs(Math.floor(duration / value));
    
    const timer = setInterval(() => {
      start += 1;
      setCurrent(start);
      if (start >= value) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, startAnimation]);

  return <span className="font-mono text-xs font-bold text-[#C5A85C]">{current}%</span>;
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "skill_cat_1":
        return <Server className="w-5 h-5 text-[#C5A85C]" />;
      case "skill_cat_2":
        return <Cloud className="w-5 h-5 text-[#C5A85C]" />;
      case "skill_cat_3":
        return <ShieldCheck className="w-5 h-5 text-[#C5A85C]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C5A85C]" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 bg-[#FAF9F6] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#C5A85C]/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-96 h-96 rounded-full bg-[#0B192C]/5 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            04 / Technical Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            Professional Skills & Proficiency
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          id="skills-categories-grid"
        >
          {SKILLS_LIST.map((cat) => {
            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                id={`skill-category-${cat.id}`}
                className="group bg-[#F5F2EB] rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl border border-[#0B192C]/5 hover:border-[#C5A85C]/30 relative transition-all duration-300"
              >
                {/* Subtle soft gold tint overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-[#C5A85C]/0 group-hover:bg-[#C5A85C]/[0.02] pointer-events-none transition-colors duration-300" />

                {/* Header: Category Title + Icon (slow spins 360 on hover) */}
                <div className="flex items-center justify-between gap-4 border-b border-[#0B192C]/10 pb-4 mb-6">
                  <h3 className="text-base sm:text-lg font-display font-black text-[#0B192C] uppercase tracking-wide">
                    {cat.category}
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center border border-[#C5A85C]/35 shadow-sm group-hover:rotate-[360deg] transition-all duration-[1000ms] ease-out">
                    {getCategoryIcon(cat.id)}
                  </div>
                </div>

                {/* Progress bars inside current category */}
                <div className="space-y-5" id={`category-skills-${cat.id}`}>
                  {cat.skills.map((skill, sIdx) => {
                    return (
                      <div key={sIdx} className="space-y-1.5" id={`progressbar-wrapper-${cat.id}-${sIdx}`}>
                        <div className="flex justify-between items-center gap-4">
                          <span className="font-display font-bold text-xs sm:text-sm text-[#0B192C]/90">
                            {skill.name}
                          </span>
                          <CountUpNumber value={skill.level} startAnimation={isInView} />
                        </div>

                        {/* Progress Bar Track */}
                        <div className="w-full h-2.5 bg-[#FAF9F6] rounded-full overflow-hidden border border-[#0B192C]/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#0B192C] to-[#C5A85C] rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
