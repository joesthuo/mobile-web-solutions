'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCloud, FiServer, FiDatabase, FiLock, FiGlobe, FiBarChart2 } from 'react-icons/fi';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Deterministic binary pattern data (avoids hydration issues)
const BINARY_ELEMENTS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  xPos: (i * 5) % 100,
  yPos: (i * 7) % 100,
  rotation: (i * 30) % 360,
  size: 8 + (i % 4),
  opacity: 0.1 + (i % 10) * 0.03,
  content: i % 2 === 0 ? '1010' : '0101'
}));

const SERVICES = [
  {
    id: 1,
    title: "Enterprise Cloud Migration",
    description: "Seamless transition to cloud infrastructure with zero downtime",
    icon: <FiCloud className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-600 to-cyan-500",
    stats: "97% migration success rate"
  },
  {
    id: 2,
    title: "Kubernetes Orchestration",
    description: "Advanced container management at global scale",
    icon: <FiServer className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-purple-600 to-indigo-600",
    stats: "5x deployment speed increase"
  },
  {
    id: 3,
    title: "Serverless Architecture",
    description: "Scalable, cost-efficient serverless solutions for dynamic workloads",
    icon: <FiGlobe className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-cyan-600 to-teal-500",
    stats: "60% cost reduction"
  },
  {
    id: 4,
    title: "Cloud Security & Compliance",
    description: "Robust security protocols and compliance for your cloud environment",
    icon: <FiLock className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-indigo-600 to-blue-600",
    stats: "100% compliance rate"
  },
  {
    id: 5,
    title: "Big Data & Analytics",
    description: "Powerful cloud-based analytics for real-time insights",
    icon: <FiBarChart2 className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-teal-600 to-green-500",
    stats: "10x faster data processing"
  },
  {
    id: 6,
    title: "Database Management",
    description: "Optimized cloud database solutions for performance and reliability",
    icon: <FiDatabase className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-600 to-purple-600",
    stats: "99.99% database uptime"
  }
];

export default function CloudServices() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Cosmic Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=20')] opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600 filter blur-[100px] opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-600 filter blur-[150px] opacity-20" />
      </motion.div>

      {/* Floating Binary Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://gist.githubusercontent.com/andrianaleksandrov/f5e4b5a3a9e3a7b1d0d8/raw/1c8a0d8e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3/binary-pattern.svg')] bg-[length:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
            Cloud Infrastructure Solutions
          </h1>
          <p className="mt-6 text-xl md:text-2xl leading-8 text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade cloud services engineered for performance, security, and scale
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)'
              }}
              transition={{ 
                duration: 0.6,
                hover: { duration: 0.3 }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 h-full flex flex-col"
            >
              {/* Gradient Highlight */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition duration-300`} />

              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={service.id <= 3}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-70`} />
                <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  {service.icon}
                </div>
              </div>
              
              {/* Service Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-lg text-gray-300 mb-4 flex-grow">{service.description}</p>
                
                <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-mono text-blue-400">{service.stats}</p>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                    Explore Solution
                  </button>
                  <div className="text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                    Case Study →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-2xl p-12 backdrop-blur-sm border border-gray-700/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('https://gist.githubusercontent.com/andrianaleksandrov/f5e4b5a3a9e3a7b1d0d8/raw/1c8a0d8e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3/binary-pattern.svg')] bg-[length:60px_60px]" />
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready for Enterprise Cloud Transformation?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Our cloud architects will design a custom solution tailored to your business requirements.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  Schedule Architecture Review
                </button>
                <button className="px-8 py-4 bg-transparent text-white font-medium rounded-xl border border-gray-600 hover:border-blue-400 transition-all hover:scale-[1.02]">
                  Download Cloud Whitepaper
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute -left-20 top-1/4 w-32 h-32 rounded-full bg-blue-600/20 filter blur-[80px]" />
      <div className="absolute -right-20 bottom-1/4 w-48 h-48 rounded-full bg-indigo-600/20 filter blur-[100px]" />
      
      {/* SSR-Safe Animated Binary Elements */}
      {isMounted && BINARY_ELEMENTS.map((element) => (
        <motion.div
          key={element.id}
          initial={{
            x: `${element.xPos}vw`,
            y: `${element.yPos}vh`,
            opacity: element.opacity
          }}
          animate={{
            x: `${element.xPos + 5}vw`,
            y: `${element.yPos + 5}vh`
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="absolute text-gray-600 font-mono pointer-events-none"
          style={{
            fontSize: `${element.size}px`,
            rotate: `${element.rotation}deg`
          }}
        >
          {element.content}
        </motion.div>
      ))}
    </div>
  );
}