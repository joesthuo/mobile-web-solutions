'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBarChart2, FiUsers, FiTarget } from 'react-icons/fi';
import Link from 'next/link';

export default function ConsultingPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-screen py-32">
      {/* Cosmic Background */}
      <motion.div
        className="absolute inset-0 bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=10')] opacity-10"></div>
      </motion.div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=10')] bg-[length:60px_60px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header Section */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Strategic <span className="text-blue-500">Consulting</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Drive digital transformation with data-driven strategies and expert guidance.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              title: 'Market Analysis',
              description: 'Gain insights into market trends and customer behavior.',
              icon: <FiBarChart2 className="w-8 h-8 text-blue-300" />,
            },
            {
              title: 'Team Empowerment',
              description: 'Train your team with cutting-edge tools and methodologies.',
              icon: <FiUsers className="w-8 h-8 text-blue-300" />,
            },
            {
              title: 'Goal Setting',
              description: 'Define and achieve measurable business objectives.',
              icon: <FiTarget className="w-8 h-8 text-blue-300" />,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={childVariants}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="ml-4 text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          variants={childVariants}
          className="mb-20"
        >
          <h2 className="text-3xl font-semibold text-white text-center mb-10">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '500+', label: 'Clients Served' },
              { value: '95%', label: 'Success Rate' },
              { value: '10+', label: 'Years of Expertise' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
              >
                <p className="text-4xl font-bold text-blue-300">{stat.value}</p>
                <p className="text-gray-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={childVariants}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Shape Your Digital Future
          </h3>
          <Link
            href="/contact"
            className="relative inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-full group"
          >
            <span className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-300"></span>
            <span className="relative">Consult With Us</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}