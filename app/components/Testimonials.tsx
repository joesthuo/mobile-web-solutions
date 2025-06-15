'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiPause, FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar?: string;
  role?: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Their innovative solutions transformed our business operations, delivering exceptional results beyond our expectations. The team demonstrated remarkable expertise and commitment throughout the engagement.',
    author: 'Johnathan Delacroix',
    company: 'TechCorp International',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Chief Executive Officer',
    rating: 5
  },
  {
    quote: 'A truly professional team that delivered a seamless and cutting-edge application with perfect execution. Their attention to detail and technical prowess set them apart in the industry.',
    author: 'Dr. Jane Smithson',
    company: 'InnoVate Solutions',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Director of Product Innovation',
    rating: 5
  },
  {
    quote: 'Unparalleled expertise and attention to detail. Our project was a massive success, achieving 300% ROI in the first quarter post-implementation. Simply outstanding work.',
    author: 'Alexander Brown',
    company: 'FutureWorks Global',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    role: 'Chief Technology Officer',
    rating: 5
  },
  {
    quote: 'The strategic insights provided by this team revolutionized our digital transformation journey. Their solutions are elegant, scalable, and precisely tailored to our needs.',
    author: 'Sophia Chen',
    company: 'OmniDigital',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    role: 'VP of Engineering',
    rating: 5
  },
  {
    quote: "Working with this team was a game-changer for our organization. They delivered ahead of schedule while maintaining the highest quality standards we've ever experienced.",
    author: 'Michael Rodriguez',
    company: 'Nexus Enterprises',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    role: 'Chief Digital Officer',
    rating: 5
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Auto-scroll with progress bar
  useEffect(() => {
    if (!isPaused && isInView) {
      const interval = setInterval(() => {
        setDirection('next');
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setProgress(0);
      }, 8000);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return prev;
          return prev + 100 / (8000 / 50);
        });
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    }
  }, [isPaused, isInView]); // Removed testimonials.length from dependencies

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused) setProgress(0);
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setProgress(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    initial: (direction: string) => ({
      opacity: 0,
      x: direction === 'next' ? 100 : -100,
      scale: 0.95,
      filter: 'blur(2px)'
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.7, 
        type: 'spring', 
        stiffness: 100,
        damping: 15
      }
    },
    exit: (direction: string) => ({
      opacity: 0,
      x: direction === 'next' ? -100 : 100,
      scale: 0.95,
      filter: 'blur(2px)',
      transition: { duration: 0.5 }
    }),
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300
      }
    })
  };

  return (
    <section
      className="relative py-28 overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900"
      ref={ref}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 100],
              x: [null, (Math.random() - 0.5) * 100],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
        ))}
      </div>

      <div className="max-w-8xl mx-auto px-6 relative z-10">
        <motion.div
          variants={childVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Trusted
            </span>{' '}
            by Industry Leaders
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied clients who have transformed their businesses with our solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[500px] perspective-1000">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex justify-center items-center"
              >
                <div className="w-full max-w-4xl bg-gray-900/70 backdrop-blur-lg rounded-3xl border border-gray-700/50 p-10 shadow-2xl overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Quote marks */}
                  <div className="absolute top-10 left-10 text-blue-500/10 text-9xl font-serif select-none">
                    &quot;
                  </div>
                  
                  <div className="relative z-10 flex flex-col lg:flex-row gap-10">
                    <div className="flex-shrink-0">
                      {testimonials[currentIndex].avatar && (
                        <motion.div
                          className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-lg"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <Image
                            src={testimonials[currentIndex].avatar}
                            alt={testimonials[currentIndex].author}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30" />
                        </motion.div>
                      )}
                      
                      {/* Rating stars */}
                      {testimonials[currentIndex].rating && (
                        <motion.div 
                          className="flex justify-center lg:justify-start mt-4"
                          initial="hidden"
                          animate="visible"
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.svg
                              key={i}
                              custom={i}
                              variants={starVariants}
                              className={`w-6 h-6 ${i < (testimonials[currentIndex].rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </motion.svg>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <motion.blockquote 
                        className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {testimonials[currentIndex].quote}
                      </motion.blockquote>
                      
                      <motion.div 
                        className="mt-8 border-t border-gray-800 pt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-lg font-semibold text-white">
                          {testimonials[currentIndex].author}
                        </p>
                        <p className="text-sm text-gray-400">
                          {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <motion.div
            variants={childVariants}
            className="relative w-full max-w-4xl mx-auto mt-8 h-1.5 bg-gray-800 rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-10 gap-4">
            <motion.button
              onClick={handlePrev}
              variants={childVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={togglePause}
              variants={childVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
              aria-label={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? (
                <FiPlay className="w-6 h-6" />
              ) : (
                <FiPause className="w-6 h-6" />
              )}
            </motion.button>

            <motion.button
              onClick={handleNext}
              variants={childVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots for Navigation */}
          <motion.div 
            variants={childVariants}
            className="flex justify-center mt-8 gap-2"
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-600 hover:bg-blue-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}