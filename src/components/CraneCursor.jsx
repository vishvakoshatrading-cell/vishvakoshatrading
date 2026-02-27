import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CraneCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // 1. Framer Motion raw values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // 2. Spring Physics configuration (Heavy Machinery feel)
    const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Standard mouse move tracking
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    useEffect(() => {
        // "Grabbing" detection logic
        const handleMouseOver = (e) => {
            // Look for closest anchor, button, or any element meant to be clickable
            const target = e.target.closest("a, button, input, select, textarea, [role='button']");
            if (target) setIsHovering(true);
            else setIsHovering(false);
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                marginLeft: "-16px", // Center offset based on 32px SVG width
                marginTop: "-16px", // Center offset based on 32px SVG height
            }}
            animate={{
                rotate: isHovering ? -15 : 0,
                scale: isHovering ? 0.85 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
        >
            {/* Cast Iron Anchor SVG (Solid Heavy Theme) */}
            <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#D4AF37]" // Brand Accent Gold
            >
                <path d="M12,2C10.34,2 9,3.34 9,5C9,6.17 9.67,7.21 10.65,7.69L9.72,9.8C9.55,10.21 9.15,10.45 8.72,10.45H6L8.85,17.43C9.04,17.9 9.5,18.23 10.02,18.28L11,18.37V20.45C6.91,19.95 3.5,16.8 3,12.73L5.47,13.61C5.64,13.68 5.86,13.66 6.03,13.5C6.2,13.34 6.27,13.11 6.22,12.89L5.5,9H4L1,16.3C1.72,21.05 6.07,24.5 11,24.5H13C17.93,24.5 22.28,21.05 23,16.3L20,9H18.5L17.78,12.89C17.73,13.11 17.8,13.34 17.97,13.5C18.14,13.66 18.36,13.68 18.53,13.61L21,12.73C20.5,16.8 17.09,19.95 13,20.45V18.37L13.98,18.28C14.5,18.23 14.96,17.9 15.15,17.43L18,10.45H15.28C14.85,10.45 14.45,10.21 14.28,9.8L13.35,7.69C14.33,7.21 15,6.17 15,5C15,3.34 13.66,2 12,2M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4Z" />
            </svg>
        </motion.div>
    );
}
