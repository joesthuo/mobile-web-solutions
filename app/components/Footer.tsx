'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaLinkedin, FaTwitter, FaGithub, FaDribbble, 
  FaInstagram
} from 'react-icons/fa';
import { 
  FiMail, FiPhone, FiMapPin, FiArrowUp 
} from 'react-icons/fi';
import { SiUpwork, SiFiverr } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const services = [
    { name: 'Web Development', href: '/services/web' },
    { name: 'Mobile Apps', href: '/services/mobile' },
    { name: 'UI/UX Design', href: '/services/design' },
    { name: 'E-commerce Solutions', href: '/services/ecommerce' },
    { name: 'Cloud Consulting', href: '/services/cloud' },
    { name: 'AI Integration', href: '/services/ai' }
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Testimonials', href: '/testimonials' }
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/support' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
      </div>
      
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🚀</span>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light">
                  Skycode Studio
                </h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                We architect digital excellence, crafting innovative web and mobile experiences that drive business growth worldwide.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-4">
                <a href="#" className="text-white/70 hover:text-accent transition-colors" aria-label="LinkedIn">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-accent transition-colors" aria-label="Twitter">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-accent transition-colors" aria-label="GitHub">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-accent transition-colors" aria-label="Dribbble">
                  <FaDribbble className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-accent transition-colors" aria-label="Instagram">
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>

              {/* Freelance Platforms */}
              <div className="pt-4">
                <p className="text-sm text-white/60 mb-2">Also find us on:</p>
                <div className="flex gap-3">
                  <a href="#" className="text-white/70 hover:text-[#14a800] transition-colors" aria-label="Upwork">
                    <SiUpwork className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-[#1dbf73] transition-colors" aria-label="Fiverr">
                    <SiFiverr className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-accent transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-accent transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-accent transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <address className="not-italic space-y-3 text-white/80">
              <div className="flex items-start">
                <FiMapPin className="flex-shrink-0 mt-1 mr-3 text-accent" />
                <span>123 Tech Avenue<br />San Francisco, CA 94107<br />United States</span>
              </div>
              <div className="flex items-center">
                <FiMail className="flex-shrink-0 mr-3 text-accent" />
                <a href="mailto:info@skycodestudio.com" className="hover:text-accent transition-colors">
                  info@skycodestudio.com
                </a>
              </div>
              <div className="flex items-center">
                <FiPhone className="flex-shrink-0 mr-3 text-accent" />
                <a href="tel:+15551234567" className="hover:text-accent transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </address>

            {/* Newsletter */}
            <div className="pt-4">
              <h5 className="text-sm font-medium text-white mb-2">Subscribe to our newsletter</h5>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent w-full"
                />
                <button 
                  type="submit" 
                  className="bg-accent text-gray-900 px-4 py-2 rounded-r-lg hover:bg-accent-light transition-colors font-medium"
                >
                  Join
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-16 mb-8"
        ></motion.div>

        {/* Bottom Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-white/60 text-sm">
            © {currentYear} Skycode Studio. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0">
            {legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center text-sm text-white/70 hover:text-accent transition-colors group"
            aria-label="Back to top"
          >
            Back to top
            <FiArrowUp className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}