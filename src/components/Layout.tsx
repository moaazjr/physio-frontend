import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black/90 backdrop-blur-sm fixed w-full z-50 shadow-md animate-slideDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src="/images/Logo-Photoroom.png" alt="Logo" className="h-14 w-18" />
              <span className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                {language === 'ar' ? 'فيزيوجولد' : 'PhysioGold'}
              </span>
            </Link>

            <div className="hidden md:block">
              <div className={`ml-10 flex items-baseline space-x-8 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                {['/', '/about',  '/contact'].map((path, idx) => (
                  <Link
                    key={path}
                    to={path}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${isActive(path)
                        ? 'text-yellow-400 border-b-2 border-yellow-400'
                        : 'text-white hover:text-yellow-400'
                      }`}
                  >
                    {t(['home', 'about', 'contact'][idx])}
                  </Link>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-all duration-300 hover:scale-105"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'EN' : 'عربي'}
                </button>
                <Link
                  to="/booking"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-6 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {t('bookSession')}
                </Link>
              </div>
            </div>

            {/* Mobile Right Side */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center px-2 py-1 text-sm font-medium text-white hover:text-yellow-400 transition-all duration-300"
              >
                <Globe className="h-4 w-4 mr-1" />
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-yellow-600 animate-slideDown">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['/', '/about', '/contact'].map((path, idx) => (
                <Link
                  key={path}
                  to={path}
                  className={`block px-3 py-2 font-medium transition-colors duration-300 ${isActive(path)
                      ? 'text-yellow-400'
                      : 'text-white hover:text-yellow-400'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(['home', 'about', 'contact'][idx])}
                </Link>
              ))}
              <Link
                to="/booking"
                className="block w-full text-left bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-3 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('bookSession')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-yellow-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <User className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold">
                {language === 'ar' ? 'فيزيوجولد' : 'PhysioGold'}
              </span>
            </div>
            <p className="text-yellow-300 mb-4">{t('footerText')}</p>
            <p className="text-yellow-500 text-sm">
              © 2024 {language === 'ar' ? 'فيزيوجولد' : 'PhysioGold'}. {t('allRightsReserved')}.
            </p>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default Layout;