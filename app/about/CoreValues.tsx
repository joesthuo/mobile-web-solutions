'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaCode, FaShieldAlt, FaUsers, FaCheck, FaLightbulb, FaGlobe } from 'react-icons/fa';

export default function CoreValues() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const values = [
    { 
      icon: <FaRocket className="w-8 h-8" />, 
      title: 'Innovation', 
      desc: 'Pushing boundaries with cutting-edge solutions that redefine industries.',
      color: 'from-gray-800 to-blue-900',
      iconColor: 'from-blue-500 to-blue-700'
    },
    { 
      icon: <FaCode className="w-8 h-8" />, 
      title: 'Technical Mastery', 
      desc: 'Architecting robust, scalable systems with surgical precision.',
      color: 'from-gray-800 to-blue-900',
      iconColor: 'from-teal-500 to-teal-700'
    },
    { 
      icon: <FaShieldAlt className="w-8 h-8" />, 
      title: 'Integrity', 
      desc: 'Building trust through uncompromising transparency and ethics.',
      color: 'from-gray-800 to-blue-900',
      iconColor: 'from-green-500 to-green-700'
    },
    { 
      icon: <FaUsers className="w-8 h-8" />, 
      title: 'Collaboration', 
      desc: 'Synergizing diverse talents to create extraordinary outcomes.',
      color: 'from-gray-800 to-blue-900',
      iconColor: 'from-purple-500 to-purple-700'
    },
    { 
      icon: <FaLightbulb className="w-8 h-8" />, 
      title: 'Creativity', 
      desc: 'Transforming visionary ideas into tangible, impactful realities.',
      color: 'from-gray-800 to-blue-900',
      iconColor: 'from-indigo-500 to-indigo-700'
    },
    { 
      icon: <FaGlobe className="w-8 h-8" />, 
      title: 'Global Impact', 
      desc: 'Engineering solutions that drive meaningful worldwide change.',
      color: 'from-gray-800 to-blue-900',
      iconColor: 'from-cyan-500 to-cyan-700'
    },
  ];

  return (
    <section className="relative overflow-hidden py-32">
      {/* Minimalist Background */}
      <motion.div 
        style={{ y: yOffset }}
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Our Guiding <span className="text-blue-500">Principles</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl leading-8 text-gray-300 max-w-3xl mx-auto">
            The foundation of everything we create is built upon these core values
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)'
              }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.1,
                hover: { duration: 0.3 }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 h-full"
            >
              <div className="relative h-full flex flex-col">
                {/* Icon with Gradient Background */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${value.iconColor} mb-6 text-white`}>
                  {value.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-lg text-gray-300 leading-relaxed flex-grow">{value.desc}</p>
                
                {/* Animated Checkmark */}
                <div className="absolute -bottom-6 -right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaCheck className="w-12 h-12 text-blue-400/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}