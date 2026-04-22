import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/learning', label: t('nav.learning') },
    { path: '/forum', label: t('nav.forum') },
    { path: '/articles', label: t('nav.articles') },
    { path: '/consultant', label: t('nav.consultant') },
    { path: '/tracker', label: t('nav.tracker') },
    { path: '/faq', label: t('nav.faq') },
  ];
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          {}
          <div className="xs:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">BR</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">BrightRoots</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Supporting parents in nurturing bright futures for children aged 0-5 years with expert guidance and community support.
            </p>
          </div>
          {}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-xs sm:text-sm">{t('footer.address')}</span>
              </li>
              <li className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 flex-shrink-0" />
                <a href={`tel:${t('footer.phone')}`} className="text-gray-400 hover:text-primary-400 transition-colors text-xs sm:text-sm">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 flex-shrink-0" />
                <a href={`mailto:${t('footer.email')}`} className="text-gray-400 hover:text-primary-400 transition-colors text-xs sm:text-sm">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>
          {}
          <div className="xs:col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h3>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        {}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} BrightRoots. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
