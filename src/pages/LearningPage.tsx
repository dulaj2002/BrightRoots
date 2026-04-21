import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
const LearningPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('shapes');
  const shapes = [
    { name: 'Circle', image: '🔵', color: '#3B82F6' },
    { name: 'Square', image: '🟦', color: '#8B5CF6' },
    { name: 'Triangle', image: '🔺', color: '#EF4444' },
    { name: 'Star', image: '⭐', color: '#F59E0B' },
    { name: 'Heart', image: '❤️', color: '#EC4899' },
    { name: 'Diamond', image: '💎', color: '#06B6D4' },
  ];
  const colors = [
    { name: 'Red', image: '🔴', code: '#EF4444' },
    { name: 'Blue', image: '🔵', code: '#3B82F6' },
    { name: 'Green', image: '🟢', code: '#10B981' },
    { name: 'Yellow', image: '🟡', code: '#F59E0B' },
    { name: 'Purple', image: '🟣', code: '#8B5CF6' },
    { name: 'Orange', image: '🟠', code: '#F97316' },
    { name: 'Pink', image: '🩷', code: '#EC4899' },
    { name: 'Brown', image: '🟤', code: '#92400E' },
  ];
  const animals = [
    { name: 'Cat', image: '🐱', sound: 'Meow' },
    { name: 'Dog', image: '🐶', sound: 'Woof' },
    { name: 'Cow', image: '🐮', sound: 'Moo' },
    { name: 'Lion', image: '🦁', sound: 'Roar' },
    { name: 'Elephant', image: '🐘', sound: 'Trumpet' },
    { name: 'Monkey', image: '🐵', sound: 'Ooh Ooh' },
    { name: 'Bird', image: '🐦', sound: 'Tweet' },
    { name: 'Fish', image: '🐠', sound: 'Blub' },
  ];
  const numbers = [
    { number: '1', image: '1️⃣', items: '🍎' },
    { number: '2', image: '2️⃣', items: '🍎🍎' },
    { number: '3', image: '3️⃣', items: '🍎🍎🍎' },
    { number: '4', image: '4️⃣', items: '🍎🍎🍎🍎' },
    { number: '5', image: '5️⃣', items: '🍎🍎🍎🍎🍎' },
    { number: '6', image: '6️⃣', items: '🍎🍎🍎🍎🍎🍎' },
    { number: '7', image: '7️⃣', items: '🍎🍎🍎🍎🍎🍎🍎' },
    { number: '8', image: '8️⃣', items: '🍎🍎🍎🍎🍎🍎🍎🍎' },
  ];
  const letters = [
    { letter: 'A', image: '🍎', word: 'Apple' },
    { letter: 'B', image: '🎈', word: 'Balloon' },
    { letter: 'C', image: '😺', word: 'Cat' },
    { letter: 'D', image: '🐶', word: 'Dog' },
    { letter: 'E', image: '🐘', word: 'Elephant' },
    { letter: 'F', image: '🐠', word: 'Fish' },
    { letter: 'G', image: '🍇', word: 'Grapes' },
    { letter: 'H', image: '🏠', word: 'House' },
  ];
  const categories = [
    { id: 'shapes', label: t('learning.shapes'), data: shapes },
    { id: 'colors', label: t('learning.colors'), data: colors },
    { id: 'animals', label: t('learning.animals'), data: animals },
    { id: 'numbers', label: t('learning.numbers'), data: numbers },
    { id: 'letters', label: t('learning.letters'), data: letters },
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
                  {item.sound && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 italic">
                      "{item.sound}"
                    </p>
                  )}
                  {item.word && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
                      {item.word}
                    </p>
                  )}
                  {item.items && (
                    <p className="text-lg sm:text-xl md:text-2xl mt-1 sm:mt-2">{item.items}</p>
                  )}
                  {item.code && (
                    <div
                      className="mt-2 sm:mt-3 mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 sm:border-4 border-white shadow-lg"
                      style={{ backgroundColor: item.code }}
                    />
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