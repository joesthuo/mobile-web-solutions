'use client';

import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { FiExternalLink, FiGithub, FiZoomIn } from 'react-icons/fi';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  features: string[];
}

const CosmicBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef(null);

  const projects: Project[] = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      description: 'A high-performance e-commerce solution with Next.js, Stripe, and Shopify integration handling 10,000+ daily transactions.',
      image: '/images/projects/ecommerce.jpg',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'Node.js'],
      liveUrl: 'https://example-ecommerce.com',
      codeUrl: 'https://github.com/example/ecommerce',
      features: [
        'Instant search with Algolia',
        'Personalized recommendations',
        'One-click checkout',
        'Multi-currency support',
        'Advanced analytics dashboard',
      ],
    },
    {
      id: 'banking',
      title: 'Mobile Banking App',
      description: 'Secure financial platform with real-time transactions, biometric auth, and AI-powered fraud detection.',
      image: '/images/projects/banking.jpg',
      tags: ['React Native', 'Firebase', 'TensorFlow', 'GraphQL'],
      features: [
        'Face ID authentication',
        'Instant money transfers',
        'Budgeting tools',
        'Investment portfolio',
        '24/7 customer support',
      ],
    },
    {
      id: 'dashboard',
      title: 'Social Media Dashboard',
      description: 'Enterprise-grade analytics platform processing 1M+ data points daily with real-time visualization.',
      image: '/images/projects/dashboard.jpg',
      tags: ['React', 'D3.js', 'MongoDB', 'WebSockets'],
      liveUrl: 'https://analytics.example.com',
      features: [
        'Custom data visualization',
        'Team collaboration',
        'Automated reporting',
        'Sentiment analysis',
        'Competitor benchmarking',
      ],
    },
    {
      id: 'healthcare',
      title: 'Telehealth Platform',
      description: 'HIPAA-compliant video consultation system with EHR integration and prescription management.',
      image: '/images/projects/healthcare.jpg',
      tags: ['React', 'WebRTC', 'AWS', 'Twilio'],
      features: [
        'Secure video calls',
        'Medical records access',
        'E-prescriptions',
        'Appointment scheduling',
        'AI symptom checker',
      ],
    },
    {
      id: 'education',
      title: 'E-Learning Platform',
      description: 'Interactive learning management system with adaptive learning paths and live classrooms.',
      image: '/images/projects/education.jpg',
      tags: ['Vue.js', 'Laravel', 'WebRTC', 'Redis'],
      features: [
        'Interactive courses',
        'Gamified learning',
        'Live instructor sessions',
        'Progress tracking',
        'Certification system',
      ],
    },
    {
      id: 'iot',
      title: 'Smart Home System',
      description: 'AI-powered home automation platform with cross-device compatibility and energy optimization.',
      image: '/images/projects/iot.jpg',
      tags: ['React Native', 'Node.js', 'MQTT', 'TensorFlow'],
      features: [
        'Voice control',
        'Energy usage analytics',
        'Predictive automation',
        'Multi-user access',
        'Emergency detection',
      ],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 },
    }),
    hover: { y: -5, scale: 1.02, boxShadow: '0px 12px 32px rgba(59, 130, 246, 0.3)' },
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="min-h-screen bg-gray-900 text-gray-100 font-sans py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-smooth"
        ref={containerRef}
      >
        {/* Cosmic Background */}
        <CosmicBackground />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-blue-500">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Showcasing transformative digital experiences that drive business results
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: '-50px' }}
                className="group relative"
              >
                <div className="h-full bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-lg overflow-hidden border border-gray-700/50 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-blue-600/50 transition-all"
                      aria-label={`View details for ${project.title}`}
                    >
                      <FiZoomIn className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 relative z-10">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800/50 text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        View Details
                      </button>
                      <div className="flex space-x-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500 transition-colors"
                            aria-label={`Visit live site for ${project.title}`}
                          >
                            <FiExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500 transition-colors"
                            aria-label={`View source code for ${project.title}`}
                          >
                            <FiGithub className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="bg-gradient-to-br from-gray-800 to-blue-900 border border-gray-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Content */}
                  <div className="relative">
                    <div className="relative h-80 w-full">
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-blue-600/50 transition-all"
                      aria-label="Close project modal"
                    >
                      <FiZoomIn className="w-5 h-5 text-white rotate-45" />
                    </button>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800/50 text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Client</h4>
                            <p className="text-gray-300">Confidential</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Timeline</h4>
                            <p className="text-gray-300">3-6 months</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Results</h4>
                            <p className="text-gray-300">Increased conversion by 35%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-blue-900/20"
                          aria-label={`Visit live site for ${selectedProject.title}`}
                        >
                          View Live
                        </a>
                      )}
                      {selectedProject.codeUrl && (
                        <a
                          href={selectedProject.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gray-700/50 text-gray-200 font-medium rounded-full hover:bg-gray-600/50 transition-colors"
                          aria-label={`View source code for ${selectedProject.title}`}
                        >
                          <FiGithub className="mr-2" />
                          View Code
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="inline-flex items-center px-6 py-3 bg-gray-700/50 border border-gray-600/50 text-gray-200 font-medium rounded-full hover:bg-gray-600/50 transition-colors"
                        aria-label="Close project modal"
                      >
                        Close Project
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Ready to start your project?
            </h3>
            <Link
              href="/contact"
              className="inline-block bg-blue-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-blue-900/20"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </LazyMotion>
  );
}