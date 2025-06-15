'use client';

import { motion, LazyMotion, domAnimation, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type HeroProps = {
  variant?: 'home' | 'about';
  title?: string;
  subtitle?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
};

const CosmicBackground = ({ variant }: { variant: 'home' | 'about' }) => {
  const { scrollYProgress } = useScroll();
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotateNegative = useTransform(rotate, (r) => -r * 1.5);

  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-[url('/images/cosmic-texture.png')] opacity-5"></div>
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      {variant === 'home' && (
        <>
          <motion.div
            style={{ y: y2, rotate }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square border border-orange-300/20 rounded-full"
          ></motion.div>
          <motion.div
            style={{ y: y2, rotate: rotateNegative }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square border border-orange-400/20 rounded-full"
          ></motion.div>
        </>
      )}
    </motion.div>
  );
};

export default function Hero({
  variant = 'home',
  ctaPrimary = { text: 'Start Your Project', href: '/contact' },
  ctaSecondary = { text: 'View Our Work', href: '/portfolio' },
}: HeroProps) {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);
  const scale = useSpring(scrollYProgress, { stiffness: 150, damping: 30, restDelta: 0.001 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const glowVariants = {
    initial: { boxShadow: '0 0 0 0 rgba(255, 165, 0, 0.3)' },
    animate: {
      boxShadow: ['0 0 0 0 rgba(255, 165, 0, 0.3)', '0 0 20px 10px rgba(255, 165, 0, 0.3)', '0 0 0 0 rgba(255, 165, 0, 0.3)'],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.section
        style={variant === 'about' ? { opacity: heroOpacity, scale: heroScale } : undefined}
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
      >
        {/* Cosmic Background */}
        {isClient && <CosmicBackground variant={variant} />}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative z-10 w-full">
          <div className="text-center">
            {/* Holographic Logo (home variant only) */}
            {variant === 'home' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-12"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block p-1 rounded-full bg-gradient-to-r from-orange-200 to-orange-300 shadow-md"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="p-1 rounded-full bg-gradient-to-r from-orange-300 to-orange-200"
                  >
                    <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-orange-300/30">
                      <Image
                        src="/images/logo.jpeg"
                        alt="Skycode Studio Logo"
                        width={128}
                        height={128}
                        className="object-contain p-4"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-orange-200 pointer-events-none"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Dynamic Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <TypeAnimation
                sequence={
                  variant === 'home'
                    ? [
                        'Craft Digital Futures',
                        2000,
                        'Innovate with Vision',
                        2000,
                        'Shape Tomorrow’s Tech',
                        2000,
                        'Elevate Digital Excellence',
                        2000,
                      ]
                    : [
                        'We Build the Future',
                        2000,
                        'We Transform Ideas',
                        2000,
                        'We Innovate Digital',
                        2000,
                        'We Create Impact',
                        2000,
                      ]
                }
                wrapper="h1"
                repeat={Infinity}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-12 text-gray-200 leading-relaxed font-medium"
              >
                {variant === 'home' ? (
                  <>
                    We craft{' '}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">
                      IT solutions
                    </span>{' '}
                    that transcend boundaries, merging cutting-edge technology with visionary design.
                  </>
                ) : (
                  <>
                    Crafting{' '}
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">
                      world-class digital solutions
                    </span>{' '}
                    with precision, creativity, and cutting-edge technology.
                  </>
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                {variant === 'about' ? (
                  <Link href={ctaPrimary.href}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px 10px rgba(255, 165, 0, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-orange-200 text-gray-900 rounded-full font-semibold text-lg hover:shadow-md transition-all duration-300 shadow-md flex items-center mx-auto"
                      aria-label={ctaPrimary.text}
                    >
                      {ctaPrimary.text}
                      <FiArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  </Link>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href={ctaPrimary.href}>
                        <motion.button
                          variants={glowVariants}
                          initial="initial"
                          animate="animate"
                          className="inline-flex items-center justify-center bg-orange-200 text-gray-900 font-bold py-5 px-10 rounded-xl transition-all duration-200 shadow-md relative overflow-hidden group"
                          aria-label={ctaPrimary.text}
                        >
                          <span className="relative z-10">{ctaPrimary.text}</span>
                          <FiArrowRight className="ml-3 text-gray-900 w-5 h-5 relative z-10" />
                          <span className="absolute inset-0 bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        </motion.button>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href={ctaSecondary.href}>
                        <button
                          className="inline-flex items-center justify-center bg-white/10 border-2 border-orange-300/30 font-bold py-5 px-10 rounded-xl backdrop-blur-sm hover:border-orange-300/60 transition-all duration-200 text-gray-200 shadow-md relative group"
                          aria-label={ctaSecondary.text}
                        >
                          <span className="relative">
                            {ctaSecondary.text}
                            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-orange-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                          </span>
                        </button>
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator (home variant only) */}
        {variant === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            aria-label="Scroll down to explore"
          >
          </motion.div>
        )}

        {/* Floating Orbs */}
        <motion.div
          style={{ scale }}
          className="fixed right-8 top-1/2 w-6 h-6 rounded-full bg-orange-200/30 shadow-md shadow-orange-300/20 pointer-events-none"
          animate={{ y: [0, -30, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="fixed left-12 top-1/3 w-8 h-8 rounded-full bg-orange-300/20 shadow-md shadow-orange-300/20 pointer-events-none"
          animate={{ y: [-20, 20, -20], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.section>
    </LazyMotion>
  );
}