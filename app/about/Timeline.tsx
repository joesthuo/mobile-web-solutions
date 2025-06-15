'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Timeline() {
  const milestones = [
    {
      year: '2015',
      title: 'Founded',
      desc: 'Launched with a mission to redefine digital innovation through cutting-edge solutions.',
      icon: '🌟',
    },
    {
      year: '2018',
      title: 'Enterprise Expansion',
      desc: 'Secured partnerships with global enterprise clients, scaling operations to new heights.',
      icon: '🏢',
    },
    {
      year: '2020',
      title: 'Global Reach',
      desc: 'Expanded services to clients across 5 continents, establishing a worldwide presence.',
      icon: '🌍',
    },
    {
      year: '2023',
      title: 'Industry Leader',
      desc: 'Recognized as a top digital agency by TechCrunch for unparalleled innovation.',
      icon: '🏆',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const milestoneVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -150 : 150,
      scale: 0.8,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-32">
      {/* Cosmic Background */}
      <motion.div 
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-extrabold text-white"
        >
          Our Journey of <span className="text-blue-500">Excellence</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
        >
          A legacy of innovation, precision, and global impact crafted over years of dedication.
        </motion.p>
      </div>
      <div className="max-w-5xl mx-auto relative px-4 z-10" ref={ref}>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-b from-blue-600 to-blue-800 h-full rounded-full shadow-lg" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {milestones.map((milestone, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={milestoneVariants}
              className={`flex items-center mb-16 md:mb-20 ${
                i % 2 === 0 ? 'flex-row md:pr-12' : 'flex-row-reverse md:pl-12'
              } group`}
            >
              <div className="w-full md:w-1/2 px-6 relative">
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 border-2 border-blue-500 rounded-full shadow-md z-10 group-hover:scale-125 transition-transform duration-300"
                  variants={dotVariants}
                />
                <div className="relative bg-gradient-to-br from-gray-800 to-blue-900 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300 shadow-xl group-hover:shadow-blue-500/20">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-blue-900 rounded-xl opacity-0 group-hover:opacity-20 blur-md transition duration-300"></div>
                  <div className="relative flex items-center space-x-4">
                    <span className="text-3xl">{milestone.icon}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {milestone.year} — {milestone.title}
                      </h3>
                      <p className="mt-2 text-gray-300 leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}