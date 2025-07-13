import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Heart, Shield, Award, Play, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      {/* ----- */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #FFD700 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent animate-pulse"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-r from-amber-400/15 to-yellow-500/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-300/10 to-amber-400/10 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-12">

              {/* Logo Section */}
              <div className="animate-fadeInUp">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mb-8 shadow-2xl relative overflow-hidden group">
                  <img 
                    src="/images/physioGold.jpg" 
                    alt="Physio Gold Logo" 
                    className="w-28 h-28 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-6 animate-fadeInUp delay-300">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                  <span className="text-white">{t('heroTitle')}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 animate-gradient">{t('heroTitleSuffix')}</span>
                </h1>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-32"></div>
                  <span className="text-gray-300 text-xl font-light tracking-wider">{t('clinic')}</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-32"></div>
                </div>

                <p className="text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 italic">
                  {t('heroSubtitle')}
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto animate-fadeInUp delay-500">
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">{t('patientCount')}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{t('happyPatients')}</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">{t('successRateValue')}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{t('successRate')}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp delay-700">
                <Link 
                  to="/booking"
                  className="group relative bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="w-5 h-5 mr-3 fill-current" />
                    {t('bookYourSession')}
                    <ArrowRight className={`${language === 'ar' ? 'mr-3 rotate-180' : 'ml-3'} w-5 h-5 group-hover:translate-x-1 transition-transform duration-300`} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                {/* <Link 
                  to="/services" 
                  className="group relative border-2 border-yellow-400/50 text-yellow-400 px-10 py-4 rounded-full font-semibold text-lg backdrop-blur-sm hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Zap className="w-5 h-5 mr-3" />
                    {t('viewServices')}
                  </span>
                  <div className="absolute inset-0 bg-yellow-400/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link> */}
              </div>

              {/* Trust Indicators */}
              <div className="flex justify-center items-center space-x-8 text-gray-400 animate-fadeInUp delay-900">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm">{t('rating')}</span>
                </div>
                <div className="w-px h-6 bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{t('licensedClinic')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        {/* Background Pattern - كارو اصفر */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, #FFD700 25%, transparent 25%), linear-gradient(-45deg, #FFD700 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #FFD700 75%), linear-gradient(-45deg, transparent 75%, #FFD700 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fadeInUp">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              {t('whyDifferent')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('whyChooseUs')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('whyChooseUsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <Heart className="h-16 w-16 text-yellow-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {t('personalizedCare')}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {t('personalizedCareDesc')}
              </p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
              <Shield className="h-16 w-16 text-yellow-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {t('expertTreatment')}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {t('expertTreatmentDesc')}
              </p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
              <Award className="h-16 w-16 text-yellow-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {t('provenResults')}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {t('provenResultsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fadeInUp space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 text-yellow-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 mr-2 fill-current" />
              {t('startJourneyToday')}
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              {t('readyToTransform')}
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('dontLetPain')}
            </p>

            <Link
              to="/booking"
              className="group inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {t('bookConsultation')}
                <ArrowRight className={`${language === 'ar' ? 'mr-3 rotate-180' : 'ml-3'} w-6 h-6 group-hover:translate-x-1 transition-transform duration-300`} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <div className="flex justify-center items-center space-x-8 text-gray-400 pt-8">
              <span className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                {t('freeConsultation')}
              </span>
              <span className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                {t('noCommitment')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-900 { animation-delay: 0.9s; }
      `}</style>
    </div>
  );
}

export default Home;