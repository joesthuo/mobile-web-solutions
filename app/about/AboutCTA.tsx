'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { FC } from 'react';

const AboutCTA: FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} // Ensure animation triggers only once
        className="text-center px-6"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-800">Ready to Shape the Future?</h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-700">
          Partner with us to build transformative digital experiences that drive impact.
        </p>
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' }}
            className="px-10 py-4 bg-indigo-600 text-gray-100 rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-700 transition"
          >
            Get in Touch
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default AboutCTA;