import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, Award, Flame, Hourglass, Sparkles } from "lucide-react";
import { ACHIEVEMENTS_LIST, STATS } from "../data";

// Custom odometer/loader for stat counts
function StatCounter({ targetValue, index }: { targetValue: string; index: number }) {
  const [displayVal, setDisplayVal] = useState("0");

  useEffect(() => {
    // If targetValue is like "1+" or "60%" or basic digit:
    const containsPlus = targetValue.includes("+");
    const containsPercent = targetValue.includes("%");
    const numericOnly = parseInt(targetValue.replace(/[^\d]/g, ""));

    if (isNaN(numericOnly)) {
      setDisplayVal(targetValue);
      return;
    }

    let start = 0;
    const duration = 1200; // 1.2s length
    const stepTime = Math.max(Math.floor(duration / numericOnly), 15);

    const timer = setInterval(() => {
      start += 1;
      if (start >= numericOnly) {
        clearInterval(timer);
        setDisplayVal(targetValue);
      } else {
        setDisplayVal(`${start}${containsPlus ? "+" : ""}${containsPercent ? "%" : ""}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div className="text-center group-hover:scale-105 transition-transform" id={`stat-counter-box-${index}`}>
      <span className="block text-4xl sm:text-5xl font-display font-extrabold text-[#C5A85C] tracking-tight leading-none mb-2">
        {displayVal}
      </span>
    </div>
  );
}

export default function Achievements() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Zoom-in vector mapping for achievement cards
  const cardZoomVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
        mass: 0.8
      }
    }
  };

  const getAchievementIcon = (category: string) => {
    switch (category.toUpperCase()) {
      case "PROFESSIONAL":
        return <Trophy className="w-5 h-5 text-[#C5A85C]" />;
      case "ACADEMIC":
        return <Award className="w-5 h-5 text-[#C5A85C]" />;
      default:
        return <Flame className="w-5 h-5 text-[#C5A85C]" />;
    }
  };

  return (
    <section
      id="achievements"
      className="py-24 px-6 bg-[#F5F2EB] relative overflow-hidden"
    >
      {/* Dynamic Keyframe Injection for the Ken Burns panning effects */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
          50% { transform: scale(1.12) translate(-4%, -2%) rotate(0.5deg); }
          100% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
        }
        .kenburns-bg {
          animation: kenburns 22s infinite ease-in-out;
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-20 w-80 h-80 rounded-full bg-[#C5A85C]/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#0B192C]/5 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            07 / Milestones & Outcomes
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            Achievements & Recognition
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        {/* 1. TOP LINE - STAT COUNTERS (Dynamic counter reveals) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-b border-[#0B192C]/10 pb-12" id="stats-telemetry-deck">
          {STATS.map((stat, sIdx) => (
            <div
              key={sIdx}
              className="bg-[#0B192C] border-2 border-[#C5A85C]/35 rounded-2xl p-6 shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-[#C5A85C] transition-all duration-300"
              id={`stat-telemetry-box-${sIdx}`}
            >
              {/* Decorative radial overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,92,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <StatCounter targetValue={stat.value} index={sIdx} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FAF9F6]/60 group-hover:text-[#C5A85C] transition-colors mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* 2. LOWER DECK - ACHIEVEMENT ITEMS (Zoom in scale 0.7 -> 1 with bounce easing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="achievements-cards-grid">
          {ACHIEVEMENTS_LIST.map((ach) => {
            return (
              <motion.div
                key={ach.id}
                variants={cardZoomVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                onMouseEnter={() => setHoveredCard(ach.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-[#0B192C]/5 hover:border-[#C5A85C] shadow-lg hover:shadow-2xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between group min-h-[280px]"
                id={`achievement-card-${ach.id}`}
              >
                {/* Ken Burns background effect inside the card */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-[#0B192C] kenburns-bg" />
                </div>

                {/* Golden tracer outline wrapper */}
                <div
                  className={`absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none z-20 transition-all duration-[800ms] ${
                    hoveredCard === ach.id ? "border-[#C5A85C]/50" : "border-transparent"
                  }`}
                />

                <div className="relative z-10">
                  {/* Category Badges Pop and Glow in real time */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B192C] text-[#FAF9F6] border border-[#C5A85C]/30 text-[9px] uppercase font-mono tracking-widest font-black rounded-full shadow">
                      {getAchievementIcon(ach.category)}
                      <span>{ach.category}</span>
                    </div>

                    <span className="font-mono text-xs text-[#0B192C]/50 font-bold">
                      {ach.year}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-[#0B192C] leading-snug tracking-tight mb-2.5 group-hover:text-[#C5A85C] transition-colors pr-4">
                    {ach.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#0B192C]/80 leading-relaxed max-w-lg mb-6">
                    {ach.description}
                  </p>
                </div>

                {/* Card Floor details */}
                <div className="relative z-10 border-t border-[#0B192C]/5 pt-4 flex justify-between items-center mt-auto">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono text-[#0B192C]/40 uppercase tracking-wider block leading-none">
                      AWARDED BY
                    </span>
                    <span className="text-xs font-display font-bold text-[#0B192C] mt-1">
                      {ach.institution}
                    </span>
                  </div>

                  {/* Quantitative overlay highlighting */}
                  {ach.statsValue && (
                    <div
                      className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all duration-300 ${
                        hoveredCard === ach.id
                          ? "bg-[#C5A85C] text-[#0B192C] border-transparent shadow-md scale-105"
                          : "bg-[#0B192C]/5 text-[#0B192C] border-[#0B192C]/10"
                      }`}
                      id={`ach-metric-pill-${ach.id}`}
                    >
                      {ach.statsLabel}: <span className="font-black">{ach.statsValue}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
