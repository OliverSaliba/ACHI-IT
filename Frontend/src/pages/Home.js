// src/pages/Home.js
import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Company from "../components/Company"
import ContactForm from "../components/ContactForm"
import Hero from "../components/Hero"
import ServiceSection from "../components/services/ServiceSection"
import ProjectsOverview from "../components/projects/ProjectsOverview"
import WhyChoseUs from "../components/WhyChoseUs"
import Clients from "../components/Clients"
import Testimonials from "../components/Testimonials"
import BlogSection from "../components/BlogSection"
import SectorsScrollStory from "../components/SectorsScrollStory"
import SEO from "../components/SEO"
import SmartLink from "../seo/SmartLink"
import AeoIntroBlock from "../components/AeoIntroBlock"
import AeoFaqSection from "../components/AeoFaqSection"
import AeoJsonLd from "../components/AeoJsonLd"
import { useTranslation } from "react-i18next"
import styles from "./Home.module.css"

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px 0px 0px 0px" },
  transition: { duration: 0.5, ease: "easeOut" }
}

const Home = ({ showMenu, setshowMenu, direction, userLang }) => {
  const ASSET = process.env.PUBLIC_URL || ""
  const { t } = useTranslation()
  const baseUrl = "https://achiscaffolding.com"
  const [socialOpen, setSocialOpen] = useState(false)

  const organizationSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: t("home.schema.org.name"),
      alternateName: t("home.schema.org.alternateName"),
      url: baseUrl,
      logo: `${baseUrl}/assets/ArchiScaffoldinglogo.png`,
      description: t("home.schema.org.description"),
      telephone: t("home.schema.org.telephone"),
      email: t("home.schema.org.email"),
      address: {
        "@type": "PostalAddress",
        addressCountry: t("home.schema.org.address.countryCode"),
        addressRegion: t("home.schema.org.address.region")
      },
      areaServed: [
        { "@type": "City", name: t("common.locations.beirut") },
        { "@type": "City", name: t("common.locations.mountLebanon") },
        { "@type": "City", name: t("common.locations.northLebanon") },
        { "@type": "City", name: t("common.locations.southLebanon") },
        { "@type": "City", name: t("common.locations.bekaa") }
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: t("home.schema.org.telephone"),
          contactType: t("home.schema.org.contactType"),
          areaServed: t("home.schema.org.address.countryCode"),
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
    [t]
  )

  const localBusinessSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#organization`,
      name: t("home.schema.lb.name"),
      alternateName: t("home.schema.lb.alternateName"),
      url: baseUrl,
      logo: `${baseUrl}/assets/ArchiScaffoldinglogo.png`,
      description: t("home.schema.lb.description"),
      telephone: t("home.schema.lb.telephone"),
      email: t("home.schema.lb.email"),
      address: {
        "@type": "PostalAddress",
        addressCountry: t("home.schema.lb.address.countryCode"),
        addressRegion: t("home.schema.lb.address.region"),
        addressLocality: t("home.schema.lb.address.locality")
      },
      areaServed: [
        { "@type": "City", name: t("common.locations.beirut") },
        { "@type": "City", name: t("common.locations.mountLebanon") },
        { "@type": "City", name: t("common.locations.northLebanon") },
        { "@type": "City", name: t("common.locations.southLebanon") },
        { "@type": "City", name: t("common.locations.bekaa") }
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: t("home.schema.lb.telephone"),
          contactType: t("home.schema.lb.contactType"),
          areaServed: t("home.schema.lb.address.countryCode"),
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
    [t]
  )

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: t("aeoFaq.q1.question"), acceptedAnswer: { "@type": "Answer", text: t("aeoFaq.q1.answer") } },
        { "@type": "Question", name: t("aeoFaq.q2.question"), acceptedAnswer: { "@type": "Answer", text: t("aeoFaq.q2.answer") } },
        { "@type": "Question", name: t("aeoFaq.q3.question"), acceptedAnswer: { "@type": "Answer", text: t("aeoFaq.q3.answer") } },
        { "@type": "Question", name: t("aeoFaq.q4.question"), acceptedAnswer: { "@type": "Answer", text: t("aeoFaq.q4.answer") } },
        { "@type": "Question", name: t("aeoFaq.q5.question"), acceptedAnswer: { "@type": "Answer", text: t("aeoFaq.q5.answer") } }
      ]
    }),
    [t]
  )

  return (
    <main>
      <SEO title={t("home.seo.title")} description={t("home.seo.description")} canonical="https://achiscaffolding.com/" />

      <AeoJsonLd schema={organizationSchema} id="home-organization-schema" />
      <AeoJsonLd schema={localBusinessSchema} id="home-localbusiness-schema" />
      <AeoJsonLd schema={faqSchema} id="home-faq-schema" />

      {/* SEO-only hidden block (SR content + internal links), but NOT Company Snapshot */}
      <div className="sr-only">
        <h1>{t("home.sr.h1")}</h1>

        <p>{t("home.sr.intro.p1")}</p>
        <p>{t("home.sr.intro.p2")}</p>

        <section aria-label={t("home.sr.servicesSnapshot.ariaLabel")}>
          <h2>{t("home.sr.servicesSnapshot.title")}</h2>
          <ul>
            <li>{t("home.sr.servicesSnapshot.items.0")}</li>
            <li>{t("home.sr.servicesSnapshot.items.1")}</li>
            <li>{t("home.sr.servicesSnapshot.items.2")}</li>
            <li>{t("home.sr.servicesSnapshot.items.3")}</li>
          </ul>
          <p>{t("home.sr.servicesSnapshot.cta")}</p>
        </section>

        <section aria-label={t("home.sr.why.ariaLabel")}>
          <h2>{t("home.sr.why.title")}</h2>
          <ul>
            <li>{t("home.sr.why.items.0")}</li>
            <li>{t("home.sr.why.items.1")}</li>
            <li>{t("home.sr.why.items.2")}</li>
            <li>{t("home.sr.why.items.3")}</li>
          </ul>
        </section>

        <section aria-label={t("home.sr.industries.ariaLabel")}>
          <h2>{t("home.sr.industries.title")}</h2>
          <ul>
            <li>{t("home.sr.industries.items.0")}</li>
            <li>{t("home.sr.industries.items.1")}</li>
            <li>{t("home.sr.industries.items.2")}</li>
            <li>{t("home.sr.industries.items.3")}</li>
          </ul>
        </section>

        <nav aria-label={t("home.sr.internalLinks.ariaLabel")}>
          <h2>{t("home.sr.internalLinks.title")}</h2>
          <ul>
            <li>
              <SmartLink to="/products">{t("home.sr.internalLinks.products")}</SmartLink>
            </li>
            <li>
              <SmartLink to="/projects/">{t("home.sr.internalLinks.projects")}</SmartLink>
            </li>
            <li>
              <SmartLink to="/services/">{t("home.sr.internalLinks.services")}</SmartLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Floating action buttons - Right side with liquid glass effect */}
      {/* One column: burger, call, WhatsApp — same gap between all. */}
      <div className="fixed right-[12px] md:right-[40px] bottom-[40px] md:bottom-[40px] z-[999999] flex flex-col gap-[10px] md:gap-[12px] items-end">
        {/* Mobile only: collapsible social strip + burger */}
        <div className="flex flex-col gap-[10px] items-end md:hidden">
          <div
            className={`grid transition-all duration-300 ease-out overflow-hidden ${socialOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            aria-hidden={!socialOpen}
          >
            <div className="min-h-0 flex flex-col gap-[10px]">
              <a
                href="https://facebook.com/ACHISCAFF"
                target="_blank"
                rel="noreferrer"
                className="glass-social-btn social-btn-mobile w-12 h-12 flex items-center justify-center"
                aria-label="Facebook"
              >
                <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/iconoir_facebook.svg)` }} aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/achiscaffoldinglb"
                target="_blank"
                rel="noreferrer"
                className="glass-social-btn social-btn-mobile w-12 h-12 flex items-center justify-center"
                aria-label="Instagram"
              >
                <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/mdi_instagram.svg)` }} aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/AchiScaffolding"
                target="_blank"
                rel="noreferrer"
                className="glass-social-btn social-btn-mobile w-12 h-12 flex items-center justify-center"
                aria-label="X (Twitter)"
              >
                <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/ri_twitter-x-fill.svg)` }} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/achi-scaffolding/"
                target="_blank"
                rel="noreferrer"
                className="glass-social-btn social-btn-mobile w-12 h-12 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/basil_linkedin-outline.svg)` }} aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@achiscaffolding"
                target="_blank"
                rel="noreferrer"
                className="glass-social-btn social-btn-mobile w-12 h-12 flex items-center justify-center"
                aria-label="TikTok"
              >
                <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/ph_tiktok-logo.svg)` }} aria-hidden="true" />
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSocialOpen((prev) => !prev)}
            className={`social-menu-btn ${socialOpen ? "open" : ""}`}
            aria-label={socialOpen ? t("home.floating.closeSocialAria") : t("home.floating.openSocialAria")}
            aria-expanded={socialOpen}
          >
            <span className="social-menu-icon">
              <span className="social-menu-bar social-menu-bar-h" aria-hidden="true" />
              <span className="social-menu-bar social-menu-bar-v" aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Desktop only: always-visible social icons */}
        <div className="hidden md:flex flex-col gap-[12px]">
          <a
            href="https://facebook.com/ACHISCAFF"
            target="_blank"
            rel="noreferrer"
            className="glass-social-btn w-[52px] h-[52px]"
            aria-label="Facebook"
          >
            <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/iconoir_facebook.svg)` }} aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/achiscaffoldinglb"
            target="_blank"
            rel="noreferrer"
            className="glass-social-btn w-[52px] h-[52px]"
            aria-label="Instagram"
          >
            <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/mdi_instagram.svg)` }} aria-hidden="true" />
          </a>
          <a
            href="https://twitter.com/AchiScaffolding"
            target="_blank"
            rel="noreferrer"
            className="glass-social-btn w-[52px] h-[52px]"
            aria-label="X (Twitter)"
          >
            <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/ri_twitter-x-fill.svg)` }} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/company/achi-scaffolding/"
            target="_blank"
            rel="noreferrer"
            className="glass-social-btn w-[52px] h-[52px]"
            aria-label="LinkedIn"
          >
            <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/basil_linkedin-outline.svg)` }} aria-hidden="true" />
          </a>
          <a
            href="https://www.tiktok.com/@achiscaffolding"
            target="_blank"
            rel="noreferrer"
            className="glass-social-btn w-[52px] h-[52px]"
            aria-label="TikTok"
          >
            <span className="glass-social-icon-blue" style={{ "--icon-url": `url(${ASSET}/assets/ph_tiktok-logo.svg)` }} aria-hidden="true" />
          </a>
        </div>

        {/* Call button - always visible; smaller circle on mobile */}
        <a
          href={`tel:${t("home.floating.phoneE164")}`}
          className="glass-social-btn callbutton w-12 h-12 md:w-[52px] md:h-[52px] flex items-center justify-center"
          aria-label={t("home.floating.callAria")}
        >
          <svg className="w-7 h-7 md:w-[24px] md:h-[24px] text-[#28509E]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>

        {/* WhatsApp - same gap as above */}
        <a
          href={t("home.floating.whatsappHref")}
          target="_blank"
          rel="noreferrer"
          className="glass-whatsapp-btn whatsapplogo w-12 h-12 md:w-[52px] md:h-[52px] flex items-center justify-center"
          aria-label={t("home.floating.whatsappAria")}
          onClick={(e) => {
            const trackEvent = (eventName, params) => {
              try {
                if (typeof window !== "undefined") {
                  if (window.dataLayer) {
                    window.dataLayer.push({ event: eventName, ...params })
                  }
                  if (window.gtag) {
                    window.gtag("event", eventName, params)
                  }
                }
              } catch (error) {
                console.warn("Analytics tracking failed:", error)
              }
            }
            trackEvent("whatsapp_click", {
              link_url: t("home.floating.whatsappHref"),
              page_path: window.location.pathname,
              language: userLang || document.documentElement.lang || "en",
              placement: "floating_home"
            })
          }}
        >
          <img className="w-7 h-7 md:w-[24px] md:h-[24px]" src={`${ASSET}/assets/logos_whatsapp-icon.png`} alt={t("home.floating.whatsappAlt")} />
        </a>
      </div>

      {/* Visible page content - sections reveal on scroll, then scroll continues normally */}
      <Hero showMenu={showMenu} setshowMenu={setshowMenu} direction={direction} userLang={userLang} />
      <motion.div {...sectionReveal}>
        <ServiceSection />
      </motion.div>
      <motion.div {...sectionReveal}>
        <ProjectsOverview />
      </motion.div>
      <motion.div {...sectionReveal}>
        <Company />
      </motion.div>
      <motion.div {...sectionReveal}>
        <Clients direction={direction} />
      </motion.div>
      <motion.div {...sectionReveal}>
        <WhyChoseUs direction={direction} />
      </motion.div>
      <SectorsScrollStory />
      <motion.div {...sectionReveal}>
        <Testimonials direction={direction} />
      </motion.div>
      <motion.div {...sectionReveal}>
        <BlogSection />
      </motion.div>

      {/* ✅ KEEP COMPANY SNAPSHOT VISIBLE */}
      <motion.section
        className={styles.homeSnapshotSection}
        aria-label={t("home.aeoSnapshot.ariaLabel")}
        {...sectionReveal}
      >
        <AeoIntroBlock />
      </motion.section>

      {/* ✅ HIDE FAQ FROM USERS, KEEP FOR SEO */}
      <section
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden"
        }}
      >
        <AeoFaqSection />
      </section>

      <motion.div {...sectionReveal}>
        <ContactForm decreaseMargin />
      </motion.div>
    </main>
  )
}

export default Home
