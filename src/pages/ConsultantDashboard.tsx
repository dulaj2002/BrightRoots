import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Send,
  Clock,
  CheckCircle,
  LogOut,
  User,
  Edit2
} from 'lucide-react';
import { authAPI, questionsAPI, Question } from '../services/auth';
const ConsultantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [pendingQuestions, setPendingQuestions] = useState<Question[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'answered'>('pending');
  const [answeringId, setAnsweringId] = useState<number | null>(null);
  const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const storedUser = authAPI.getStoredUser();
      setUser(storedUser);
      const pending = await questionsAPI.getPendingQuestions();
      setPendingQuestions(pending);
      const allQuestions = await questionsAPI.getAllQuestions('answered');
      const myAnswered = allQuestions.filter(
        (q) => q.consultant_id === storedUser?.id
      );
      setAnsweredQuestions(myAnswered);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAnswerQuestion = async (questionId: number) => {
    if (!answerText.trim()) {
      alert('Please provide an answer');
      return;
    }
    setSubmitting(true);
    try {
      await questionsAPI.answerQuestion(questionId, answerText);
      setAnswerText('');
      setAnsweringId(null);
      await loadData();
      setActiveTab('answered');
    } catch (error) {
      console.error('Failed to answer question:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  const handleEditAnswer = (question: Question) => {
    setEditingAnswerId(question.id);
    setAnswerText(question.answer_text || '');
  };
  const handleUpdateAnswer = async (questionId: number) => {
    if (!answerText.trim()) {
      alert('Please provide an answer');
      return;
    }
    setSubmitting(true);
    try {
      await questionsAPI.updateAnswer(questionId, answerText);
      setAnswerText('');
      setEditingAnswerId(null);
      await loadData();
    } catch (error) {
      console.error('Failed to update answer:', error);
      alert('Failed to update answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  const handleCancelEdit = () => {
    setAnswerText('');
    setEditingAnswerId(null);
  };
  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'normal':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'low':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Consultant Dashboard
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
            className="card bg-gradient-to-br from-yellow-500 to-orange-600 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Pending Questions</p>
                <p className="text-3xl font-bold">{pendingQuestions.length}</p>
              </div>
              <Clock className="w-12 h-12 text-white/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Questions Answered</p>
                <p className="text-3xl font-bold">{answeredQuestions.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-white/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Questions</p>
                <p className="text-3xl font-bold">
                  {pendingQuestions.length + answeredQuestions.length}
                </p>
              </div>
              <MessageCircle className="w-12 h-12 text-white/30" />
            </div>
          </motion.div>
        </div>
        {}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'pending'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Pending Questions ({pendingQuestions.length})
            </button>
            <button
              onClick={() => setActiveTab('answered')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'answered'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              My Answered Questions ({answeredQuestions.length})
            </button>
          </div>
        </div>
        {}
        {loading ? (
          <div className="card text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p>Loading questions...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {pendingQuestions.length === 0 ? (
                  <div className="card text-center py-12">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No pending questions at the moment. Check back later!
                    </p>
                  </div>
                ) : (
                  pendingQuestions.map((question) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            {question.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {question.parent_name || 'Anonymous Parent'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDate(question.created_at || new Date().toISOString())}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                              question.priority
                            )}`}
                          >
                            {question.priority.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                            {question.category}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {question.question_text}
                        </p>
                      </div>
                      {answeringId === question.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3"
                        >
                          <textarea
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            placeholder="Provide detailed and helpful answer..."
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-gray-800 dark:border-gray-700"
                            disabled={submitting}
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAnswerQuestion(question.id)}
                              disabled={submitting}
                              className="flex items-center gap-2 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 transition-all"
                            >
                              <Send className="w-4 h-4" />
                              {submitting ? 'Submitting...' : 'Submit Answer'}
                            </button>
                            <button
                              onClick={() => {
                                setAnsweringId(null);
                                setAnswerText('');
                              }}
                              disabled={submitting}
                              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => setAnsweringId(question.id)}
                          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                        >
                          Answer Question
                        </button>
                      )}
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
            {activeTab === 'answered' && (
              <motion.div
                key="answered"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {answeredQuestions.length === 0 ? (
                  <div className="card text-center py-12">
                    <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      You haven't answered any questions yet. Check the pending tab to get
                      started!
                    </p>
                  </div>
                ) : (
                  answeredQuestions.map((question) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            {question.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {question.parent_name || 'Anonymous Parent'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Answered: {formatDate(question.answered_at || question.updated_at || new Date().toISOString())}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                              question.priority
                            )}`}
                          >
                            {question.priority.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                            {question.category}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                          Question:
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {question.question_text}
                        </p>
                      </div>
                      {editingAnswerId === question.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3"
                        >
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Edit Your Answer:
                          </label>
                          <textarea
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            placeholder="Update your answer..."
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-gray-800 dark:border-gray-700"
                            disabled={submitting}
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleUpdateAnswer(question.id)}
                              disabled={submitting}
                              className="flex items-center gap-2 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 transition-all"
                            >
                              <Send className="w-4 h-4" />
                              {submitting ? 'Updating...' : 'Update Answer'}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              disabled={submitting}
                              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                                Your Answer:
                              </p>
                              <button
                                onClick={() => handleEditAnswer(question)}
                                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                title="Edit answer"
                              >
                                <Edit2 className="w-3 h-3" />
                                Edit
                              </button>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                              {question.answer_text}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
export default ConsultantDashboard;