// Frontend/src/pages/About.js
import React, { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { buildPathWithLang } from "../utils/langRouting"
import SmartLink from "../seo/SmartLink"
import { useLangRouter } from "../routing/LangRouter"
import AeoIntroBlock from "../components/AeoIntroBlock"
import AeoFaqSection from "../components/AeoFaqSection"
import AeoJsonLd from "../components/AeoJsonLd"
import ChiSiamoIt from "./ChiSiamoIt"

const About = () => {
  const publicUrl = process.env.PUBLIC_URL || ""
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { urlLang } = useLangRouter()

  const stripPublicBase = (pathname) => {
    const base = (process.env.PUBLIC_URL || "").replace(/\/+$/, "")
    if (!base || base === "/") return pathname
    if (pathname === base) return "/"
    if (pathname.startsWith(base + "/")) return pathname.slice(base.length)
    return pathname
  }

  const rawPath = stripPublicBase(location.pathname)
  const cleanPath = rawPath.replace(/^\/(fr|lb|it)(?=\/|$)/, "")
  const isHome = cleanPath === "/" || cleanPath === ""

  const effectiveLang = urlLang || i18n.language || "en"

  const goToHomeSection = (id) => {
    const targetId = (id || "").replace(/^#/, "")
    const hash = `#${targetId}`

    const home = buildPathWithLang(effectiveLang, "/")

    if (!isHome) {
      navigate(`${home}${hash}`)
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }, 250)
      return
    }

    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
  }

  const baseUrl = "https://achiscaffolding.com"
  const canonicalUrl = `${baseUrl}${buildPathWithLang(effectiveLang, "/about")}`

  const orgSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ACHI Scaffolding",
      alternateName: "ACHI",
      url: baseUrl,
      logo: `${baseUrl}/assets/ArchiScaffoldinglogo.png`,
      description: "ACHI Scaffolding is a scaffolding company in Lebanon providing access scaffolding, façade scaffolding, and temporary access solutions for commercial, residential, and industrial projects.",
      telephone: "+96103322811",
      email: "achi.gr@hotmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LB",
        addressRegion: "Lebanon"
      },
      areaServed: [
        { "@type": "City", name: "Beirut" },
        { "@type": "City", name: "Mount Lebanon" },
        { "@type": "City", name: "North Lebanon" },
        { "@type": "City", name: "South Lebanon" },
        { "@type": "City", name: "Bekaa" }
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+96103322811",
          contactType: "customer support",
          areaServed: "LB",
          availableLanguage: ["en", "fr", "ar"]
        }
      ],
      sameAs: [
        "https://www.facebook.com/ACHISCAFF",
        "https://www.instagram.com/achiscaffoldinglb",
        "https://x.com/AchiScaffolding",
        "https://www.linkedin.com/company/achi-scaffolding/",
        "https://www.tiktok.com/@achiscaffolding"
      ]
    }),
    []
  )

  const localBusinessSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#organization`,
      name: "ACHI Scaffolding",
      alternateName: "ACHI",
      url: baseUrl,
      logo: `${baseUrl}/assets/ArchiScaffoldinglogo.png`,
      description: "ACHI Scaffolding is a scaffolding company in Lebanon providing access scaffolding, façade scaffolding, and temporary access solutions for commercial, residential, and industrial projects.",
      telephone: "+96103322811",
      email: "achi.gr@hotmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LB",
        addressRegion: "Lebanon",
        addressLocality: "Lebanon"
      },
      areaServed: [
        { "@type": "City", name: "Beirut" },
        { "@type": "City", name: "Mount Lebanon" },
        { "@type": "City", name: "North Lebanon" },
        { "@type": "City", name: "South Lebanon" },
        { "@type": "City", name: "Bekaa" }
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+96103322811",
          contactType: "customer support",
          areaServed: "LB",
          availableLanguage: ["en", "fr", "ar"]
        }
      ],
      sameAs: [
        "https://www.facebook.com/ACHISCAFF",
        "https://www.instagram.com/achiscaffoldinglb",
        "https://x.com/AchiScaffolding",
        "https://www.linkedin.com/company/achi-scaffolding/",
        "https://www.tiktok.com/@achiscaffolding"
      ]
    }),
    []
  )

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: t("aeoFaq.q1.question", "Who is ACHI Scaffolding?"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(
              "aeoFaq.q1.answer",
              "ACHI Scaffolding is a scaffolding company in Lebanon providing access scaffolding, façade scaffolding, and temporary access solutions. The company serves commercial, residential, and industrial projects across Lebanon, including Beirut, Mount Lebanon, North Lebanon, South Lebanon, and the Bekaa region."
            )
          }
        },
        {
          "@type": "Question",
          name: t("aeoFaq.q2.question", "What scaffolding services does ACHI provide?"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(
              "aeoFaq.q2.answer",
              "ACHI Scaffolding provides access scaffolding systems for construction and maintenance, façade scaffolding for building exteriors and renovation, temporary access solutions for occupied buildings and hotels, and shoring and structural propping systems. The company offers installation, rental, and specialized laborforce services."
            )
          }
        },
        {
          "@type": "Question",
          name: t("aeoFaq.q3.question", "Where does ACHI Scaffolding operate?"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(
              "aeoFaq.q3.answer",
              "ACHI Scaffolding operates across Lebanon, serving clients in Beirut, Mount Lebanon, North Lebanon, South Lebanon, and the Bekaa region. The company provides scaffolding services for projects throughout the country."
            )
          }
        },
        {
          "@type": "Question",
          name: t("aeoFaq.q4.question", "Does ACHI provide scaffolding for occupied buildings and hotels?"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(
              "aeoFaq.q4.answer",
              "Yes, ACHI Scaffolding provides scaffolding solutions for occupied buildings and hotels. The company specializes in temporary access systems that allow work to proceed while maintaining building operations and guest safety. ACHI Scaffolding has experience with phased installation and controlled access for sensitive urban sites."
            )
          }
        },
        {
          "@type": "Question",
          name: t("aeoFaq.q5.question", "How can clients contact ACHI Scaffolding?"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(
              "aeoFaq.q5.answer",
              "Clients can contact ACHI Scaffolding by phone at +961 03 322 811, by email at achi.gr@hotmail.com, or via WhatsApp. The company provides technical consultation and project support for scaffolding requirements across Lebanon."
            )
          }
        }
      ]
    }),
    [t]
  )

  if (effectiveLang === "it") {
    return (
      <ChiSiamoIt
        canonicalUrl={canonicalUrl}
        orgSchema={orgSchema}
        localBusinessSchema={localBusinessSchema}
        faqSchema={faqSchema}
        goToHomeSection={goToHomeSection}
      />
    )
  }

  return (
    <main className="about-page" data-lang={effectiveLang}>
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        canonical={canonicalUrl}
      />

      <AeoJsonLd schema={orgSchema} id="about-organization-schema" />
      <AeoJsonLd schema={localBusinessSchema} id="about-localbusiness-schema" />
      <AeoJsonLd schema={faqSchema} id="about-faq-schema" />

      <section className={`home-about w-full p-0 m-0 ${effectiveLang === "it" ? "home-about--it" : ""}`}>
        <div className="about-layout grid grid-cols-1 lg:grid-cols-2 items-stretch w-full lg:h-[520px]">
          <div
            className={`about-image min-h-[260px] lg:min-h-[480px] bg-cover bg-center bg-no-repeat ${effectiveLang === "it" ? "about-image--it" : ""}`}
            style={{ backgroundImage: `url(${publicUrl}/assets/about.webp)` }}
            aria-label={t("about.hero.imageAria")}
            role="img"
          />

          <div className={`about-panel bg-[#274f9f] text-white px-[20px] py-[28px] lg:px-[70px] lg:py-[70px] flex flex-col justify-center relative ${effectiveLang === "it" ? "about-panel--it" : ""}`}>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`section-title about-title ${effectiveLang === "it" ? "about-title--it" : ""}`}
              style={{
                fontFamily: '"Rajdhani", sans-serif',
                fontSize: "42px",
                fontWeight: 700,
                textTransform: "uppercase",
                margin: "0 0 12px",
                color: "#ffffff",
                lineHeight: "1.2"
              }}
            >
              {t("about.hero.panelTitleLine1")}
              <br />
              {t("about.hero.panelTitleLine2")}
            </motion.h2>

            <div className={`about-panel-copy ${effectiveLang === "it" ? "about-panel-copy--it" : ""}`}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`font-['Open_Sans'] text-white/90 text-body leading-[1.6] max-w-[640px] ${effectiveLang === "it" ? "about-panel-body--it" : ""}`}
              >
                {t("about.hero.panelBody")}
              </motion.p>
            </div>

            <span className="hidden lg:block absolute right-[24px] top-[30px] w-[6px] h-[64px] bg-[#1b3a73]" />
          </div>
        </div>
      </section>

      <section id="about-main" className={`about-main bg-white pt-[90px] pb-[60px] md:pb-[90px] ${effectiveLang === "it" ? "about-main--it" : ""}`}>
        <div className={`w-[90%] max-w-[980px] mx-auto ${effectiveLang === "it" ? "about-main-inner--it" : ""}`}>
          <div className={`about-intro ${effectiveLang === "it" ? "about-intro--it" : ""}`}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`about-hero-title text-[#214f9b] uppercase ${effectiveLang === "it" ? "about-hero-title--it" : ""}`}
              style={{
                fontFamily: '"Rajdhani", sans-serif',
                fontSize: "42px",
                fontWeight: 700,
                textTransform: "uppercase",
                margin: "0 0 12px",
                lineHeight: "1.2"
              }}
            >
              {t("about.main.h1")}
            </motion.h1>

            <p className="sr-only">{t("about.main.srOnly")}</p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`text-[#4a5c7a] text-body leading-[1.7] mt-[10px] ${effectiveLang === "it" ? "about-intro-p about-intro-p--it" : ""}`}
            >
              {t("about.main.p1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`text-[#4a5c7a] text-[16px] leading-[1.7] mt-[12px] ${effectiveLang === "it" ? "about-intro-p about-intro-p--it" : ""}`}
            >
              {t("about.main.p2")}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`text-[#4a5c7a] text-body leading-[1.7] mt-[10px] pl-[18px] list-disc ${effectiveLang === "it" ? "about-intro-ul about-intro-ul--it" : ""}`}
            >
              <li>{t("about.main.bullets.b1")}</li>
              <li>{t("about.main.bullets.b2")}</li>
              <li>{t("about.main.bullets.b3")}</li>
            </motion.ul>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`text-[#4a5c7a] text-[16px] leading-[1.7] mt-[12px] ${effectiveLang === "it" ? "about-intro-p about-intro-p--it about-intro-p3--it" : ""}`}
            >
              {t("about.main.p3")}
            </motion.p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-[28px] mt-[40px] about-cards-grid ${effectiveLang === "it" ? "about-cards-grid--it" : ""}`}>
            <article className={effectiveLang === "it" ? "about-card about-card--it" : "card bg-white p-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.06)]"}>
              <h2
                className="about-subtitle text-[#214f9b]"
                style={{
                  fontFamily: '"Rajdhani", sans-serif',
                  fontSize: "22px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  margin: "0 0 12px"
                }}
              >
                {t("about.cards.mission.title")}
              </h2>

              <p className="text-[#4a5c7a] leading-[1.6]">{t("about.cards.mission.body")}</p>

              <div className="mt-[22px] flex justify-center">
                <SmartLink
                  to="/projects/"
                  className="inline-flex items-center justify-center px-[34px] py-[12px] rounded-[40px] border-[2px] border-[#214f9b] text-[#214f9b] font-[600] uppercase text-[15px] font-['Rajdhani'] hover:bg-[#214f9b] hover:text-white transition"
                >
                  {t("about.cards.mission.cta")}
                </SmartLink>
              </div>
            </article>

            <article className={effectiveLang === "it" ? "about-card about-card--it" : "card bg-white p-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.06)]"}>
              <h2
                className="about-subtitle text-[#214f9b]"
                style={{
                  fontFamily: '"Rajdhani", sans-serif',
                  fontSize: "22px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  margin: "0 0 12px"
                }}
              >
                {t("about.cards.vision.title")}
              </h2>

              <p className="text-[#4a5c7a] leading-[1.6]">{t("about.cards.vision.body")}</p>

              <div className="mt-[22px] flex justify-center">
                <button
                  type="button"
                  onClick={() => goToHomeSection("contactForm")}
                  className="inline-flex items-center justify-center px-[34px] py-[12px] rounded-[40px] border-[2px] border-[#214f9b] text-[#214f9b] font-[600] uppercase text-[15px] font-['Rajdhani'] hover:bg-[#214f9b] hover:text-white transition cursor-pointer"
                  aria-label={t("about.cards.vision.cta")}
                >
                  {t("about.cards.vision.cta")}
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ✅ KEEP COMPANY SNAPSHOT VISIBLE */}
      <AeoIntroBlock />

    {/* FAQ kept for SEO only — takes ZERO space */}
<div
  aria-hidden="true"
  style={{
    height: 0,
    overflow: "hidden",
    position: "relative"
  }}
>
  <AeoFaqSection />
</div>

    </main>
  )
}

export default About
