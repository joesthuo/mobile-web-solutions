'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaArrowRight, FaCode, FaServer, FaDatabase, FaCloud, FaShieldAlt, FaSearch, FaPaintBrush } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import * as React from 'react';

interface Tech {
  name: string;
  logo: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  features: string[];
}

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const techStack: Tech[] = [
    { 
      name: 'Next.js', 
      logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'React framework for server-rendered applications with optimized performance and SEO benefits.',
      features: ['SSR/SSG', 'API Routes', 'Image Optimization', 'Middleware']
    },
    { 
      name: 'TypeScript', 
      logo: 'https://cdn.worldvectorlogo.com/logos/typescript.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Strongly typed JavaScript superset that enhances code quality and developer experience.',
      features: ['Type Safety', 'Modern JS Features', 'Tooling Support', 'Gradual Adoption']
    },
    { 
      name: 'React', 
      logo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg', 
      category: 'Library',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Declarative component-based UI library for building interactive user interfaces.',
      features: ['Hooks API', 'Virtual DOM', 'Component Reusability', 'Rich Ecosystem']
    },
    { 
      name: 'Node.js', 
      logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg', 
      category: 'Runtime',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'JavaScript runtime built on Chrome\'s V8 engine for building scalable network applications.',
      features: ['Non-blocking I/O', 'NPM Ecosystem', 'High Performance', 'Cross-platform']
    },
    { 
      name: 'Tailwind CSS', 
      logo: 'https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg', 
      category: 'CSS Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Utility-first CSS framework for rapidly building custom designs without leaving your HTML.',
      features: ['Responsive Design', 'Customizable', 'PurgeCSS', 'JIT Compiler']
    },
    { 
      name: 'PostgreSQL', 
      logo: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg', 
      category: 'Database',
      icon: <FaDatabase className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Powerful open-source object-relational database system with emphasis on extensibility and standards compliance.',
      features: ['ACID Compliance', 'JSON Support', 'Geospatial Data', 'Scalability']
    },
    { 
      name: 'Docker', 
      logo: 'https://cdn.worldvectorlogo.com/logos/docker.svg', 
      category: 'Containerization',
      icon: <FaCloud className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Platform for developing, shipping, and running applications in isolated containers.',
      features: ['Lightweight', 'Portable', 'CI/CD Integration', 'Microservices']
    },
    { 
      name: 'AWS', 
      logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', 
      category: 'Cloud Platform',
      icon: <FaCloud className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Comprehensive cloud computing platform offering over 200 fully featured services.',
      features: ['EC2', 'S3', 'Lambda', 'RDS']
    },
    { 
      name: 'GraphQL', 
      logo: 'https://cdn.worldvectorlogo.com/logos/graphql-logo-2.svg', 
      category: 'API Technology',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Query language for APIs that enables declarative data fetching with a single endpoint.',
      features: ['Strong Typing', 'No Over-fetching', 'Real-time', 'Tooling']
    },
    {
      name: 'Kubernetes',
      logo: 'https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.svg',
      category: 'Orchestration',
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Open-source system for automating deployment, scaling, and management of containerized applications.',
      features: ['Auto-scaling', 'Self-healing', 'Load Balancing', 'Declarative Config']
    },
    { 
      name: 'Vue.js', 
      logo: 'https://cdn.worldvectorlogo.com/logos/vue-9.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Progressive JavaScript framework for building user interfaces with a component-based architecture.',
      features: ['Reactive Data Binding', 'Component System', 'Vue CLI', 'Vuex']
    },
    { 
      name: 'Angular', 
      logo: 'https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Platform for building scalable web applications with TypeScript and a robust CLI.',
      features: ['Two-way Binding', 'Dependency Injection', 'Angular CLI', 'RxJS']
    },
    { 
      name: 'JavaScript', 
      logo: 'https://cdn.worldvectorlogo.com/logos/javascript-1.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Versatile programming language for building dynamic and interactive web applications.',
      features: ['Event-driven', 'Cross-browser', 'ES Modules', 'Async/Await']
    },
    { 
      name: 'Python', 
      logo: 'https://cdn.worldvectorlogo.com/logos/python-5.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'High-level, interpreted language known for its readability and versatility in web and data applications.',
      features: ['Dynamic Typing', 'Extensive Libraries', 'Cross-platform', 'Readability']
    },
    { 
      name: 'Go', 
      logo: 'https://cdn.worldvectorlogo.com/logos/go-6.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Statically typed, compiled language designed for simplicity and performance in cloud systems.',
      features: ['Concurrency', 'Garbage Collection', 'Standard Library', 'Tooling']
    },
    { 
      name: 'Express.js', 
      logo: 'https://cdn.worldvectorlogo.com/logos/express-109.svg', 
      category: 'Framework',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Minimal Node.js web framework for building fast and flexible server-side applications.',
      features: ['Routing', 'Middleware', 'REST API', 'Scalability']
    },
    { 
      name: 'Sass', 
      logo: 'https://cdn.worldvectorlogo.com/logos/sass-1.svg', 
      category: 'CSS Preprocessor',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'CSS preprocessor that adds power and elegance to the basic language with variables and nesting.',
      features: ['Variables', 'Nesting', 'Mixins', 'Modularity']
    },
    { 
      name: 'MySQL', 
      logo: '/images/mysql.png', 
      category: 'Database',
      icon: <FaDatabase className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Widely used open-source relational database management system known for performance.',
      features: ['Relational Model', 'High Availability', 'Replication', 'Triggers']
    },
    { 
      name: 'MongoDB', 
      logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg', 
      category: 'Database',
      icon: <FaDatabase className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'NoSQL document database for flexible, scalable, and high-performance applications.',
      features: ['Document Model', 'Scalability', 'Aggregation', 'Indexing']
    },
    { 
      name: 'Redis', 
      logo: 'https://cdn.worldvectorlogo.com/logos/redis.svg', 
      category: 'Database',
      icon: <FaDatabase className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'In-memory data structure store used as a database, cache, and message broker.',
      features: ['High Speed', 'Data Structures', 'Pub/Sub', 'Persistence']
    },
    { 
      name: 'GCP', 
      logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg', 
      category: 'Cloud Platform',
      icon: <FaCloud className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Google Cloud Platform offers robust cloud computing services for various workloads.',
      features: ['Compute Engine', 'Cloud Storage', 'BigQuery', 'Cloud Functions']
    },
    {
      name: 'Azure',
      logo: 'https://azure.microsoft.com/svghandler/azure-logo.svg',
      category: 'Cloud Platform',
      icon: <FaCloud className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Microsoft’s cloud platform with a wide range of services for building and deploying applications.',
      features: ['Virtual Machines', 'Blob Storage', 'Azure Functions', 'Cosmos DB']
    },
    { 
      name: 'Terraform', 
      logo: 'https://cdn.worldvectorlogo.com/logos/terraform-enterprise.svg', 
      category: 'Tools',
      icon: <FaCloud className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Tools as Code tool for provisioning and managing cloud resources declaratively.',
      features: ['Declarative Syntax', 'Tools2', 'Multi-cloud', 'State Management']
    },
    { 
      name: 'Ansible', 
      logo: 'https://cdn.worldvectorlogo.com/logos/ansible.svg', 
      category: 'Automation',
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Open-source automation tool for configuration management and application deployment.',
      features: ['Agentless', 'Playbooks', 'Idempotency', 'Extensibility']
    },
    { 
      name: 'Jenkins', 
      logo: 'https://cdn.worldvectorlogo.com/logos/jenkins-1.svg', 
      category: 'CI/CD',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Open-source automation server for building, deploying, and automating software pipelines.',
      features: ['Pipeline as Code', 'Plugins', 'Distributed Builds', 'Webhooks']
    },
    { 
      name: 'Git', 
      logo: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg', 
      category: 'Version Control',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Distributed version control system for tracking changes in source code during development.',
      features: ['Branching', 'Merging', 'Distributed', 'Commit History']
    },
    {
      name: 'GitHub Actions',
      logo: '/images/github-actions.png',
      category: 'CI/CD',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'CI/CD platform integrated with GitHub for automating workflows directly in repositories.',
      features: ['Workflows', 'Matrix Builds', 'Self-hosted Runners', 'Secrets Management']
    },
    { 
      name: 'Webpack', 
      logo: 'https://cdn.worldvectorlogo.com/logos/webpack-icon.svg', 
      category: 'Build Tool',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Module bundler for JavaScript applications, optimizing assets for production.',
      features: ['Code Splitting', 'Asset Management', 'Hot Module Replacement', 'Tree Shaking']
    },
    { 
      name: 'Vite', 
      logo: 'https://cdn.worldvectorlogo.com/logos/vitejs.svg', 
      category: 'Build Tool',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Next-generation frontend tooling for fast development and optimized builds.',
      features: ['ES Modules', 'Fast HMR', 'Plugin System', 'Optimized Builds']
    },
    { 
      name: 'Jest', 
      logo: 'https://cdn.worldvectorlogo.com/logos/jest-2.svg', 
      category: 'Testing',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'JavaScript testing framework with a focus on simplicity and performance.',
      features: ['Snapshot Testing', 'Mocking', 'Code Coverage', 'Parallel Testing']
    },
    { 
      name: 'C++', 
      logo: 'https://cdn.worldvectorlogo.com/logos/c.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'General-purpose language known for performance in systems programming and games.',
      features: ['Memory Management', 'Templates', 'STL', 'Multi-paradigm']
    },
    { 
      name: 'Ruby', 
      logo: 'https://cdn.worldvectorlogo.com/logos/ruby.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Dynamic, object-oriented language focused on simplicity and developer happiness.',
      features: ['Metaprogramming', 'Gems', 'Blocks', 'Dynamic Typing']
    },
    { 
      name: 'Rails', 
      logo: 'https://cdn.worldvectorlogo.com/logos/rails-1.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Ruby on Rails, a server-side web framework emphasizing convention over configuration.',
      features: ['MVC', 'Active Record', 'Scaffolding', 'RESTful']
    },
    { 
      name: 'Django', 
      logo: 'https://cdn.worldvectorlogo.com/logos/django.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'High-level Python web framework that encourages rapid development and clean design.',
      features: ['ORM', 'Admin Panel', 'Security', 'Scalability']
    },
    { 
      name: 'Spring Boot', 
      logo: 'https://cdn.worldvectorlogo.com/logos/spring-3.svg', 
      category: 'Framework',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Java-based framework for building production-ready microservices and web applications.',
      features: ['Auto-configuration', 'Spring Data', 'Actuator', 'Embedded Server']
    },
    { 
      name: 'Flutter', 
      logo: 'https://cdn.worldvectorlogo.com/logos/flutter.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Google’s UI toolkit for building natively compiled applications for mobile, web, and desktop.',
      features: ['Hot Reload', 'Widgets', 'Cross-platform', 'Dart']
    },
    { 
      name: 'Swift', 
      logo: 'https://cdn.worldvectorlogo.com/logos/swift-15.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Powerful language for iOS, macOS, and watchOS app development with safety features.',
      features: ['Type Safety', 'Optionals', 'ARC', 'Protocol-oriented']
    },
    { 
      name: 'Kotlin', 
      logo: 'https://cdn.worldvectorlogo.com/logos/kotlin-1.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Modern language for Android development, interoperable with Java and concise.',
      features: ['Null Safety', 'Coroutines', 'Extension Functions', 'Interoperability']
    },
    {
      name: 'PHP',
      logo: 'https://www.php.net/images/logos/php-logo.svg',
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Server-side scripting language designed for web development, widely used in CMS.',
      features: ['Dynamic Typing', 'Frameworks', 'Database Integration', 'Community']
    },
    { 
      name: 'Laravel', 
      logo: 'https://cdn.worldvectorlogo.com/logos/laravel-2.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'PHP framework with expressive syntax for building robust web applications.',
      features: ['Eloquent ORM', 'Blade Templating', 'Artisan CLI', 'Middleware']
    },
    { 
      name: 'Elasticsearch', 
      logo: 'https://cdn.worldvectorlogo.com/logos/elasticsearch.svg', 
      category: 'Search Engine',
      icon: <FaSearch className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Distributed search and analytics engine built for speed and scalability.',
      features: ['Full-text Search', 'Distributed', 'REST API', 'Analytics']
    },
    { 
      name: 'RabbitMQ', 
      logo: 'https://cdn.worldvectorlogo.com/logos/rabbitmq.svg', 
      category: 'Message Broker',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Open-source message broker for robust messaging in distributed systems.',
      features: ['Queues', 'Pub/Sub', 'Reliability', 'Plugins']
    },
    { 
      name: 'Nginx', 
      logo: 'https://cdn.worldvectorlogo.com/logos/nginx-1.svg', 
      category: 'Web Server',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'High-performance web server and reverse proxy known for speed and efficiency.',
      features: ['Load Balancing', 'Caching', 'Reverse Proxy', 'High Concurrency']
    },
    { 
      name: 'Apache Kafka', 
      logo: 'https://cdn.worldvectorlogo.com/logos/kafka.svg', 
      category: 'Streaming',
      icon: <FaServer className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Distributed streaming platform for building real-time data pipelines.',
      features: ['Publish/Subscribe', 'Fault Tolerance', 'Scalability', 'Retention']
    },
    { 
      name: 'Prometheus', 
      logo: 'https://cdn.worldvectorlogo.com/logos/prometheus.svg', 
      category: 'Monitoring',
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Open-source monitoring and alerting toolkit for cloud-native environments.',
      features: ['Time Series', 'PromQL', 'Alerting', 'Service Discovery']
    },
    { 
      name: 'Grafana', 
      logo: 'https://cdn.worldvectorlogo.com/logos/grafana.svg', 
      category: 'Monitoring',
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Open-source platform for visualizing and analyzing time-series data.',
      features: ['Dashboards', 'Data Sources', 'Alerts', 'Plugins']
    },
    { 
      name: 'Rust', 
      logo: 'https://cdn.worldvectorlogo.com/logos/rust.svg', 
      category: 'Language',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Systems programming language focused on safety, speed, and concurrency.',
      features: ['Memory Safety', 'Concurrency', 'Zero-cost Abstractions', 'Cargo']
    },
    { 
      name: 'Svelte', 
      logo: 'https://cdn.worldvectorlogo.com/logos/svelte-1.svg', 
      category: 'Framework',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Compiler-based framework for building reactive user interfaces with less overhead.',
      features: ['Reactivity', 'No Virtual DOM', 'Compile-time', 'Small Bundles']
    },
    { 
      name: 'Prisma', 
      logo: 'https://cdn.worldvectorlogo.com/logos/prisma-3.svg', 
      category: 'ORM',
      icon: <FaDatabase className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Next-generation ORM for Node.js and TypeScript with type-safe database queries.',
      features: ['Type Safety', 'Query Builder', 'Migrations', 'Client Generation']
    },
    {
      name: 'Figma',
      logo: '/images/figma.png',
      category: 'Design Tool',
      icon: <FaPaintBrush className="w-5 h-5" />,
      color: 'from-gray-800 to-blue-900',
      description: 'Collaborative interface design tool for creating and prototyping user interfaces.',
      features: ['Prototyping', 'Collaboration', 'Components', 'Plugins']
    },
  ];

  const categories = ['All', ...Array.from(new Set(techStack.map(tech => tech.category)))];

  const filteredTech = techStack.filter(tech => 
    (activeCategory === 'All' || tech.category === activeCategory) &&
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12
      }
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      {/* Minimalist Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-gray-900"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header with Motion Effects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 origin-left"
            />
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white pb-2">
              Technology <span className="text-blue-500">Excellence</span>
            </h2>
          </div>
          <p className="mt-6 text-xl md:text-2xl leading-8 text-gray-300 max-w-3xl mx-auto font-light">
            Cutting-edge technologies engineered for peak performance and scalability
          </p>
        </motion.div>

        {/* Interactive Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 text-gray-300 hover:text-blue-200 ${
                  activeCategory === category 
                    ? 'bg-blue-500 text-white shadow-md'
                    : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50 focus:border-blue-500 focus:outline-none text-gray-200 placeholder-gray-400 transition-all"
            />
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {filteredTech.map((tech, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover="hover"
              className="group relative cursor-pointer"
              onClick={() => setSelectedTech(i)}
            >
              <div className="relative h-full">
                <div className="relative bg-gradient-to-br from-gray-800 to-blue-900 p-6 rounded-xl border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col items-center justify-center gap-4 shadow-xl group-hover:shadow-blue-500/20 overflow-hidden">
                  {/* Tech Icon */}
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-blue-900 mb-4 p-3 z-10">
                    <div className="relative w-full h-full">
                      <Image 
                        src={tech.logo} 
                        alt={tech.name} 
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 64px, 80px"
                      />
                    </div>
                  </div>
                  
                  {/* Tech Name */}
                  <h3 className="text-xl font-semibold text-white text-center group-hover:text-blue-200 transition-colors z-10">
                    {tech.name}
                  </h3>
                  
                  {/* Category Indicator */}
                  <div className="absolute top-3 right-3 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900/80 text-white text-xs">
                      {tech.icon}
                    </div>
                  </div>
                  
                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTech.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-300 text-lg">No technologies match your search</div>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              className="mt-4 text-blue-500 hover:text-blue-400 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center">
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Ready to leverage our technical expertise for your next project?
            </p>
            <button className="group relative px-8 py-4 bg-blue-500 text-white font-medium rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300">
              <span className="relative z-10 flex items-center">
                Schedule Technical Consultation
                <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tech Detail Modal */}
      <AnimatePresence>
        {selectedTech !== null && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-2xl w-full bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedTech(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors text-gray-300 hover:text-white"
              >
                <IoClose className="w-5 h-5" />
              </button>
              
              {/* Modal Content */}
              {selectedTech !== null && (
                <div className="relative">
                  {/* Gradient Header */}
                  <div className="bg-gradient-to-r from-gray-800 to-blue-900 h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10"></div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                        <div className="relative w-20 h-20">
                          <Image 
                            src={techStack[selectedTech].logo} 
                            alt={techStack[selectedTech].name} 
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <h3 className="mt-6 text-3xl font-bold text-white">
                        {techStack[selectedTech].name}
                      </h3>
                      <div className="mt-2 px-4 py-1 bg-gray-900/50 rounded-full text-sm font-medium text-white flex items-center">
                        {techStack[selectedTech].icon}
                        <span className="ml-2">{techStack[selectedTech].category}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Body Content */}
                  <div className="p-8">
                    <p className="text-gray-300 text-lg mb-6">
                      {techStack[selectedTech].description}
                    </p>
                    
                    <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {techStack[selectedTech].features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5">
                            <div className="bg-gray-900 rounded-full p-1">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-6 border-t border-gray-800">
                      <button className="group relative px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto">
                        <span className="relative z-10 flex items-center justify-center">
                          Learn More About {techStack[selectedTech].name}
                          <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}