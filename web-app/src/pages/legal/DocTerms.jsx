import React from 'react';
import { useTranslation } from 'react-i18next';
import LegalLayout from './LegalLayout';
import SEO from '@/components/SEO';

const TermsOfService = () => {
  const { t } = useTranslation(['legal', 'landingPage']);
  const content = t('tos', { returnObjects: true });

  return (
    <>
      <SEO 
        title={content.title}
        description={t('seo.terms.description', 'Terms of Service for Dr. Grapes application.')}
        canonicalUrl="/terms"
      />
      <LegalLayout 
        title={content.title} 
        lastUpdated={content.lastUpdated} 
        type="tos"
      >
      <div className="space-y-16">
        {Object.entries(content.sections).map(([key, section]) => (
          <section key={key} className="group">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-4 group-hover:text-primary transition-colors">
              <span className="text-primary/20 text-4xl font-black tabular-nums">
                {section.title.split('.')[0]}
              </span>
              {section.title.split('.').slice(1).join('.').trim()}
            </h2>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 hover:bg-white/[0.04] transition-all duration-500">
              <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-medium">
                {section.content}
              </p>
            </div>
          </section>
        ))}
      </div>
    </LegalLayout>
    </>
  );
};

export default TermsOfService;
