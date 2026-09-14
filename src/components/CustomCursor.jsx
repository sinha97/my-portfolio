import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor({ theme }) {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { stiffness: 600, damping: 30, mass: 0.5 };
    const cursorX = useSpring(mousePosition.x, springConfig);
    const cursorY = useSpring(mousePosition.y, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        const handleMouseOver = (e) => {
            const isClickable = e.target.tagName.toLowerCase() === 'a' 
                || e.target.tagName.toLowerCase() === 'button' 
                || e.target.closest('a') 
                || e.target.closest('button');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => { document.body.style.cursor = 'auto'; }
    }, []);

    // A tech/crosshair cursor
    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] hidden md:flex items-center justify-center"
            style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
            animate={{
                scale: isHovering ? 1.5 : 1,
                rotate: isHovering ? 45 : 0,
            }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-400/80 shadow-[0_0_5px_#22d3ee]"></div>
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-400/80 shadow-[0_0_5px_#22d3ee]"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 border border-cyan-400 rounded-full"></div>
            </div>
        </motion.div>
    );
}
