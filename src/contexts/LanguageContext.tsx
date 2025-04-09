import React, { createContext, useContext, useState } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => any; // Using 'any' to simplify typing
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey, params?: Record<string, string | number>) => {
    const value = translations[language][key];
    
    // Only do replacements if value is a string and we have params
    if (typeof value === 'string' && params) {
      let result = value;
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(`{${paramKey}}`, String(paramValue));
      });
      return result;
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}