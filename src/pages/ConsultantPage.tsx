import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Video, MapPin, Calendar, User, Mail, Phone, MessageSquare, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { consultantsAPI, Consultant, ConsultationBooking } from '../services/api';
const ConsultantPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ConsultationBooking>({
    name: '',
    email: '',
    phone: '',
    consultationType: 'online',
    preferredDate: '',
    preferredTime: '',
    childAge: '',
    concern: '',
  });
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    loadConsultants();
  }, []);
  const loadConsultants = async () => {
    try {
      setLoading(true);
      const data = await consultantsAPI.getAll();
      setConsultants(data);
    } catch (err) {
      console.error('Failed to load consultants:', err);
      setConsultants(getMockConsultants());
    } finally {
      setLoading(false);
    }
  };
  const getMockConsultants = (): Consultant[] => [
    {
      name: 'Dr. Priya Jayasinghe',
      specialization: 'Child Psychologist',
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      available: true,
    },
    {
      name: 'Dr. Amal Perera',
      specialization: 'Pediatrician',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      available: true,
    },
    {
      name: 'Ms. Nisha Fernando',
      specialization: 'Child Development Specialist',
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
      available: false,
    },
    {
      name: 'Dr. Rohan Silva',
      specialization: 'Speech Therapist',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
      available: true,
    },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    try {
      const response = await consultantsAPI.bookConsultation(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        consultationType: 'online',
        preferredDate: '',
        preferredTime: '',
        childAge: '',
        concern: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (err: any) {
      console.error('Failed to book consultation:', err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Failed to book consultation. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
    }
  };
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.preferredDate) {
      setErrorMessage('Please select a preferred date');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.childAge.trim()) {
      setErrorMessage('Please enter your child\'s age');
      setSubmitStatus('error');
      return false;
    }
    return true;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 bg-clip-text text-transparent px-4">
              {t('consultant.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
              {t('consultant.subtitle')}
            </p>
          </motion.div>
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card text-center group hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Video className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {t('consultant.online')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Connect with experts via video call from the comfort of your home
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card text-center group hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {t('consultant.inperson')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Schedule an in-person consultation at our center
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card text-center group hover:scale-105 transition-transform cursor-pointer sm:col-span-2 md:col-span-1"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Quick Consultation
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Get answers to your questions via chat or phone
              </p>
            </motion.div>
          </div>
          {}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white px-4">
              Meet Our Experts
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {consultants.map((consultant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="relative mb-3 sm:mb-4">
                    <img
                      src={consultant.image}
                      alt={consultant.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-primary-500"
                      loading="lazy"
                    />
                    {consultant.available && (
                      <div className="absolute bottom-0 right-1/4 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-4 border-white" />
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {consultant.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                    {consultant.specialization}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {consultant.experience} experience
                  </p>
                  {consultant.available && (
                    <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                      Available Now
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          {}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto card"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">
              {t('consultant.book')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Child's Age
                  </label>
                  <select
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Age</option>
                    <option value="0-6months">0-6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="1-2years">1-2 years</option>
                    <option value="2-3years">2-3 years</option>
                    <option value="3-4years">3-4 years</option>
                    <option value="4-5years">4-5 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Video className="w-4 h-4 inline mr-1" />
                    Consultation Type
                  </label>
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="online">Online Video Call</option>
                    <option value="inperson">In-Person Visit</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Describe Your Concern
                </label>
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Please describe your concern or question..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Booking...
                  </>
                ) : (
                  t('consultant.book')
                )}
              </button>
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Consultation request submitted successfully! We'll contact you soon.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default ConsultantPage;