import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Linkedin, Github, Sun, Moon } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface NavigationProps {
  activeSection: string;
}

const SECTIONS = [
  { id: "landing", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" }
];

export default function Navigation({ activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF9F6]/85 backdrop-blur-md shadow-sm border-b border-[#C5A85C]/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Initial */}
          <button
            onClick={() => scrollToSection("landing")}
            className="group flex items-center gap-3 cursor-pointer"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center text-[#C5A85C] font-display font-bold text-lg border border-[#C5A85C]/30 group-hover:border-[#C5A85C] transition-colors shadow-sm">
              {PERSONAL_INFO.logoInitials}
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-[#0B192C] font-display font-bold text-sm tracking-tight leading-none">
                {PERSONAL_INFO.fullName}
              </span>
              <span className="text-[10px] font-mono text-[#C5A85C] tracking-widest leading-none">
                SOFTWARE ENGINEER
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  id={`nav-link-${sec.id}`}
                  className={`relative px-3.5 py-1.5 rounded-md font-display text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                    isActive ? "text-[#FAF9F6]" : "text-[#0B192C]/80 hover:text-[#0B192C]"
                  }`}
                >
                  <span className="relative z-10">{sec.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#0B192C] rounded-md -z-1"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Social Links */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F5F2EB]/80 border border-[#C5A85C]/20 hover:border-[#C5A85C]/50 transition-all cursor-pointer flex items-center justify-center shadow-sm"
              aria-label="Toggle theme mode"
              id="theme-toggler-btn"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#C5A85C] animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-[#0B192C]" />
              )}
            </button>

            <div className="flex items-center gap-3 border-r border-[#C5A85C]/20 pr-4">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0B192C]/70 hover:text-[#C5A85C] transition-colors p-1"
                aria-label="GitHub Profile"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0B192C]/70 hover:text-[#C5A85C] transition-colors p-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              id="nav-cta-desktop"
              className="group flex items-center gap-1 bg-[#C5A85C] hover:bg-[#0B192C] text-[#FAF9F6] px-4 py-2 rounded-md font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-nav-toggle"
            className="lg:hidden text-[#0B192C] p-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#FAF9F6] border-l border-[#C5A85C]/20 shadow-2xl p-6 pt-24 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-[#C5A85C] uppercase tracking-widest border-b border-[#C5A85C]/20 pb-2">
                  Navigation Menu
                </span>
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      id={`nav-link-mobile-${sec.id}`}
                      className={`text-left px-3 py-2 rounded-lg font-display text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-[#0B192C] text-[#FAF9F6]"
                          : "text-[#0B192C]/80 hover:bg-[#F5F2EB]"
                      }`}
                    >
                      <span>{sec.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C5A85C]" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                {/* Mobile Theme Toggle Row */}
                <div className="flex items-center justify-between p-3 bg-[#F5F2EB]/50 rounded-xl border border-[#C5A85C]/20 mb-2">
                  <span className="font-display text-xs font-bold text-[#0B192C] uppercase tracking-wider">
                    {theme === "dark" ? "Dark Theme" : "Light Theme"}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-[#0B192C] text-[#C5A85C] transition-all cursor-pointer flex items-center justify-center shadow-sm"
                    aria-label="Toggle mobile theme mode"
                    id="theme-toggler-mobile-btn"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 text-[#C5A85C]" />
                    ) : (
                      <Moon className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => scrollToSection("contact")}
                  id="nav-cta-mobile"
                  className="w-full flex items-center justify-center gap-2 bg-[#C5A85C] hover:bg-[#0B192C] text-[#FAF9F6] py-3 rounded-lg font-display font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Hire Me Now
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="text-center font-mono text-[9px] text-[#0B192C]/40">
                  Copyright © 2026 Ajim Patel
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
