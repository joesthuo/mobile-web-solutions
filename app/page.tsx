'use client';

import { motion, LazyMotion, domAnimation, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Hero from './components/Hero';
import CoreValues from './about/CoreValues';
import AboutTechStack from './about/TechStack';
import Team from './about/Team';
import Timeline from './about/Timeline';
import Services from './services/page';
import Portfolio from './portfolio/page';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './contact/page';

const CosmicBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <motion.div
      ref={ref}
      style={{ y: yBg }}
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
    </motion.div>
  );
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], type: 'spring', stiffness: 100 },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="bg-gray-900 text-gray-100 font-sans w-full overflow-hidden scroll-smooth"
        ref={containerRef}
      >
        {/* Cosmic Background (Client-Only) */}
        {isClient && <CosmicBackground />}

        {/* Floating Grid Pattern */}
        <div className="absolute inset-0 opacity-5 -z-10">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px]"></div>
        </div>

        {/* Hero Section */}
        <motion.section
          id="hero"
          className="relative bg-gray-900 text-gray-100 py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero />
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          id="services"
          className="relative bg-gray-800/50 backdrop-blur-sm text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-10 blur-md"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Services />
          </div>
        </motion.section>

        {/* Portfolio/Case Studies Section */}
        <motion.section
          id="portfolio"
          className="relative bg-gray-900 text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Portfolio />
          </div>
        </motion.section>

        {/* About Tech Stack Section */}
        <motion.section
          id="about-tech-stack"
          className="relative bg-gray-800/50 backdrop-blur-sm text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-10 blur-md"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutTechStack />
          </div>
        </motion.section>

        {/* Core Values Section */}
        <motion.section
          id="core-values"
          className="relative bg-gray-900 text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CoreValues />
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          id="team"
          className="relative bg-gray-800/50 backdrop-blur-sm text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-10 blur-md"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Team />
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          id="timeline"
          className="relative bg-gray-900 text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Timeline />
          </div>
        </motion.section>

        {/* Call-to-Action Section */}
        <motion.section
          id="cta"
          className="relative bg-gray-900 text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CTA />
          </div>
        </motion.section>

        {/* Testimonials/Reviews Section */}
        <motion.section
          id="testimonials"
          className="relative bg-gray-900 text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Testimonials />
          </div>
        </motion.section>

        {/* Contact Us Section */}
        <motion.section
          id="contact"
          className="relative bg-gray-800/50 backdrop-blur-sm text-gray-100 py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-10 blur-md"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Contact />
          </div>
        </motion.section>
      </div>
    </LazyMotion>
  );
}