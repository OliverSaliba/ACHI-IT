import { useState, useEffect } from 'react'
import './App.css'
import { useTranslation } from "react-i18next"
import ScrollToTop from './components/ScrollToTop'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [showMenu, setshowMenu] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('English')
  const [currentCountry, setCurrentCountry] = useState('Country')

  const { t, i18n } = useTranslation()

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang)
    if (lang === 'en') setCurrentLanguage(t('langDropwn.english'))
    else if (lang === 'ar') setCurrentLanguage(t('langDropwn.arabic'))
    else if (lang === 'it') setCurrentLanguage(t('langDropwn.italian'))
    else setCurrentLanguage(t('langDropwn.french'))
  }

  const handleCountry = (country) => {
    setCurrentCountry(country)
  }

  useEffect(() => {
    document.dir = i18n.dir()
  }, [i18n, i18n.language])

  // Verify Open Sans font is applied (TEMPORARY DEBUG)
  useEffect(() => {
    const computedFont = getComputedStyle(document.body).fontFamily
    console.log("FONT:", computedFont)
    if (computedFont.includes('Open Sans')) {
      console.log('✓ Open Sans is successfully applied globally')
    } else {
      console.warn('⚠ Open Sans may not be applied. Computed font:', computedFont)
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <AppRoutes
        showMenu={showMenu}
        setshowMenu={setshowMenu}
        userLang={i18n.language}
        direction={i18n.dir()}
        handleLanguage={handleLanguage}
        currentLanguage={currentLanguage}
        handleCountry={handleCountry}
        currentCountry={currentCountry}
      />
    </>
  )
}

export default App
