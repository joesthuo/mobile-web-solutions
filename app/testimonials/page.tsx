'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'Senior Frontend Developer',
    company: 'TechCorp',
    quote: 'The resources here transformed our team’s workflow. The in-depth guides and premium content are unmatched.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: true,
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'DevOps Engineer',
    company: 'CloudScale',
    quote: 'The Kubernetes case studies provided actionable insights that saved us weeks of trial and error.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: false,
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 't3',
    name: 'Emily Davis',
    role: 'AI Researcher',
    company: 'InnovateAI',
    quote: 'The AI integration whitepapers are a goldmine for anyone building production-grade LLM applications.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: true,
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 't4',
    name: 'James Patel',
    role: 'Backend Developer',
    company: 'DataSync',
    quote: 'The Node.js security blueprint was a game-changer for our API protection strategy.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: false,
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 't5',
    name: 'Laura Martinez',
    role: 'Mobile Developer',
    company: 'AppVibe',
    quote: 'The React Native course helped us ship a cross-platform app faster than we thought possible.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: true,
    color: 'from-blue-500 to-blue-700'
  }
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredTestimonials = activeFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.featured);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Cosmic Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=10')] opacity-10" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center px-6 py-2 bg-gray-800/50 rounded-full mb-6 backdrop-blur-sm border border-gray-700/50">
            <span className="text-sm font-semibold text-blue-300">CLIENT TESTIMONIALS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Voices of <span className="text-blue-500">Testimonials</span>
          </h1>
          <p className="text-xl md:text-2xl leading-8 text-gray-300 max-w-3xl mx-auto">
            Trusted by industry leaders who've transformed their businesses with our solutions
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-16"
        >
          {['All', 'Featured'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveFilter(filter);
                setCurrentSlide(0);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 border border-gray-700/50'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative h-[600px] w-full overflow-hidden">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0.3,
                x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100,
                scale: index === currentSlide ? 1 : 0.95
              }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12 p-8 ${index === currentSlide ? 'z-10' : 'z-0'}`}
            >
              {/* Client Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  priority={index <= 2}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${testimonial.color} opacity-60`} />
                {testimonial.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </div>
                )}
              </motion.div>

              {/* Testimonial Content */}
              <div className="max-w-2xl">
                <FaQuoteLeft className="text-5xl text-blue-400/30 mb-6" />
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl md:text-4xl font-light leading-tight text-white mb-8"
                >
                  {testimonial.quote}
                </motion.blockquote>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-blue-500 to-blue-600" />
                  <div>
                    <p className="text-xl font-semibold text-white">{testimonial.name}</p>
                    <p className="text-lg text-gray-300">{testimonial.role}, {testimonial.company}</p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-blue-300' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Navigation Controls */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md border border-gray-700/50 flex items-center justify-center text-white hover:bg-gray-800/70 transition-all"
          >
            <FaChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md border border-gray-700/50 flex items-center justify-center text-white hover:bg-gray-800/70 transition-all"
          >
            <FaChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Pagination Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-blue-400 w-6' : 'bg-gray-600/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
            <p className="text-center text-lg text-gray-300 mb-6">Trusted by innovative companies worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
              ].map((logo, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50"
                >
                  <Image
                    src={logo}
                    alt="Trusted company"
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}