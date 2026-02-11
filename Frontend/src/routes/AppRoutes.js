// src/routes/AppRoutes.js
import { useEffect, useMemo, useState } from "react"
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products"
import Product3DView from "../pages/Product3DView"
import Projects from "../pages/Projects"
import Sectors from "../pages/Sectors"
import ProjectDetails from "../pages/ProjectDetails"
import Gallery from "../pages/Gallery"
import Blog from "../pages/Blog"
import BlogItem from "../pages/BlogItem"
import Services from "../pages/Services"
import SingleService from "../components/services/SingleService"
import PageNotFound from "../pages/PageNotFound"
import Careers from "../pages/Careers"
import PrivacyPolicy from "../pages/PrivacyPolicy"

import LangRouter, { useLangRouter } from "../routing/LangRouter"
import { ITALY_ENABLED } from "../utils/featureFlags"
import RouteSeo from "../seo/RouteSeo"
import { normalizeTrailingSlash } from "../seo/urlNormalizer"
import { initMixedContentGuard } from "../seo/mixedContentGuard"

import "glider-js/glider.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function AppRoutesInner({ showMenu, setshowMenu, handleLanguage, currentLanguage, handleCountry, currentCountry }) {
  const { i18n } = useTranslation()
  const { cleanLocation, urlLang } = useLangRouter()
  const navigate = useNavigate()
  const location = useLocation()
  const [headerHeight, setHeaderHeight] = useState(0)

  const isHome = useMemo(() => cleanLocation.pathname === "/", [cleanLocation.pathname])

  useEffect(() => {
    const countryFromUrl = urlLang === "it" && ITALY_ENABLED ? "Italy" : "Lebanon"
    handleCountry(countryFromUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLang])

  const localBusinessSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://achiscaffolding.com/#organization",
      "name": "ACHI Scaffolding",
      "alternateName": "ACHI",
      "url": "https://achiscaffolding.com",
      "logo": "https://achiscaffolding.com/assets/ArchiScaffoldinglogo.png",
      "image": "https://achiscaffolding.com/assets/ArchiScaffoldinglogo.png",
      "description":
        "ACHI Scaffolding delivers engineered scaffolding and temporary works solutions for construction, industrial, and complex urban projects across Lebanon.",
      "telephone": "+96103322811",
      "email": "achi.gr@hotmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "LB",
        "addressRegion": "Lebanon",
        "addressLocality": "Lebanon"
      },
      "areaServed": [
        { "@type": "City", "name": "Beirut" },
        { "@type": "City", "name": "Mount Lebanon" },
        { "@type": "City", "name": "North Lebanon" },
        { "@type": "City", "name": "South Lebanon" },
        { "@type": "City", "name": "Bekaa" }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+96103322811",
          "contactType": "customer support",
          "areaServed": "LB",
          "availableLanguage": ["en", "fr", "ar"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+96103322811",
          "email": "achi.gr@hotmail.com",
          "contactType": "technical support",
          "areaServed": "LB",
          "availableLanguage": ["en", "fr", "ar"]
        },
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "areaServed": "LB",
          "availableLanguage": ["en", "fr", "ar"]
        }
      ],
      "sameAs": ["https://www.facebook.com/ACHISCAFF", "https://www.instagram.com/achiscaffoldinglb"]
    }
  }, [])

  useEffect(() => {
    normalizeTrailingSlash(navigate, location.pathname)
    initMixedContentGuard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (headerHeight === 0) return

    const scrollToHash = (retryCount = 0) => {
      const hash = window.location.hash || location.hash
      if (!hash) return

      const element = document.querySelector(hash) || document.getElementById(hash.slice(1))
      if (!element) {
        if (retryCount < 3) {
          setTimeout(() => scrollToHash(retryCount + 1), 100 * (retryCount + 1))
        }
        return
      }

      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - 20
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }

    if (location.hash) {
      scrollToHash()
    } else if (window.location.hash) {
      scrollToHash()
    }

    const onHashChange = () => scrollToHash()
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [headerHeight, location.hash])

  return (
    <>
      <RouteSeo />
      <ScrollToTop />
      <div className="App" onClick={() => (showMenu ? setshowMenu(false) : true)}>
        <Header
          handleLanguage={handleLanguage}
          currentLanguage={currentLanguage}
          handleCountry={handleCountry}
          currentCountry={currentCountry}
          onHeightChange={setHeaderHeight}
        />

        <div style={!isHome && headerHeight > 0 ? { paddingTop: `${headerHeight}px` } : {}} className="main-content-wrapper">
          <Routes location={cleanLocation} key={`${cleanLocation.pathname}${cleanLocation.search || ""}`}>
            <Route
              path="/"
              element={<Home showMenu={showMenu} setshowMenu={setshowMenu} direction={i18n.dir()} userLang={i18n.language} />}
            />

            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/3d/:slug" element={<Product3DView />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/sectors" element={<Sectors />} />

            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/careers" element={<Careers />} />

            <Route
              path="/services"
              element={<Services showMenu={showMenu} setshowMenu={setshowMenu} userLang={i18n.language} />}
            />
            <Route path="/services/:serviceSlug" element={<SingleService />} />
            <Route path="/services/serviceItem" element={<SingleService />} />

            <Route path="/gallery" element={<Gallery />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-post-1" element={<BlogItem />} />
            <Route path="/blog-post-2" element={<BlogItem />} />
            <Route path="/blog-post-3" element={<BlogItem />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

function AppRoutes() {
  const [showMenu, setshowMenu] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("English")
  const [currentCountry, setCurrentCountry] = useState("Country")

  const { t, i18n } = useTranslation()

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang)
    if (lang === "en") setCurrentLanguage(t("langDropwn.english"))
    else if (lang === "ar") setCurrentLanguage(t("langDropwn.arabic"))
    else if (lang === "it") setCurrentLanguage(t("langDropwn.italian"))
    else setCurrentLanguage(t("langDropwn.french"))
  }

  const handleCountry = (country) => {
    setCurrentCountry(country)
  }

  useEffect(() => {
    document.dir = i18n.dir()
  }, [i18n, i18n.language])

  return (
    <LangRouter>
      <AppRoutesInner
        showMenu={showMenu}
        setshowMenu={setshowMenu}
        handleLanguage={handleLanguage}
        currentLanguage={currentLanguage}
        handleCountry={handleCountry}
        currentCountry={currentCountry}
      />
    </LangRouter>
  )
}

export default AppRoutes
