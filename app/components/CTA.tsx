'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 8px 24px rgba(59, 130, 246, 0.4)',
      background: '#2563eb',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative overflow-hidden py-24"
    >
      {/* Cosmic Background */}
      <motion.div
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          variants={childVariants}
          className="text-5xl md:text-6xl font-extrabold text-white mb-6"
        >
          Ready to <span className="text-blue-500">Transform</span> Your Vision?
        </motion.h2>
        <motion.p
          variants={childVariants}
          className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Partner with us to bring your dream project to life with unparalleled innovation and precision. Schedule your free consultation today.
        </motion.p>
        <motion.div variants={childVariants}>
          <Link href="#contact">
            <motion.span
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative inline-block bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg group"
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-300"></span>
              <span className="relative">Request a Quote</span>
            </motion.span>
          </Link>
        </motion.div>
        <motion.p
          variants={childVariants}
          className="mt-6 text-sm text-gray-400"
        >
          Join over 500+ visionary clients who trusted us to deliver excellence.
        </motion.p>
      </div>
    </motion.section>
  );
}