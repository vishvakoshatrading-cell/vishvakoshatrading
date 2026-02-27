import { motion } from "framer-motion";
import { ShieldCheck, FileText, FileCheck, ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { T } from "../theme";

export default function Compliance() {
    const documents = [
        {
            title: "ISO 9001:2015 Quality Management",
            description: "Certified standards for consistent quality in international trade and operations.",
            icon: <ShieldCheck className="w-8 h-8" style={{ color: T.accent }} />,
            link: "/documents/1770296483622-04d60daa-ef8f-42a5-8021-07fd2fc034ce_1.jpg"
        },
        {
            title: "Global Customs & Trade Compliance",
            description: "Adherence to international customs regulations, import/export laws, and security standards.",
            icon: <FileCheck className="w-8 h-8" style={{ color: T.accent }} />,
            link: "/documents/Print-_-Udyam-Registration-Certificate-16-oct-2_page-0001-scaled.jpg"
        },
        {
            title: "Certificate of Incorporation / Subsidiary Structure",
            description: "Official documentation of corporate structure, including operational jurisdiction.",
            icon: <FileText className="w-8 h-8" style={{ color: T.accent }} />,
            link: "/documents/Bhavesh-Lokhande-Shop-Act_page-0001-scaled.jpg"
        }
    ];

    return (
        <div className="min-h-screen pt-24 mt-10 sm:pt-32 pb-16 sm:pb-24" style={{ background: T.bg, color: T.text }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="mb-20 max-w-3xl relative">
                    {/* Back to Home Button */}
                    <div className="mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-white group" style={{ color: T.sub }}>
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" style={{ color: T.accent }} />
                            Back to Home
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-8"
                        style={{ borderColor: T.border, background: `${T.bgCard}80` }}
                    >
                        <ShieldCheck className="w-3.5 h-3.5" style={{ color: T.accent }} />
                        Regulatory Framework
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tighter mb-6"
                    >
                        Global Compliance &<br />Certifications
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base sm:text-lg font-medium leading-relaxed"
                        style={{ color: T.sub }}
                    >
                        Committed to the highest standards of international trade, quality assurance, and regulatory adherence.
                    </motion.p>
                </div>

                {/* Document Grid (Bento Box) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {documents.map((doc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
                            className="group relative h-auto sm:h-[360px] border p-6 sm:p-8 flex flex-col justify-between gap-8 sm:gap-0 overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]"
                            style={{ borderColor: T.border, background: T.bgCard }}
                        >
                            <div className="relative z-10 flex flex-col gap-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border" style={{ borderColor: T.border, background: T.bg }}>
                                    {doc.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 leading-snug">{doc.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: T.sub }}>{doc.description}</p>
                                </div>
                            </div>

                            <div className="relative z-10 pt-6 border-t" style={{ borderColor: T.border }}>
                                <a
                                    href={doc.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-between font-bold text-xs uppercase tracking-widest px-6 py-4 border transition-all hover:bg-white/5"
                                    style={{ borderColor: T.accent, color: T.accent }}
                                >
                                    View Official Document
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </a>
                            </div>

                            {/* Subtle mesh background on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                                style={{ backgroundImage: `linear-gradient(${T.accent} 1px, transparent 1px), linear-gradient(90deg, ${T.accent} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
