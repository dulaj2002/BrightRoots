import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { authAPI } from '../services/auth';
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authAPI.login(formData.email, formData.password);
      if (response.success) {
        const user = response.user;
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'consultant') {
          navigate('/consultant-dashboard');
        } else {
          navigate('/parent-dashboard');
        }
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  const isPendingAccount = error.toLowerCase().includes('pending');
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          {error && (
            <div className={`mb-4 p-4 border rounded-lg ${
              isPendingAccount
                ? 'bg-orange-50 border-orange-300 dark:bg-orange-900/20 dark:border-orange-800'
                : 'bg-red-100 border-red-300 dark:bg-red-900/20 dark:border-red-800'
            }`}>
              <div className={`font-semibold mb-2 ${
                isPendingAccount ? 'text-orange-800 dark:text-orange-200' : 'text-red-800 dark:text-red-200'
              }`}>
                {isPendingAccount ? '⏳ Account Pending Approval' : '❌ Login Error'}
              </div>
              <p className={`text-sm ${
                isPendingAccount ? 'text-orange-700 dark:text-orange-300' : 'text-red-700 dark:text-red-300'
              }`}>
                {error}
              </p>
              {isPendingAccount && (
                <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-700">
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    📋 Next Steps:
                  </p>
                  <ul className="text-xs text-orange-600 dark:text-orange-400 mt-1 space-y-1 ml-4 list-disc">
                    <li>Your consultant registration has been received</li>
                    <li>An administrator will review your application</li>
                    <li>You'll receive approval notification via email</li>
                    <li>Contact: admin@parentcare.com for inquiries</li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
              Sign Up
            </Link>
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-2">
              Test Accounts:
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Admin: admin@parentcare.com / admin123
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default LoginPage;