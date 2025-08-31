'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievements = [
    {
      title: "Winner – Arduino Bootcamp",
      description: "First place in Arduino Bootcamp competition",
      icon: "🏆",
      category: "Competition"
    },
    {
      title: "Participant – Smart India Hackathon",
      description: "Internal round participant in Smart India Hackathon",
      icon: "💻",
      category: "Hackathon"
    },
    {
      title: "Participant – Ideathon",
      description: "Active participant in innovation and ideation events",
      icon: "💡",
      category: "Innovation"
    },
    {
      title: "Internship – YBI Foundation",
      description: "15 days ML-focused internship experience",
      icon: "🎯",
      category: "Internship"
    },
    {
      title: "Google Generative AI Bootcamp",
      description: "5-day intensive bootcamp on Kaggle platform",
      icon: "🤖",
      category: "Training"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="achievements" className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-slate-800/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto"></div>
        </motion.div>

        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Achievements Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-white mb-8 text-center">🏆 Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-slate-800/70">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 text-center">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-3">
                        {achievement.description}
                      </p>
                      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs">
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
