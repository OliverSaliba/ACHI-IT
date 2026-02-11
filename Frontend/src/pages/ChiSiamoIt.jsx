// Italian-only About Us (Chi Siamo) – game-style layout. Content from i18n only.
import React, { useState, useEffect, useRef, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import SmartLink from "../seo/SmartLink"
import AeoJsonLd from "../components/AeoJsonLd"
import { HudPanel, HudCard } from "../components/HudPanel"
import styles from "./ChiSiamoIt.module.css"

const ASSET = process.env.PUBLIC_URL || ""
const HERO_BG_IMAGE = `${ASSET}/assets/${encodeURI("WhatsApp Image 2026-02-06 at 12.09.26 PM.jpeg")}`

const fadeUp = (reduceMotion) => ({
  initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 },
  whileInView: reduceMotion ? {} : { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeOut" },
})

const staggerContainer = (reduceMotion) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.15 },
  variants: {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  },
})

const staggerItem = (reduceMotion) => ({
  variants: {
    hidden: reduceMotion ? {} : { opacity: 0, y: 8 },
    visible: reduceMotion ? {} : { opacity: 1, y: 0 },
  },
  transition: { duration: reduceMotion ? 0 : 0.35, ease: "easeOut" },
})

const SECTION_IDS = ["chi-siamo-hero", "la-nostra-azienda", "missione", "valori", "contatti"]

function useScrollSpy() {
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (els.length === 0) return
    const onScroll = () => {
      const top = window.scrollY + 120
      let i = 0
      for (let k = els.length - 1; k >= 0; k--) {
        if (els[k].offsetTop <= top) {
          i = k
          break
        }
      }
      setActiveIndex(i)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return activeIndex
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

function ChiSiamoIt({ canonicalUrl, orgSchema, localBusinessSchema, faqSchema, goToHomeSection }) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const motionProps = fadeUp(reduceMotion)
  const activeSection = useScrollSpy()

  const p3 = t("about.main.p3")
  const p3Blocks = useMemo(() => {
    const blocks = (p3 || "").split(/\n\n/)
    const last = blocks[blocks.length - 1] || ""
    const lines = last.split("\n")
    const regionIntro = lines.filter((l) => !l.trim().startsWith("•")).join("\n")
    const regionItems = lines.map((l) => l.trim()).filter((l) => l.startsWith("•"))
    const beforeDove = blocks.slice(0, -1).join("\n\n")
    const beforeDoveBullets = (beforeDove || "").split("\n").map((l) => l.trim()).filter((l) => l.startsWith("•"))
    return { beforeDove, regionIntro, regionItems, beforeDoveBullets }
  }, [p3])

  const serviceLines = useMemo(() => {
    const b1 = t("about.main.bullets.b1")
    const b2 = t("about.main.bullets.b2")
    const b3 = t("about.main.bullets.b3")
    return [b1, b2, b3, ...(p3Blocks.beforeDoveBullets || [])]
  }, [t, p3Blocks.beforeDoveBullets])

  const missionBody = t("about.cards.mission.body")
  const missionParts = useMemo(() => {
    const parts = (missionBody || "").split(/\n\n/)
    const intro = parts[0] || ""
    const bulletBlock = parts.slice(1).join("\n\n")
    const objectives = bulletBlock.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("•"))
    return { intro, objectives }
  }, [missionBody])

  const visionBody = t("about.cards.vision.body")
  const perks = useMemo(() => {
    return (visionBody || "")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("•"))
  }, [visionBody])

  const railLabels = [
    t("nav.about"),
    t("about.main.p2"),
    t("about.cards.mission.title"),
    t("about.cards.vision.title"),
    t("nav.contact"),
  ]

  return (
    <main className={styles.page} dir="ltr">
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        canonical={canonicalUrl}
      />
      <AeoJsonLd schema={orgSchema} id="about-organization-schema" />
      <AeoJsonLd schema={localBusinessSchema} id="about-localbusiness-schema" />
      <AeoJsonLd schema={faqSchema} id="about-faq-schema" />

      <div className={styles.pageTexture} aria-hidden="true" />

      {/* Chapter rail – desktop left, mobile top */}
      <nav className={styles.chapterRail} aria-label={t("about.main.h1")}>
        <div className={styles.chapterRailLine} aria-hidden="true" />
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            type="button"
            className={`${styles.chapterNode} ${activeSection === i ? styles.chapterNodeActive : ""}`}
            onClick={() => scrollToSection(id)}
            aria-label={railLabels[i]}
            aria-current={activeSection === i ? "true" : undefined}
          >
            <span className={styles.chapterNodeDot} />
          </button>
        ))}
      </nav>

      {/* Hero – grid overlay + floating glow + glass panel */}
      <section id="chi-siamo-hero" className={styles.hero}>
          <div
            className={styles.heroBg}
            style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}
            aria-hidden="true"
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={`${styles.heroGlow} ${styles.heroGlowLeft}`} aria-hidden="true" />
          <div className={`${styles.heroGlow} ${styles.heroGlowRight}`} aria-hidden="true" />
          <div className={styles.heroContent}>
            <motion.div
              className={styles.heroGlassPanel}
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className={styles.heroTitle}>
                {t("about.hero.panelTitleLine1")}
                <br />
                <span className={styles.heroTitleGradient}>{t("about.hero.panelTitleLine2")}</span>
              </h1>
              <p className={styles.heroSubtitle}>{t("about.hero.panelBody")}</p>
              <button
                type="button"
                onClick={() => goToHomeSection("contactForm")}
                className={styles.heroCta}
                aria-label={t("about.ctaLine2")}
              >
                {t("about.ctaLine2")}
              </button>
            </motion.div>
          </div>
      </section>

      {/* Stats bar – existing copy only */}
      <div className={styles.layout}>
        <motion.div
          className={styles.statsBar}
          {...fadeUp(reduceMotion)}
          aria-label={t("about.main.srOnly")}
        >
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>2024</span>
          </div>
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>Tutta Italia</span>
            {(p3Blocks.regionIntro || "").split("\n")[0]?.trim() && (
              <span className={styles.statsLabel}>{(p3Blocks.regionIntro || "").split("\n")[0].trim()}</span>
            )}
          </div>
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>{t("about.seo.description").split(" – ")[0]?.trim() || "Certificati INAIL"}</span>
          </div>
        </motion.div>
      </div>

      <div className={styles.layout}>
        {/* Main: 2-col – Left: La Nostra Azienda + Cosa Facciamo; Right: Dove + Missione/Valori */}
        <div id="la-nostra-azienda" className={styles.main}>
          <motion.div
            className={styles.mainGrid}
            {...staggerContainer(reduceMotion)}
          >
            <motion.div className={styles.mainLeft} {...staggerItem(reduceMotion)}>
              <motion.h2 className={styles.pageH2} {...motionProps}>
                {t("about.main.h1")}
              </motion.h2>
              <p className="sr-only">{t("about.main.srOnly")}</p>

              <div className={styles.timelineWrap}>
                <motion.div className={styles.timelineNode} {...motionProps} {...staggerItem(reduceMotion)}>
                  <p className={styles.loreP}>{t("about.main.p1")}</p>
                </motion.div>
              </div>

              <motion.h3 className={styles.sectionH3} {...motionProps}>
                {t("about.main.p2")}
              </motion.h3>
              <motion.ul className={styles.servicesGrid} {...staggerContainer(reduceMotion)}>
                {serviceLines.map((line, i) => (
                  <motion.li key={i} className={styles.serviceIconCard} {...staggerItem(reduceMotion)}>
                    <span className={styles.serviceIconCardText}>{line.replace(/^•\s*/, "")}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div className={styles.mainRight} {...staggerItem(reduceMotion)}>
              <div id="dove-operiamo" className={styles.regionBlock}>
                <p className={styles.regionIntro}>{p3Blocks.regionIntro}</p>
                <ul className={styles.regionTags}>
                  {p3Blocks.regionItems.map((line, i) => (
                    <li key={i} className={styles.regionTag}>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.twoCol}>
                <HudCard
                  title={t("about.cards.mission.title")}
                  className={styles.objectivesPanel}
                  id="missione"
                >
                  <motion.div {...staggerItem(reduceMotion)}>
                    <p className={styles.objectivesIntro}>{missionParts.intro}</p>
                    <motion.ul
                      className={styles.objectivesList}
                      {...staggerContainer(reduceMotion)}
                    >
                      {missionParts.objectives.map((line, i) => (
                        <motion.li
                          key={i}
                          className={styles.objectiveItem}
                          {...staggerItem(reduceMotion)}
                        >
                          <span className={styles.objectiveIcon} aria-hidden="true" />
                          <span>{line}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    <div className={styles.cardCta}>
                      <SmartLink to="/projects/" className={styles.btn}>
                        {t("about.cards.mission.cta")}
                      </SmartLink>
                    </div>
                  </motion.div>
                </HudCard>

                <HudCard
                  title={t("about.cards.vision.title")}
                  className={styles.perksPanel}
                  id="valori"
                >
                  <motion.ul
                    className={styles.perksList}
                    {...staggerContainer(reduceMotion)}
                  >
                    {perks.map((line, i) => (
                      <motion.li
                        key={i}
                        className={styles.perkCard}
                        {...staggerItem(reduceMotion)}
                      >
                        <span className={styles.perkBar} aria-hidden="true" />
                        <span className={styles.perkText}>{line}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </HudCard>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div id="contatti" className={styles.bottomSection}>
          <HudPanel className={styles.terminalPanel}>
            <div className={styles.ctaGradient}>
              <motion.section className={`${styles.ctaGradientInner} ${styles.ctaCallout}`} {...fadeUp(reduceMotion)}>
                <p className={styles.ctaLine1}>{t("about.ctaLine1")}</p>
                <p className={styles.ctaLine2}>{t("about.ctaLine2")}</p>
                <button
                  type="button"
                  onClick={() => goToHomeSection("contactForm")}
                  className={styles.btn}
                  aria-label={t("about.ctaLine2")}
                >
                  {t("about.ctaLine2")}
                </button>
              </motion.section>
            </div>
          </HudPanel>

          <HudPanel className={styles.disclaimerWrap}>
            <motion.footer className={styles.disclaimer} {...fadeUp(reduceMotion)}>
              <p className={styles.disclaimerText}>{t("about.legalDisclaimer")}</p>
              <p className={styles.disclaimerCta}>{t("about.finalCtaLine1")}</p>
              <p className={styles.disclaimerCta}>{t("about.finalCtaLine2")}</p>
            </motion.footer>
          </HudPanel>
        </div>
      </div>
    </main>
  )
}

export default ChiSiamoIt
