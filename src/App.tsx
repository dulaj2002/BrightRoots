import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage.tsx';
import LearningPage from './pages/LearningPage.tsx';
import ForumPage from './pages/ForumPage.tsx';
import ArticlesPage from './pages/ArticlesPage.tsx';
import ConsultantPage from './pages/ConsultantPage.tsx';
import TrackerPage from './pages/TrackerPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ParentDashboard from './pages/ParentDashboard.tsx';
import ConsultantDashboard from './pages/ConsultantDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import ScrollToTop from './components/ScrollToTop';
// Main App component with routing and dark mode support
function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedMode === 'true' || (!savedMode && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/consultant" element={<ConsultantPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/consultant-dashboard" element={<ConsultantDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;