import React from 'react';
import { motion } from 'framer-motion';

import { scaleIn } from '../utils/animations';

export const Badge = ({ children }) => (
    <motion.span
        initial="hidden"
        animate="visible"
        variants={scaleIn}
        className="inline-flex items-center rounded-sm border border-emerald-500/50 bg-emerald-950/50 px-3 py-1 text-sm font-mono leading-6 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-colors duration-300"
    >
        {children}
    </motion.span>
);

export const Chip = ({ children }) => (
    <span className="rounded-sm border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs font-mono text-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.2)]">
        {children}
    </span>
);

export const Button = ({
    as: Component = "a",
    className = "",
    children,
    ...props
}) => (
    <Component
        className={`group relative inline-flex items-center gap-2 rounded-sm border border-emerald-500/50 bg-slate-950/80 px-5 py-2.5 text-sm font-mono text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:text-emerald-300 hover:border-emerald-400 ${className}`}
        {...props}
    >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-emerald-500/10" />
        <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-emerald-500 transition-all group-hover:border-emerald-300" />
        <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-emerald-500 transition-all group-hover:border-emerald-300" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
);

export const Card = ({ children, className = "" }) => {
    const divRef = React.useRef(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => { setIsFocused(true); setOpacity(1); };
    const handleBlur = () => { setIsFocused(false); setOpacity(0); };
    const handleMouseEnter = () => { setOpacity(1); };
    const handleMouseLeave = () => { setOpacity(0); };

    return (
        <motion.div
            ref={divRef}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden rounded-sm border border-cyan-500/20 bg-slate-950/60 font-mono text-slate-300 shadow-[0_0_15px_rgba(6,182,212,0.05)] transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
                }}
            />
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-500/50" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export const CardBody = ({ children, className = "" }) => (
    <div className={`p-5 md:p-6 ${className}`}>{children}</div>
);
