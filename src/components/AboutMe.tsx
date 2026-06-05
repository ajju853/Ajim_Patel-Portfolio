import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Eye, Briefcase, GraduationCap, FolderCode, Sliders, Award, ChevronRight, Sparkles, Layers } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function AboutMe() {
  const [profileMode, setProfileMode] = useState<"formal" | "casual">("formal");

  const profileVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
        delay: 0.2
      }
    }
  };

  // 3D Card flip variants on Y-Axis
  const flipVariants = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: (customDelay: number) => ({
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: customDelay
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5
      }
    }
  };

  const anchorVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleScrollToSegment = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navAnchors = [
    { id: "experience", label: "Work Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderCode },
    { id: "skills", label: "Skills", icon: Sliders },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certifications", label: "Certifications", icon: Award }
  ];

  // Permanent premium customized avatars representing his formal portrait and developer mode
  const formalImgUrl = "/uploads/formal-upload.png"; // His personal crisp professional corporate suit portrait
  const casualImgUrl = "/uploads/casual-upload.png"; // His developer workspace look with monitor background

  return (
    <section
      id="about"
      className="py-24 px-6 bg-[#F5F2EB] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-[#C5A85C]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-5 w-96 h-96 rounded-full bg-[#0B192C]/5 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            01 / Professional Profile
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Prof Picture / Dynamic Avatar Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              variants={profileVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl flex flex-col items-center justify-center p-1.5 shadow-2xl overflow-hidden group border border-[#C5A85C]/30 transition-all duration-500 bg-[#0B192C]`}
              id="about-profile-pic-container"
            >
              {/* Pulsing visual cues */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,92,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C5A85C] via-[#FAF9F6]/20 to-[#0B192C] rounded-3xl opacity-30 group-hover:opacity-100 transition-all duration-700 blur" />

              <div className="relative w-full h-full rounded-[22px] bg-[#0B192C] flex flex-col items-center justify-center border border-[#C5A85C]/15 overflow-hidden">
                
                {/* Image Swap AnimatePresence container */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={profileMode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={profileMode === "formal" ? formalImgUrl : casualImgUrl}
                      alt={profileMode === "formal" ? "Ajim Patel Formal Portrait" : "Ajim Patel Developer Look"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay for modern look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-black/30 opacity-70 group-hover:opacity-60 transition-opacity" />
                  </motion.div>
                </AnimatePresence>

                {/* Overlaid UI details on top of photo */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#0B192C]/80 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-mono font-bold text-white tracking-widest uppercase flex items-center gap-1.5 z-25">
                  <span className={`w-1.5 h-1.5 rounded-full ${profileMode === "formal" ? "bg-emerald-500 animate-ping" : "bg-[#C5A85C] animate-pulse"}`} />
                  {profileMode === "formal" ? "Corporate Suit" : "Developer Mode"}
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 text-center border-t border-white/10 bg-[#0B192C]/75 backdrop-blur-md rounded-xl p-3 z-20 flex flex-col items-center">
                  <h3 className="font-display font-extrabold text-lg text-[#FAF9F6] tracking-tight leading-none mb-1">
                    {PERSONAL_INFO.fullName}
                  </h3>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#C5A85C] tracking-widest uppercase mb-1 font-bold">
                    <span>Pune, India</span>
                    <span>•</span>
                    <span>{profileMode === "formal" ? "Nexvitech SE" : "Open Workspace"}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business vs Creative Interactive Toggle Selector */}
            <div className="mt-6 flex bg-[#0B192C]/5 border border-[#0B192C]/10 rounded-2xl p-1.5 w-68 sm:w-72 shadow-inner">
              <button
                type="button"
                onClick={() => setProfileMode("formal")}
                className={`flex-1 py-2 px-3 text-xs font-display font-bold tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  profileMode === "formal"
                    ? "bg-[#0B192C] text-[#C5A85C] shadow-md scale-102"
                    : "text-[#0B192C]/80 hover:bg-[#0B192C]/5"
                }`}
              >
                👔 Corporate
              </button>
              <button
                type="button"
                onClick={() => setProfileMode("casual")}
                className={`flex-1 py-2 px-3 text-xs font-display font-bold tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  profileMode === "casual"
                    ? "bg-[#0B192C] text-[#C5A85C] shadow-md scale-102"
                    : "text-[#0B192C]/80 hover:bg-[#0B192C]/5"
                }`}
              >
                💻 Developer
              </button>
            </div>
          </div>

          {/* RIGHT: Professional Bio, Mission/Vision, View-Work Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
              id="about-me-text"
            >
              <h3 className="text-xl font-display font-bold text-[#0B192C] mb-4">
                Full-Stack Backend Architect with a Cloud & Security DNA
              </h3>
              <p className="text-[#0B192C]/85 font-sans text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line" id="about-aboutMeParagraph">
                {PERSONAL_INFO.aboutMeParagraph}
              </p>
            </motion.div>

            {/* Mission & Vision (3D grid Y-axis cascade flip) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Mission Card */}
              <motion.div
                custom={0.2}
                variants={flipVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#0B192C] text-[#FAF9F6] p-6 rounded-2xl shadow-xl border border-[#C5A85C]/35 relative group hover:border-[#C5A85C] transition-all duration-300"
                id="about-mission-card"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C5A85C]/15 border border-[#C5A85C]/40 flex items-center justify-center text-[#C5A85C] mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#C5A85C] mb-2 uppercase tracking-wide">
                  Our Mission
                </h4>
                <p className="text-sm font-sans text-[#FAF9F6]/80 leading-relaxed">
                  {PERSONAL_INFO.missionStatement}
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                custom={0.4}
                variants={flipVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#0B192C] text-[#FAF9F6] p-6 rounded-2xl shadow-xl border border-[#C5A85C]/35 relative group hover:border-[#C5A85C] transition-all duration-300"
                id="about-vision-card"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C5A85C]/15 border border-[#C5A85C]/40 flex items-center justify-center text-[#C5A85C] mb-4 group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#C5A85C] mb-2 uppercase tracking-wide">
                  Our Vision
                </h4>
                <p className="text-sm font-sans text-[#FAF9F6]/80 leading-relaxed">
                  {PERSONAL_INFO.visionStatement}
                </p>
              </motion.div>
            </div>

            {/* "View My Work" Buttons */}
            <div id="view-my-work-section" className="border-t border-[#0B192C]/10 pt-8">
              <h4 className="font-mono text-xs font-bold text-[#C5A85C] uppercase tracking-widest mb-4">
                Explore Resume Segments
              </h4>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {navAnchors.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      variants={anchorVariants}
                      onClick={() => handleScrollToSegment(item.id)}
                      className="group relative inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B192C]/5 hover:bg-[#0B192C] hover:text-[#FAF9F6] rounded-xl font-display text-xs font-bold text-[#0B192C] border border-[#0B192C]/10 hover:border-[#0B192C] transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
                      id={`about-anchor-${item.id}`}
                    >
                      <IconComp className="w-3.5 h-3.5 group-hover:scale-110 group-hover:text-[#C5A85C] transition-all duration-300" />
                      <span>{item.label}</span>
                      <ChevronRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />

                      {/* Smooth left-to-right underline draw on hover inside button */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A85C] transition-all duration-300 group-hover:w-full" />
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
