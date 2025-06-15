'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiPause, FiPlay } from 'react-icons/fi';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar?: string;
  role?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Their innovative solutions transformed our business operations, delivering exceptional results.',
    author: 'John Doe',
    company: 'TechCorp',
    avatar: 'https://i.pravatar.cc/150?u=john',
    role: 'CEO',
  },
  {
    quote: 'A truly professional team that delivered a seamless and cutting-edge application.',
    author: 'Jane Smith',
    company: 'InnoVate',
    avatar: 'https://i.pravatar.cc/150?u=jane',
    role: 'Product Manager',
  },
  {
    quote: 'Unparalleled expertise and attention to detail. Our project was a massive success!',
    author: 'Alex Brown',
    company: 'FutureWorks',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    role: 'CTO',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Auto-scroll with progress bar
  useEffect(() => {
    if (!isPaused && isInView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setProgress(0); // Reset progress on slide change
      }, 6000);

      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return prev;
          return prev + 100 / (6000 / 50); // Update every 50ms
        });
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    }
  }, [isPaused, isInView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0); // Reset progress on manual navigation
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0); // Reset progress on manual navigation
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused) setProgress(0); // Reset progress when pausing
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
    initial: { opacity: 0, x: 100, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, x: -100, scale: 0.95, transition: { duration: 0.5 } },
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
      },
    },
  };

  return (
    <section
      className="relative py-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={ref}
    >
      {/* Cosmic Background */}
      <motion.div
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={childVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Voices of <span className="text-blue-500">Success</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hear from our clients about the transformative impact of our expertly crafted solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex justify-center"
            >
              <div className="w-full md:w-3/4 lg:w-2/3 bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl backdrop-blur-lg border border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-blue-900 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition duration-300"></div>
                <div className="relative flex flex-col items-center md:flex-row md:items-start mb-6">
                  {testimonials[currentIndex].avatar && (
                    <motion.img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].author}
                      className="w-20 h-20 rounded-full mr-0 md:mr-6 mb-4 md:mb-0 border-2 border-blue-300/50 object-cover group-hover:scale-105 transition-transform duration-300"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  <div className="text-center md:text-left">
                    <p className="text-xl font-semibold text-white">{testimonials[currentIndex].author}</p>
                    <p className="text-sm text-gray-300">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
                <p className="text-lg text-gray-200 italic leading-relaxed text-center">
                  "{testimonials[currentIndex].quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <motion.div
            variants={childVariants}
            className="relative w-full md:w-3/4 lg:w-2/3 mx-auto mt-6 h-1 bg-gray-700/50 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <motion.button
              onClick={handlePrev}
              variants={childVariants}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl group transition-all duration-300"
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-300"></span>
              <svg
                className="w-6 h-6 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={togglePause}
              variants={childVariants}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl group transition-all duration-300"
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-300"></span>
              {isPaused ? (
                <FiPlay className="w-6 h-6 relative" />
              ) : (
                <FiPause className="w-6 h-6 relative" />
              )}
            </motion.button>

            <motion.button
              onClick={handleNext}
              variants={childVariants}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl group transition-all duration-300"
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-300"></span>
              <svg
                className="w-6 h-6 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Dots for Navigation */}
          <motion.div variants={childVariants} className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setProgress(0); // Reset progress on manual selection
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-400/50 hover:bg-blue-300'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}