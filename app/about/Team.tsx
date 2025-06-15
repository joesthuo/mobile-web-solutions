'use client';

import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  quote?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export default function TeamCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const team: TeamMember[] = [
    { 
      name: 'Jane Doe', 
      role: 'CEO & Founder', 
      image: '/images/female1.jpeg', 
      bio: 'Visionary leader with 15+ years in tech innovation and business strategy.',
      quote: "Building the future requires both vision and execution.",
      socials: {
        linkedin: '#',
        twitter: '#',
      }
    },
    { 
      name: 'John Smith', 
      role: 'CTO', 
      image: '/images/male1.jpeg', 
      bio: 'Architect of scalable systems with deep expertise in cloud infrastructure.',
      quote: "Great technology should disappear into the background of great experiences.",
      socials: {
        linkedin: '#',
        github: '#',
      }
    },
    { 
      name: 'Emily Chen', 
      role: 'Lead Designer', 
      image: '/images/female2.jpeg', 
      bio: 'Crafting intuitive experiences that users love and remember.',
      quote: "Design isn't just what it looks like, it's how it works and feels.",
      socials: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      }
    },
    { 
      name: 'Michael Brown', 
      role: 'Lead Backend Engineer', 
      image: '/images/male2.jpeg', 
      bio: 'Expert in building robust APIs and microservices with Node.js and Go.',
      quote: "Scalable systems are the backbone of seamless user experiences.",
      socials: {
        linkedin: '#',
        github: '#',
      }
    },
    { 
      name: 'Sarah Johnson', 
      role: 'Data Scientist', 
      image: '/images/female3.jpeg', 
      bio: 'Transforming data into actionable insights using advanced ML models.',
      quote: "Data tells stories; we just need to listen and act.",
      socials: {
        linkedin: '#',
        twitter: '#',
      }
    },
    { 
      name: 'David Kim', 
      role: 'DevOps Engineer', 
      image: '/images/male3.jpeg', 
      bio: 'Streamlining CI/CD pipelines for rapid and reliable deployments.',
      quote: "Automation is the key to efficiency and reliability.",
      socials: {
        linkedin: '#',
        github: '#',
      }
    },
    { 
      name: 'Laura Martinez', 
      role: 'Product Manager', 
      image: '/images/female4.jpeg', 
      bio: 'Bridging user needs and technical solutions to deliver value.',
      quote: "Great products solve real problems with elegant simplicity.",
      socials: {
        linkedin: '#',
        twitter: '#',
      }
    },
    { 
      name: 'Chris Lee', 
      role: 'Frontend Engineer', 
      image: '/images/male4.jpeg', 
      bio: 'Building responsive and performant UIs with React and TypeScript.',
      quote: "A great UI is invisible yet unforgettable.",
      socials: {
        linkedin: '#',
        github: '#',
      }
    },
    { 
      name: 'Anna Patel', 
      role: 'UX Researcher', 
      image: '/images/female5.jpeg', 
      bio: 'Uncovering user insights to drive intuitive product designs.',
      quote: "Understanding users is the foundation of great design.",
      socials: {
        linkedin: '#',
        twitter: '#',
      }
    },
    { 
      name: 'Tom Nguyen', 
      role: 'Security Engineer', 
      image: '/images/male5.jpeg', 
      bio: 'Ensuring robust security practices across systems and applications.',
      quote: "Security is not an afterthought; it’s a mindset.",
      socials: {
        linkedin: '#',
        github: '#',
      }
    },
    { 
      name: 'Rachel Green', 
      role: 'Marketing Lead', 
      image: '/images/female6.jpeg', 
      bio: 'Crafting compelling narratives to connect with global audiences.',
      quote: "Authenticity in storytelling builds lasting connections.",
      socials: {
        linkedin: '#',
        twitter: '#',
      }
    },
    { 
      name: 'James Carter', 
      role: 'AI Engineer', 
      image: '/images/male6.jpeg', 
      bio: 'Developing cutting-edge AI solutions for real-world applications.',
      quote: "AI empowers us to solve problems we never thought possible.",
      socials: {
        linkedin: '#',
        github: '#',
      }
    },
    { 
      name: 'Sophie Adams', 
      role: 'Mobile Developer', 
      image: '/images/female7.jpeg', 
      bio: 'Creating seamless mobile experiences with Flutter and Swift.',
      quote: "Mobile apps should feel like an extension of the user.",
      socials: {
        linkedin: '#',
        github: '#',
      }
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === team.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [team.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === team.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? team.length - 1 : prev - 1));
  };

  return (
    <section className="relative overflow-hidden py-32">
      {/* Cosmic Background inspired by CoreValues */}
      <motion.div 
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Meet Our <span className="text-blue-500">Visionaries</span>
          </h2>
          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
            The brilliant minds driving innovation at our company
          </p>
        </motion.div>

        <div ref={ref} className="relative h-[600px] md:h-[700px]">
          <AnimatePresence mode="wait">
            {team.map((member, index) => (
              currentIndex === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index > currentIndex ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index < currentIndex ? 100 : -100 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12"
                >
                  {/* Circular Image Container with Enhanced Decorative Elements */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-800/50 shadow-2xl overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 256px, 320px"
                      />
                    </div>
                    {/* Floating decorative circles with CoreValues-inspired gradients */}
                    <motion.div 
                      animate={{ 
                        rotate: 360,
                        transition: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute -top-8 -left-8 w-32 h-32 rounded-full border-2 border-blue-500/30"
                    />
                    <motion.div 
                      animate={{ 
                        rotate: -360,
                        transition: { duration: 25, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border-2 border-blue-500/30"
                    />
                    {/* Glow effect with gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/10 to-blue-400/10 pointer-events-none"></div>
                  </div>

                  {/* Content with CoreValues-inspired styling */}
                  <div className="max-w-md text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="group relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/20"
                    >
                      {/* Gradient Highlight */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-blue-900 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition duration-300"></div>
                      
                      <div className="relative">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{member.name}</h3>
                        <p className="text-lg text-blue-500 font-medium mb-6">{member.role}</p>
                        
                        {/* Quote */}
                        <div className="relative mb-8">
                          <FaQuoteLeft className="absolute -top-4 -left-2 text-blue-200 text-3xl" />
                          <p className="text-xl italic text-gray-300 pl-8">{member.quote}</p>
                        </div>
                        
                        <p className="text-gray-300 mb-8">{member.bio}</p>
                        
                        {/* Social links */}
                        <div className="flex justify-center md:justify-start space-x-4">
                          {member.socials?.linkedin && (
                            <motion.a 
                              whileHover={{ y: -3 }}
                              href={member.socials.linkedin} 
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <FaLinkedin className="w-6 h-6" />
                            </motion.a>
                          )}
                          {member.socials?.twitter && (
                            <motion.a 
                              whileHover={{ y: -3 }}
                              href={member.socials.twitter} 
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <FaTwitter className="w-6 h-6" />
                            </motion.a>
                          )}
                          {member.socials?.github && (
                            <motion.a 
                              whileHover={{ y: -3 }}
                              href={member.socials.github} 
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <FaGithub className="w-6 h-6" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-blue-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-blue-900/80 border border-gray-700/50"
          >
            <FaChevronLeft className="text-blue-500 w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-blue-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-blue-900/80 border border-gray-700/50"
          >
            <FaChevronRight className="text-blue-500 w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {team.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-blue-500 w-6' : 'bg-gray-400/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}