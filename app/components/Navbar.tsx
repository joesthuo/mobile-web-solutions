'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown, FiSearch } from 'react-icons/fi'
import { FaRegGem } from 'react-icons/fa'
import { IoMdNotificationsOutline } from 'react-icons/io'

interface SubItem {
  name: string
  href: string
  description: string
}

interface NavItem {
  name: string
  href: string
  subItems?: SubItem[]
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/home' },
    {
      name: 'Services',
      href: '/services',
      subItems: [
        { name: 'Web Development', href: '/services/web', description: 'Modern web solutions' },
        { name: 'Mobile Apps', href: '/services/mobile', description: 'iOS & Android excellence' },
        { name: 'UI/UX Design', href: '/services/design', description: 'Beautiful interfaces' },
        { name: 'Consulting', href: '/services/consulting', description: 'Strategic guidance' }
      ]
    },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-8xl mx-auto px-6 py-3 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animated gradient */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaRegGem className="text-2xl bg-gradient-to-r from-emerald-500 to-violet-600 bg-clip-text text-transparent" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-violet-700 bg-clip-text text-transparent">
                Skycode Studio
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${scrolled ? 'text-gray-200 hover:text-emerald-400' : 'text-white hover:text-violet-300'}`}
                  >
                    {item.name}
                    {item.subItems && (
                      <FiChevronDown className={`ml-1 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''} ${scrolled ? 'text-gray-200' : 'text-white'}`} />
                    )}
                  </Link>
                </div>
                
                {item.subItems && (
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-64 origin-top-right rounded-xl bg-gray-800 shadow-xl ring-1 ring-gray-700/5 backdrop-blur-md"
                      >
                        <div className="p-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors group"
                            >
                              <span className="font-medium text-gray-100 group-hover:text-emerald-400">{subItem.name}</span>
                              <p className="text-xs text-gray-400 mt-1">{subItem.description}</p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-full ${scrolled ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-800/20'}`}
            >
              <FiSearch className="h-5 w-5" />
            </button>
            
            <button className={`p-2 rounded-full ${scrolled ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-800/20'}`}>
              <IoMdNotificationsOutline className="h-5 w-5" />
            </button>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full transition-all bg-gradient-to-r from-emerald-500 to-violet-600 text-white hover:from-emerald-600 hover:to-violet-700 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled ? 'text-gray-200' : 'text-white'}`}
              aria-label="Main menu"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="relative top-1/4 mx-auto max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-6 py-4 pr-12 rounded-xl text-lg border-0 bg-gray-800 text-gray-100 shadow-xl focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400"
                  onClick={() => setSearchOpen(false)}
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden fixed inset-0 top-16 bg-gray-900 z-40"
          >
            <div className="px-6 pt-2 pb-4 space-y-1 h-full overflow-y-auto">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-700 bg-gray-800 text-gray-100"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-700 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="block px-3 py-4 text-base font-medium rounded-lg text-gray-200 hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <button 
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault()
                          setActiveSubmenu(activeSubmenu === item.name ? null : item.name)
                        }}
                        className="p-2"
                      >
                        <FiChevronDown className={`transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''} text-gray-200`} />
                      </button>
                    )}
                  </div>
                  
                  {item.subItems && activeSubmenu === item.name && (
                    <div className="pl-4 py-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-3 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="font-medium">{subItem.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{subItem.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-3 text-base font-medium rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-violet-600 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}