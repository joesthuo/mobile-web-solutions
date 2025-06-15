'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiDownload, FiExternalLink, FiSearch } from 'react-icons/fi';
import { FaRegStar, FaStar, FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function ResourcesPage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const resources = [
    // Core Technologies
    {
      title: "TypeScript Masterclass 2024",
      category: "Language",
      type: "Video Course",
      rating: 4.9,
      downloads: 3241,
      featured: true,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "JavaScript: The Complete Guide",
      category: "Language",
      type: "eBook",
      rating: 4.8,
      downloads: 5872,
      featured: true,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Modern Python for Web Devs",
      category: "Language",
      type: "Course",
      rating: 4.7,
      downloads: 2103,
      featured: false,
      color: "from-blue-400 to-blue-600"
    },

    // Frontend Frameworks
    {
      title: "Next.js 14 Complete Guide",
      category: "Framework",
      type: "Video Course",
      rating: 4.9,
      downloads: 4982,
      featured: true,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "React Performance Optimization",
      category: "Library",
      type: "Guide",
      rating: 4.7,
      downloads: 3560,
      featured: true,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Advanced Vue 3 Patterns",
      category: "Framework",
      type: "Whitepaper",
      rating: 4.6,
      downloads: 1872,
      featured: false,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "SvelteKit in Production",
      category: "Framework",
      type: "Case Study",
      rating: 4.8,
      downloads: 1245,
      featured: false,
      color: "from-blue-600 to-blue-800"
    },

    // Backend Development
    {
      title: "Node.js Security Handbook",
      category: "Runtime",
      type: "eBook",
      rating: 4.8,
      downloads: 2872,
      featured: true,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Serverless Architecture Patterns",
      category: "Cloud",
      type: "Whitepaper",
      rating: 4.9,
      downloads: 1560,
      featured: true,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Microservices with Go",
      category: "Backend",
      type: "Video Course",
      rating: 4.7,
      downloads: 1320,
      featured: false,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Rust for Web APIs",
      category: "Backend",
      type: "Guide",
      rating: 4.8,
      downloads: 980,
      featured: false,
      color: "from-blue-500 to-blue-700"
    },

    // Databases
    {
      title: "PostgreSQL Optimization Guide",
      category: "Database",
      type: "eBook",
      rating: 4.9,
      downloads: 2743,
      featured: true,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "MongoDB Schema Design",
      category: "Database",
      type: "Course",
      rating: 4.7,
      downloads: 1560,
      featured: false,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Redis for Application Developers",
      category: "Database",
      type: "Guide",
      rating: 4.6,
      downloads: 1240,
      featured: false,
      color: "from-blue-500 to-blue-700"
    },

    // DevOps & Cloud
    {
      title: "Kubernetes in Production",
      category: "DevOps",
      type: "Case Study",
      rating: 4.9,
      downloads: 1980,
      featured: true,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "AWS Certified Architect Guide",
      category: "Cloud",
      type: "Study Guide",
      rating: 4.8,
      downloads: 3240,
      featured: true,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Terraform for Teams",
      category: "DevOps",
      type: "Video Course",
      rating: 4.7,
      downloads: 1120,
      featured: false,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Git Advanced Techniques",
      category: "DevOps",
      type: "Cheat Sheet",
      rating: 4.9,
      downloads: 5870,
      featured: true,
      color: "from-blue-400 to-blue-600"
    },

    // Mobile Development
    {
      title: "React Native Masterclass",
      category: "Mobile",
      type: "Video Course",
      rating: 4.8,
      downloads: 2240,
      featured: true,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Flutter Animations Guide",
      category: "Mobile",
      type: "Interactive Book",
      rating: 4.7,
      downloads: 1560,
      featured: false,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "SwiftUI for React Devs",
      category: "Mobile",
      type: "Guide",
      rating: 4.6,
      downloads: 980,
      featured: false,
      color: "from-blue-400 to-blue-600"
    },

    // AI & Machine Learning
    {
      title: "Practical ML with Python",
      category: "AI",
      type: "Course",
      rating: 4.8,
      downloads: 1870,
      featured: true,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "LLM Integration Patterns",
      category: "AI",
      type: "Whitepaper",
      rating: 4.9,
      downloads: 2540,
      featured: true,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "TensorFlow for Web Devs",
      category: "AI",
      type: "Guide",
      rating: 4.5,
      downloads: 1120,
      featured: false,
      color: "from-blue-400 to-blue-600"
    },

    // Testing & QA
    {
      title: "Cypress End-to-End Testing",
      category: "Testing",
      type: "Video Course",
      rating: 4.8,
      downloads: 1560,
      featured: false,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Jest Unit Testing Patterns",
      category: "Testing",
      type: "Cheat Sheet",
      rating: 4.7,
      downloads: 2240,
      featured: true,
      color: "from-blue-500 to-blue-700"
    },

    // Design Systems
    {
      title: "Tailwind CSS Design System",
      category: "CSS",
      type: "Template",
      rating: 4.9,
      downloads: 4105,
      featured: true,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Figma to React Components",
      category: "Design",
      type: "Workflow Guide",
      rating: 4.8,
      downloads: 1870,
      featured: false,
      color: "from-blue-600 to-blue-800"
    },

    // Career Growth
    {
      title: "Tech Interview Handbook 2024",
      category: "Career",
      type: "eBook",
      rating: 4.9,
      downloads: 6870,
      featured: true,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Senior Engineer Roadmap",
      category: "Career",
      type: "Interactive Guide",
      rating: 4.8,
      downloads: 3240,
      featured: true,
      color: "from-blue-400 to-blue-600"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Cosmic Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=10')] opacity-10"></div>
      </motion.div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=10')] bg-[length:60px_60px]"></div>
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
            Premium <span className="text-blue-500">Resources</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl leading-8 text-gray-300 max-w-3xl mx-auto">
            Expert-curated knowledge to accelerate your development
          </p>
          
          {/* Search Bar */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative max-w-2xl mx-auto mt-12"
          >
            <input
              type="text"
              placeholder="Search 30+ resources..."
              className="w-full bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl py-4 px-6 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
            <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-300" />
          </motion.div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['All', 'Featured', 'Language', 'Framework', 'Backend', 'Database', 'Cloud', 'Mobile', 'AI', 'Career'].map(category => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-sm font-medium text-gray-300 hover:text-blue-300 hover:border-blue-500/30 transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, i) => (
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
                delay: i * 0.05,
                hover: { duration: 0.3 }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 h-full flex flex-col"
            >
              {/* Featured Badge */}
              {resource.featured && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  Featured
                </div>
              )}

              {/* Gradient Highlight */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${resource.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition duration-300`}></div>
              
              <div className="relative h-full flex flex-col">
                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${resource.color} text-white`}>
                    {resource.category}
                  </span>
                  <span className="text-sm text-gray-400">{resource.type}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {resource.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(resource.rating) ? 
                        <FaStar key={i} className="w-4 h-4 text-blue-300" /> : 
                        <FaRegStar key={i} className="w-4 h-4 text-gray-600" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {resource.rating} ({resource.downloads.toLocaleString()} downloads)
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <FiDownload className="mr-2" />
                    Download
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-gray-200 transition-colors">
                    <FiExternalLink className="mr-2" />
                    Preview
                  </button>
                  <button className="text-gray-400 hover:text-blue-300 transition-colors">
                    {resource.featured ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                  </button>
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
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-800 to-blue-900 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-3xl font-bold text-white mb-4">
              Want access to our full resource library?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our premium membership for unlimited access to all 30+ resources, templates, and exclusive content.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              Become a Member
              <span className="ml-3">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}