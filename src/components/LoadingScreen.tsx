import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Cpu, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const SYSTEM_TASKS = [
  "Initializing premium assets & styles...",
  "Loading portfolio data matrix...",
  "Synthesizing system telemetry...",
  "Syncing cloud services stream...",
  "Ready to launch portfolio."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
  const [theme, setTheme] = useState("light");

  // Load theme preference cleanly to match outer backgrounds instantly and avoid a flash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const persistedTheme = localStorage.getItem("theme") || "light";
      setTheme(persistedTheme);
    }
  }, []);

  // Update loading progress and sequence system tasks dynamically
  useEffect(() => {
    const totalDuration = 750; // Snappy fast total loading time (ms)
    const intervalTime = 25;
    const increment = (100 / totalDuration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Wait a tiny moment at 100% for human eye satisfaction
          setTimeout(() => {
            onComplete();
          }, 250);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Handle system text cycling
  useEffect(() => {
    if (progress >= 100) {
      setCurrentTaskIdx(SYSTEM_TASKS.length - 1);
      return;
    }
    const idx = Math.min(
      Math.floor((progress / 100) * SYSTEM_TASKS.length),
      SYSTEM_TASKS.length - 2
    );
    setCurrentTaskIdx(idx);
  }, [progress]);

  // Select matching ambient colors inside loader
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[#07111E]" : "bg-[#FAF9F6]";
  const textClass = isDark ? "text-[#FAF9F6]" : "text-[#0B192C]";
  const subtextClass = isDark ? "text-slate-400" : "text-slate-500";
  const borderClass = isDark ? "border-white/10" : "border-[#0B192C]/10";
  const elementBgClass = isDark ? "bg-[#112235]" : "bg-white";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${bgClass} transition-colors duration-300 p-6`}
      id="portfolio-initialization-loading-screen"
    >
      {/* Absolute decorative star matrix backdrops */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#C5A85C]/5 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center">
        {/* Sleek rotating gold emblem */}
        <div className="relative mb-8" id="loader-emblem-wrapper">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="w-20 h-20 rounded-full border border-dashed border-[#C5A85C] flex items-center justify-center relative shadow-inner"
          >
            {/* Pulsing visual core */}
            <motion.div
              animate={{ scale: [0.95, 1.1, 0.95] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className={`w-14 h-14 rounded-full ${elementBgClass} border border-[#C5A85C]/35 flex items-center justify-center shadow-lg`}
            >
              <Cpu className="w-6 h-6 text-[#C5A85C]" />
            </motion.div>
          </motion.div>

          {/* Tiny orbit dot indicator */}
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#C5A85C] border-2 border-white dark:border-[#07111E] animate-ping" />
        </div>

        {/* Textual branding */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-display text-2xl font-black uppercase tracking-widest ${textClass}`}
          >
            AJIM PATEL
          </motion.h1>
          <span className="font-mono text-[9px] text-[#C5A85C] font-semibold tracking-widest uppercase block mt-1">
            Enterprise Developer Portfolio
          </span>
        </div>

        {/* Console loading panel */}
        <div
          className={`w-full ${elementBgClass} border ${borderClass} rounded-2xl p-4 shadow-xl mb-6 relative overflow-hidden`}
        >
          {/* Header row resembling custom tab */}
          <div className="flex items-center justify-between border-b border-dashed border-[#C5A85C]/20 pb-2 mb-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#C5A85C]">
              <Terminal className="w-3.5 h-3.5" />
              <span>SYSTEM INITIALIZATION</span>
            </div>
            <span className="font-mono text-[10px] font-bold text-[#C5A85C]">
              {Math.min(Math.floor(progress), 100)}%
            </span>
          </div>

          {/* Task log row */}
          <div className="h-6 flex items-center justify-start overflow-hidden">
            <motion.p
              key={currentTaskIdx}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-mono text-[11px] text-left leading-none tracking-tight flex items-center gap-2 w-full"
            >
              <Loader2 className="w-3 h-3 text-[#C5A85C] animate-spin shrink-0" />
              <span className={`truncate ${subtextClass}`}>
                {SYSTEM_TASKS[currentTaskIdx]}
              </span>
            </motion.p>
          </div>

          {/* Core progress meter */}
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#C5A85C] to-emerald-500 rounded-full"
            />
          </div>
        </div>

        {/* Extra minimal foot details */}
        <p className="font-mono text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          ESTABLISHING PORT PORTFOLIO VIRTUAL STACK
        </p>
      </div>
    </div>
  );
}
