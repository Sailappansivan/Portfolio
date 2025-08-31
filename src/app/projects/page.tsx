'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Typing Tutor Model",
    description: "AI-powered typing tutor with keystroke dynamics analysis, weak key detection, and adaptive word suggestions.",
    longDescription: "An intelligent typing tutor application that leverages machine learning and keystroke dynamics to personalize the learning experience. The system analyzes typing patterns, detects weak keys, and provides adaptive word suggestions based on user performance. Features include real-time feedback, progress tracking, and API-based architecture for scalability.",
    category: "AI/ML",
    techStack: ["Python", "Keystroke Dynamics", "Machine Learning", "API"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    id: 2,
    title: "Face Recognition Attendance System",
    description: "CCTV-based attendance system with hand raise detection, SMS confirmation, and timestamp tracking.",
    longDescription: "A comprehensive attendance management system that uses computer vision and face recognition technology. The system operates through CCTV cameras, detects hand raises for attendance marking, sends SMS confirmations, and maintains detailed timestamps. Features include mobile app integration, real-time monitoring, and automated reporting.",
    category: "AI/ML",
    techStack: ["Python", "OpenCV", "Face Recognition", "SMS API", "Mobile App"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    id: 3,
    title: "GUIDY",
    description: "AI + AR + sustainability tourism modernization platform for enhanced travel experiences.",
    longDescription: "An innovative tourism platform that combines artificial intelligence, augmented reality, and sustainability principles to modernize the travel industry. GUIDY provides intelligent recommendations, AR-enhanced navigation, and promotes eco-friendly tourism practices. Features include personalized itineraries, AR landmarks, and sustainability scoring.",
    category: "AI/ML",
    techStack: ["AI", "AR", "Sustainability", "Tourism Tech"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    id: 4,
    title: "IoT Security Alarm",
    description: "Smart theft detection system with instant alerts and real-time monitoring capabilities.",
    longDescription: "An IoT-based security solution that provides comprehensive theft detection and monitoring. The system uses various sensors to detect unauthorized access and sends instant alerts to users. Features include real-time monitoring, mobile notifications, and integration with existing security infrastructure.",
    category: "IoT",
    techStack: ["IoT", "Arduino", "Sensors", "Alert System"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    id: 5,
    title: "Dynamic Restaurant Webpage",
    description: "Interactive restaurant website with slot booking system and meal pre-order functionality.",
    longDescription: "A modern, responsive restaurant website that enhances customer experience through digital ordering and reservation systems. Features include online table booking, meal pre-ordering, menu management, and customer feedback systems. The platform is designed for both desktop and mobile users.",
    category: "Web",
    techStack: ["HTML", "CSS", "Responsive Design"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    id: 6,
    title: "Movie Recommendation System",
    description: "ML-based recommendation engine using Pandas and NumPy with price prediction capabilities.",
    longDescription: "A sophisticated movie recommendation system that leverages machine learning algorithms to provide personalized movie suggestions. The system uses Pandas and NumPy for data processing and includes regression models for price prediction. Features include collaborative filtering, content-based recommendations, and user preference learning.",
    category: "AI/ML",
    techStack: ["Python", "Pandas", "NumPy", "Linear Regression", "ML"],
    githubUrl: "#",
    demoUrl: "#"
  }
];

const categories = ['All', 'AI/ML', 'Web', 'IoT'];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                Home
              </Link>
              <Link href="/#about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                About
              </Link>
              <Link href="/#skills" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                Skills
              </Link>
              <span className="text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1">
                Projects
              </span>
              <Link href="/#journey" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                Timeline
              </Link>
              <Link href="/#achievements" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of AI/ML, Web Development, and IoT projects
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-400/25'
                    : 'bg-slate-800 text-gray-300 border border-slate-600 hover:border-cyan-400/50 hover:text-cyan-400'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-md text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700 text-gray-400 rounded-md text-xs">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-700/70 hover:border-cyan-400/50 transition-all duration-300 text-center text-sm"
                >
                  GitHub
                </motion.a>
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 text-center text-sm"
                >
                  Demo
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-6 py-2 bg-cyan-400 text-slate-900 rounded-lg hover:bg-cyan-500 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                
                {/* Project Description */}
                <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                
                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-700/70 hover:border-cyan-400/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398 1.003 2.65.618.5.98 1.595.98 2.688 0 1.849-1.337 3.694-4.555 4.951.346.298.656.692.856 1.141.656.35 1.086.91 1.086 1.532 0 1.107-.01 2-.01 2.272 0 .267.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </motion.a>
                  
                  <motion.a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
