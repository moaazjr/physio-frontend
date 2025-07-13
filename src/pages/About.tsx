import React from 'react';
import { Star, Award, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function About() {
  const { t, language, toggleLanguage } = useLanguage();

  const certifications = [
    t('certification1'),
    t('certification2'),
    t('certification3'),
    t('certification4'),
    t('certification5'),
    t('certification6')
  ];

  // Background component for reuse
  const DarkBackground = ({ children, className = "" }) => (
    <div className={`relative ${className}`}>
      {/* Background with dotted pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: `
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.01) 1px, transparent 1px),
          linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)
        `,
          backgroundSize: '50px 50px, 40px 40px, 30px 30px, 100% 100%',
          backgroundPosition: '0 0, 25px 25px, 12px 12px, 0 0'
        }}
      />

      {/* Additional subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
          backgroundSize: '60px 60px, 45px 45px, 35px 35px'
        }}
      />

      {/* Golden glow effects - responsive positioning */}
      <div className="absolute top-10 left-4 sm:top-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-yellow-400 rounded-full opacity-5 blur-3xl" style={{ animation: 'pulse 6s ease-in-out infinite' }}></div>
      <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-32 h-32 sm:w-64 sm:h-64 bg-yellow-300 rounded-full opacity-3 blur-2xl" style={{ animation: 'pulse 8s ease-in-out infinite' }}></div>

      {/* Animated floating elements - hidden on small screens */}
      <div className="hidden sm:block absolute top-1/4 right-1/3 w-2 h-2 bg-yellow-400 rounded-full opacity-40" style={{ animation: 'bounce 4s ease-in-out infinite' }}></div>
      <div className="hidden sm:block absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-60" style={{ animation: 'ping 5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
      <div className="hidden sm:block absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-30" style={{ animation: 'pulse 7s ease-in-out infinite' }}></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  return (
    <DarkBackground className="min-h-screen">
      {/* Language Toggle Button - Fixed positioning */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 bg-yellow-400 text-black px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-yellow-300 transition-colors z-50 text-sm"
      >
        {language === 'ar' ? 'English' : 'العربية'}
      </button>

      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="text-center">
            {/* Decorative top element - Simplified for mobile */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16 sm:w-32"></div>
              <div className="mx-3 sm:mx-6 w-2 h-2 sm:w-3 sm:h-3 border-2 border-yellow-400 rounded-full bg-black"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16 sm:w-32"></div>
            </div>

            {/* Title - Responsive text sizes */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
              <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent" style={{ animation: 'pulse 5s ease-in-out infinite' }}>
                {t('aboutTitle')}
              </span>
            </h1>

            {/* Subtitle with enhanced styling - Better mobile spacing */}
            <div className="relative max-w-4xl mx-auto mb-8 sm:mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-yellow-400/10 to-yellow-400/5 rounded-xl sm:rounded-2xl blur-xl"></div>
              <p className={`relative text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed p-4 sm:p-6 lg:p-8 border border-yellow-400/20 rounded-xl sm:rounded-2xl backdrop-blur-sm bg-black/30 ${language === 'ar' ? 'font-arabic text-right' : 'text-left'
                }`}>
                {t('aboutSubtitle')}
              </p>
            </div>

            {/* Call to action - Better mobile button */}
            {/* <div className="flex justify-center">
              <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/50 text-sm sm:text-base">
                <span className="relative z-10">
                  {t('bookAppointment')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div> */}

            {/* Decorative bottom element - Simplified for mobile */}
            <div className="flex items-center justify-center mt-8 sm:mt-12">
              <div className="bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent w-12 sm:w-24"></div>
              <div className="mx-2 sm:mx-4 flex space-x-1 sm:space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full" style={{ animation: 'pulse 4s ease-in-out infinite' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full" style={{ animation: 'pulse 5s ease-in-out infinite' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full" style={{ animation: 'pulse 6s ease-in-out infinite' }}></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent w-12 sm:w-24"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          {/* <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-12 sm:w-24"></div>
              <div className="mx-2 sm:mx-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-12 sm:w-24"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {language === 'ar' ? 'شريكك في التعافي' : 'Your Partner in Recovery'}
            </h2>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Image Section */}
            <div className="relative order-1 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-xl sm:rounded-2xl blur-xl"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 transform transition-transform duration-500 hover:scale-105">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-center text-yellow-400">
                    <img src="/images/sohel.jpg" alt="Doctor" className='w-44 h-44 sm:w-48 sm:h-48 lg:w-60 lg:h-60 mx-auto mb-4 rounded-lg sm:rounded-xl object-cover' />
                    <p className="text-base sm:text-lg font-semibold">{t('doctorName')}</p>
                    <p className="text-xs sm:text-sm text-yellow-300">{t('doctorSpecialty')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className={`order-2 lg:order-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-yellow-400/10 to-yellow-400/5 rounded-xl sm:rounded-2xl blur-xl"></div>
                <div className="relative bg-black/30 backdrop-blur-sm border border-yellow-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 mb-4 sm:mb-6 leading-relaxed">
                    {t('doctorDescription')}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed">
                    {t('doctorApproach')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-12 sm:w-24"></div>
              <Star className="mx-2 sm:mx-4 w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-12 sm:w-24"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('educationAndCertifications')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 px-4">
              {t('educationAndCertificationsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`group relative ${language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-lg sm:rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className={`relative flex items-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-lg sm:rounded-xl hover:border-yellow-400/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/20 ${language === 'ar' ? 'flex-row-reverse' : 'space-x-3'}`}>
                  <Star className={`h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0 group-hover:text-yellow-300 transition-colors duration-300 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <span className="text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors duration-300 leading-relaxed">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Header */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16 sm:w-32"></div>
              <Award className="mx-3 sm:mx-6 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16 sm:w-32"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
              {t('treatmentPhilosophy')}
            </h2>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-yellow-400/10 to-yellow-400/5 rounded-xl sm:rounded-2xl blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-sm border border-yellow-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
              <blockquote className={`text-base sm:text-lg md:text-xl lg:text-2xl italic leading-relaxed mb-6 sm:mb-8 text-slate-200 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {`"${t('treatmentQuote')}"`}
              </blockquote>
              <div className="flex items-center justify-center flex-wrap">
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent w-8 sm:w-16"></div>
                <p className="mx-3 sm:mx-6 text-yellow-300 text-sm sm:text-base lg:text-lg font-medium text-center">
                  {t('doctorCredentials')}
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent w-8 sm:w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom decorative element */}
      <div className="py-8 sm:py-12">
        <div className="flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16 sm:w-32"></div>
          <div className="mx-3 sm:mx-6 flex space-x-2 sm:space-x-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16 sm:w-32"></div>
        </div>
      </div>
    </DarkBackground>
  );
}

export default About;