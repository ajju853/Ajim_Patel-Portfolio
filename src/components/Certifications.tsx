import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ExternalLink, Award, Sparkles, BookOpen } from "lucide-react";
import { CERTIFICATIONS_LIST } from "../data";
import { Certification } from "../types";

interface TiltCardProps {
  key?: string | number;
  cert: Certification;
  index: number;
}

// Detailed custom mouse-hover tilt element for tactile feedback
function TiltCard({ cert, index }: TiltCardProps) {
  const [hovered, setHovered] = useState(false);

  // Set up mouse-coordinate state tracking
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  // Transform coordinates into degrees of tilt
  const rotateX = useTransform(y, [0, 400], [15, -15]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width * 400);
    y.set(mouseY / height * 400);
  }

  function handleMouseLeave() {
    setHovered(false);
    x.set(200); // return to center
    y.set(200);
  }

  // Pre-determined "random" table offsets (-2deg to +2deg) that snap flat
  const initialRotations = [-1.8, 1.5, -2, 1.2, -1.2, 2.0, -1.6];
  const tableRotation = initialRotations[index % initialRotations.length];

  // Map providers to specialized colors
  const getProviderTheme = (provider: string) => {
    switch (provider.toUpperCase()) {
      case "ORACLE":
        return { bg: "bg-[#0b192c]/5 border-[#0b192c]/20", text: "text-[#C5A85C]", logoBg: "bg-[#0B192C]" };
      case "HACKERRANK":
        return { bg: "bg-[#2ec866]/5 border-[#2ec866]/20", text: "text-[#2ec866]", logoBg: "bg-[#2ec866]/10" };
      case "GOOGLE":
        return { bg: "bg-[#4285f4]/5 border-[#4285f4]/20", text: "text-[#4285f4]", logoBg: "bg-[#4285f4]/10" };
      case "MICROSOFT":
      case "MICROSOFT & LINKEDIN":
        return { bg: "bg-[#00a4ef]/5 border-[#00a4ef]/15", text: "text-[#00a4ef]", logoBg: "bg-[#0b192c]" };
      case "CISCO":
        return { bg: "bg-[#00bceb]/5 border-[#00bceb]/20", text: "text-[#00bceb]", logoBg: "bg-[#0B192C]" };
      case "GITHUB":
      case "LINKEDIN / GITHUB":
        return { bg: "bg-[#24292e]/5 border-[#24292e]/20", text: "text-[#24292e]", logoBg: "bg-[#24292e] text-[#FAF9F6]" };
      case "WALMART":
        return { bg: "bg-[#0071dc]/5 border-[#0071dc]/20", text: "text-[#0071dc]", logoBg: "bg-[#0071dc]/10" };
      default:
        return { bg: "bg-[#C5A85C]/5 border-[#C5A85C]/20", text: "text-[#C5A85C]", logoBg: "bg-[#0B192C]" };
    }
  };

  const theme = getProviderTheme(cert.provider);

  return (
    <motion.div
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, rotate: tableRotation }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: 0, // snaps flat
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 12,
          delay: (index % 3) * 0.12 // Waterfall column stagger
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="bg-[#F5F2EB] hover:bg-[#FFFDF9] rounded-2xl p-6 border border-[#0B192C]/5 hover:border-[#C5A85C]/50 shadow-md hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
      id={`cert-layout-card-${cert.id}`}
    >
      {/* 3D layered vector ambient orb inside */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A85C]/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div style={{ transform: "translateZ(30px)" }}>
        {/* Certificate Badge Block */}
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-[#0B192C]/10 shadow ${theme.logoBg}`}>
            <Award className="w-5 h-5 text-[#C5A85C]" />
          </div>

          <span className="font-mono text-[9px] font-black text-[#FAF9F6] bg-[#0B192C] px-2.5 py-1 rounded-full group-hover:bg-[#C5A85C] group-hover:text-[#0B192C] transition-colors">
            {cert.year}
          </span>
        </div>

        {/* Name and Issuer */}
        <div className="mb-4">
          <span className={`text-[9px] font-mono font-black tracking-widest uppercase block mb-1 ${theme.text}`}>
            {cert.provider}
          </span>
          <h3 className="text-sm sm:text-base font-display font-extrabold text-[#0B192C] leading-snug tracking-tight group-hover:text-[#C5A85C] transition-colors">
            {cert.name}
          </h3>
        </div>
      </div>

      <div
        style={{ transform: "translateZ(20px)" }}
        className="mt-6 border-t border-[#0B192C]/5 pt-4 flex items-center justify-between text-[11px] font-mono text-[#0B192C]/50"
      >
        <span className="uppercase font-bold tracking-wider">FOUNDATIONS CERT</span>
        <div className="flex items-center gap-1.5 text-[#C5A85C] group-hover:translate-x-1 transition-transform">
          <span>SECURED</span>
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const waterfallContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <section
      id="certifications"
      className="py-24 px-6 bg-[#FAF9F6] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#C5A85C]/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#0B192C]/5 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            06 / Competency Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            Professional Certifications
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        {/* Card table layout cascade waterfall */}
        <motion.div
          variants={waterfallContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          id="certifications-table-deck"
        >
          {CERTIFICATIONS_LIST.map((cert, index) => (
            <TiltCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
