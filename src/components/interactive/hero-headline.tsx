"use client";

import { motion } from "framer-motion";

export function HeroHeadline() {
  return (
    <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.96] text-white sm:text-6xl md:text-7xl xl:text-8xl">
      <span className="block overflow-hidden pb-1">
        <motion.span
          className="block"
          initial={{ y: "110%", rotateX: 24 }}
          animate={{ y: 0, rotateX: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          AI, backend и
        </motion.span>
      </span>
      <span className="block overflow-hidden pb-2">
        <motion.span
          className="block text-zinc-300"
          initial={{ y: "110%", rotateX: 24 }}
          animate={{ y: 0, rotateX: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
        >
          Telegram-разработка
        </motion.span>
      </span>
      <motion.span
        className="relative mt-4 block w-fit overflow-hidden text-2xl leading-tight text-emerald-200 sm:text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
      >
        под ключ
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          animate={{ x: ["-120%", "720%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 1.1 }}
        />
      </motion.span>
    </h1>
  );
}
