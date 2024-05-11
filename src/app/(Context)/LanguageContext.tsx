'use client'
import { createContext, useState, useContext, FC, ReactNode } from 'react';


//types
type Language = 'eng' | 'geo';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}
interface LanguageProviderProps {
    children: ReactNode;
  }


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('eng');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'eng' ? 'geo' : 'eng'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
