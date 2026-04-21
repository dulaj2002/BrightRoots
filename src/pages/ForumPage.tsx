import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, Reply, Clock, User, Loader } from 'lucide-react';
import { forumAPI, ForumDiscussion } from '../services/api';
const ForumPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [discussions, setDiscussions] = useState<ForumDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    loadDiscussions();
  }, []);
  const loadDiscussions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await forumAPI.getDiscussions();
      setDiscussions(data);
    } catch (err) {
      console.error('Failed to load discussions:', err);
      setError('Failed to load discussions. Using offline data.');
      setDiscussions(getMockDiscussions());
    } finally {
      setLoading(false);
    }
  };
  const getMockDiscussions = (): ForumDiscussion[] => [
    {
      id: 1,
      title: 'What are the best activities for 6-month-old babies?',
      author: 'Sarah Mom',
      category: '0-12 months',
      replies: 15,
      likes: 23,
      timeAgo: '2 hours ago',
      preview: 'I\'m looking for engaging activities that can help my 6-month-old develop motor skills...'
    },
    {
      id: 2,
      title: 'Tips for transitioning from bottle to cup?',
      author: 'Priya Fernando',
      category: '1-2 years',
      replies: 28,
      likes: 45,
      timeAgo: '5 hours ago',
      preview: 'My 14-month-old is still very attached to the bottle. Any suggestions for making the transition easier?'
    },
    {
      id: 3,
      title: 'Dealing with tantrums in toddlers',
      author: 'Amal Perera',
      category: '2-3 years',
      replies: 42,
      likes: 67,
      timeAgo: '1 day ago',
      preview: 'My 2.5-year-old has been having frequent tantrums. How do other parents handle this?'
    },
    {
      id: 4,
      title: 'Best preschool preparation activities?',
      author: 'Nisha Silva',
      category: '3-4 years',
      replies: 19,
      likes: 31,
      timeAgo: '2 days ago',
      preview: 'My child will be starting preschool soon. What activities can I do at home to prepare them?'
    },
    {
      id: 5,
      title: 'Encouraging reading habits in 4-year-olds',
      author: 'Rohan Kumar',
      category: '4-5 years',
      replies: 22,
      likes: 38,
      timeAgo: '3 days ago',
      preview: 'Looking for creative ways to make reading more interesting for my 4-year-old daughter...'
    },
    {
      id: 6,
      title: 'Sleep schedule tips for newborns',
      author: 'Maya Rajapaksa',
      category: '0-12 months',
      replies: 34,
      likes: 52,
      timeAgo: '4 days ago',
      preview: 'First-time mom here! How do you establish a good sleep routine for a newborn?'
    },
  ];
  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: '0-12', label: '0-12 Months' },
    { id: '1-2', label: '1-2 Years' },
    { id: '2-3', label: '2-3 Years' },
    { id: '3-4', label: '3-4 Years' },
    { id: '4-5', label: '4-5 Years' },
  ];
  const filteredDiscussions = selectedCategory === 'all'
    ? discussions
    : discussions.filter(d => d.category === selectedCategory);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent px-4">
              {t('forum.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4">
              {t('forum.subtitle')}
            </p>
            <button className="btn-primary w-full sm:w-auto mx-4">
              {t('forum.new_topic')}
            </button>
          </motion.div>
          {}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          {}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-12 h-12 text-indigo-500 animate-spin" />
            </div>
          )}
          {}
          {error && (
            <div className="bg-orange-100 dark:bg-orange-900 border border-orange-400 text-orange-700 dark:text-orange-300 px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}
          {}
          {!loading && (
            <div className="space-y-3 sm:space-y-4">
              {filteredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex gap-3 sm:gap-4">
                  {}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  {}
                  <div className="flex-grow min-w-0">
                    <div className="mb-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-words">
                        {discussion.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate max-w-[100px] sm:max-w-none">{discussion.author}</span>
                        </span>
                        <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-xs font-medium">
                          {discussion.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          {discussion.timeAgo}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                      {discussion.preview}
                    </p>
                    <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                      <button className="flex items-center gap-1 sm:gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <Reply className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">{discussion.replies} Replies</span>
                        <span className="xs:hidden">{discussion.replies}</span>
                      </button>
                      <button className="flex items-center gap-1 sm:gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">{discussion.likes} Likes</span>
                        <span className="xs:hidden">{discussion.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default ForumPage;