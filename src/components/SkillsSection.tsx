'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'Python', icon: '🐍', color: 'from-green-400 to-emerald-500', level: 5 },
    { name: 'C++', icon: '⚡', color: 'from-blue-400 to-cyan-500', level: 4 },
    { name: 'HTML/CSS', icon: '🌐', color: 'from-orange-400 to-red-500', level: 4 },
    { name: 'Pandas', icon: '📊', color: 'from-blue-400 to-indigo-500', level: 4 },
    { name: 'NumPy', icon: '🔢', color: 'from-green-400 to-emerald-500', level: 4 },
    { name: 'Machine Learning', icon: '🤖', color: 'from-purple-400 to-pink-500', level: 4 },
    { name: 'Computer Vision', icon: '👁️', color: 'from-blue-400 to-cyan-500', level: 3 },
    { name: 'Deep Learning', icon: '🧠', color: 'from-orange-400 to-red-500', level: 3 },
    { name: 'TensorFlow', icon: '🔥', color: 'from-orange-400 to-red-500', level: 2 },
    { name: 'PyTorch', icon: '⚡', color: 'from-red-400 to-orange-500', level: 2 },
  ];

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

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-slate-800/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group relative"
              variants={cardVariants}
            >
              {/* Skill Card */}
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-slate-800/70">
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div className="relative z-10 text-center">
                  {/* Skill Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  
                  {/* Skill Level Indicator */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i < skill.level
                            ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                            : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating particles around card */}
              <motion.div
                className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.2 
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.3, 1], 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: index * 0.2 + 0.5 
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-gray-400 text-lg">
              Continuously expanding my skill set through hands-on projects and real-world applications. 
              Always eager to learn new technologies and frameworks in the AI/ML ecosystem.
            </p>
            
            {/* Currently Learning Section */}
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Currently Learning</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['TensorFlow', 'PyTorch', 'Japanese (JLPT N5)'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
