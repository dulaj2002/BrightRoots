import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

type Activity = {
  name: string;
  image: string;
  color: string;
  description: string;
};

type AgeCategory = {
  id: string;
  label: string;
  badge: string;
  focus: string;
  summary: string;
  tips: string[];
  data: Activity[];
};

const LearningPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('age-0-1');

  const categories: AgeCategory[] = [
    {
      id: 'age-0-1',
      label: t('learning.age_0_1'),
      badge: t('learning.age_badge_0_1'),
      focus: t('learning.focus_0_1'),
      summary: t('learning.summary_0_1'),
      tips: [t('learning.tip_0_1_a'), t('learning.tip_0_1_b'), t('learning.tip_0_1_c')],
      data: [
        { name: t('learning.activity_tummy_time'), image: '🧸', color: '#EC4899', description: t('learning.activity_tummy_time_desc') },
        { name: t('learning.activity_contrast_cards'), image: '🖤', color: '#111827', description: t('learning.activity_contrast_cards_desc') },
        { name: t('learning.activity_soft_sound_play'), image: '🔔', color: '#F59E0B', description: t('learning.activity_soft_sound_play_desc') },
        { name: t('learning.activity_face_talk'), image: '🙂', color: '#3B82F6', description: t('learning.activity_face_talk_desc') },
        { name: t('learning.activity_reach_grasp'), image: '🖐️', color: '#10B981', description: t('learning.activity_reach_grasp_desc') },
      ],
    },
    {
      id: 'age-1-2',
      label: t('learning.age_1_2'),
      badge: t('learning.age_badge_1_2'),
      focus: t('learning.focus_1_2'),
      summary: t('learning.summary_1_2'),
      tips: [t('learning.tip_1_2_a'), t('learning.tip_1_2_b'), t('learning.tip_1_2_c')],
      data: [
        { name: t('learning.activity_stacking_cups'), image: '🪣', color: '#8B5CF6', description: t('learning.activity_stacking_cups_desc') },
        { name: t('learning.activity_point_name'), image: '👆', color: '#3B82F6', description: t('learning.activity_point_name_desc') },
        { name: t('learning.activity_walk_chase'), image: '🚶', color: '#F97316', description: t('learning.activity_walk_chase_desc') },
        { name: t('learning.activity_simple_songs'), image: '🎵', color: '#EC4899', description: t('learning.activity_simple_songs_desc') },
        { name: t('learning.activity_sort_big_small'), image: '🧺', color: '#10B981', description: t('learning.activity_sort_big_small_desc') },
      ],
    },
    {
      id: 'age-2-3',
      label: t('learning.age_2_3'),
      badge: t('learning.age_badge_2_3'),
      focus: t('learning.focus_2_3'),
      summary: t('learning.summary_2_3'),
      tips: [t('learning.tip_2_3_a'), t('learning.tip_2_3_b'), t('learning.tip_2_3_c')],
      data: [
        { name: t('learning.activity_color_match'), image: '🎨', color: '#EC4899', description: t('learning.activity_color_match_desc') },
        { name: t('learning.activity_pretend_cooking'), image: '🍲', color: '#F59E0B', description: t('learning.activity_pretend_cooking_desc') },
        { name: t('learning.activity_ball_toss'), image: '⚽', color: '#3B82F6', description: t('learning.activity_ball_toss_desc') },
        { name: t('learning.activity_picture_story'), image: '📚', color: '#8B5CF6', description: t('learning.activity_picture_story_desc') },
        { name: t('learning.activity_two_steps'), image: '🪜', color: '#10B981', description: t('learning.activity_two_steps_desc') },
      ],
    },
    {
      id: 'age-3-4',
      label: t('learning.age_3_4'),
      badge: t('learning.age_badge_3_4'),
      focus: t('learning.focus_3_4'),
      summary: t('learning.summary_3_4'),
      tips: [t('learning.tip_3_4_a'), t('learning.tip_3_4_b'), t('learning.tip_3_4_c')],
      data: [
        { name: t('learning.activity_shape_hunt'), image: '🔺', color: '#EF4444', description: t('learning.activity_shape_hunt_desc') },
        { name: t('learning.activity_cut_paste'), image: '✂️', color: '#8B5CF6', description: t('learning.activity_cut_paste_desc') },
        { name: t('learning.activity_counting_games'), image: '🔢', color: '#3B82F6', description: t('learning.activity_counting_games_desc') },
        { name: t('learning.activity_emotion_faces'), image: '😊', color: '#EC4899', description: t('learning.activity_emotion_faces_desc') },
        { name: t('learning.activity_obstacle_course'), image: '🛝', color: '#10B981', description: t('learning.activity_obstacle_course_desc') },
      ],
    },
    {
      id: 'age-4-5',
      label: t('learning.age_4_5'),
      badge: t('learning.age_badge_4_5'),
      focus: t('learning.focus_4_5'),
      summary: t('learning.summary_4_5'),
      tips: [t('learning.tip_4_5_a'), t('learning.tip_4_5_b'), t('learning.tip_4_5_c')],
      data: [
        { name: t('learning.activity_letter_hunt'), image: '🔤', color: '#8B5CF6', description: t('learning.activity_letter_hunt_desc') },
        { name: t('learning.activity_story_retell'), image: '🗣️', color: '#F97316', description: t('learning.activity_story_retell_desc') },
        { name: t('learning.activity_pattern_blocks'), image: '🟪', color: '#3B82F6', description: t('learning.activity_pattern_blocks_desc') },
        { name: t('learning.activity_name_writing'), image: '✍️', color: '#EC4899', description: t('learning.activity_name_writing_desc') },
        { name: t('learning.activity_team_games'), image: '🤝', color: '#10B981', description: t('learning.activity_team_games_desc') },
      ],
    },
  ];

  const currentCategory = categories.find((category) => category.id === selectedCategory) ?? categories[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-5 sm:p-6 shadow-xl border border-white/60 dark:border-gray-700/60">
              <p className="text-sm uppercase tracking-[0.2em] text-purple-600 dark:text-purple-300 font-semibold mb-2">
                {t('learning.overview_label')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentCategory.label}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {currentCategory.summary}
              </p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-5 sm:p-6 shadow-xl border border-white/60 dark:border-gray-700/60">
              <p className="text-sm uppercase tracking-[0.2em] text-pink-600 dark:text-pink-300 font-semibold mb-2">
                {t('learning.focus_label')}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {currentCategory.focus}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('learning.focus_helper')}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-5 sm:p-6 shadow-xl text-white">
              <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-2 opacity-90">
                {t('learning.activities_label')}
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl sm:text-5xl font-bold">{currentCategory.data.length}</span>
                <span className="text-sm sm:text-base opacity-90 pb-1">{t('learning.activities_available')}</span>
              </div>
              <p className="mt-3 text-sm sm:text-base opacity-90 leading-relaxed">
                {t('learning.activities_helper')}
              </p>
            </div>
          </motion.div>

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-5 px-1 gap-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {t('learning.activity_heading')}
                </h2>
                <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 text-right">
                  {t('learning.activity_hint')}
                </span>
              </div>

              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
              >
                {currentCategory.data.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, rotate: 0.5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-5 sm:p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 border border-white/70 dark:border-gray-700/70"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}08 100%)`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl md:text-6xl mb-3">{item.image}</div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-3xl p-5 sm:p-6 md:p-7 shadow-2xl border border-white/70 dark:border-gray-700/70 sticky top-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white text-2xl shadow-lg">
                  {currentCategory.badge}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-600 dark:text-pink-300 font-semibold">
                    {t('learning.parent_label')}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('learning.parent_guide')}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                {t('learning.parent_intro')}
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl bg-gray-50 dark:bg-gray-700/60 p-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {t('learning.why_it_works')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentCategory.focus}
                  </p>
                </div>

                {currentCategory.tips.map((tip, index) => (
                  <div key={index} className="flex gap-3 rounded-2xl bg-gray-50 dark:bg-gray-700/60 p-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-pink-300 dark:border-pink-500/40 p-4 bg-pink-50/70 dark:bg-pink-500/10">
                <p className="text-sm font-semibold text-pink-700 dark:text-pink-200 mb-1">
                  {t('learning.daily_rhythm')}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  {t('learning.daily_rhythm_text')}
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPage;
