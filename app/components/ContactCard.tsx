'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  action: string;
  color: string;
  backgroundColor: string;
  delay?: number;
  isHovered: boolean;
}

export default function ContactCard({
  icon,
  title,
  description,
  details,
  action,
  color,
  backgroundColor,
  delay = 0,
  isHovered,
}: ContactCardProps) {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay, type: 'spring', stiffness: 100 } },
    hover: { y: -5, scale: 1.03, boxShadow: '0px 12px 32px rgba(129, 140, 248, 0.3)' },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`group relative overflow-hidden bg-gradient-to-br ${backgroundColor} rounded-xl backdrop-blur-sm border border-gray-700/50 p-6 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl`}
    >
      {/* Glowing Background Effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-xl opacity-0 ${isHovered ? 'opacity-20' : 'group-hover:opacity-20'} blur-md transition-opacity duration-300`}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg transition-all duration-300 ${isHovered ? 'bg-indigo-500/30 scale-110' : 'bg-white/10 group-hover:bg-indigo-500/20 group-hover:scale-110'}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">{title}</h3>
          <p className="text-gray-300 text-sm mb-2 group-hover:text-gray-200 transition-colors">{description}</p>
          <Link
            href={action}
            className="inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 font-medium transition-all group-hover:from-indigo-200 group-hover:to-pink-200"
          >
            {details}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hover Indicator */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} opacity-0 ${isHovered ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}
      ></div>
    </motion.div>
  );
}