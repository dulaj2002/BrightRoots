import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
const LearningPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('age-0-1');
  const ageActivities = {
    'age-0-1': [
      {
        name: 'Tummy Time',
        image: '🧸',
        color: '#EC4899',
        description: 'Short supervised tummy time to build neck and shoulder strength.',
      },
      {
        name: 'High Contrast Cards',
        image: '🖤',
        color: '#111827',
        description: 'Show bold black-and-white patterns to support early visual tracking.',
      },
      {
        name: 'Soft Sound Play',
        image: '🔔',
        color: '#F59E0B',
        description: 'Use gentle rattles and soft music to encourage listening and calm focus.',
      },
      {
        name: 'Face-to-Face Talking',
        image: '🙂',
        color: '#3B82F6',
        description: 'Talk, smile, and mirror expressions to build bonding and early communication.',
      },
      {
        name: 'Reach and Grasp',
        image: '🖐️',
        color: '#10B981',
        description: 'Offer safe toys for reaching, holding, and exploring with hands.',
      },
    ],
    'age-1-2': [
      {
        name: 'Stacking Cups',
        image: '🪣',
        color: '#8B5CF6',
        description: 'Stack and knock down cups to practice hand control and problem solving.',
      },
      {
        name: 'Point and Name',
        image: '👆',
        color: '#3B82F6',
        description: 'Point to animals, objects, and body parts while naming them together.',
      },
      {
        name: 'Walk and Chase',
        image: '🚶',
        color: '#F97316',
        description: 'Encourage walking after bubbles or a rolling ball to build movement confidence.',
      },
      {
        name: 'Simple Songs',
        image: '🎵',
        color: '#EC4899',
        description: 'Sing repeating songs with hand motions to support language and rhythm.',
      },
      {
        name: 'Sort Big and Small',
        image: '🧺',
        color: '#10B981',
        description: 'Sort safe toys by size, color, or type with your help.',
      },
    ],
    'age-2-3': [
      {
        name: 'Color Match',
        image: '🎨',
        color: '#EC4899',
        description: 'Match toys, blocks, or cards by color to strengthen early thinking skills.',
      },
      {
        name: 'Pretend Cooking',
        image: '🍲',
        color: '#F59E0B',
        description: 'Use toy utensils and play food to build imagination and vocabulary.',
      },
      {
        name: 'Ball Toss',
        image: '⚽',
        color: '#3B82F6',
        description: 'Roll or toss a soft ball back and forth to improve coordination.',
      },
      {
        name: 'Picture Story Time',
        image: '📚',
        color: '#8B5CF6',
        description: 'Look at picture books and ask simple questions about what you see.',
      },
      {
        name: 'Follow Two Steps',
        image: '🪜',
        color: '#10B981',
        description: 'Give two-step directions like “pick up the toy and put it in the box.”',
      },
    ],
    'age-3-4': [
      {
        name: 'Shape Hunt',
        image: '🔺',
        color: '#EF4444',
        description: 'Find circles, squares, and triangles around the home or classroom.',
      },
      {
        name: 'Cut and Paste',
        image: '✂️',
        color: '#8B5CF6',
        description: 'Practice safe scissor skills with paper strips and glue sticks.',
      },
      {
        name: 'Counting Games',
        image: '🔢',
        color: '#3B82F6',
        description: 'Count toys, steps, or snacks together up to 10 and beyond.',
      },
      {
        name: 'Emotion Faces',
        image: '😊',
        color: '#EC4899',
        description: 'Name happy, sad, angry, and calm faces to grow emotional awareness.',
      },
      {
        name: 'Obstacle Course',
        image: '🛝',
        color: '#10B981',
        description: 'Create a simple indoor course with pillows, tunnels, and crawling spaces.',
      },
    ],
    'age-4-5': [
      {
        name: 'Letter Hunt',
        image: '🔤',
        color: '#8B5CF6',
        description: 'Search for letters in books, signs, and labels around the house.',
      },
      {
        name: 'Story Retell',
        image: '🗣️',
        color: '#F97316',
        description: 'Ask your child to retell a story using beginning, middle, and end.',
      },
      {
        name: 'Pattern Blocks',
        image: '🟪',
        color: '#3B82F6',
        description: 'Build and copy patterns with blocks, beads, or colored paper.',
      },
      {
        name: 'Name Writing Practice',
        image: '✍️',
        color: '#EC4899',
        description: 'Trace letters, draw lines, and practice writing first name with support.',
      },
      {
        name: 'Team Games',
        image: '🤝',
        color: '#10B981',
        description: 'Play simple turn-taking games that teach patience, sharing, and cooperation.',
      },
    ],
  };
  const categories = [
    { id: 'age-0-1', label: t('learning.age_0_1'), data: ageActivities['age-0-1'] },
    { id: 'age-1-2', label: t('learning.age_1_2'), data: ageActivities['age-1-2'] },
    { id: 'age-2-3', label: t('learning.age_2_3'), data: ageActivities['age-2-3'] },
    { id: 'age-3-4', label: t('learning.age_3_4'), data: ageActivities['age-3-4'] },
    { id: 'age-4-5', label: t('learning.age_4_5'), data: ageActivities['age-4-5'] },
  ];
  const getCurrentData = () => {
    const category = categories.find(c => c.id === selectedCategory);
    return category?.data || [];
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent px-4">
              {t('learning.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
              {t('learning.subtitle')}
            </p>
          </motion.div>
          {}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          {}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {getCurrentData().map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
                style={{
                  background: item.color ? `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)` : undefined
                }}
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 md:mb-4">{item.image}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {item.name || item.number || item.letter}
                  </h3>
                  {item.description && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default LearningPage;
