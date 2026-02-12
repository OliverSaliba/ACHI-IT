import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ImageWebp from "./ImageWebp"
import CountryWeather from "./CountryWeather"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang, stripLocalePrefix, getLogicalPathFromLocalizedPath } from "../utils/langRouting"
import { ITALY_ENABLED } from "../utils/featureFlags"

function Header({ handleLanguage, currentLanguage, handleCountry, currentCountry = "Country", onHeightChange }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const { urlLang } = useLangRouter()

  const currentLang = urlLang
  const isArabic = currentLang === "ar"

  const cleanPath = location.pathname.replace(/^\/(fr|lb|it)(?=\/|$)/, "")
  const isHome = cleanPath === "/" || cleanPath === ""

  const [showCountry, setshowCountry] = useState(false)
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef(null)
  const countryDropdownRef = useRef(null)

  const countryCoordinates = {
    Lebanon: { lat: 33.8938, lon: 35.5018 },
    Italy: { lat: 41.9028, lon: 12.4964 },
  }
  const displayCountry = currentCountry && currentCountry !== "Country" ? currentCountry : "Lebanon"
  const weatherCoords = countryCoordinates[displayCountry] || countryCoordinates.Lebanon

  useLayoutEffect(() => {
    if (!headerRef.current) return

    const measureHeight = () => {
      if (headerRef.current && onHeightChange) {
        const height = headerRef.current.offsetHeight
        onHeightChange(height)
      }
    }

    measureHeight()
    const resizeObserver = new ResizeObserver(measureHeight)
    resizeObserver.observe(headerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [onHeightChange, showCountry, open])

  useEffect(() => {
    document.body.classList.toggle("home-page", isHome)
    return () => document.body.classList.remove("home-page")
  }, [isHome])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const sectorsLocked = document.documentElement.classList.contains("sectors-scroll-locked")
      setIsScrolled(scrollY > 10 || sectorsLocked)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setshowCountry(false)
      }
    }
    if (showCountry) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCountry])

  const closeAllDropdowns = () => {
    setshowCountry(false)
  }

  const forceSwitchLanguage = (lang) => {
    const clean = stripLocalePrefix(location.pathname)
    const logicalPath = getLogicalPathFromLocalizedPath(clean, currentLang)
    const targetPath = buildPathWithLang(lang, logicalPath)

    const search = location.search || ""
    const hash = location.hash || ""

    navigate(`${targetPath}${search}${hash}`, { replace: true })
    i18n.changeLanguage(lang)
    if (handleLanguage) handleLanguage(lang)
    localStorage.setItem("selectedLanguage", lang)
    closeAllDropdowns()
    setOpen(false)
  }

  const handleLanguageChange = (lang) => {
    forceSwitchLanguage(lang)
  }

  const handleCountryChange = (country) => {
    if (handleCountry) handleCountry(country)
    if (country === "France") {
      forceSwitchLanguage("fr")
    } else if (country === "Italy") {
      forceSwitchLanguage("it")
    } else if (country === "Lebanon") {
      forceSwitchLanguage("en")
    }
    setshowCountry(false)
  }

  const goToHomeSection = (id) => {
    closeAllDropdowns()
    const hash = id.startsWith("#") ? id : `#${id}`

    if (!isHome) {
      const home = buildPathWithLang(urlLang, "/")
      navigate(`${home}${hash}`)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }, 200)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }

    setOpen(false)
  }

  const headerWrapClass = "fixed top-0 left-0 w-full z-[999999]"

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#FA7800] font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] inline-block"
      : "text-white font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] hover:text-[#FA7800] transition duration-300 inline-block"

  const mobileNavLinkClass = ({ isActive }) =>
    isActive ? "block ltr:ml-[20px] rtl:mr-[20px] text-[#FA7800]" : "block ltr:ml-[20px] rtl:mr-[20px] text-[#FFFFFF]"

  const navItems = [
    { key: "home", type: "navlink", to: buildPathWithLang(urlLang, "/"), label: t("nav.home"), onClick: closeAllDropdowns },
    { key: "about", type: "navlink", to: buildPathWithLang(urlLang, "/about/"), label: t("nav.about"), onClick: closeAllDropdowns },
    { key: "services", type: "navlink", to: buildPathWithLang(urlLang, "/services/"), label: t("nav.services"), onClick: closeAllDropdowns },
    // { key: "products",  type: "navlink",  to: buildPathWithLang(urlLang, "/products"),  label: t("nav.products"),  onClick: closeAllDropdowns,},
    { key: "sectors", type: "button", label: t("nav.sectors"), onClick: () => goToHomeSection("sectors-bar") },
    { key: "clients", type: "button", label: t("nav.clients"), onClick: () => goToHomeSection("clients") },
    { key: "projects", type: "navlink", to: buildPathWithLang(urlLang, "/projects/"), label: t("nav.projects"), onClick: closeAllDropdowns },
    { key: "blog", type: "navlink", to: buildPathWithLang(urlLang, "/blog/"), label: t("nav.blog"), onClick: closeAllDropdowns },
    { key: "careers", type: "navlink", to: buildPathWithLang(urlLang, "/careers/"), label: t("nav.careers"), onClick: closeAllDropdowns },

    { key: "gallery", type: "navlink", to: buildPathWithLang(urlLang, "/gallery"), label: t("nav.gallery"), onClick: closeAllDropdowns },
    { key: "contact", type: "button", label: t("nav.contact"), onClick: () => goToHomeSection("contactForm") },
  ]

  const itemsToRender = navItems

  const homePath = buildPathWithLang(urlLang, "/")

  return (
    <>
      <header ref={headerRef} className={headerWrapClass}>
        <div
          dir="ltr"
          className="header-top-bar bg-[#28509E] hidden md:flex flex-row justify-between items-center pt-[10px] pb-[10px] border-b-[0.5px] border-white/15 px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]"
        >
          <div className="flex items-center">
            <Link to={homePath} className="hidden md:block" onClick={() => { closeAllDropdowns(); setOpen(false) }}>
              <ImageWebp srcWebp={`${process.env.PUBLIC_URL || ''}/assets/ArchiScaffoldinglogo_lossyalpha.webp`} src={`${process.env.PUBLIC_URL || ''}/assets/ArchiScaffoldinglogo_lossyalpha.webp`} alt="siteLogo" className="2xl:w-[150px] w-[100px]" />
            </Link>
          </div>

          <div className="flex flex-row items-center gap-[20px] md:gap-[20px] lg:gap-[20px] xl:gap-[20px] flex-nowrap">
            <div className="inline-flex items-center gap-[8px]">
              <ImageWebp srcWebp={`${process.env.PUBLIC_URL || ''}/assets/emailIcon_lossyalpha.webp`} src={`${process.env.PUBLIC_URL || ''}/assets/emailIcon_lossyalpha.webp`} className="w-[20px] h-[20px] flex-shrink-0" alt="emailIcon" />
              <span className="text-[14px] text-white font-[500] leading-[1] font-saira whitespace-nowrap inline-block">achi.gr@hotmail.com</span>
            </div>

            <div className="inline-flex items-center gap-[8px]">
              <ImageWebp srcWebp={`${process.env.PUBLIC_URL || ''}/assets/wpicon_lossyalpha.webp`} src={`${process.env.PUBLIC_URL || ''}/assets/wpicon_lossyalpha.webp`} className="w-[20px] h-[20px] flex-shrink-0" alt="whatsappIcon" />
              <span className="text-[14px] text-white font-[500] leading-[1] font-saira whitespace-nowrap inline-block" dir="ltr">+96103322811</span>
            </div>

            <div className="hidden xl:inline-flex items-center gap-[20px]">
              <a className="cursor-pointer inline-flex items-center" href="https://facebook.com/ACHISCAFF" target="_blank" rel="noreferrer"><img src={`${process.env.PUBLIC_URL || ''}/assets/iconoir_facebook.svg`} alt="Facebook" className="w-[20px] h-[20px]" /></a>
              <a className="cursor-pointer inline-flex items-center" href="https://www.instagram.com/achiscaffoldinglb" target="_blank" rel="noreferrer"><img src={`${process.env.PUBLIC_URL || ''}/assets/mdi_instagram.svg`} alt="Instagram" className="w-[20px] h-[20px]" /></a>
              <a className="cursor-pointer inline-flex items-center" href="https://twitter.com/AchiScaffolding" target="_blank" rel="noreferrer"><img src={`${process.env.PUBLIC_URL || ''}/assets/ri_twitter-x-fill.svg`} alt="X" className="w-[20px] h-[20px]" /></a>
              <a className="cursor-pointer inline-flex items-center" href="https://www.linkedin.com/company/achi-scaffolding/" target="_blank" rel="noreferrer"><img src={`${process.env.PUBLIC_URL || ''}/assets/basil_linkedin-outline.svg`} alt="LinkedIn" className="w-[20px] h-[20px]" /></a>
              <a className="cursor-pointer inline-flex items-center" href="https://www.tiktok.com/@achiscaffolding" target="_blank" rel="noreferrer"><img src={`${process.env.PUBLIC_URL || ''}/assets/ph_tiktok-logo.svg`} alt="TikTok" className="w-[20px] h-[20px]" /></a>
            </div>
          </div>

          <div className="flex items-center gap-[18px] relative flex-nowrap">
            <div ref={countryDropdownRef} className="relative inline-flex">
              <button
                type="button"
                onClick={() => setshowCountry((v) => !v)}
                className="inline-flex items-center gap-[8px] cursor-pointer rounded-lg py-2 px-2 -my-2 -mx-2 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E]"
                aria-expanded={showCountry}
                aria-haspopup="listbox"
                aria-label={`Country: ${displayCountry}. Click to change.`}
              >
                <CountryWeather country={displayCountry} coordinates={weatherCoords} />
                <span className="text-white font-saira font-[500] text-[14px] leading-[1] whitespace-nowrap">{displayCountry}</span>
                <ExpandMoreIcon
                  fontSize="small"
                  className={`text-white flex-shrink-0 transition-transform duration-300 ease-out`}
                  style={{ fontSize: "18px", transform: showCountry ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              <div
                role="listbox"
                aria-hidden={!showCountry}
                className={`absolute right-0 top-[calc(100%+8px)] z-[999] min-w-[140px] rounded-xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden transition-[opacity,transform] duration-200 ease-out origin-top-right ${
                  showCountry
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="py-2">
                  <button
                    type="button"
                    role="option"
                    aria-selected={displayCountry === "Lebanon"}
                    onClick={() => handleCountryChange("Lebanon")}
                    className="w-full text-left px-4 py-2.5 text-[14px] font-saira font-[500] text-[#00204A] hover:bg-[#FA7800]/10 hover:text-[#FA7800] focus:bg-[#FA7800]/10 focus:text-[#FA7800] focus:outline-none transition-colors duration-150"
                  >
                    Lebanon
                  </button>
                  {ITALY_ENABLED && (
                    <button
                      type="button"
                      role="option"
                      aria-selected={displayCountry === "Italy"}
                      onClick={() => handleCountryChange("Italy")}
                      className="w-full text-left px-4 py-2.5 text-[14px] font-saira font-[500] text-[#00204A] hover:bg-[#FA7800]/10 hover:text-[#FA7800] focus:bg-[#FA7800]/10 focus:text-[#FA7800] focus:outline-none transition-colors duration-150"
                    >
                      Italy
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-[8px]" role="group" aria-label="Language selector">
              {ITALY_ENABLED && currentCountry === "Italy" ? (
                <button type="button" onClick={() => handleLanguageChange("it")} aria-label={t("header.langItalian", "Switch to Italian")} aria-current={currentLang === "it" ? "true" : "false"} className={`lang-btn ${currentLang === "it" ? "is-active" : ""}`}>IT</button>
              ) : (
                <>
                  <button type="button" onClick={() => handleLanguageChange("en")} aria-label="Switch to English" aria-current={currentLang === "en" ? "true" : "false"} className={`lang-btn ${currentLang === "en" ? "is-active" : ""}`}>EN</button>
                  <button type="button" onClick={() => handleLanguageChange("fr")} aria-label="Switch to French" aria-current={currentLang === "fr" ? "true" : "false"} className={`lang-btn ${currentLang === "fr" ? "is-active" : ""}`}>FR</button>
                  <button type="button" onClick={() => handleLanguageChange("ar")} aria-label="Switch to Arabic" aria-current={currentLang === "ar" ? "true" : "false"} className={`lang-btn ${currentLang === "ar" ? "is-active" : ""}`}>AR</button>
                </>
              )}
            </div>
          </div>
        </div>

        <nav
          dir={isArabic ? "rtl" : "ltr"}
          className={`hidden md:block transition-all duration-300 ${
            isHome
              ? `relative border-b-0 ${isScrolled ? "bg-[#28509E]/90 backdrop-blur-md" : "bg-transparent"}`
              : `relative border-b-[#FFFFFF]/70 border-b-[0.5px] border-solid ${isScrolled ? "bg-[#28509E] backdrop-blur-md" : "bg-[#28509E]"}`
          }`}
        >
          <div className="w-full flex justify-center">
            <ul className={`flex gap-8 ${isHome ? "py-[18px] px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]" : "py-[12px] px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]"}`} dir={isArabic ? "rtl" : "ltr"}>
              {itemsToRender.map((item) => (
                <li key={item.key}>
                  {item.type === "navlink" ? (
                    <NavLink to={item.to} className={navLinkClass} onClick={item.onClick}>
                      {item.label}
                    </NavLink>
                  ) : (
                    <button className="text-white font-saira font-[600] uppercase text-[14px] tracking-wide leading-[1] hover:text-[#FA7800] transition duration-300 inline-block" onClick={item.onClick}>
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="bg-[#28509E] flex md:hidden flex-row justify-between items-center pt-[8px] pb-[8px] sm:pr-[20px] border-b-[#FFFFFF]/70 border-b-[0.5px] border-solid">
          <div className="flex flex-row justify-between items-center w-[100%] px-[8px] sm:px-[0px] ltr:ml-[20px] rtl:mr-[20px]">
            <Link to={homePath} onClick={() => { closeAllDropdowns(); setOpen(false) }}>
              <img className="w-[90px]" src={`${process.env.PUBLIC_URL || ''}/assets/ArchiScaffoldinglogo.png`} alt="siteLogo" />
            </Link>
          </div>

          <div className="ltr:mr-[20px] rtl:ml-[20px] md:hidden">
            <MenuIcon sx={{ fontSize: "40px" }} className="text-white cursor-pointer" onClick={() => { closeAllDropdowns(); setOpen(!open) }} />
          </div>
        </div>
      </header>

      <ul className={`md:hidden bg-[#28509E] text-white fixed w-full top-0 overflow-y-auto bottom-0 py-[40px] text-start duration-500 ${open ? "left-0" : "left-[-100%]"} z-[99999999] ltr:pl-3 rtl:pr-3`}>
        <li>
          <div className="flex justify-between items-center mb-[25px]">
            <div className="flex flex-row justify-between items-center w-[100%] px-[8px] sm:px-[0px]">
              <Link to={homePath} onClick={() => setOpen(false)}>
                <ImageWebp srcWebp={`${process.env.PUBLIC_URL || ''}/assets/ArchiScaffoldinglogo_lossyalpha.webp`} className="w-[90px]" src={`${process.env.PUBLIC_URL || ''}/assets/ArchiScaffoldinglogo_lossyalpha.webp`} alt="siteLogo" />
              </Link>
            </div>
            <div className="ltr:mr-5 rtl:ml-5">
              <CloseIcon fontSize={"large"} className="text-[#BED0FF] cursor-pointer" onClick={() => setOpen(false)} />
            </div>
          </div>
        </li>

        <NavLink to={buildPathWithLang(urlLang, "/")} className={mobileNavLinkClass} onClick={() => setOpen(false)}><p className="font-[500] text-[20px] font-saira py-2">{t("nav.home")}</p></NavLink>
        <NavLink to={buildPathWithLang(urlLang, "/about")} className={mobileNavLinkClass} onClick={() => setOpen(false)}><p className="font-[500] text-[20px] font-saira py-2">{t("nav.about")}</p></NavLink>
        <NavLink to={buildPathWithLang(urlLang, "/services")} className={mobileNavLinkClass} onClick={() => setOpen(false)}><p className="font-[500] text-[20px] font-saira py-2">{t("nav.services")}</p></NavLink>
        {/* <NavLink  to={buildPathWithLang(urlLang, "/products")} className={mobileNavLinkClass} onClick={() => setOpen(false)}><p className="font-[500] text-[20px] font-saira py-2">{t("nav.products")}</p></NavLink> */}
        <li className="ltr:ml-[20px] rtl:mr-[20px]"><p className="font-[500] text-[20px] cursor-pointer hover:text-[#FA7800] transition duration-500 font-saira py-2" onClick={() => goToHomeSection("sectors-bar")}>{t("nav.sectors")}</p></li>
        <li className="ltr:ml-[20px] rtl:mr-[20px]"><p className="font-[500] text-[20px] cursor-pointer hover:text-[#FA7800] transition duration-500 font-saira py-2" onClick={() => goToHomeSection("clients")}>{t("nav.clients")}</p></li>
        <NavLink to={buildPathWithLang(urlLang, "/projects")} className={mobileNavLinkClass} onClick={() => setOpen(false)}><p className="font-[500] text-[20px] font-saira py-2">{t("nav.projects")}</p></NavLink>
        <NavLink to={buildPathWithLang(urlLang, "/blog")} className={mobileNavLinkClass} onClick={() => setOpen(false)}><p className="font-[500] text-[20px] font-saira py-2">{t("nav.blog")}</p></NavLink>
        <NavLink to={buildPathWithLang(urlLang, "/careers")} className={mobileNavLinkClass} onClick={() => setOpen(false)}>
  <p className="font-[500] text-[20px] font-saira py-2">{t("nav.careers")}</p>
</NavLink>

        <NavLink to={buildPathWithLang(urlLang, "/gallery")} className={mobileNavLinkClass} onClick={() => setOpen(false)}><p className="font-[500] text-[20px] font-saira py-2">{t("nav.gallery")}</p></NavLink>
        <li className="ltr:ml-[20px] rtl:mr-[20px] border-[#FFFFFF] border-solid border-b-[2px] pb-[30px]"><p className="font-[500] text-[20px] cursor-pointer hover:text-[#FA7800] transition duration-500 font-saira py-2" onClick={() => goToHomeSection("contactForm")}>{t("nav.contact")}</p></li>

        <li className="ltr:ml-[20px] rtl:mr-[20px] mt-[30px] pt-[20px] border-t-[#FFFFFF] border-t-[1px] border-solid">
          <p className="font-[500] text-[18px] font-saira mb-[16px] text-white/90">Language</p>
          <div className="inline-flex items-center gap-[8px]" role="group" aria-label="Language selector">
            {ITALY_ENABLED && currentCountry === "Italy" ? (
              <button type="button" onClick={() => { handleLanguageChange("it"); setOpen(false) }} aria-label={t("header.langItalian", "Switch to Italian")} aria-current={currentLang === "it" ? "true" : "false"} className={`lang-btn ${currentLang === "it" ? "is-active" : ""}`}>IT</button>
            ) : (
              <>
                <button type="button" onClick={() => { handleLanguageChange("en"); setOpen(false) }} aria-label="Switch to English" aria-current={currentLang === "en" ? "true" : "false"} className={`lang-btn ${currentLang === "en" ? "is-active" : ""}`}>EN</button>
                <button type="button" onClick={() => { handleLanguageChange("fr"); setOpen(false) }} aria-label="Switch to French" aria-current={currentLang === "fr" ? "true" : "false"} className={`lang-btn ${currentLang === "fr" ? "is-active" : ""}`}>FR</button>
                <button type="button" onClick={() => { handleLanguageChange("ar"); setOpen(false) }} aria-label="Switch to Arabic" aria-current={currentLang === "ar" ? "true" : "false"} className={`lang-btn ${currentLang === "ar" ? "is-active" : ""}`}>AR</button>
              </>
            )}
          </div>
        </li>
      </ul>
    </>
  )
}

export default Header
