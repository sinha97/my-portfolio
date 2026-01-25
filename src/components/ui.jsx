import React from 'react';
import { motion } from 'framer-motion';

export const Badge = ({ children }) => (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 backdrop-blur px-3 py-1 text-sm leading-6 shadow-sm dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-indigo-500/50 transition-colors duration-300">
        {children}
    </span>
);

export const Chip = ({ children }) => (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800 dark:text-slate-300">
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
        className={`group relative inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-400/50 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-indigo-400/50 ${className}`}
        {...props}
    >
        <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10 dark:from-indigo-400/20 dark:via-fuchsia-400/20 dark:to-emerald-400/20" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
);

export const Card = ({ children, className = "" }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className={`rounded-2xl border border-slate-200 bg-white/90 backdrop-blur text-slate-900 shadow transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-300/50 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-100 dark:hover:border-indigo-500/30 ${className}`}
    >
        {children}
    </motion.div>
);

export const CardBody = ({ children, className = "" }) => (
    <div className={`p-5 md:p-6 ${className}`}>{children}</div>
);
