import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { T, SANS } from "./theme";

import Home from "./pages/Home";
import Compliance from "./pages/Compliance";
import Footer from "./components/Footer";
import CraneCursor from "./components/CraneCursor";

// ═══════════════════════════════════════════════════════════
//  PARTNER MODAL (CLEAN & PROFESSIONAL)
// ═══════════════════════════════════════════════════════════
function FloatInputModal({ label, type = "text", value, onChange, required, as: Tag = "input", children }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const commonProps = {
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    required,
    className: `w-full bg-white rounded-md px-4 pt-6 pb-2 outline-none text-sm transition-all duration-200 resize-none ${Tag === "select" ? "appearance-none" : ""}`,
    style: {
      color: T.modalText,
      border: `1px solid ${active ? T.modalText : T.modalBorder}`,
      boxShadow: focused ? `0 0 0 1px ${T.modalText}` : 'none',
    }
  };

  return (
    <div className="relative mt-2">
      {Tag === "input" ? (
        <input type={type} {...commonProps} />
      ) : Tag === "textarea" ? (
        <textarea rows={4} {...commonProps} />
      ) : (
        <select {...commonProps}>
          {children}
        </select>
      )}
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200 font-medium"
        style={{
          top: active ? "8px" : (Tag === "textarea" ? "20px" : "50%"),
          transform: active ? "none" : (Tag === "textarea" ? "none" : "translateY(-50%)"),
          fontSize: active ? "10px" : "14px",
          color: active ? T.modalSub : "#94A3B8",
          letterSpacing: active ? "0.05em" : "0",
          textTransform: active ? "uppercase" : "none",
        }}
      >
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
}

function PartnerModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", country: "", phone: "", message: "", consent: false });
  const [sent, setSent] = useState(false);
  const [botTrap, setBotTrap] = useState("");

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Honeypot check (Bots will fill this out, humans cannot see it)
    if (botTrap) {
      console.warn("Bot detected by honeypot field. Request aborted.");
      return;
    }

    // 2. Secure API Submission Setup
    // Ensure you add VITE_FORM_API_KEY to your local .env file and your Vercel Project Environment Variables.
    // Example: const apiKey = import.meta.env.VITE_FORM_API_KEY;
    // ... API submission or EmailJS logic goes here using apiKey ...

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", country: "", phone: "", message: "", consent: false });
      setBotTrap("");
      onClose();
    }, 2500);
  };

  useEffect(() => {
    if (!open) return;
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 cursor-pointer"
            style={{ background: "rgba(11, 15, 25, 0.8)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-lg rounded-xl overflow-hidden shadow-2xl"
            style={{ background: T.modalBg }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Border Accent */}
            <div className="h-1 w-full" style={{ background: T.modalText }} />

            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: T.modalText }}>
                    Partner With Us
                  </h3>
                  <p className="text-sm mt-1" style={{ color: T.modalSub }}>
                    Please provide your details below. We typically respond within 24 hours.
                  </p>
                </div>
                <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 transition-colors">
                  <X className="w-5 h-5" style={{ color: T.modalSub }} />
                </button>
              </div>

              {sent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-100 border border-slate-200">
                    <Send className="w-6 h-6" style={{ color: T.modalText }} />
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: T.modalText }}>Inquiry Submitted</h4>
                  <p style={{ color: T.modalSub }} className="text-sm">Thank you. Our team will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot Input: Hidden from humans, traps automated bots */}
                  <input
                    type="text"
                    name="contact_by_fax_only"
                    value={botTrap}
                    onChange={(e) => setBotTrap(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInputModal label="Full Name" value={form.name} onChange={set("name")} required />
                    <FloatInputModal label="Email Address" type="email" value={form.email} onChange={set("email")} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInputModal label="Country" value={form.country} onChange={set("country")} required as="select">
                      <option value="" disabled hidden></option>
                      {["United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France", "Japan", "China", "Brazil", "South Africa", "United Arab Emirates", "Saudi Arabia", "Singapore"].map(c => (
                        <option key={c} value={c} className="text-slate-900">{c}</option>
                      ))}
                    </FloatInputModal>
                    <FloatInputModal label="Contact Number" type="tel" value={form.phone} onChange={set("phone")} />
                  </div>
                  <FloatInputModal label="Message" as="textarea" value={form.message} onChange={set("message")} />

                  <label className="flex items-start gap-3 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={set("consent")}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-800"
                    />
                    <span className="text-sm leading-snug" style={{ color: T.modalSub }}>
                      I agree to be contacted via phone, email, or WhatsApp.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 mt-4 font-bold text-xs uppercase tracking-widest text-white transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                    style={{ background: T.modalText }}
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN APP COMPONENT (ROUTER EXPORT)
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen selection:bg-white/20 flex flex-col" style={{ background: T.bg, color: T.text, fontFamily: SANS }}>
      <CraneCursor />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        body { background-color: ${T.bg}; cursor: none; }
      `}</style>

      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home openModal={openModal} />} />
          <Route path="/compliance" element={<Compliance />} />
        </Routes>
      </main>

      <Footer openModal={openModal} />
    </div>
  );
}
