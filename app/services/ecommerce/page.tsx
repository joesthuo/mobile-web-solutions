'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiShoppingCart, FiTrendingUp, FiShield, FiLayers, FiPieChart, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';

export default function EcommerceServices() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const services = [
    {
      title: "Premium Store Development",
      description: "Custom-built ecommerce platforms with blazing fast performance and seamless UX",
      icon: <FiShoppingCart className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "Conversion Optimization",
      description: "Data-driven strategies to maximize your store's conversion rates and revenue",
      icon: <FiTrendingUp className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-600 to-cyan-500"
    },
    {
      title: "Secure Payment Solutions",
      description: "Enterprise-grade payment gateways with fraud protection and PCI compliance",
      icon: <FiShield className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-emerald-600 to-teal-500"
    },
    {
      title: "Headless Commerce",
      description: "Future-proof architecture with API-first approach for maximum flexibility",
      icon: <FiLayers className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-amber-600 to-orange-500"
    },
    {
      title: "Analytics & Insights",
      description: "Advanced tracking and AI-powered recommendations to grow your business",
      icon: <FiPieChart className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-pink-600 to-rose-500"
    },
    {
      title: "Global Expansion",
      description: "Localized shopping experiences for international markets with multi-currency support",
      icon: <FiGlobe className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-violet-600 to-purple-500"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Cosmic Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=20')] opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600 filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-600 filter blur-[150px] opacity-20"></div>
      </motion.div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://gist.githubusercontent.com/andrianaleksandrov/f5e4b5a3a9e3a7b1d0d8/raw/1c8a0d8e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3/grid-pattern.svg')] bg-[length:60px_60px]"></div>
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
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            Ecommerce Excellence
          </h1>
          <p className="mt-6 text-xl md:text-2xl leading-8 text-gray-300 max-w-3xl mx-auto">
            Transform your online store into a high-converting, revenue-generating powerhouse
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)'
              }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.1,
                hover: { duration: 0.3 }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 h-full flex flex-col"
            >
              {/* Gradient Highlight */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition duration-300`}></div>
              
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`}></div>
                <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  {service.icon}
                </div>
              </div>
              
              {/* Service Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-lg text-gray-300 mb-6 flex-grow">{service.description}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                    Learn More
                  </button>
                  <div className="text-sm text-gray-400">
                    <span className="text-white font-medium">Case Studies</span> →
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
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('https://gist.githubusercontent.com/andrianaleksandrov/f5e4b5a3a9e3a7b1d0d8/raw/1c8a0d8e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3/grid-pattern.svg')] bg-[length:60px_60px]"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to elevate your ecommerce business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Our team of experts will craft a tailored solution to maximize your online revenue and customer experience.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  Get a Free Consultation
                </button>
                <button className="px-8 py-4 bg-transparent text-white font-medium rounded-xl border border-gray-600 hover:border-indigo-400 transition-all hover:scale-[1.02]">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute -left-20 top-1/4 w-32 h-32 rounded-full bg-indigo-600/20 filter blur-[80px]"></div>
      <div className="absolute -right-20 bottom-1/4 w-48 h-48 rounded-full bg-purple-600/20 filter blur-[100px]"></div>
    </div>
  );
}