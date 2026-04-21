import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Briefcase } from 'lucide-react';
import { authAPI } from '../services/auth';
const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'parent' | 'consultant'>('parent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    specialization: '',
    experience_years: '',
    bio: '',
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const userData: any = {
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        role: role,
        phone: formData.phone || undefined,
      };
      if (role === 'consultant') {
        userData.specialization = formData.specialization;
        userData.experience_years = parseInt(formData.experience_years) || undefined;
        userData.bio = formData.bio;
      }
      const response = await authAPI.signup(userData);
      if (response.success) {
        if (role === 'parent') {
          navigate('/parent-dashboard');
        } else {
          alert('✅ Registration Successful!\n\nYour consultant account has been created and is pending admin approval.\n\nWhat happens next:\n• Our team will review your application\n• You\'ll receive an email once approved\n• After approval, you can login normally\n\nThank you for joining BrightRoots!');
          navigate('/login');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          {}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                role === 'parent'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              I'm a Parent
            </button>
            <button
              type="button"
              onClick={() => setRole('consultant')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                role === 'consultant'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              I'm a Consultant
            </button>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
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
              <label className="block text-sm font-medium mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter your phone number"
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
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            {}
            {role === 'consultant' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Specialization *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                      placeholder="e.g., Child Psychologist, Pediatrician"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter years of experience"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Tell us about your experience and expertise..."
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
export default SignupPage;