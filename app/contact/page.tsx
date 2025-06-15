'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaWhatsapp, FaGithub } from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import LocationMap from '../components/LocationMap';

// Define contact methods with cosmic theme gradients
const contactMethods = [
  {
    icon: <FiMail className="w-7 h-7 text-white" />,
    title: 'Email Us',
    description: 'Get a personalized response within 24 hours',
    details: 'hello@skycodestudio.com',
    action: 'mailto:hello@skycodestudio.com',
    color: 'from-blue-600 to-blue-800',
    backgroundColor: 'from-blue-600/10 to-blue-800/10',
  },
  {
    icon: <FiPhone className="w-7 h-7 text-white" />,
    title: 'Call Us',
    description: 'Available Monday-Friday, 9 AM to 5 PM PST',
    details: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
    color: 'from-blue-500 to-blue-700',
    backgroundColor: 'from-blue-500/10 to-blue-700/10',
  },
  {
    icon: <FaWhatsapp className="w-7 h-7 text-white" />,
    title: 'WhatsApp',
    description: 'Instant messaging support, 24/7',
    details: '+1 (555) 123-4567',
    action: 'https://wa.me/15551234567',
    color: 'from-blue-400 to-blue-600',
    backgroundColor: 'from-blue-400/10 to-blue-600/10',
  },
];

// Social links with cosmic theme gradients
const socialLinks = [
  {
    icon: <FaLinkedin className="w-6 h-6 text-white" />,
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/skycodestudio',
    color: 'from-blue-500/50 to-blue-600/50',
    ariaLabel: 'Visit our LinkedIn profile',
  },
  {
    icon: <FaTwitter className="w-6 h-6 text-white" />,
    name: 'Twitter',
    url: 'https://twitter.com/skycodestudio',
    color: 'from-blue-400/50 to-blue-500/50',
    ariaLabel: 'Visit our Twitter profile',
  },
  {
    icon: <FaGithub className="w-6 h-6 text-white" />,
    name: 'GitHub',
    url: 'https://github.com/skycodestudio',
    color: 'from-gray-600/50 to-gray-700/50',
    ariaLabel: 'Visit our GitHub profile',
  },
  {
    icon: <FiMail className="w-6 h-6 text-white" />,
    name: 'Email',
    url: 'mailto:hello@skycodestudio.com',
    color: 'from-blue-600/50 to-blue-700/50',
    ariaLabel: 'Email us',
  },
];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'map'>('form');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    toast.success('Message sent successfully!', { duration: 4000 });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleTabChange = (tab: 'form' | 'map') => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
            }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mb-4"
          />
          <div className="h-4 w-40 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-pulse" />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans"
      ref={containerRef}
    >
      {/* Cosmic Background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50 text-white text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Let's Collaborate
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Let's <span className="text-blue-500">Create</span><br />Something Extraordinary
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Our team is passionate about turning your ideas into reality. Reach out to start building something remarkable.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                onHoverStart={() => !isMobile && setHoveredCard(index)}
                onHoverEnd={() => !isMobile && setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <ContactCard
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                  details={method.details}
                  action={method.action}
                  color={method.color}
                  backgroundColor={method.backgroundColor}
                  isHovered={hoveredCard === index}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">Follow our journey and stay updated with our latest innovations.</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className={`${social.color} hover:opacity-90 text-white p-3 rounded-full transition-all shadow-md hover:shadow-lg`}
                    aria-label={social.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Form/Map Toggle */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex border-b border-gray-700/50 mb-8 bg-gray-800/50 backdrop-blur-sm rounded-t-2xl"
            >
              <button
                onClick={() => handleTabChange('form')}
                className={`relative flex-1 px-6 py-3 font-medium text-lg flex items-center justify-center ${
                  activeTab === 'form' ? 'text-white bg-gray-800/70' : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                } transition-all duration-300`}
                aria-current={activeTab === 'form' ? 'page' : undefined}
              >
                {activeTab === 'form' && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <RiSendPlaneFill className="mr-2" />
                Send a Message
              </button>
              <button
                onClick={() => handleTabChange('map')}
                className={`relative flex-1 px-6 py-3 font-medium text-lg flex items-center justify-center ${
                  activeTab === 'map' ? 'text-white bg-gray-800/70' : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                } transition-all duration-300`}
                aria-current={activeTab === 'map' ? 'page' : undefined}
              >
                {activeTab === 'map' && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <FiMapPin className="mr-2" />
                Visit Our Office
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-gray-700/50"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        <FiCheckCircle className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                      <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out. We&apos;ve received your message and our team will respond within 24 hours.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormSubmitted(false)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg transition-all flex items-center mx-auto"
                      >
                        Send Another Message
                        <FiArrowRight className="ml-2" />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <ContactForm
                      onSubmitSuccess={handleFormSubmit}
                      darkMode={true}
                      autoDetectSentiment={true}
                      enableAI={true}
                      analyticsEnabled={true}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/50"
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-700/50"
                >
                  <LocationMap
                    initialLocation={{ lng: -122.3321, lat: 47.6062, zoom: 12 }}
                    markerColor="#3B82F6"
                    className="h-[500px]"
                  />
                  <div className="p-8">
                    <div className="flex items-start">
                      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 mr-4">
                        <FiMapPin className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Global Headquarters</h4>
                        <p className="text-gray-300 mb-4 leading-relaxed">123 Tech Avenue, San Francisco, CA 94107, USA</p>
                        <motion.a
                          href="https://maps.google.com/?q=123+Tech+Avenue,+San+Francisco,+CA+94107"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 4 }}
                          className="text-white inline-flex items-center font-medium bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-full hover:shadow-lg transition-all"
                        >
                          Get Directions <FiArrowRight className="ml-2" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-32 pt-16 border-t border-gray-700/50"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-gray-300 text-center mb-12 font-medium"
          >
            Trusted by Industry Leaders
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {[
              { name: 'TechCorp', delay: 0 },
              { name: 'InnoVate', delay: 0.1 },
              { name: 'DigitalX', delay: 0.2 },
              { name: 'FutureLabs', delay: 0.3 },
              { name: 'Nexus', delay: 0.4 },
            ].map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: client.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-gray-300 hover:text-white text-2xl font-bold tracking-tight opacity-80 hover:opacity-100 transition-all duration-300"
              >
                {client.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}