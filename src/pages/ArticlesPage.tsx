import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Loader } from 'lucide-react';
import { articlesAPI, Article } from '../services/api';
const ArticlesPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    loadArticles();
  }, []);
  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articlesAPI.getAll();
      setArticles(data);
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError('Failed to load articles. Using offline data.');
      setArticles(getMockArticles());
    } finally {
      setLoading(false);
    }
  };
  const getMockArticles = (): Article[] => [
    {
      id: 1,
      title: 'Early Brain Development: The First 1000 Days',
      category: 'Development',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800',
      excerpt: 'Understanding the critical window of brain development in infants and toddlers.',
      content: `The first 1000 days of a child's life (from conception to age 2) are the most critical for brain development. During this period, the brain forms over 1 million neural connections every second.
Key Points:
• Nutrition plays a vital role in brain development
• Early interactions shape neural pathways
• Responsive caregiving promotes healthy development
• Every experience matters during this critical window
Tips for Parents:
1. Provide diverse sensory experiences
2. Engage in face-to-face interactions
3. Respond promptly to your baby's needs
4. Ensure proper nutrition and healthcare
5. Create a safe, stimulating environment`
    },
    {
      id: 2,
      title: 'Building Language Skills: Tips for Ages 0-3',
      category: 'Language',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
      excerpt: 'Practical strategies to enhance your child\'s language development.',
      content: `Language development begins from birth and accelerates rapidly during the first three years. Here's how you can support your child's language journey.
Age-Specific Activities:
0-12 Months:
• Talk continuously to your baby
• Sing songs and nursery rhymes
• Read colorful picture books
• Respond to cooing and babbling
12-24 Months:
• Name objects during daily routines
• Use simple sentences
• Ask simple questions
• Expand on their words
24-36 Months:
• Have conversations
• Read story books together
• Introduce new vocabulary
• Play word games`
    },
    {
      id: 3,
      title: 'Managing Toddler Behavior: A Gentle Approach',
      category: 'Behavior',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800',
      excerpt: 'Positive discipline techniques for children aged 1-3 years.',
      content: `Toddlers are learning to assert independence while lacking impulse control. This combination leads to challenging behaviors that require patient, consistent responses.
Understanding Toddler Behavior:
• Tantrums are normal developmental milestones
• Testing boundaries is how they learn
• Big emotions in small bodies need support
• Consistency provides security
Gentle Discipline Strategies:
1. Set clear, simple limits
2. Offer choices when possible
3. Use distraction and redirection
4. Stay calm and empathetic
5. Create predictable routines
6. Acknowledge feelings
7. Model desired behavior`
    },
    {
      id: 4,
      title: 'Sleep Patterns: Establishing Healthy Routines',
      category: 'Sleep',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1523770702575-219b3669c455?w=800',
      excerpt: 'Guide to helping your child develop good sleep habits.',
      content: `Quality sleep is essential for your child's growth, development, and overall well-being. Establishing healthy sleep routines early sets the foundation for lifelong good sleep habits.
Age-Appropriate Sleep Needs:
• 0-3 months: 14-17 hours
• 4-11 months: 12-15 hours
• 1-2 years: 11-14 hours
• 3-5 years: 10-13 hours
Creating a Sleep Routine:
1. Establish consistent bedtime
2. Create calm bedtime ritual
3. Optimize sleep environment
4. Limit screen time before bed
5. Stay consistent on weekends
6. Be patient during transitions`
    },
    {
      id: 5,
      title: 'Nutrition Essentials for Growing Children',
      category: 'Nutrition',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
      excerpt: 'Essential nutrients and healthy eating habits for children 0-5 years.',
      content: `Proper nutrition during early childhood supports physical growth, brain development, and establishes lifelong healthy eating patterns.
Essential Nutrients:
• Protein for growth
• Iron for brain development
• Calcium for strong bones
• Healthy fats for brain development
• Fruits and vegetables for vitamins
Feeding Tips:
1. Offer variety of colors and textures
2. Let children self-feed when ready
3. Eat meals together as a family
4. Avoid forcing or pressuring
5. Model healthy eating
6. Stay patient with picky eating
7. Limit sugar and processed foods`
    },
    {
      id: 6,
      title: 'Social-Emotional Development: Building Confidence',
      category: 'Social-Emotional',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800',
      excerpt: 'Fostering emotional intelligence and social skills in young children.',
      content: `Social-emotional development is as important as physical and cognitive growth. These skills form the foundation for future relationships and emotional well-being.
Key Areas:
• Self-awareness
• Self-regulation
• Social awareness
• Relationship skills
• Responsible decision-making
Supporting Development:
1. Name and validate emotions
2. Teach problem-solving
3. Encourage empathy
4. Provide social opportunities
5. Model emotional regulation
6. Create safe space for expression
7. Celebrate small victories`
    },
  ];
  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'development', label: 'Development' },
    { id: 'language', label: 'Language' },
    { id: 'behavior', label: 'Behavior' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'social', label: 'Social-Emotional' },
  ];
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category.toLowerCase().includes(selectedCategory));
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent px-4">
              {t('articles.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
              {t('articles.subtitle')}
            </p>
          </motion.div>
          {}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          {}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-12 h-12 text-teal-500 animate-spin" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedArticle(article)}
                className="card cursor-pointer hover:shadow-2xl transition-all group"
              >
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden mb-3 sm:mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <span className="inline-block px-2 sm:px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 rounded-full text-xs font-medium mb-2">
                  {article.category}
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {article.readTime}
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>
      {}
      <AnimatePresence>
        {selectedArticle && (
          <>
            {}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
            >
              {}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
              >
                {}
                <div className="relative h-40 sm:h-56 md:h-64">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
                {}
                <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(95vh-10rem)] sm:max-h-[calc(90vh-14rem)] md:max-h-[calc(90vh-16rem)]">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 rounded-full text-xs sm:text-sm font-medium">
                      {selectedArticle.category}
                    </span>
                    <span className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {selectedArticle.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                    {selectedArticle.title}
                  </h2>
                  <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                      {selectedArticle.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ArticlesPage;