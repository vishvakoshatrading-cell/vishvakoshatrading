import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, Globe, Users, Quote, ChevronRight } from "lucide-react";
import { T, REDIRECT_URL } from "../theme";

// ═══════════════════════════════════════════════════════════
//  STAT COUNTER
// ═══════════════════════════════════════════════════════════
function StatCounter({ end, suffix, label }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (inView) {
            const controls = animate(0, end, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate: (v) => setVal(Math.round(v).toLocaleString())
            });
            return controls.stop;
        }
    }, [inView, end]);

    return (
        <div ref={ref} className="flex flex-col gap-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tabular-nums tracking-tight" style={{ color: T.text }}>
                {val}{suffix}
            </div>
            <div className="text-[10px] sm:text-xs lg:text-sm font-medium uppercase tracking-widest text-balance" style={{ color: T.sub }}>
                {label}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  SCROLL REVEAL UTILITY
// ═══════════════════════════════════════════════════════════
function Reveal({ children, delay = 0, y = 30 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
//  HOME PAGE COMPONENT
// ═══════════════════════════════════════════════════════════
export default function Home({ openModal }) {
    return (
        <>
            {/* ╔══ ENTERPRISE HERO ═════════════════════════════╗ */}
            <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
                {/* Cinematic Video Background - Compressed version (<10MB) for smooth streaming */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source
                        src="/hero-video.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Semi-transparent dark overlay to guarantee text legibility */}
                <div className="absolute inset-0 bg-slate-950/70 z-0" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-start text-left gap-8 max-w-2xl">
                        {/* Pill Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border"
                            style={{ borderColor: T.border, background: `${T.bgCard}80`, backdropFilter: "blur(4px)" }}
                        >
                            <Globe className="w-3.5 h-3.5" style={{ color: T.accent }} />
                            Parent Company of coti8.com
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter"
                        >
                            <span style={{ color: T.accent }}>V</span>ishvakosha<br />
                            Trading
                        </motion.h1>

                        {/* Sub-headline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg sm:text-xl font-medium leading-relaxed max-w-lg"
                            style={{ color: T.sub }}
                        >
                            Architecting the future of global trade. Delivering excellence in international export, sourcing, and maritime logistics.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
                        >
                            <a
                                href={REDIRECT_URL} target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest px-8 py-4 transition-transform hover:-translate-y-1"
                                style={{ background: T.accent, color: T.bg }}
                            >
                                Visit coti8.com <ArrowRight className="w-4 h-4" />
                            </a>
                            <button
                                onClick={openModal}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest px-8 py-4 border transition-colors hover:bg-white/5"
                                style={{ borderColor: T.accent, color: T.accent }}
                            >
                                Partner With Us
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ╔══ LIVE STATS STRIP ════════════════════════════╗ */}
            <section className="relative border-y z-20" style={{ borderColor: T.border, background: T.bgCard }}>
                <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-8 divide-x-0 md:divide-x divide-slate-800">
                        <div className="px-0 md:px-6"><StatCounter end={50} suffix="+" label="Global Ports" /></div>
                        <div className="px-0 md:px-6"><StatCounter end={10000} suffix="+" label="TEUs Shipped" /></div>
                        <div className="px-0 md:px-6"><StatCounter end={3} suffix="" label="Core Export Divisions" /></div>
                        <div className="px-0 md:px-6"><StatCounter end={9001} suffix=" ISO" label="Compliant" /></div>
                    </div>
                </div>
            </section>

            {/* ╔══ ABOUT & LEADERSHIP (SPLIT-GRID) ═════════════╗ */}
            <section className="py-20 lg:py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                        {/* Left Col: About */}
                        <Reveal>
                            <div className="flex flex-col justify-center h-full gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px" style={{ background: T.accent }} />
                                    <span className="text-sm font-bold uppercase tracking-widest" style={{ color: T.accent }}>About Our Network</span>
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                                    Vishvakosha Trading is a premier international trading house.
                                </h2>
                                <p className="text-lg leading-relaxed font-medium" style={{ color: T.sub }}>
                                    As the foundational infrastructure behind coti8.com, we provide rigorous quality control, global networking, and resilient supply chain solutions to power operations across continents.
                                </p>
                                <div className="pt-4">
                                    <button onClick={openModal} className="inline-flex items-center gap-2 text-sm font-bold group pt-2 pb-1 border-b transition-colors" style={{ borderColor: T.accent, color: T.text }}>
                                        Discuss a partnership
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: T.accent }} />
                                    </button>
                                </div>
                            </div>
                        </Reveal>

                        {/* Right Col: Leadership Card */}
                        <Reveal delay={0.2}>
                            <div
                                className="h-full border p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
                                style={{ borderColor: T.border, background: `linear-gradient(to bottom, transparent, ${T.bgCard}40)` }}
                            >
                                <div>
                                    <Quote className="w-10 h-10 mb-8 opacity-20" style={{ color: T.accent }} />
                                    <p className="text-xl sm:text-2xl font-medium leading-relaxed" style={{ color: T.text }}>
                                        "Our mission is to bridge global trade gaps with uncompromising precision. We leverage data-driven logistics and deep industry expertise to set the benchmark in international export."
                                    </p>
                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border flex items-center justify-center" style={{ borderColor: T.border, background: T.bgCard }}>
                                            <Users className="w-5 h-5" style={{ color: T.accent }} />
                                        </div>
                                        <div>
                                            <div className="font-bold">Bhavesh Lokhande</div>
                                            <div className="text-sm" style={{ color: T.sub }}>Vishvakosha Trading</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t" style={{ borderColor: T.border }}>
                                    <button onClick={openModal} className="w-full flex items-center justify-between group">
                                        <span className="font-bold text-sm uppercase tracking-widest" style={{ color: T.sub }}>Direct Inquiry</span>
                                        <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors group-hover:bg-white/5" style={{ borderColor: T.accent }}>
                                            <ChevronRight className="w-4 h-4" style={{ color: T.accent }} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </section>
        </>
    );
}
