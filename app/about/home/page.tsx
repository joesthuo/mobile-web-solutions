'use client';

import { motion, LazyMotion, domAnimation, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const CosmicBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ y: yBg, opacity }}
      className="fixed inset-0 -z-10"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Cosmic background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/30 to-gray-900/95"></div>
      <div className="absolute inset-0">
        <Image
          src="https://www.transparenttextures.com/patterns/dark-geometric.png"
          alt="Dark geometric pattern"
          fill
          style={{ objectFit: 'cover', opacity: 0.1 }}
        />
      </div>
    </motion.div>
  );
};

const AnimatedCounter = ({ end, label, icon }: { end: number; label: string; icon: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      if (start < end) {
        setCount((prev) => (prev >= end ? end : prev + 1));
        start += 1;
      } else {
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div 
      ref={ref}
      className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 group"
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)" }}
    >
      <div className="text-blue-400 text-4xl mb-4 flex justify-center group-hover:text-blue-300 transition-colors duration-300">
        {icon}
      </div>
      <motion.span
        className="text-5xl md:text-6xl font-bold text-blue-400 font-mono group-hover:text-blue-300 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {count}+
      </motion.span>
      <p className="text-lg text-gray-300 mt-2 group-hover:text-gray-200 transition-colors duration-300">{label}</p>
    </motion.div>
  );
};

const FloatingParticles = () => {
  const particles = Array(20).fill(0);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-orange-400/10"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            transition: {
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
};

const ServiceCard = ({ 
  title, 
  description, 
  icon,
  features
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  features: string[];
}) => {
  return (
    <motion.div
      className="p-8 bg-gradient-to-br from-gray-800/80 to-blue-900/20 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, boxShadow: "0 20px 25px rgba(59, 130, 246, 0.3)" }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      <div className="relative z-10">
        <div className="text-blue-400 text-4xl mb-6 group-hover:text-blue-300 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">{title}</h3>
        <p className="text-gray-300 leading-relaxed mb-6">{description}</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-blue-400 mb-3">KEY FEATURES</h4>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
          <span className="mr-2">Learn more</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const TeamMember = ({ name, role, image, bio }: { name: string; role: string; image: string; bio: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm group h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-96"
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'brightness(0.7)' : 'brightness(1)'
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight">{name}</h3>
          <p className="text-blue-300 text-sm font-medium">{role}</p>
        </div>
        
        <motion.p 
          className="text-gray-300 text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ delay: isHovered ? 0.2 : 0 }}
        >
          {bio}
        </motion.p>
        
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0
          }}
          transition={{ delay: isHovered ? 0.3 : 0 }}
        >
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.873v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
            </svg>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-orange-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      />
    </motion.div>
  );
};

const TestimonialCard = ({ 
  quote, 
  name, 
  role, 
  image,
  companyLogo
}: { 
  quote: string; 
  name: string; 
  role: string; 
  image: string;
  companyLogo: string;
}) => {
  return (
    <motion.div
      className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-400/10 hover:shadow-blue-400/20 group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute inset-0 bg-blue-400/5 group-hover:bg-blue-400/10 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      <div className="text-blue-400 text-5xl mb-4 absolute top-4 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">&quot;</div>
      <div className="relative z-10">
        <p className="text-gray-300 mb-6 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {quote}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-12 h-12 mr-4">
              <Image 
                src={image} 
                alt={name}
                fill
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                className="border-2 border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300"
              />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-blue-100 transition-colors duration-300">{name}</h4>
              <p className="text-gray-400 text-sm group-hover:text-blue-300/80 transition-colors duration-300">{role}</p>
            </div>
          </div>
          <div className="relative h-8">
            <Image 
              src={companyLogo} 
              alt="Company logo"
              fill
              style={{ objectFit: 'contain', opacity: 0.7 }}
              className="group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400/0 via-blue-400/60 to-blue-400/0 opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
    </motion.div>
  );
};

const TimelineItem = ({ 
  year, 
  title, 
  description,
  isLast
}: { 
  year: string; 
  title: string; 
  description: string;
  isLast?: boolean;
}) => {
  return (
    <div className="relative pl-8 pb-8 group">
      {!isLast && (
        <div className="absolute left-4 top-1 h-full w-0.5 bg-gradient-to-b from-blue-400/20 via-blue-400/50 to-blue-400/20"></div>
      )}
      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
        <span className="text-white font-bold text-xs">{year}</span>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const services = [
    {
      title: "Enterprise Software Development",
      description: "Custom-built solutions that scale with your business, from CRM systems to complex ERP implementations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      features: [
        "Custom CRM/ERP solutions",
        "Legacy system modernization",
        "Workflow automation",
        "Enterprise-grade security",
        "Scalable architecture"
      ]
    },
    {
      title: "Web & Mobile Development",
      description: "Beautiful, responsive websites and high-performance mobile applications that engage users and drive conversions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      features: [
        "React/Next.js development",
        "Native iOS/Android apps",
        "Progressive Web Apps",
        "Cross-platform solutions",
        "Performance optimization"
      ]
    },
    {
      title: "Cloud Solutions",
      description: "Secure, scalable cloud infrastructure and services to power your digital transformation journey.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      ),
      features: [
        "AWS/Azure/GCP architecture",
        "Serverless solutions",
        "Cloud migration",
        "DevOps automation",
        "Cost optimization"
      ]
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      bio: "15+ years in enterprise architecture. Former Principal Engineer at Google. PhD in Computer Science from MIT."
    },
    {
      name: "James Wilson",
      role: "Lead Software Architect",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      bio: "Specializes in scalable systems. Built infrastructure handling 10M+ daily users. AWS Certified Solutions Architect."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Innovation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      bio: "Pioneer in AI-driven UX. Named &apos;Top 30 Under 30 in Tech&apos; by Forbes. Regular speaker at tech conferences."
    }
  ];

  const testimonials = [
    {
      quote: "Skycode Studio transformed our digital infrastructure with precision and innovation. Their team delivered beyond our expectations, reducing our system latency by 70%.",
      name: "James Wilson",
      role: "CEO, TechNova",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      companyLogo: "https://logo.clearbit.com/technova.com"
    },
    {
      quote: "The level of detail and technical expertise Skycode brought to our project was unparalleled. They delivered our mobile app 3 weeks ahead of schedule.",
      name: "Emily Chen",
      role: "CTO, Finova",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      companyLogo: "https://logo.clearbit.com/finova.com"
    },
    {
      quote: "Working with Skycode was a game-changer. Their cloud solutions gave us a 40% cost reduction while improving our system reliability.",
      name: "Michael Rodriguez",
      role: "Director, Global Systems",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      companyLogo: "https://logo.clearbit.com/globalsystems.com"
    }
  ];

  const timeline = [
    {
      year: "2012",
      title: "Company Founded",
      description: "Started as a small boutique development studio with 3 engineers in San Francisco."
    },
    {
      year: "2015",
      title: "First Enterprise Client",
      description: "Landed our first Fortune 500 client, marking our transition to enterprise solutions."
    },
    {
      year: "2018",
      title: "ISO 27001 Certification",
      description: "Achieved ISO 27001 certification for information security management."
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Opened offices in London and Singapore to serve international clients."
    },
    {
      year: "2023",
      title: "AI Division Launched",
      description: "Established dedicated AI/ML practice to deliver cutting-edge solutions.",
      isLast: true
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="bg-gray-900 text-gray-100 font-sans w-full overflow-hidden scroll-smooth"
        ref={containerRef}
      >
        {isClient && (
          <>
            <CosmicBackground />
            <FloatingParticles />
          </>
        )}

        {/* CTA Section */}
        <motion.section
          id="cta"
          className="relative min-h-screen flex items-center justify-center pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-900 to-orange-900/30"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="absolute inset-0">
            <Image
              src="https://www.transparenttextures.com/patterns/dark-matter.png"
              alt="Dark matter pattern"
              fill
              style={{ objectFit: 'cover', opacity: 0.2 }}
            />
          </div>
          <div className="absolute inset-0 border-t border-b border-orange-400/10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
                Ready to <span className="text-orange-400">Elevate</span> Your Digital Presence?
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300 leading-relaxed">
                Let&apos;s collaborate to build something extraordinary. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-orange-500 text-white rounded-full font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  Start Your Project
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-transparent text-orange-400 border-2 border-orange-400/50 rounded-full font-semibold text-lg hover:bg-orange-400/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Schedule Consultation
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="relative py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                  <span className="text-blue-400">Precision</span> in Every Pixel
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Founded in 2012, Skycode Studio has grown from a boutique development shop to a global technology partner serving Fortune 500 companies and innovative startups alike. Our team of 50+ engineers delivers solutions that drive measurable business impact.
                </p>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  We believe in the power of technology to transform businesses. Our approach combines deep technical expertise with a keen understanding of business objectives to deliver solutions that are not just technically sound but also drive real business value.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-400 text-sm font-medium">
                    ISO 27001 Certified
                  </div>
                  <div className="px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-400 text-sm font-medium">
                    AWS Advanced Partner
                  </div>
                  <div className="px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-400 text-sm font-medium">
                    Microsoft Gold Partner
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-400/10 rounded-2xl -z-10 blur-lg opacity-70"></div>
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <div className="relative w-full h-auto">
                    <Image 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="Skycode Studio Team"
                      width={1200}
                      height={800}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Our Global Team</h3>
                    <p className="text-gray-300">50+ engineers across 3 continents</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          id="timeline"
          className="relative py-32 bg-gradient-to-b from-gray-900/50 to-gray-950"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="text-blue-400">Journey</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Milestones that shaped our growth and expertise
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  isLast={item.isLast}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          id="stats"
          className="relative py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                By The <span className="text-blue-400">Numbers</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Quantifying our impact and expertise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatedCounter 
                end={150} 
                label="Projects Completed" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                }
              />
              <AnimatedCounter 
                end={50} 
                label="Team Members" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                }
              />
              <AnimatedCounter 
                end={25} 
                label="Fortune 500 Clients" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                }
              />
              <AnimatedCounter 
                end={12} 
                label="Years Experience" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                }
              />
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          id="services"
          className="relative py-32 bg-gradient-to-b from-gray-900/50 to-gray-950"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="text-blue-400">Expertise</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive solutions tailored to your unique business needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          id="team"
          className="relative py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Meet The <span className="text-blue-400">Minds</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The brilliant team behind our innovative solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  bio={member.bio}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          id="testimonials"
          className="relative py-32 bg-gradient-to-b from-gray-950 to-gray-900/50"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Client <span className="text-blue-400">Voices</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                What industry leaders say about working with us
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  companyLogo={testimonial.companyLogo}
                />
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </LazyMotion>
  );
}