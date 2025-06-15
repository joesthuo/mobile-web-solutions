'use client';

import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FiSend, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiLoader,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiX,
  FiChevronDown,
  FiInfo
} from 'react-icons/fi';
import { FaRobot, FaMagic, FaRegLightbulb } from 'react-icons/fa';
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from 'react-icons/ri';
import { z } from 'zod';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
  consent: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
});

// Types
type FormData = z.infer<typeof formSchema> & { consent: boolean };
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type MessageSentiment = 'positive' | 'neutral' | 'negative';

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  className?: string;
  darkMode?: boolean;
  autoDetectSentiment?: boolean;
  enableAI?: boolean;
  apiEndpoint?: string;
  analyticsEnabled?: boolean;
}

export default function ContactForm({
  onSubmitSuccess,
  className = '',
  darkMode = false,
  autoDetectSentiment = true,
  enableAI = true,
  apiEndpoint = '/api/contact',
  analyticsEnabled = true,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [sentiment, setSentiment] = useState<MessageSentiment>('neutral');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [debouncedMessage] = useDebounce(formData.message, 500);
  
  const formRef = useRef(null);

  // Analyze message sentiment and content
  const analyzeMessage = useCallback(async (text: string) => {
    if (!autoDetectSentiment || text.length < 10) return;

    try {
      // Simulated AI analysis (replace with real API call in production)
      const positiveWords = ['thank', 'appreciate', 'great', 'excellent', 'happy', 'pleased'];
      const negativeWords = ['urgent', 'problem', 'angry', 'frustrated', 'disappointed', 'unhappy'];
      
      const detectedSentiment = 
        positiveWords.some(w => text.toLowerCase().includes(w)) ? 'positive' :
        negativeWords.some(w => text.toLowerCase().includes(w)) ? 'negative' : 'neutral';
      
      setSentiment(detectedSentiment);

      if (enableAI) {
        const suggestions: string[] = [];
        if (text.length < 25) suggestions.push('Consider adding more details about your request');
        if (!text.includes('?')) suggestions.push('You might want to ask a specific question');
        if (text.split(' ').length < 5) suggestions.push('Try to elaborate more for better assistance');
        if (!text.match(/[.!?]/)) suggestions.push('Add punctuation for clarity');
        if (text.match(/([a-zA-Z])\1{2,}/)) suggestions.push('Check for repeated characters or typos');

        setAiSuggestions(suggestions);
      }

      // Track analytics event
      if (analyticsEnabled) {
        // analytics.track('MessageAnalyzed', { sentiment: detectedSentiment, messageLength: text.length });
      }
    } catch (err) {
      console.error('Sentiment analysis failed:', err);
    }
  }, [autoDetectSentiment, enableAI, analyticsEnabled]);

  useEffect(() => {
    analyzeMessage(debouncedMessage);
  }, [debouncedMessage, analyzeMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    // Validate form with Zod
    const validationResult = formSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<Record<keyof FormData, string>>);
      setStatus('error');
      return;
    }

    try {
      // Make API call
      const response = await axios.post(apiEndpoint, formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });

      if (response.status === 200) {
        setStatus('success');
        if (onSubmitSuccess) onSubmitSuccess();
        
        // Track analytics event
        if (analyticsEnabled) {
          // analytics.track('FormSubmitted', { success: true });
        }

        // Reset form after delay
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '', consent: false });
          setStatus('idle');
          setSentiment('neutral');
          setAiSuggestions([]);
        }, 4000);
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Message delivery failed. Please try again.'
        : 'An unexpected error occurred.';
      setErrors({ message: errorMessage });
      setStatus('error');
      
      if (analyticsEnabled) {
        // analytics.track('FormSubmitted', { success: false, error: errorMessage });
      }
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getSentimentIcon = () => {
    switch (sentiment) {
      case 'positive': return <RiEmotionHappyLine className="w-5 h-5" />;
      case 'negative': return <RiEmotionUnhappyLine className="w-5 h-5" />;
      default: return <FaRobot className="w-5 h-5" />;
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className={`
          ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}
          rounded-2xl shadow-2xl overflow-hidden transition-all duration-300
          ${isMinimized ? 'max-h-16' : 'max-h-[1000px]'}
          ${className}
          font-sans
        `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        role="region"
        aria-label="Contact Form"
      >
        {/* Header */}
        <div 
          className={`
            flex justify-between items-center p-5 cursor-pointer
            ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}
            transition-colors
          `}
          onClick={toggleMinimize}
          role="button"
          aria-expanded={!isMinimized}
          aria-label="Toggle contact form"
        >
          <h2 className="text-xl font-semibold flex items-center">
            <FiMessageSquare className="mr-3" />
            Contact Us
          </h2>
          <motion.div
            animate={{ rotate: isMinimized ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {!isMinimized && (
          <div className="p-6 sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <motion.label
                    htmlFor="name"
                    animate={{
                      y: formData.name ? -8 : 0,
                      scale: formData.name ? 0.85 : 1,
                    }}
                    className={`
                      absolute left-3 top-3 px-1 text-sm font-medium pointer-events-none
                      ${darkMode ? 
                        formData.name ? 'bg-gray-900 text-blue-400' : 'text-gray-400' :
                        formData.name ? 'bg-white text-blue-600' : 'text-gray-500'
                      }
                      transition-all duration-200
                    `}
                  >
                    Full Name
                  </motion.label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <FiUser className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`
                        w-full pl-10 pr-4 py-3 rounded-xl border-2
                        ${darkMode ? 
                          'bg-gray-800 border-gray-700 focus:border-blue-500 text-gray-100' : 
                          'bg-white border-gray-200 focus:border-blue-400 text-gray-800'
                        }
                        transition-all duration-300 outline-none
                        ${status === 'submitting' ? 'opacity-70' : ''}
                        ${errors.name ? 'border-red-500' : ''}
                      `}
                      disabled={status === 'submitting'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <motion.label
                    htmlFor="email"
                    animate={{
                      y: formData.email ? -8 : 0,
                      scale: formData.email ? 0.85 : 1,
                    }}
                    className={`
                      absolute left-3 top-3 px-1 text-sm font-medium pointer-events-none
                      ${darkMode ? 
                        formData.email ? 'bg-gray-900 text-purple-400' : 'text-gray-400' :
                        formData.email ? 'bg-white text-purple-600' : 'text-gray-500'
                      }
                      transition-all duration-200
                    `}
                  >
                    Email Address
                  </motion.label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <FiMail className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`
                        w-full pl-10 pr-4 py-3 rounded-xl border-2
                        ${darkMode ? 
                          'bg-gray-800 border-gray-700 focus:border-purple-500 text-gray-100' : 
                          'bg-white border-gray-200 focus:border-purple-400 text-gray-800'
                        }
                        transition-all duration-300 outline-none
                        ${status === 'submitting' ? 'opacity-70' : ''}
                        ${errors.email ? 'border-red-500' : ''}
                      `}
                      disabled={status === 'submitting'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <motion.label
                    htmlFor="message"
                    animate={{
                      y: formData.message ? -8 : 0,
                      scale: formData.message ? 0.85 : 1,
                    }}
                    className={`
                      absolute left-3 top-3 px-1 text-sm font-medium pointer-events-none
                      ${darkMode ? 
                        formData.message ? 'bg-gray-900 text-teal-400' : 'text-gray-400' :
                        formData.message ? 'bg-white text-teal-600' : 'text-gray-500'
                      }
                      transition-all duration-200
                    `}
                  >
                    Your Message
                  </motion.label>
                  <div className="relative">
                    <div className="absolute left-3 top-3">
                      <FiMessageSquare className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`
                        w-full pl-10 pr-4 py-3 rounded-xl border-2 min-h-[150px]
                        ${darkMode ? 
                          'bg-gray-800 border-gray-700 focus:border-teal-500 text-gray-100' : 
                          'bg-white border-gray-200 focus:border-teal-400 text-gray-800'
                        }
                        transition-all duration-300 outline-none
                        ${status === 'submitting' ? 'opacity-70' : ''}
                        ${errors.message ? 'border-red-500' : ''}
                      `}
                      disabled={status === 'submitting'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      placeholder="Enter your message"
                    />
                  </div>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className={`
                      w-4 h-4 rounded border-2
                      ${darkMode ? 'border-gray-600' : 'border-gray-300'}
                      focus:ring-2 focus:ring-blue-500
                    `}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                  />
                  <label
                    htmlFor="consent"
                    className={`
                      text-sm
                      ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                    `}
                  >
                    I agree to the{' '}
                    <a
                      href="/privacy-policy"
                      className={`
                        underline
                        ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                      `}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </motion.div>
                {errors.consent && (
                  <p id="consent-error" className="mt-1 text-sm text-red-500">{errors.consent}</p>
                )}

                {/* AI Analysis Panel */}
                {enableAI && formData.message.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className={`
                      mt-4 p-4 rounded-lg
                      ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}
                    `}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getSentimentIcon()}
                        <span className={`
                          text-xs font-medium px-2 py-1 rounded-full
                          ${sentiment === 'positive' ? 
                            darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800' :
                            sentiment === 'negative' ?
                              darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800' :
                              darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                          }
                        `}>
                          {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} Tone
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaRegLightbulb className={`
                          ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}
                        `} />
                        <span className="text-xs font-semibold">AI-Powered Analysis</span>
                      </div>
                    </div>

                    {aiSuggestions.length > 0 && (
                      <div className="mt-3">
                        <p className={`
                          text-xs font-medium mb-2
                          ${darkMode ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                          Suggestions to enhance your message:
                        </p>
                        <ul className="space-y-2">
                          {aiSuggestions.map((suggestion, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start"
                            >
                              <FaMagic className={`
                                mt-0.5 mr-2 flex-shrink-0
                                ${darkMode ? 'text-purple-400' : 'text-purple-600'}
                              `} />
                              <span className={`
                                text-sm
                                ${darkMode ? 'text-gray-300' : 'text-gray-700'}
                              `}>
                                {suggestion}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Status Messages */}
              <AnimatePresence>
                {Object.keys(errors).length > 0 && !errors.consent && (
                  <motion.div
                    key="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      p-4 rounded-lg flex items-start
                      ${darkMode ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'}
                    `}
                    role="alert"
                  >
                    <FiAlertCircle className={`
                      mt-0.5 mr-2 flex-shrink-0
                      ${darkMode ? 'text-red-400' : 'text-red-600'}
                    `} />
                    <div>
                      <p className={`
                        text-sm font-medium
                        ${darkMode ? 'text-red-300' : 'text-red-800'}
                      `}>
                        Please correct the errors in the form.
                      </p>
                    </div>
                    <button
                      onClick={() => setErrors({})}
                      className={`
                        ml-auto p-1 rounded-full
                        ${darkMode ? 'hover:bg-red-800' : 'hover:bg-red-100'}
                      `}
                      aria-label="Close error message"
                    >
                      <FiX className={darkMode ? 'text-red-400' : 'text-red-600'} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-white transition-all
                    relative overflow-hidden group
                    ${status === 'submitting' ? 
                      'bg-blue-400 cursor-not-allowed' : 
                      darkMode ? 
                        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' :
                        'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }
                    shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  `}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {status === 'submitting' ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Message
                      </>
                    )}
                  </span>
                  <span className={`
                    absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400
                    opacity-0 group-hover:opacity-20 transition-opacity
                  `}></span>
                </button>
              </motion.div>
            </form>

            {/* Success Message */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    mt-6 p-4 rounded-lg flex items-center
                    ${darkMode ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'}
                  `}
                  role="alert"
                >
                  <FiCheckCircle className={`
                    mr-3 flex-shrink-0
                    ${darkMode ? 'text-green-400' : 'text-green-600'}
                  `} />
                  <div>
                    <h3 className={`
                      font-semibold
                      ${darkMode ? 'text-green-300' : 'text-green-800'}
                    `}>
                      Message Sent Successfully!
                    </h3>
                    <p className={`
                      text-sm mt-1
                      ${darkMode ? 'text-green-400' : 'text-green-700'}
                    `}>
                      We\u2019ll respond within 24 hours. A confirmation has been sent to your email.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Footer */}
        {!isMinimized && (
          <div className={`
            px-6 pb-4 text-center text-sm
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}
          `}
          >
            <p className="flex items-center justify-center gap-2">
              <FiInfo className="inline-block" />
              We respect your privacy. Your information will never be shared.
            </p>
            <p className="mt-2">
              Need immediate help? Call{' '}
              <a 
                href="tel:+1234567890" 
                className={`
                  font-medium
                  ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                `}
              >
                +1 (234) 567-890
              </a>
            </p>
          </div>
        )}
      </motion.div>
    </LazyMotion>
  );
}