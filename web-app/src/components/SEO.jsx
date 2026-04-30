import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, keywords, ogImage, ogType, canonicalUrl }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const siteName = "Dr. Grapes";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Dr. Grapes is the ultimate medical student companion, providing tools, resources, and a community to excel in your medical journey.";
  const metaDescription = description || defaultDescription;
  const siteUrl = "https://dr-grapes.ztsolutions.tech"; // Replace with actual domain if known
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonicalUrl} />
      <html lang={currentLang} dir={currentLang === 'ar' ? 'rtl' : 'ltr'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage || `${siteUrl}/og-image.png`} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage || `${siteUrl}/og-image.png`} />

      {/* Theme Color */}
      <meta name="theme-color" content="#7c3aed" />
    </Helmet>
  );
};

export default SEO;
