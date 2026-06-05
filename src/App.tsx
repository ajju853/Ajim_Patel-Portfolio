import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import ResumePreview from "./components/ResumePreview";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [activeSection, setActiveSection] = useState("landing");
  const [isInitializing, setIsInitializing] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track scrolling status to sync the navigation highlight active states in real time
  useEffect(() => {
    const sectionIds = [
      "landing",
      "about",
      "experience",
      "resume-section",
      "projects",
      "skills",
      "education",
      "certifications",
      "achievements",
      "contact"
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }

      // Progress bar calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Back to top button visibility check
      setShowBackToTop(window.scrollY > window.innerHeight * 0.65);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`relative min-h-screen bg-[#FAF9F6] selection:bg-[#C5A85C] selection:text-[#0B192C] ${isInitializing ? "overflow-hidden h-screen" : ""}`}>
      {/* Thin color-changing scroll progress bar at the very top of the viewport */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-[#C5A85C] via-amber-400 to-emerald-500 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      {/* Dynamic full-screen loader layout */}
      <AnimatePresence mode="wait">
        {isInitializing && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen onComplete={() => setIsInitializing(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorative Mesh Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#C5A85C]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-[#0B192C]/10 to-transparent blur-[120px]" />
      </div>

      {/* Floating Sparkle Elements across background */}
      <div className="fixed top-20 right-10 pointer-events-none z-0 hover:rotate-12 transition-transform opacity-30">
        <svg className="w-8 h-8 text-[#C5A85C]" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1.5" />
          <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
        </svg>
      </div>
      <div className="fixed bottom-40 left-12 pointer-events-none z-0 opacity-20">
        <svg className="w-6 h-6 text-[#0B192C]" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1" />
          <path d="M12 3L13.2 8.5L18.7 9.7L13.2 10.9L12 16.4L10.8 10.9L5.3 9.7L10.8 8.5L12 3Z" />
        </svg>
      </div>

      {/* Glass Top Header Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Main Single Page Sections Deck */}
      <main className="relative z-10 w-full" id="main-content">
        <Landing />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <AboutMe />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Experience />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <ResumePreview />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Projects />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Skills />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Education />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Certifications />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Achievements />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Contact />
        </motion.div>
      </main>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            whileHover={{ scale: 1.1 }}
            whileActive={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#0B192C] text-[#C5A85C] hover:text-[#FAF9F6] border border-[#C5A85C]/30 hover:border-[#C5A85C] shadow-2xl cursor-pointer flex items-center justify-center transition-all group"
            id="btn-back-to-top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
