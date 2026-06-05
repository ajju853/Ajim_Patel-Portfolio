import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Sparkles, CheckCircle2, RotateCcw, Loader2, Copy } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function Contact() {
  const [formDone, setFormDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Pulse effect on send button after form finishes rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormDone(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Clear copied tooltip after delay
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate real background processing and API/SMTP dispatching
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Fallback: trigger standard mailto window location client link nicely
      const mailtoUrl = `mailto:${PERSONAL_INFO.emailId}?subject=${encodeURIComponent(
        formData.subject || "Contact from Portfolio"
      )}&body=${encodeURIComponent(
        `Hello Ajim,\n\nMy name is ${formData.name}.\n\n${formData.message}\n\nReach me at: ${formData.email}`
      )}`;
      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.warn("Direct redirection fallback interrupted safely.", err);
      }
    }, 1300);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-[#FAF9F6] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#C5A85C]/15 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#0B192C]/5 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C5A85C] uppercase tracking-widest font-bold block mb-2">
            08 / Communication Hub
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0B192C] tracking-tight">
            Let's Collaborate
          </h2>
          <div className="w-16 h-1 bg-[#C5A85C] mx-auto mt-4 rounded" />
        </div>

        {/* Dual Column Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="contact-wrapper">
          {/* LEFT: Contact Form Card - slides from bottom-left at angle, then straightens */}
          <motion.div
            initial={{ y: 90, x: -70, rotate: -4, opacity: 0 }}
            whileInView={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
            className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#0B192C]/5 shadow-xl relative overflow-hidden"
            id="contact-form-card"
          >
            {/* Soft decorative background tint */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A85C]/5 rounded-bl-full pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="contact-form-holder"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#0B192C] mb-8 uppercase tracking-wide">
                    Send Me A Message
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-8" id="contact-form">
                    {/* Field 1: Full Name */}
                    <div className="relative pt-6 group" id="form-group-name">
                      <input
                        type="text"
                        name="name"
                        id="form-input-name"
                        required
                        disabled={isSubmitting}
                        placeholder=" "
                        value={formData.name}
                        onChange={handleInputChange}
                        className="peer w-full bg-transparent border-b border-[#0B192C]/15 py-2 px-0 text-sm text-[#0B192C] focus:outline-none transition-colors focus:border-[#C5A85C] font-sans disabled:opacity-50"
                      />
                      <label
                        htmlFor="form-input-name"
                        className="absolute left-0 top-8 text-xs font-semibold text-[#0B192C]/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left transform
                                   peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-[#C5A85C]
                                   peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#C5A85C]"
                      >
                        Full Name
                      </label>
                      {/* Underline draws itself left-to-right when focused */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A85C] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>

                    {/* Field 2: Email */}
                    <div className="relative pt-6 group" id="form-group-email">
                      <input
                        type="email"
                        name="email"
                        id="form-input-email"
                        required
                        disabled={isSubmitting}
                        placeholder=" "
                        value={formData.email}
                        onChange={handleInputChange}
                        className="peer w-full bg-transparent border-b border-[#0B192C]/15 py-2 px-0 text-sm text-[#0B192C] focus:outline-none transition-colors focus:border-[#C5A85C] font-sans disabled:opacity-50"
                      />
                      <label
                        htmlFor="form-input-email"
                        className="absolute left-0 top-8 text-xs font-semibold text-[#0B192C]/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left transform
                                   peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-[#C5A85C]
                                   peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#C5A85C]"
                      >
                        Email Address
                      </label>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A85C] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>

                    {/* Field 3: Subject */}
                    <div className="relative pt-6 group" id="form-group-subject">
                      <input
                        type="text"
                        name="subject"
                        id="form-input-subject"
                        required
                        disabled={isSubmitting}
                        placeholder=" "
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="peer w-full bg-transparent border-b border-[#0B192C]/15 py-2 px-0 text-sm text-[#0B192C] focus:outline-none transition-colors focus:border-[#C5A85C] font-sans disabled:opacity-50"
                      />
                      <label
                        htmlFor="form-input-subject"
                        className="absolute left-0 top-8 text-xs font-semibold text-[#0B192C]/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left transform
                                   peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-[#C5A85C]
                                   peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#C5A85C]"
                      >
                        Subject
                      </label>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A85C] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>

                    {/* Field 4: Message */}
                    <div className="relative pt-6 group" id="form-group-message">
                      <textarea
                        name="message"
                        id="form-input-message"
                        required
                        disabled={isSubmitting}
                        rows={4}
                        placeholder=" "
                        value={formData.message}
                        onChange={handleInputChange}
                        className="peer w-full bg-transparent border-b border-[#0B192C]/15 py-2 px-0 text-sm focus:outline-none transition-colors focus:border-[#C5A85C] font-sans text-[#0B192C] resize-none disabled:opacity-50"
                      />
                      <label
                        htmlFor="form-input-message"
                        className="absolute left-0 top-8 text-xs font-semibold text-[#0B192C]/50 uppercase tracking-widest pointer-events-none transition-all duration-300 transform origin-left transition-all duration-300 origin-left transform
                                   peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-[#C5A85C]
                                   peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#C5A85C]"
                      >
                        Write Message
                      </label>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A85C] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>

                    {/* "Send Message" button: gently pulses on render finishing + diagonal shimmer sweep */}
                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        animate={formDone && !isSubmitting ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ repeat: 0, duration: 0.6, ease: "easeInOut" }}
                        className="relative group w-full bg-[#0B192C] disabled:bg-[#0B192C]/70 text-[#FAF9F6] py-4 rounded-xl font-display text-xs font-black uppercase tracking-widest overflow-hidden transition-all shadow-md hover:shadow-xl cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        id="btn-submit-message"
                      >
                        {isSubmitting ? (
                          <>
                            <span>Transmitting...</span>
                            <Loader2 className="w-4 h-4 text-[#C5A85C] animate-spin" />
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 text-[#C5A85C]" />
                          </>
                        )}

                        {/* Diagonal shimmer sweep on hover */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-[#C5A85C]/20 to-transparent group-hover:animate-[shimmer_1.1s_ease-in-out_infinite]" />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-success-holder"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                  id="contact-success-state"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-[#0B192C] tracking-tight uppercase mb-3 text-emerald-600">
                    Message Dispatched!
                  </h4>
                  <p className="text-sm font-sans text-[#0B192C]/70 max-w-sm leading-relaxed mb-8">
                    Thank you, <strong className="text-[#0B192C]">{formData.name}</strong>! Your communication regarding "<strong className="italic text-[#0B192C]">{formData.subject || "Collaboration"}</strong>" has been safely processed.
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#0B192C] hover:bg-[#C5A85C] text-[#FAF9F6] hover:text-[#0B192C] rounded-xl font-display text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
                    id="btn-send-another"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Send Another Message</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Contact Information Info Panel - slides from bottom-right */}
          <motion.div
            initial={{ y: 90, x: 70, rotate: 3, opacity: 0 }}
            whileInView={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
            className="lg:col-span-5 bg-[#0B192C] text-[#FAF9F6] rounded-3xl p-6 sm:p-10 border border-[#C5A85C]/35 relative shadow-xl overflow-hidden flex flex-col justify-between"
            id="contact-info-panel"
          >
            {/* Absolute background accent ring */}
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C5A85C]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="font-mono text-[9px] text-[#C5A85C] font-black tracking-widest uppercase block mb-3">
                LET'S TALK
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#FAF9F6] mb-8 uppercase tracking-wide">
                Direct Channels
              </h3>

              {/* Information Rows: slides slightly right on hover with color shifts */}
              <div className="space-y-7" id="contact-channels-deck">
                {/* Row 1: Email Row layout with absolute copy button support */}
                <div className="relative flex items-center group/email" id="channel-email-container">
                  <motion.a
                    href={`mailto:${PERSONAL_INFO.emailId}`}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex items-center gap-4.5 p-3.5 pr-14 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group cursor-pointer"
                    id="channel-email-row"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A85C] group-hover:text-emerald-400 group-hover:scale-110 transition-all border border-white/10 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#FAF9F6]/50 block uppercase tracking-wider">
                        Send Direct Email
                      </span>
                      <span className="font-sans text-xs sm:text-sm font-semibold text-[#FAF9F6] group-hover:text-[#C5A85C] transition-colors break-all">
                        {PERSONAL_INFO.emailId}
                      </span>
                    </div>
                  </motion.a>

                  {/* Copy Trigger */}
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        navigator.clipboard.writeText(PERSONAL_INFO.emailId);
                        setCopied(true);
                      }}
                      className="p-2.5 bg-white/10 hover:bg-white/20 active:bg-[#C5A85C] text-[#C5A85C] hover:text-white active:text-[#0B192C] rounded-xl border border-white/10 transition-all cursor-pointer relative shadow-sm"
                      id="btn-copy-email"
                      title="Copy Email"
                    >
                      <Copy className="w-4 h-4" />
                      
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.85, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: -45 }}
                            exit={{ opacity: 0, scale: 0.85, y: -10 }}
                            className="absolute right-0 bg-[#C5A85C] text-[#0B192C] text-[10px] font-mono font-black uppercase tracking-wider px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-50 border border-white/20"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>

                {/* Row 2: Phone */}
                <motion.a
                  href={`tel:${PERSONAL_INFO.phoneNumber.replace(/\s+/g, "")}`}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group cursor-pointer"
                  id="channel-phone-row"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A85C] group-hover:text-sky-400 group-hover:scale-110 transition-all border border-white/10 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#FAF9F6]/50 block uppercase tracking-wider">
                      Call / WhatsApp Contact
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#FAF9F6] group-hover:text-[#C5A85C] transition-colors">
                      {PERSONAL_INFO.phoneNumber}
                    </span>
                  </div>
                </motion.a>

                {/* Row 3: Location */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4.5 p-3.5 bg-white/5 rounded-2xl border border-white/5 transition-all group"
                  id="channel-location-row"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A85C] group-hover:text-[#C5A85C] border border-white/10 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#FAF9F6]/50 block uppercase tracking-wider">
                      Work Headquarters
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#FAF9F6]">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom socials */}
            <div className="mt-12 border-t border-white/10 pt-6">
              <span className="font-mono text-[9px] text-[#FAF9F6]/40 uppercase tracking-widest block mb-4">
                Connect on Networks
              </span>
              <div className="flex gap-4">
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl flex items-center justify-center text-[#C5A85C] hover:text-[#FAF9F6] transition-all cursor-pointer shadow-sm"
                  aria-label="LinkedIn profile anchor"
                  id="contact-social-linkedin"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl flex items-center justify-center text-[#C5A85C] hover:text-[#FAF9F6] transition-all cursor-pointer shadow-sm"
                  aria-label="GitHub profile anchor"
                  id="contact-social-github"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FOOTER SECTION */}
        <footer className="mt-24 border-t border-[#0B192C]/10 pt-10 text-center" id="portfolio-footer">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-left bg-[#0B192C] text-[#FAF9F6] py-2 px-4 rounded-xl border border-[#C5A85C]/30 flex items-center gap-3">
              <div className="font-display font-black text-[#C5A85C] text-sm tracking-wider">AP</div>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-xs font-mono tracking-widest text-[#FAF9F6]/80 uppercase">
                2026 ARCHITECT VERSION
              </span>
            </div>

            <p className="text-sm font-sans text-[#0B192C]/60 italic max-w-sm text-center sm:text-right">
              "Building secure, scalable distributed architectures with rigorous engineering diligence."
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#0B192C]/5 pt-6 text-[11px] font-mono text-[#0B192C]/40">
            <span>DESIGNED BY GAURI.EXE GUIDE & HANDCRAFTED IN CLIENT SPACE</span>
            <span>AJIM PATEL © 2026. ALL RIGHTS SECURED</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
