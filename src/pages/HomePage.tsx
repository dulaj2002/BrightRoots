import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Heart,
  ArrowRight,
  MessageCircle,
  Calendar,
  HelpCircle,
  Video,
  Sparkles,
  TrendingUp
} from 'lucide-react';
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: Sparkles,
      title: t('learning.title'),
      description: 'Interactive content with shapes, colors, numbers, animals, and letters to develop your child\'s knowledge',
      color: 'from-purple-500 to-pink-500',
      link: '/learning'
    },
    {
      icon: MessageCircle,
      title: t('forum.title'),
      description: 'Connect with other parents, share experiences, and learn from each other\'s parenting journey',
      color: 'from-blue-500 to-cyan-500',
      link: '/forum'
    },
    {
      icon: BookOpen,
      title: t('articles.title'),
      description: 'Expert articles and tips on child development, health, nutrition, and parenting strategies',
      color: 'from-green-500 to-emerald-500',
      link: '/articles'
    },
    {
      icon: Video,
      title: t('consultant.title'),
      description: 'Get personalized guidance from child development specialists and pediatricians',
      color: 'from-pink-500 to-rose-500',
      link: '/consultant'
    },
    {
      icon: Calendar,
      title: t('tracker.title'),
      description: 'Track daily tasks, weekly goals, and important developmental milestones',
      color: 'from-orange-500 to-amber-500',
      link: '/tracker'
    },
    {
      icon: HelpCircle,
      title: t('faq.title'),
      description: 'Find quick answers to common parenting questions in our comprehensive FAQ database',
      color: 'from-violet-500 to-purple-500',
      link: '/faq'
    },
  ];
  const stats = [
    { value: '0-5', label: 'Years Focus', icon: Heart },
    { value: '1000+', label: 'Tips & Articles', icon: BookOpen },
    { value: '50+', label: 'Common Questions', icon: HelpCircle },
    { value: '24/7', label: 'Support Available', icon: TrendingUp },
  ];
  return (
    <div className="overflow-x-hidden">
      {}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600"
            alt="Happy children playing and learning"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" />
              </div>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600 bg-clip-text text-transparent leading-tight px-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link to="/learning" className="btn-primary w-full sm:w-auto group">
                {t('hero.cta_primary')}
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/articles" className="btn-secondary w-full sm:w-auto">
                {t('hero.cta_secondary')}
              </Link>
            </div>
          </motion.div>
        </div>
        {}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 left-10 text-6xl opacity-20"
          >
            🎈
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-40 right-20 text-7xl opacity-20"
          >
            🌟
          </motion.div>
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-40 left-1/4 text-8xl opacity-20"
          >
            🎨
          </motion.div>
        </div>
      </section>
      {}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-4" />
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-sm sm:text-lg md:text-xl opacity-90">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-primary-600 to-green-400 bg-clip-text text-transparent">Comprehensive Parenting Support</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto px-4">
              Everything you need to support your child's development from birth to 5 years
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="card group cursor-pointer"
                >
                  <Link to={feature.link}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm sm:text-base">
                      Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white px-4">
              Join Our Community Today
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4">
              Start your journey towards confident, informed parenting with expert guidance and community support
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/forum" className="btn-primary w-full sm:w-auto">
                Join Parent Forum
              </Link>
              <Link to="/consultant" className="btn-secondary w-full sm:w-auto">
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;