import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Add this
import { Sprout, Users, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import LanguageSwitcher from '../components/common/LanguageSwitcher'; // Add this

const LandingPage = () => {
  const { t } = useTranslation(); // Add this

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{t('common.farmstock')}</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 font-medium transition"
              >
                {t('auth.login')}
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                {t('landing.getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold">🚀 {t('landing.tagline')}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('landing.heroTitle')}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('landing.heroDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
            >
              <span>{t('landing.startTrading')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg hover:bg-primary-50 transition font-semibold text-lg"
            >
              <span>{t('landing.signIn')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('landing.whyChoose')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('landing.whyChooseDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Users}
            title={t('landing.directConnection')}
            description={t('landing.directConnectionDesc')}
          />
          <FeatureCard
            icon={TrendingUp}
            title={t('landing.aiInsights')}
            description={t('landing.aiInsightsDesc')}
          />
          <FeatureCard
            icon={Shield}
            title={t('landing.secureTransactions')}
            description={t('landing.secureTransactionsDesc')}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('landing.ctaTitle')}
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            {t('landing.ctaDesc')}
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
          >
            <span>{t('landing.createFreeAccount')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>{t('landing.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  const Icon = icon;
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;