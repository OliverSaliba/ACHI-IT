// src/routing/LangRouter.jsx
import { useEffect, useMemo, createContext, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getLangFromPath, stripLocalePrefix, getLangPrefix, stripPublicBase, getLogicalPathFromLocalizedPath } from "../utils/langRouting"
import { ITALY_ENABLED } from "../utils/featureFlags"

const LangRouterContext = createContext(null)

export const useLangRouter = () => {
  const context = useContext(LangRouterContext)
  if (!context) throw new Error("useLangRouter must be used within LangRouter")
  return context
}

function LangRouter({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const pathnameNoBase = useMemo(() => stripPublicBase(location.pathname), [location.pathname])

  const urlLang = useMemo(() => getLangFromPath(pathnameNoBase), [pathnameNoBase])

  const cleanPath = useMemo(() => {
    const afterLocale = stripLocalePrefix(pathnameNoBase)
    const lang = getLangFromPath(pathnameNoBase)
    return getLogicalPathFromLocalizedPath(afterLocale, lang)
  }, [pathnameNoBase])

  const cleanLocation = useMemo(
    () => ({
      ...location,
      pathname: cleanPath,
    }),
    [location, cleanPath]
  )

  useEffect(() => {
    if (!ITALY_ENABLED && pathnameNoBase.startsWith("/it")) {
      const withoutIt = pathnameNoBase.replace(/^\/it\/?/, "") || "/"
      const target = withoutIt.startsWith("/") ? withoutIt : `/${withoutIt}`
      navigate(`${target}${location.search || ""}${location.hash || ""}`, { replace: true })
      return
    }
    if (i18n.language !== urlLang) i18n.changeLanguage(urlLang)
  }, [pathnameNoBase, urlLang, i18n, navigate, location.search, location.hash])

  useEffect(() => {
    const isRTL = urlLang === "ar"
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    const htmlLang = urlLang === "ar" ? "ar" : urlLang === "fr" ? "fr" : urlLang === "it" ? "it" : "en"
    document.documentElement.lang = htmlLang
  }, [urlLang])

  useEffect(() => {
    localStorage.setItem("selectedLanguage", urlLang || "en")
  }, [urlLang])

  useEffect(() => {
    const rawSaved = localStorage.getItem("selectedLanguage") || "en"
    const savedLang = rawSaved === "lb" ? "ar" : rawSaved === "it" ? "it" : rawSaved

    const currentUrlLang = getLangFromPath(pathnameNoBase)

    if (currentUrlLang === "en" && savedLang !== "en") {
      const clean = stripLocalePrefix(pathnameNoBase)
      const prefix = getLangPrefix(savedLang)
      const targetPath = prefix ? `/${prefix}${clean === "/" ? "" : clean}` : clean

      const targetFull = `${targetPath}${location.search || ""}${location.hash || ""}`
      navigate(targetFull, { replace: true })
    }
  }, [pathnameNoBase, location.search, location.hash, navigate])

  return <LangRouterContext.Provider value={{ cleanLocation, urlLang }}>{children}</LangRouterContext.Provider>
}

export default LangRouter
