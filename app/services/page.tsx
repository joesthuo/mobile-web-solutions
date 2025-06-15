'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FiCode, 
  FiSmartphone, 
  FiLayers, 
  FiDatabase, 
  FiBarChart2, 
  FiShield 
} from 'react-icons/fi';
import Link from 'next/link';
import ServiceCard from '../components/ServiceCard';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  highlights: string[];
  gradient: string;
};

export default function ServicesPage() {
  const services: Service[] = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Enterprise-grade web applications built with cutting-edge technologies.',
      icon: <FiCode className="w-6 h-6 text-white" />,
      highlights: [
        'Next.js & TypeScript',
        'React & Node.js',
        'Headless CMS Integration',
        'Performance Optimization',
        'Web Accessibility'
      ],
      gradient: 'from-gray-800 to-blue-900'
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile experiences with native performance.',
      icon: <FiSmartphone className="w-6 h-6 text-white" />,
      highlights: [
        'React Native & Flutter',
        'iOS & Android',
        'Offline Capabilities',
        'Push Notifications',
        'App Store Optimization'
      ],
      gradient: 'from-gray-800 to-blue-900'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Human-centered design that creates intuitive experiences.',
      icon: <FiLayers className="w-6 h-6 text-white" />,
      highlights: [
        'User Research',
        'Wireframing & Prototyping',
        'Design Systems',
        'Interaction Design',
        'Usability Testing'
      ],
      gradient: 'from-gray-800 to-blue-900'
    },
    {
      id: 'backend',
      title: 'Backend Solutions',
      description: 'Robust server-side architecture with reliability and security.',
      icon: <FiDatabase className="w-6 h-6 text-white" />,
      highlights: [
        'Node.js & Python',
        'GraphQL & REST APIs',
        'Microservices',
        'Database Architecture',
        'Cloud Integration'
      ],
      gradient: 'from-gray-800 to-blue-900'
    },
    {
      id: 'strategy',
      title: 'Digital Strategy',
      description: 'Data-driven approach to digital transformation.',
      icon: <FiBarChart2 className="w-6 h-6 text-white" />,
      highlights: [
        'Market Analysis',
        'Technology Roadmapping',
        'Conversion Optimization',
        'Analytics Implementation',
        'Growth Strategies'
      ],
      gradient: 'from-gray-800 to-blue-900'
    },
    {
      id: 'security',
      title: 'Security Consulting',
      description: 'Comprehensive security solutions for your digital assets.',
      icon: <FiShield className="w-6 h-6 text-white" />,
      highlights: [
        'Penetration Testing',
        'Security Audits',
        'GDPR & Compliance',
        'Authentication Systems',
        'Data Encryption'
      ],
      gradient: 'from-gray-800 to-blue-900'
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <section className="relative overflow-hidden min-h-screen py-32">
      {/* Minimalist Background */}
      <motion.div 
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          variants={childVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Our <span className="text-blue-500">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge digital solutions crafted with precision to elevate your business.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={childVariants}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={childVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold text-blue-500 mb-6">
            Don\u2019t just take our word for it...
          </h3>
          <Link
            href="/contact"
            className="inline-block bg-blue-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            Get in Touch
          </Link>
          <p className="mt-6 text-lg text-gray-300">
            Join 500+ visionary brands who trust us to deliver unparalleled excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}