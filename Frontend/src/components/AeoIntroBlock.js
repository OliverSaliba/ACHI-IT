// src/components/AeoIntroBlock.js
// SOURCE OF TRUTH: Frontend/src/components/AeoIntroBlock.js
import React, { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import styles from "./AeoIntroBlock.module.css"

const AeoIntroBlock = () => {
  const { t, i18n } = useTranslation()
  const isArabic = String(i18n.resolvedLanguage || i18n.language).toLowerCase().startsWith("ar")
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [maxHeight, setMaxHeight] = useState("0px")

  // Close accordion on language change (reset state)
  useEffect(() => {
    setIsOpen(false)
    setMaxHeight("0px")
  }, [i18n.language])

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  // Recalculate height when accordion opens/closes, language changes, or content changes
  useEffect(() => {
    if (panelRef.current) {
      if (isOpen) {
        const height = panelRef.current.scrollHeight
        setMaxHeight(`${height}px`)
      } else {
        setMaxHeight("0px")
      }
    }
  }, [isOpen, i18n.language])

  // Recalculate height on window resize when accordion is open
  useEffect(() => {
    if (!isOpen) return

    const handleResize = () => {
      if (panelRef.current && isOpen) {
        const height = panelRef.current.scrollHeight
        setMaxHeight(`${height}px`)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  const lang = String(i18n.resolvedLanguage || i18n.language).toLowerCase()
  const isItalian = lang === "it"
  const services = t("aeoIntro.services", { returnObjects: true })
  const servicesArray = isItalian
    ? []
    : Array.isArray(services)
      ? services
      : [
          t("aeoIntro.service1"),
          t("aeoIntro.service2"),
          t("aeoIntro.service3"),
          t("aeoIntro.service4"),
        ]

  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`${styles.chevronIcon} ${isOpen ? styles.chevronIconOpen : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  )

  const buttonId = "aeo-intro-toggle"
  const panelId = "aeo-intro-panel"

  return (
    <section
      aria-labelledby="company-snapshot-title"
      className="companySnapshotSection"
      style={{
        width: "100%",
        backgroundColor: "#F8FAFD",
        paddingTop: isDesktop ? "80px" : "56px",
        paddingBottom: isDesktop ? "80px" : "56px",
        marginTop: isDesktop ? "-55px" : "-40px",
        borderTop: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        className="w-[90%] max-w-[980px] mx-auto px-[20px]"
        style={{
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: isDesktop ? "48px" : "40px" }}>
          <h2
            id="company-snapshot-title"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: isDesktop ? "34px" : "26px",
              fontWeight: 800,
              color: "#0B2B5B",
              margin: "0 0 12px 0",
              lineHeight: "1.2",
            }}
          >
            {t("nav.about")}
          </h2>
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "16px",
              color: "rgba(15, 23, 42, 0.65)",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            {t("companySnapshot.subtitle")}
          </p>
        </div>

        <div
          className={styles.card}
          data-open={isOpen}
          style={{
            borderRadius: "0",
            border: "1px solid rgba(15, 23, 42, 0.10)",
            boxShadow: "0 14px 40px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FBFCFF 100%)",
            transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: "translateY(0)",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 18px 48px rgba(15, 23, 42, 0.12)"
            e.currentTarget.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 14px 40px rgba(15, 23, 42, 0.08)"
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          <div className={styles.headerContainer} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <div
              className={`${styles.accentStrip} ${isOpen ? styles.accentStripOpen : ""}`}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                ...(isArabic ? { right: 0 } : { left: 0 }),
                width: "6px",
                backgroundColor: "#FA7800",
                opacity: isOpen ? 1 : 0.75,
                transition: "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), width 300ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            <button
              id={buttonId}
              type="button"
              onClick={togglePanel}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={styles.headerButton}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                paddingInlineStart: isDesktop ? "32px" : "24px",
                paddingInlineEnd: isDesktop ? "28px" : "20px",
                paddingBlock: isDesktop ? "24px" : "20px",
                minHeight: isDesktop ? "72px" : "64px",
                position: "relative",
                textAlign: isArabic ? "right" : "left",
                transition: "all 250ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(250, 120, 0, 0.03)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            >
              <div className={styles.titleContainer} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                <h2
                  className={styles.title}
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: isDesktop ? "20px" : "17px",
                    fontWeight: 800,
                    color: "#0B2B5B",
                    lineHeight: "1.3",
                    margin: 0,
                  }}
                >
                  {t("aeoIntro.dropdownTitle")}
                </h2>
                <p
                  className={styles.subtitle}
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "rgba(15, 23, 42, 0.60)",
                    margin: 0,
                    display: isDesktop ? "block" : "none",
                  }}
                >
                  {t("aeoIntro.dropdownSubtitle")}
                </p>
              </div>

              <div
                className={styles.chevronButton}
                style={{
                  width: isDesktop ? "44px" : "40px",
                  height: isDesktop ? "44px" : "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(15, 23, 42, 0.12)",
                  background: "#FFFFFF",
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(250, 120, 0, 0.1)"
                  e.currentTarget.style.borderColor = "rgba(250, 120, 0, 0.4)"
                  e.currentTarget.style.transform = "scale(1.08)"
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(250, 120, 0, 0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FFFFFF"
                  e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.12)"
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(15, 23, 42, 0.06)"
                }}
              >
                <ChevronIcon isOpen={isOpen} />
              </div>
            </button>
          </div>

          <div
            ref={panelRef}
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={styles.panel}
            style={{
              overflow: "hidden",
              maxHeight: maxHeight,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-12px)",
              transition: "max-height 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className={styles.panelContent}
              style={{
                borderTop: "1px solid rgba(15, 23, 42, 0.08)",
                paddingInlineStart: isDesktop ? "32px" : "24px",
                paddingInlineEnd: isDesktop ? "32px" : "24px",
                paddingBlockStart: isDesktop ? "32px" : "24px",
                paddingBlockEnd: isDesktop ? "36px" : "28px",
              }}
            >
              <div className={styles.contentInner} style={{ maxWidth: "78ch", marginInline: "auto" }}>
                <p className={styles.definition}>{t("aeoIntro.companyDefinition")}</p>

                <div>
                  <p className={styles.servicesLabel}>{t("home.servicesIntro") === "home.servicesIntro" ? t("aeoIntro.servicesIntro") : t("home.servicesIntro")}</p>

                  <ul className={styles.servicesList}>
                    {servicesArray.map((service, index) => (
                      <li key={index} className={styles.serviceItem}>
                        <span className={styles.bullet} aria-hidden="true" />
                        <span className={styles.serviceText}>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.coverage}>
                  <p className={styles.coverageText}>{t("aeoIntro.coverage")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AeoIntroBlock
