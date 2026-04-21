import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send, Clock, CheckCircle, LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import { authAPI, questionsAPI, Question } from '../services/auth';
const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    question_text: '',
    category: 'General',
    priority: 'normal',
  });
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const storedUser = authAPI.getStoredUser();
      setUser(storedUser);
      const questionsData = await questionsAPI.getMyQuestions();
      setQuestions(questionsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await questionsAPI.updateQuestion(editingId, formData);
      } else {
        await questionsAPI.createQuestion(formData);
      }
      setFormData({
        title: '',
        question_text: '',
        category: 'General',
        priority: 'normal',
      });
      setShowNewQuestion(false);
      setEditingId(null);
      loadData();
    } catch (error) {
      console.error('Failed to submit question:', error);
      alert('Failed to submit question. Please try again.');
    }
  };
  const handleEdit = (question: Question) => {
    setFormData({
      title: question.title,
      question_text: question.question_text,
      category: question.category || 'General',
      priority: question.priority,
    });
    setEditingId(question.id);
    setShowNewQuestion(true);
  };
  const handleDelete = async (questionId: number) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }
    try {
      await questionsAPI.deleteQuestion(questionId);
      loadData();
    } catch (error) {
      console.error('Failed to delete question:', error);
      alert('Failed to delete question. Please try again.');
    }
  };
  const handleCancelEdit = () => {
    setFormData({
      title: '',
      question_text: '',
      category: 'General',
      priority: 'normal',
    });
    setEditingId(null);
    setShowNewQuestion(false);
  };
  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };
  const categories = ['General', 'Nutrition', 'Sleep', 'Health', 'Development', 'Language', 'Behavior', 'Discipline'];
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
               Parent Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {user?.full_name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-br from-violet-500 to-purple-600 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Questions</p>
                <p className="text-3xl font-bold">{questions.length}</p>
              </div>
              <MessageCircle className="w-12 h-12 text-white/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card bg-gradient-to-br from-yellow-500 to-orange-600 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Pending</p>
                <p className="text-3xl font-bold">
                  {questions.filter((q) => q.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-white/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Answered</p>
                <p className="text-3xl font-bold">
                  {questions.filter((q) => q.status === 'answered').length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-white/30" />
            </div>
          </motion.div>
        </div>
        {}
        {!showNewQuestion && (
          <button
            onClick={() => setShowNewQuestion(true)}
            className="mb-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Ask New Question
          </button>
        )}
        {}
        {showNewQuestion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="card mb-8"
          >
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Question' : 'Ask a Question'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Brief title for your question"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Question</label>
                <textarea
                  value={formData.question_text}
                  onChange={(e) =>
                    setFormData({ ...formData, question_text: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Describe your concern or question in detail..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-700"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all"
                >
                  <Send className="w-4 h-4" />
                  {editingId ? 'Update Question' : 'Submit Question'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
        {}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">My Questions</h2>
          {loading ? (
            <div className="card text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p>Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="card text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No questions yet. Ask your first question!</p>
            </div>
          ) : (
            questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {question.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          question.status === 'answered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {question.status}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                        {question.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(question.created_at!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {question.status !== 'answered' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(question)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        title="Edit question"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {question.question_text}
                </p>
                {question.answer_text && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        Answer from {question.consultant_name || 'Consultant'}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      {question.answer_text}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Answered on {new Date(question.answered_at!).toLocaleString()}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default ParentDashboard;