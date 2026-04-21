import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Check, Trash2, Calendar, TrendingUp, Award } from 'lucide-react';
interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
}
interface Milestone {
  age: string;
  title: string;
  achieved: boolean;
  description: string;
}
const TrackerPage: React.FC = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Morning feeding', completed: true, category: 'daily' },
    { id: 2, title: 'Tummy time (15 mins)', completed: true, category: 'daily' },
    { id: 3, title: 'Diaper check', completed: false, category: 'daily' },
    { id: 4, title: 'Afternoon nap', completed: false, category: 'daily' },
    { id: 5, title: 'Reading session', completed: false, category: 'daily' },
    { id: 6, title: 'Bath time', completed: false, category: 'daily' },
  ]);
  const [weeklyGoals, setWeeklyGoals] = useState<Task[]>([
    { id: 1, title: 'Visit pediatrician for checkup', completed: false, category: 'weekly' },
    { id: 2, title: 'Try 2 new solid foods', completed: true, category: 'weekly' },
    { id: 3, title: 'Outdoor playtime 3 times', completed: false, category: 'weekly' },
  ]);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      age: '2 months',
      title: 'Smiles at people',
      achieved: true,
      description: 'Baby begins to smile at people'
    },
    {
      age: '2 months',
      title: 'Coos and makes gurgling sounds',
      achieved: true,
      description: 'Starts making simple vocal sounds'
    },
    {
      age: '4 months',
      title: 'Holds head steady',
      achieved: true,
      description: 'Can hold head steady without support'
    },
    {
      age: '4 months',
      title: 'Reaches for toys',
      achieved: false,
      description: 'Begins reaching for and grasping toys'
    },
    {
      age: '6 months',
      title: 'Sits without support',
      achieved: false,
      description: 'Able to sit without being held'
    },
    {
      age: '6 months',
      title: 'Responds to own name',
      achieved: false,
      description: 'Turns head when name is called'
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const toggleTask = (id: number, type: 'daily' | 'weekly') => {
    if (type === 'daily') {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } else {
      setWeeklyGoals(weeklyGoals.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      ));
    }
  };
  const deleteTask = (id: number, type: 'daily' | 'weekly') => {
    if (type === 'daily') {
      setTasks(tasks.filter(task => task.id !== id));
    } else {
      setWeeklyGoals(weeklyGoals.filter(goal => goal.id !== id));
    }
  };
  const addTask = (type: 'daily' | 'weekly') => {
    if (newTask.trim()) {
      const newId = Math.max(...tasks.map(t => t.id), ...weeklyGoals.map(g => g.id)) + 1;
      const newTaskObj = {
        id: newId,
        title: newTask,
        completed: false,
        category: type
      };
      if (type === 'daily') {
        setTasks([...tasks, newTaskObj]);
      } else {
        setWeeklyGoals([...weeklyGoals, newTaskObj]);
      }
      setNewTask('');
    }
  };
  const toggleMilestone = (index: number) => {
    const updated = [...milestones];
    updated[index].achieved = !updated[index].achieved;
    setMilestones(updated);
  };
  const dailyProgress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);
  const weeklyProgress = Math.round((weeklyGoals.filter(g => g.completed).length / weeklyGoals.length) * 100);
  const milestonesAchieved = milestones.filter(m => m.achieved).length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent px-4">
              {t('tracker.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
              {t('tracker.subtitle')}
            </p>
          </motion.div>
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center"
            >
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {dailyProgress}%
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Daily Tasks</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mt-3 sm:mt-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${dailyProgress}%` }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card text-center"
            >
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {weeklyProgress}%
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Weekly Goals</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mt-3 sm:mt-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${weeklyProgress}%` }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card text-center sm:col-span-2 md:col-span-1"
            >
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {milestonesAchieved}/{milestones.length}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Milestones Achieved</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mt-3 sm:mt-4">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(milestonesAchieved / milestones.length) * 100}%` }}
                />
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            {}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
                {t('tracker.daily')}
              </h2>
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg transition-all ${
                      task.completed
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id, 'daily')}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                      }`}
                    >
                      {task.completed && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                    </button>
                    <span
                      className={`flex-grow text-sm sm:text-base ${
                        task.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id, 'daily')}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask('daily')}
                  placeholder="Add new daily task..."
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => addTask('daily')}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
            {}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                {t('tracker.weekly')}
              </h2>
              <div className="space-y-3 mb-6">
                {weeklyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
                      goal.completed
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(goal.id, 'weekly')}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        goal.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                      }`}
                    >
                      {goal.completed && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <span
                      className={`flex-grow ${
                        goal.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {goal.title}
                    </span>
                    <button
                      onClick={() => deleteTask(goal.id, 'weekly')}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask('weekly')}
                  placeholder="Add new weekly goal..."
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => addTask('weekly')}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>
          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-500" />
              {t('tracker.milestones')}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  onClick={() => toggleMilestone(index)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    milestone.achieved
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400'
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-yellow-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        milestone.achieved
                          ? 'bg-yellow-500 border-yellow-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {milestone.achieved && <Check className="w-5 h-5 text-white" />}
                    </div>
                    <div className="flex-grow">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {milestone.age}
                      </span>
                      <h3 className={`font-bold text-gray-900 dark:text-white mb-1 ${milestone.achieved ? 'line-through' : ''}`}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default TrackerPage;