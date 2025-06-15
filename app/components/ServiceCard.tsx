'use client';

import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactElement;
  highlights: string[];
  gradient: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  highlights,
  gradient,
}: ServiceCardProps) {
  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.04,
      boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 10,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="relative h-full bg-gradient-to-br from-white/80 to-gray-100/50 rounded-2xl overflow-hidden border border-gray-200/50 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Subtle Metallic Accent */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      {/* Glowing Background Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
      ></div>

      <div className="relative p-8 z-10">
        <motion.div
          variants={iconVariants}
          className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${gradient} text-white mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300`}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed text-base font-medium">{description}</p>
        <ul className="space-y-3">
          {highlights.map((highlight: string, index: number) => (
            <motion.li
              key={`${title}-highlight-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-center text-gray-700 text-sm font-medium"
            >
              <span
                className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${gradient} group-hover:scale-125 transition-transform duration-300`}
              ></span>
              {highlight}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Hover Accent Border */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 pointer-events-none"
      ></div>
    </motion.div>
  );
}