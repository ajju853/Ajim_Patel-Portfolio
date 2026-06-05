import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { PERSONAL_INFO } from "../data";
import { generateResumePDF } from "../utils/resumeGenerator";
import { formalProfileBase64 } from "../profile_base64";

export default function Landing() {
  const [logoUrl, setLogoUrl] = useState<string>(formalProfileBase64);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        if (data.formalUrl) {
          setLogoUrl(data.formalUrl);
        } else if (data.casualUrl) {
          setLogoUrl(data.casualUrl);
        }
      })
      .catch((err) => {
        console.warn("Could not retrieve custom logo image:", err);
      });
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 1.0 } // Wait until main text finishes
    }
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 15,
        delay: 1.2 + custom * 0.15 // staggered pop-in
      }
    })
  };

  const handleScrollToSegment = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="landing"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6] to-[#F5F2EB] overflow-hidden"
    >
      {/* Decorative Golden Ambient Rings / Grid Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-[#C5A85C]/10 blur-xl" />
        <div className="absolute bottom-10 right-1/4 w-120 h-120 rounded-full border border-[#0B192C]/5 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B192C]/5 border border-[#0B192C]/10 text-xs text-[#C5A85C] font-mono tracking-widest uppercase font-bold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A85C] animate-pulse" />
          Open for Global Opportunities
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Logo / Initials inside Antigravity container layout */}
          <motion.div
            variants={itemVariants}
            className="w-16 h-16 rounded-2xl bg-[#0B192C] flex items-center justify-center border-2 border-[#C5A85C]/40 shadow-lg mb-6 overflow-hidden"
            id="landing-logo"
          >
            <img
              src={logoUrl}
              alt={PERSONAL_INFO.logoInitials}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Heading - Full Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#0B192C] tracking-tight leading-none mb-4"
            id="landing-fullname"
          >
            {PERSONAL_INFO.fullName}
          </motion.h1>

          {/* Designations */}
          <motion.div
            variants={itemVariants}
            className="text-lg sm:text-2xl font-display font-medium text-[#C5A85C] tracking-wide mb-8 opacity-95 max-w-2xl px-4 text-center leading-relaxed"
            id="landing-designation"
          >
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
              {PERSONAL_INFO.designations.map((des, index) => (
                <span key={des} className="flex items-center">
                  {index > 0 && <span className="text-[#0B192C]/20 mr-3 text-sm">•</span>}
                  <span className="font-semibold">{des}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Introduction Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-[#0B192C]/80 leading-relaxed font-sans max-w-2xl text-center mb-10 px-4"
            id="landing-intro"
          >
            {PERSONAL_INFO.introductionParagraph}
          </motion.p>
        </motion.div>

        {/* CTA Buttons - upward slide and fade in */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16 z-20"
          id="landing-cta-container"
        >
          <button
            onClick={() => handleScrollToSegment("about")}
            className="group flex items-center justify-center gap-2 bg-[#0B192C] hover:bg-[#C5A85C] text-[#FAF9F6] hover:text-[#0B192C] px-6 py-4 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-0.5"
            id="btn-learn-more"
          >
            Learn More About Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
          <button
            onClick={generateResumePDF}
            className="group flex items-center justify-center gap-2 bg-[#FFFDF9] hover:bg-[#0B192C] text-[#0B192C] hover:text-[#FAF9F6] border border-[#C5A85C]/30 hover:border-[#0B192C] px-6 py-4 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer hover:-translate-y-0.5"
            id="btn-download-resume"
          >
            Download Resume
            <Download className="w-4 h-4 text-[#C5A85C]" />
          </button>
          <button
            onClick={() => handleScrollToSegment("contact")}
            className="group flex items-center justify-center gap-2 bg-transparent hover:bg-[#0B192C]/5 text-[#0B192C] px-6 py-4 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 border-2 border-[#0B192C]/10 hover:border-[#0B192C] cursor-pointer"
            id="btn-get-in-touch"
          >
            Get In Touch
            <Mail className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Social Icons - pops in one by one with a subtle bounce */}
        <div className="flex items-center gap-5" id="landing-socials">
          <motion.a
            custom={0}
            variants={socialVariants}
            initial="hidden"
            animate="visible"
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0B192C] hover:text-[#FAF9F6] hover:bg-[#0B192C] border border-[#C5A85C]/25 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            aria-label="GitHub profile link"
            id="social-github"
          >
            <Github className="w-5 h-5" />
          </motion.a>

          <motion.a
            custom={1}
            variants={socialVariants}
            initial="hidden"
            animate="visible"
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0B192C] hover:text-[#FAF9F6] hover:bg-[#0B192C] border border-[#C5A85C]/25 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            aria-label="LinkedIn profile link"
            id="social-linkedin"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>

          <motion.a
            custom={2}
            variants={socialVariants}
            initial="hidden"
            animate="visible"
            href={`mailto:${PERSONAL_INFO.emailId}`}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0B192C] hover:text-[#FAF9F6] hover:bg-[#0B192C] border border-[#C5A85C]/25 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            aria-label="Send direct Email"
            id="social-email"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
