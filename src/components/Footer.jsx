import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe, Handshake, Linkedin, Mail } from "lucide-react";
import { T, REDIRECT_URL } from "../theme";

function SocialIcons() {
    const socials = [
        {
            name: "Facebook",
            bgClass: "bg-[#1877F2]", // Facebook blue
            link: "#",
            icon: (
                <svg viewBox="0 0 320 512" className="w-[18px] h-[18px] fill-current">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
            )
        },
        {
            name: "Twitter / X",
            bgClass: "bg-[#000000]", // X black/dark
            link: "#",
            icon: (
                <svg viewBox="0 0 512 512" className="w-[18px] h-[18px] fill-current">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.6 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
            )
        },
        {
            name: "Instagram",
            bgClass: "bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584]", // Instagram gradient
            link: "https://www.instagram.com/vishvakoshatrading?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            icon: (
                <svg viewBox="0 0 448 512" className="w-[18px] h-[18px] fill-current">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
            )
        },
    ];

    return (
        <div className="flex items-center gap-4">
            {socials.map((s) => (
                <div key={s.name} className="group relative flex items-center justify-center">
                    {/* Tooltip */}
                    <div className="absolute -top-12 opacity-0 group-hover:-top-11 group-hover:opacity-100 transition-all duration-300 ease-out z-20 pointer-events-none drop-shadow-md">
                        <div className="bg-white text-slate-900 text-[11px] font-bold px-3 py-[5px] rounded shadow-lg whitespace-nowrap tracking-wide uppercase">
                            {s.name}
                        </div>
                        {/* Tooltip Arrow */}
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-white absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>

                    {/* Icon Button */}
                    <a
                        href={s.link}
                        target={s.link !== "#" ? "_blank" : "_self"}
                        rel={s.link !== "#" ? "noopener noreferrer" : ""}
                        className="relative flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 border border-slate-800 text-slate-400 overflow-hidden shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] focus:ring-offset-[#0B0F19]"
                    >
                        {/* Hover Fill From Bottom */}
                        <div className={`absolute inset-0 ${s.bgClass} translate-y-[101%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-0`}></div>

                        {/* SVG Content */}
                        <div className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:scale-110">
                            {s.icon}
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default function Footer({ openModal }) {
    return (
        <footer className="border-t pt-16 sm:pt-20 pb-10" style={{ borderColor: T.border, background: T.bg }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 mb-12 sm:mb-20 text-sm">

                    {/* Col 1 */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="w-5 h-5" style={{ color: T.accent }} />
                            <span className="font-bold tracking-widest uppercase">Vishvakosha Trading</span>
                        </div>
                        <p className="leading-relaxed max-w-xs mb-8" style={{ color: T.sub }}>
                            Corporate Headquarters.<br />
                            Pioneering the global trade infrastructure and managing international logistics networks.
                        </p>

                        <h4 className="flex items-center gap-2 font-bold uppercase tracking-widest mb-4" style={{ color: T.accent, fontSize: '0.75rem' }}>
                            <span className="w-8 h-px bg-[#D4AF37] opacity-50 block"></span> Connect With Us
                        </h4>
                        <SocialIcons />
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6" style={{ color: T.accent }}>Direct Connect</h4>
                        <ul className="flex flex-col gap-4" style={{ color: T.sub }}>
                            <li>
                                <button onClick={openModal} className="hover:text-white transition-colors flex items-center gap-3">
                                    <Handshake className="w-4 h-4" /> Strategic Partnerships
                                </button>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/bhavesh-lokhande-29a35231a/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-3">
                                    <Linkedin className="w-4 h-4" /> Corporate LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="mailto:vishvakoshatrading@gmail.com" className="hover:text-white transition-colors flex items-center gap-3">
                                    <Mail className="w-4 h-4" /> vishvakoshatrading@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6" style={{ color: T.accent }}>Trust & Subsidiaries</h4>
                        <ul className="flex flex-col gap-4" style={{ color: T.sub }}>

                            <li>
                                <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between group">
                                    coti8.com - B2B Retail Platform
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">Privacy & Legal Directives</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase" style={{ borderColor: T.border, color: T.sub }}>
                    <div>Copyright © 2026 Vishvakosha Trading. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}
