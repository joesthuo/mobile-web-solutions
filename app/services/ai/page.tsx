'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCpu, FiCode, FiDatabase, FiShield, FiBarChart2, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Predefined neural network nodes for deterministic rendering
const NEURAL_NODES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: (i * 15) % 100,
  y: (i * 12) % 100,
  size: 4 + (i % 3),
  opacity: 0.2 + (i % 5) * 0.05,
  delay: i * 0.2
}));

const AI_SERVICES = [
    {
        id: 1,
        title: "Enterprise AI Integration",
        description: "Seamlessly embed cutting-edge AI into your business workflows",
        icon: <FiCpu className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        color: "from-blue-600 to-blue-800",
        stat: "3.5x average efficiency gain"
      },
  {
    id: 2,
    title: "Custom LLM Development",
    description: "Tailored large language models for your specific business needs",
    icon: <FiCode className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-500 to-blue-700",
    stat: "92% accuracy on domain tasks"
  },
  {
    id: 3,
    title: "Predictive Analytics",
    description: "AI-powered forecasting with unprecedented accuracy",
    icon: <FiBarChart2 className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-400 to-blue-600",
    stat: "15% higher precision than industry standards"
  },
  {
    id: 4,
    title: "Computer Vision Solutions",
    description: "Advanced image and video analysis at scale",
    icon: <FiGlobe className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-600 to-blue-800",
    stat: "99.7% object recognition accuracy"
  },
  {
    id: 5,
    title: "AI Security Systems",
    description: "Next-generation threat detection and prevention",
    icon: <FiShield className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-500 to-blue-700",
    stat: "Blocks 99.9% of zero-day attacks"
  },
  {
    id: 6,
    title: "Data Intelligence Platforms",
    description: "Transform raw data into actionable business insights",
    icon: <FiDatabase className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-400 to-blue-600",
    stat: "Processes 1M+ events per second"
  }
];

export default function AIServices() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Holographic Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=10')] opacity-10" />
      </motion.div>

      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {NEURAL_NODES.map((node, i) => (
            <circle
              key={`node-${i}`}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="currentColor"
              className="text-blue-400/20"
            />
          ))}
          {isMounted && NEURAL_NODES.slice(0, 12).map((node, i) => (
            <line
              key={`connector-${i}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${NEURAL_NODES[(i + 4) % 12].x}%`}
              y2={`${NEURAL_NODES[(i + 4) % 12].y}%`}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-blue-400/10"
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            <span className="text-blue-500">AI</span> Transformation Services
          </h1>
          <p className="mt-6 text-xl md:text-2xl leading-8 text-gray-300 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to revolutionize your business
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_SERVICES.map((service) => (
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
              className="group relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 h-full flex flex-col"
            >
              {/* Pulsing Gradient Highlight */}
              <motion.div 
                className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition duration-300`}
                animate={isMounted ? { opacity: [0, 0.1, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, delay: service.id * 0.3 }}
              />
              
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
                <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md border border-gray-700/50">
                  {service.icon}
                </div>
              </div>
              
              {/* Service Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-lg text-gray-300 mb-4 flex-grow">{service.description}</p>
                
                <div className="bg-gray-900/50 rounded-lg p-3 mb-4 border-l-4 border-blue-500">
                  <p className="text-sm font-mono text-blue-400">{service.stat}</p>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                    Explore Capabilities
                  </button>
                  <div className="text-sm text-gray-400 hover:text-blue-300 transition-colors cursor-pointer">
                    View Case Study →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl p-12 backdrop-blur-sm border border-gray-700/50 relative overflow-hidden">
            {/* Animated Neural Network */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {isMounted && NEURAL_NODES.map((node, i) => (
                  <motion.circle
                    key={`pulse-${i}`}
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={node.size}
                    fill="currentColor"
                    className="text-blue-400/20"
                    animate={{ r: [node.size, node.size * 1.5, node.size] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: node.delay
                    }}
                  />
                ))}
              </svg>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Experience Our AI Capabilities
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                See how our AI solutions can transform your business with a personalized demo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  Request Demo
                </button>
                <button className="px-8 py-4 bg-transparent text-white font-medium rounded-xl border border-gray-600 hover:border-blue-400 transition-all hover:scale-[1.02]">
                  Download AI Playbook
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Animated Neural Nodes */}
      {isMounted && NEURAL_NODES.map((node) => (
        <motion.div
          key={`animated-${node.id}`}
          initial={{
            x: `${node.x}%`,
            y: `${node.y}%`,
            opacity: node.opacity
          }}
          animate={{
            x: [`${node.x}%`, `${node.x + 2}%`, `${node.x}%`],
            y: [`${node.y}%`, `${node.y + 2}%`, `${node.y}%`]
          }}
          transition={{
            duration: 10 + node.id,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="absolute text-blue-400 pointer-events-none"
          style={{
            width: `${node.size * 2}px`,
            height: `${node.size * 2}px`,
            borderRadius: '50%',
            background: 'currentColor',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
}