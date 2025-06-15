'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function AboutHero() {
  // Enhanced scroll animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Cosmic Background Elements */}
      <motion.div 
        style={{ y: yOffset }}
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-40"
      >
        <div className="absolute inset-0 bg-[url('/images/cosmic-texture.png')] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600 filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-600 filter blur-[150px]"></div>
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <TypeAnimation
          sequence={[
            'We Build the Future', 
            2000, 
            'We Transform Ideas', 
            2000, 
            'We Innovate', 
            2000
          ]}
          wrapper="h1"
          repeat={Infinity}
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300 leading-relaxed"
        >
          Crafting <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">world-class digital solutions</span> with precision, creativity, and cutting-edge technology.
        </motion.p>

        <Link href="/contact">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px 10px rgba(99, 102, 241, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 flex items-center mx-auto"
          >
            Start Your Journey
            <FiArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </Link>
      </div>

      {/* Floating Orb (single deterministic element) */}
      <motion.div 
        className="fixed right-12 top-1/3 w-8 h-8 rounded-full bg-indigo-400/30 shadow-lg shadow-indigo-500/20 pointer-events-none"
        animate={{
          y: [0, -40, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.section>
  );
}