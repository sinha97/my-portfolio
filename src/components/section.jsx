import React from "react";
import { motion } from "framer-motion";

export const Section = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="scroll-mt-10 py-6 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
              className="mt-2 text-base md:text-lg text-slate-600 dark:text-slate-400"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mt-8"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
