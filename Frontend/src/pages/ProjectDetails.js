import React, { useMemo, useState, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Link, useLocation, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { getLangFromPath } from "../utils/langRouting"

const SITE_ORIGIN = "https://achiscaffolding.com"

const ProjectDetails = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  const { id } = useParams()
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [lightboxAlt, setLightboxAlt] = useState("")
  const lightboxRef = useRef(null)

  const base = process.env.PUBLIC_URL || ""
  const currentLang = getLangFromPath(location.pathname)

  const langPrefix = currentLang === "fr" ? "fr" : currentLang === "ar" || currentLang === "lb" ? "lb" : ""
  const langPath = (path) => {
    if (!langPrefix) return path
    return `/${langPrefix}${path}`
  }

  const toAbsUrl = (maybeRelative) => {
    if (!maybeRelative) return undefined
    if (String(maybeRelative).startsWith("http")) return maybeRelative
    return `${SITE_ORIGIN}${maybeRelative}`
  }

  const tr = (primaryKey, fallbackKey) => {
    const v = t(primaryKey)
    if (v !== primaryKey) return v
    if (!fallbackKey) return ""
    const v2 = t(fallbackKey)
    return v2 === fallbackKey ? "" : v2
  }

  const PROJECT_MEDIA = useMemo(
    () => ({
      "aishti-mall": {
        hero: `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/edit.JPG`,
        gallery: [
          `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/Home banner 6.jpg`,
          `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/Home Banner 5.JPG`,
          `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/0W0A1226 2.JPG`
        ]
      },
      "beirut-business-center": {
        hero: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
        gallery: [
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/Home banner 2.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17893.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
          // `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17898.JPG`,
          // `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17899 copy.JPG`,
          // `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17899.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17900.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17901.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC19484.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC19485.JPG`,
          `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC19487.JPG`
        ]
      },
      "hotel-le-gray": {
        hero: `${base}/assets/workDone/HOTEL LE GRAY/IMG_2186.JPG`,
        gallery: [`${base}/assets/workDone/HOTEL LE GRAY/IMG_2186.JPG`]
      }
    }),
    [base]
  )

  const safeId = id && PROJECT_MEDIA[id] ? id : "aishti-mall"
  const media = PROJECT_MEDIA[safeId]
  const heroImage = media?.hero
  const galleryImagesRaw = Array.isArray(media?.gallery) ? media.gallery : []
  const galleryImages = useMemo(() => {
    if (safeId === "aishti-mall") return galleryImagesRaw.slice(0, 3)
    return galleryImagesRaw
  }, [safeId, galleryImagesRaw])

  const NS = "projectDetails"
  const keyBase = `${NS}.items.${safeId}`

  const heroTitle = tr(`${keyBase}.heroTitle`, `${keyBase}.heroTitle`)
  const seoTitle = tr(`${keyBase}.seoTitle`, `${keyBase}.seoTitle`)
  const seoDescription = tr(`${keyBase}.seoDescription`, `${keyBase}.seoDescription`)
  const heroSummary = tr(`${keyBase}.heroSummary`, `${keyBase}.seoDescription`)
  const heroImageAlt = tr(`${keyBase}.heroImageAlt`, `${keyBase}.heroImageAlt`)
  const canonical = `${SITE_ORIGIN}${langPath(`/project/${safeId}`)}`

  const meta = useMemo(() => {
    const getPair = (labelKeyNew, valueKeyNew, labelKeyOld, valueKeyOld) => {
      const label = tr(`${keyBase}.meta.${labelKeyNew}`, `${keyBase}.meta.${labelKeyOld}`)
      const value = tr(`${keyBase}.meta.${valueKeyNew}`, `${keyBase}.meta.${valueKeyOld}`)
      return { label, value }
    }

    return {
      location: getPair("locationLabel", "locationValue", "locationLabel", "locationValue"),
      sector: getPair("sectorLabel", "sectorValue", "projectTypeLabel", "projectTypeValue"),
      scope: getPair("scopeLabel", "scopeValue", "servicesLabel", "servicesValue"),
      timeline: getPair("timelineLabel", "timelineValue", "phaseLabel", "phaseValue")
    }
  }, [keyBase, tr, lang])

  const getArray = (primaryKey, fallbackKey) => {
    const raw = t(primaryKey, { returnObjects: true })
    if (Array.isArray(raw)) return raw
    if (!fallbackKey) return []
    const raw2 = t(fallbackKey, { returnObjects: true })
    return Array.isArray(raw2) ? raw2 : []
  }

  const overviewText = tr(`${keyBase}.sections.overview.text`, `${keyBase}.overviewText`)
  const scopeIntro = tr(`${keyBase}.sections.scope.intro`, `${keyBase}.scopeIntro`)
  const challengesIntro = tr(`${keyBase}.sections.challenges.intro`, `${keyBase}.challengesIntro`)
  const approachIntro = tr(`${keyBase}.sections.approach.intro`, `${keyBase}.approachIntro`)
  const safetyIntro = tr(`${keyBase}.sections.safety.intro`, `${keyBase}.safetyIntro`)
  const resultsIntro = tr(`${keyBase}.sections.results.intro`, `${keyBase}.resultsIntro`)

  const scopeBullets = useMemo(
    () => getArray(`${keyBase}.sections.scope.bullets`, `${keyBase}.scopeBullets`).filter((x) => typeof x === "string" && x.trim()),
    [keyBase, lang]
  )
  const challengesBullets = useMemo(
    () => getArray(`${keyBase}.sections.challenges.bullets`, `${keyBase}.challengesBullets`).filter((x) => typeof x === "string" && x.trim()),
    [keyBase, lang]
  )
  const approachBullets = useMemo(
    () => getArray(`${keyBase}.sections.approach.bullets`, `${keyBase}.approachBullets`).filter((x) => typeof x === "string" && x.trim()),
    [keyBase, lang]
  )
  const safetyBullets = useMemo(
    () => getArray(`${keyBase}.sections.safety.bullets`, `${keyBase}.safetyBullets`).filter((x) => typeof x === "string" && x.trim()),
    [keyBase, lang]
  )
  const resultsBullets = useMemo(
    () => getArray(`${keyBase}.sections.results.bullets`, `${keyBase}.resultsBullets`).filter((x) => typeof x === "string" && x.trim()),
    [keyBase, lang]
  )

  const faqItems = useMemo(() => {
    const raw = getArray(`${keyBase}.sections.faq.items`, `${keyBase}.faq`)
    return raw
      .map((x) => {
        if (!x || typeof x !== "object") return null
        const q = typeof x.q === "string" ? x.q.trim() : ""
        const a = typeof x.a === "string" ? x.a.trim() : ""
        if (!q || !a) return null
        return { q, a }
      })
      .filter(Boolean)
  }, [keyBase, lang])

  const servicesUsed = useMemo(() => {
    const raw = t(`${keyBase}.servicesUsed`, { returnObjects: true })
    return Array.isArray(raw) ? raw : []
  }, [t, keyBase, lang])

  const relatedProjects = useMemo(() => {
    const raw = t(`${keyBase}.relatedProjects`, { returnObjects: true })
    if (Array.isArray(raw)) return raw
    const candidates = Object.keys(PROJECT_MEDIA).filter((k) => k !== safeId).slice(0, 3)
    return candidates.map((k) => ({
      key: k,
      label: tr(`${NS}.items.${k}.heroTitle`, `${NS}.items.${k}.heroTitle`),
      aria: tr(`${NS}.related.aria`, `${NS}.related.aria`)
    }))
  }, [t, keyBase, PROJECT_MEDIA, safeId, lang, tr, NS])

  const sectionDefs = useMemo(() => {
    const defs = []

    const snapshotTitle = tr(`${NS}.sections.snapshotTitle`, `${NS}.snapshot.title`)
    const overviewTitle = tr(`${NS}.sections.overviewTitle`, `${NS}.sections.overviewTitle`)
    const scopeTitle = tr(`${NS}.sections.scopeTitle`, `${NS}.sections.scopeTitle`)
    const challengesTitle = tr(`${NS}.sections.challengesTitle`, `${NS}.sections.challengesTitle`)
    const approachTitle = tr(`${NS}.sections.approachTitle`, `${NS}.sections.approachTitle`)
    const safetyTitle = tr(`${NS}.sections.safetyTitle`, `${NS}.sections.safetyTitle`)
    const resultsTitle = tr(`${NS}.sections.resultsTitle`, `${NS}.sections.resultsTitle`)
    const galleryTitle = tr(`${NS}.sections.galleryTitle`, `${NS}.sections.galleryTitle`)
    const servicesTitle = tr(`${NS}.sections.servicesUsedTitle`, `${NS}.sections.servicesUsedTitle`)
    const relatedTitle = tr(`${NS}.sections.relatedTitle`, `${NS}.sections.relatedTitle`)
    const faqTitle = tr(`${NS}.sections.faqTitle`, `${NS}.sections.faqTitle`)
    const ctaTitle = tr(`${NS}.sections.ctaTitle`, `${NS}.sections.ctaTitle`)

    defs.push({ id: "snapshot", label: snapshotTitle })
    if (overviewText) defs.push({ id: "overview", label: overviewTitle })
    if (scopeIntro || scopeBullets.length) defs.push({ id: "scope", label: scopeTitle })
    if (challengesIntro || challengesBullets.length) defs.push({ id: "challenges", label: challengesTitle })
    if (approachIntro || approachBullets.length) defs.push({ id: "approach", label: approachTitle })
    if (safetyIntro || safetyBullets.length) defs.push({ id: "safety", label: safetyTitle })
    if (resultsIntro || resultsBullets.length) defs.push({ id: "results", label: resultsTitle })
    if (galleryImages.length) defs.push({ id: "gallery", label: galleryTitle })
    if (relatedProjects && relatedProjects.length) defs.push({ id: "related-projects", label: relatedTitle })
    if (faqItems.length) defs.push({ id: "faq", label: faqTitle })
    defs.push({ id: "project-cta", label: ctaTitle })

    return defs
  }, [
    NS,
    tr,
    lang,
    overviewText,
    scopeIntro,
    scopeBullets.length,
    challengesIntro,
    challengesBullets.length,
    approachIntro,
    approachBullets.length,
    safetyIntro,
    safetyBullets.length,
    resultsIntro,
    resultsBullets.length,
    galleryImages.length,
    relatedProjects,
    faqItems.length
  ])

  const ogImage = heroImage ? toAbsUrl(heroImage) : undefined

  const projectSchema = useMemo(() => {
    const imgs = []
    if (heroImage) imgs.push(toAbsUrl(heroImage))
    galleryImages.forEach((img) => {
      const u = toAbsUrl(img)
      if (u && !imgs.includes(u)) imgs.push(u)
    })

    const inLang = currentLang === "fr" ? "fr" : currentLang === "ar" || currentLang === "lb" ? "ar" : "en"

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: heroTitle,
      name: heroTitle,
      description: seoDescription,
      url: canonical,
      image: imgs.length ? imgs : undefined,
      inLanguage: inLang,
      author: { "@type": "Organization", name: "ACHI Scaffolding", url: `${SITE_ORIGIN}${langPath("/")}` },
      publisher: {
        "@type": "Organization",
        name: "ACHI Scaffolding",
        url: `${SITE_ORIGIN}${langPath("/")}`,
        logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}${base}/assets/ArchiScaffoldinglogo.png` }
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      about: ["Scaffolding", "Temporary works", "Access systems", "Safety coordination"],
      isPartOf: { "@type": "CollectionPage", name: tr(`${NS}.breadcrumbs.projects`, `${NS}.breadcrumbs.projects`), url: `${SITE_ORIGIN}${langPath("/projects")}` }
    }
  }, [heroTitle, seoDescription, canonical, heroImage, galleryImages, currentLang, base])

  const breadcrumbSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: tr(`${NS}.breadcrumbs.home`, `${NS}.breadcrumbs.home`), item: `${SITE_ORIGIN}${langPath("/")}` },
        {
          "@type": "ListItem",
          position: 2,
          name: tr(`${NS}.breadcrumbs.projects`, `${NS}.breadcrumbs.projects`),
          item: `${SITE_ORIGIN}${langPath("/projects")}`
        },
        { "@type": "ListItem", position: 3, name: heroTitle, item: canonical }
      ]
    }
  }, [NS, heroTitle, canonical, tr, lang, langPath])

  const faqSchema = useMemo(() => {
    if (!faqItems.length) return null
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a }
      }))
    }
  }, [faqItems])

  const GalleryAlt = (i) => {
    const raw = t(`${keyBase}.galleryAlts`, { returnObjects: true })
    if (Array.isArray(raw) && typeof raw[i] === "string" && raw[i].trim()) return raw[i]
    const alt = t(`${keyBase}.galleryAlt`, { index: i + 1 })
    return alt === `${keyBase}.galleryAlt` ? heroImageAlt : alt
  }

  const bullets = (items) => {
    if (!items.length) return null
    return (
      <ul className="space-y-[12px] mt-[12px]">
        {items.map((it, idx) => (
          <li key={`b-${idx}`} className="flex gap-[12px]">
            <span className="mt-[10px] w-[6px] h-[6px] rounded-full bg-[#214f9b] flex-shrink-0" />
            <span className="font-['Open_Sans'] text-[15px] md:text-[16px] leading-[1.8] text-[#1f2a3a]">{it}</span>
          </li>
        ))}
      </ul>
    )
  }

  const renderCardSection = (id, title, intro, bulletItems, rightImage) => {
    if (!intro && (!bulletItems || !bulletItems.length)) return null

    return (
      <section id={id} className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
          <h2 className="font-[Rajdhani] uppercase font-[900] text-[18px] md:text-[20px] text-[#0c1830] m-0">{title}</h2>
        </div>

        <div className={`px-[24px] md:px-[28px] py-[24px] ${rightImage ? "lg:grid lg:grid-cols-12 lg:gap-[24px] lg:items-start" : ""}`}>
          <div className={rightImage ? "lg:col-span-7" : ""}>
            {intro ? (
              <p className="font-['Open_Sans'] text-[15px] md:text-[16px] leading-[1.8] text-[#1f2a3a] m-0 mb-[16px] max-w-[680px]">{intro}</p>
            ) : null}
            {bullets(bulletItems || [])}
          </div>

          {rightImage ? (
            <div className="lg:col-span-5 mt-[20px] lg:mt-0">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={reduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
                className="relative rounded-none overflow-hidden border border-[#e0e0e0] bg-[#0c1830]"
              >
                <img src={rightImage.src} alt={rightImage.alt} className="w-full h-[240px] sm:h-[280px] lg:h-[320px] object-cover opacity-85" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061226]/70 via-[#061226]/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none" />
                {rightImage.caption ? (
                  <div className="absolute left-0 right-0 bottom-0 p-[14px]">
                    <p className="font-[Rajdhani] uppercase font-[900] tracking-[0.12em] text-[12px] text-white/90 m-0">{rightImage.caption}</p>
                  </div>
                ) : null}
              </motion.div>
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  const heroChips = useMemo(() => {
    const chips = []
    const loc = meta.location?.value
    const sec = meta.sector?.value
    const scp = meta.scope?.value
    const tl = meta.timeline?.value
    if (loc) chips.push({ k: "loc", v: loc })
    if (sec) chips.push({ k: "sec", v: sec })
    if (scp) chips.push({ k: "scp", v: scp })
    if (tl) chips.push({ k: "tl", v: tl })
    return chips.slice(0, 4)
  }, [meta])

  const featureImage = useMemo(() => {
    const img = galleryImages?.[0] || heroImage
    if (!img) return null
    return { src: img, alt: GalleryAlt(0), caption: tr(`${NS}.sections.featureCaption`, `${NS}.sections.featureCaption`) }
  }, [galleryImages, heroImage, NS, tr, lang, keyBase, heroImageAlt, t])

  const openLightbox = (imageSrc, imageAlt) => {
    setLightboxImage(imageSrc)
    setLightboxAlt(imageAlt)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
    setLightboxAlt("")
  }

  useEffect(() => {
    if (lightboxOpen) {
      // Prevent scrolling on both body and html
      const scrollY = window.scrollY
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.documentElement.style.overflow = "hidden"
      
      const handleEscape = (e) => {
        if (e.key === "Escape") closeLightbox()
      }
      window.addEventListener("keydown", handleEscape)
      return () => {
        // Restore scrolling
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.documentElement.style.overflow = ""
        window.scrollTo(0, scrollY)
        window.removeEventListener("keydown", handleEscape)
      }
    }
  }, [lightboxOpen])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#003A80] focus:text-white focus:rounded-[12px] font-[Rajdhani] font-[800] uppercase"
      >
        {tr(`${NS}.a11y.skipToContent`, `${NS}.a11y.skipToContent`)}
      </a>

      <main id="main-content" className="bg-[#f6f8fc]">
        <SEO
          title={seoTitle}
          description={seoDescription}
          canonical={canonical}
          ogTitle={heroTitle}
          ogDescription={seoDescription}
          ogImage={ogImage}
          ogType="article"
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}

        <header className="relative bg-[#0c1830] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={heroImageAlt}
              className="w-full h-full object-cover opacity-70"
              loading="eager"
              decoding="async"
              width="1600"
              height="900"
              style={{ objectPosition: safeId === "aishti-mall" ? "center 35%" : "center center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#061226]/50 via-[#061226]/80 to-[#061226]/95" />
          </div>

          <div className="relative max-w-[1280px] mx-auto px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] pt-[80px] md:pt-[100px] pb-[60px] md:pb-[80px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.55, ease: "easeOut" }}
              className="max-w-[800px]"
            >
              <p className="font-[Rajdhani] uppercase tracking-[0.22em] text-white/80 text-[12px] md:text-[13px] mb-[12px]">
                {tr(`${NS}.hero.kicker`, `${NS}.hero.kicker`)}
              </p>

              <h1 className="font-[Rajdhani] text-white font-[900] uppercase text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] leading-[1.05] m-0">
                {heroTitle}
              </h1>

              {heroSummary ? (
                <p className="font-['Open_Sans'] text-white/95 text-[15px] md:text-[17px] leading-[1.8] mt-[16px] mb-0 max-w-[680px]">
                  {heroSummary}
                </p>
              ) : null}

              {heroChips.length ? (
                <div className="flex flex-wrap gap-[8px] mt-[20px]">
                  {heroChips.map((c) => (
                    <span
                      key={c.k}
                      className="inline-flex items-center rounded-none px-[12px] py-[7px] bg-white/10 border border-white/15 text-white/90 font-['Open_Sans'] text-[13px] leading-[1]"
                    >
                      {c.v}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </div>
        </header>

        <article className="max-w-[1280px] mx-auto px-[20px] sm:px-[32px] md:px-[40px] lg:px-[48px] py-[40px] md:py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[20px] lg:gap-[clamp(16px,2vw,32px)]">
            <aside className="lg:col-span-4">
              <div className="xl:sticky xl:top-[120px] space-y-[20px]">
                <section className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
                    <h2 className="font-[Rajdhani] uppercase font-[900] text-[16px] text-[#0c1830] m-0">
                      {tr(`${NS}.toc.title`, `${NS}.toc.title`)}
                    </h2>
                  </div>

                  <nav aria-label={tr(`${NS}.toc.aria`, `${NS}.toc.aria`)}>
                    <ul className="px-[24px] md:px-[28px] py-[20px] space-y-[2px]">
                      {sectionDefs.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block rounded-none px-[12px] py-[6px] font-['Open_Sans'] text-[14px] text-[#1f2a3a] hover:bg-[#214f9b]/[0.06] hover:text-[#214f9b] transition leading-[1.55]"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </section>

                <section id="snapshot" className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
                    <h2 className="font-[Rajdhani] uppercase font-[900] text-[16px] text-[#0c1830] m-0">
                      {tr(`${NS}.sections.snapshotTitle`, `${NS}.snapshot.title`)}
                    </h2>
                  </div>

                  <div className="px-[24px] md:px-[28px] py-[20px]">
                    <dl className="space-y-[12px]">
                      {[meta.location, meta.sector, meta.scope, meta.timeline]
                        .filter((x) => x && x.label && x.value)
                        .map((x, idx) => (
                          <div key={`m-${idx}`} className="rounded-none border border-[#e0e0e0] px-[16px] py-[14px]">
                            <dt className="font-[Rajdhani] uppercase font-[900] text-[12px] tracking-[0.12em] text-[#214f9b] m-0">{x.label}</dt>
                            <dd className="font-['Open_Sans'] text-[14px] text-[#1f2a3a] mt-[8px] m-0">{x.value}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                </section>

                {galleryImages.length > 0 ? (
                  <section id="gallery" className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
                      <h2 className="font-[Rajdhani] uppercase font-[900] text-[16px] text-[#0c1830] m-0">
                        {tr(`${NS}.sections.galleryTitle`, `${NS}.sections.galleryTitle`)}
                      </h2>
                    </div>

                    <div className="px-[24px] md:px-[28px] py-[24px]">
                      <div className="grid grid-cols-2 gap-[12px]">
                        {galleryImages.map((src, i) => (
                          <figure
                            key={`${safeId}-gallery-${i}`}
                            className="rounded-none overflow-hidden border border-[#e0e0e0] bg-[#0c1830]/5 cursor-pointer group hover:shadow-lg transition-shadow duration-300"
                            onClick={() => openLightbox(src, GalleryAlt(i))}
                          >
                            <div className="relative">
                              <img
                                src={src}
                                alt={GalleryAlt(i)}
                                className="w-full h-[180px] sm:h-[200px] object-cover group-hover:opacity-90 transition-opacity duration-300"
                                loading="lazy"
                                decoding="async"
                                width="900"
                                height="600"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <svg
                                  className="w-[28px] h-[28px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </figure>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : null}

                {faqItems.length ? (
                  <section id="faq" className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
                      <h2 className="font-[Rajdhani] uppercase font-[900] text-[16px] text-[#0c1830] m-0">
                        {tr(`${NS}.sections.faqTitle`, `${NS}.sections.faqTitle`)}
                      </h2>
                    </div>

                    <div className="px-[24px] md:px-[28px] py-[24px] space-y-[12px]">
                      {faqItems.slice(0, 10).map((x, idx) => (
                        <details key={`faq-${idx}`} className="rounded-none border border-[#e0e0e0] px-[16px] py-[14px] open:bg-[#214f9b]/[0.03]">
                          <summary className="cursor-pointer font-[Rajdhani] uppercase font-[900] text-[13px] text-[#0c1830] leading-[1.35]">
                            {x.q}
                          </summary>
                          <p className="font-['Open_Sans'] text-[14px] leading-[1.8] text-[#1f2a3a] mt-[10px] m-0">
                            {x.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}

                {relatedProjects && relatedProjects.length ? (
                  <section id="related-projects" className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
                      <h2 className="font-[Rajdhani] uppercase font-[900] text-[16px] text-[#0c1830] m-0">
                        {tr(`${NS}.sections.relatedTitle`, `${NS}.sections.relatedTitle`)}
                      </h2>
                    </div>

                    <div className="px-[24px] md:px-[28px] py-[24px]">
                      <div className="grid grid-cols-1 gap-[12px]">
                        {relatedProjects.slice(0, 6).map((p, idx) => {
                          const k = p?.key
                          const label = typeof p?.label === "string" ? p.label : ""
                          if (!k || !label) return null
                          const thumb = PROJECT_MEDIA[k]?.hero || heroImage
                          const alt = tr(`${NS}.related.cardImageAlt`, `${NS}.related.cardImageAlt`) || label
                          return (
                            <Link
                              key={`rel-${idx}-${k}`}
                              to={langPath(`/project/${k}`)}
                              className="group rounded-none overflow-hidden border border-[#e0e0e0] bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition"
                              aria-label={p?.aria || label}
                            >
                              <div className="relative h-[140px] bg-[#0c1830]">
                                <img src={thumb} alt={alt} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" loading="lazy" decoding="async" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#061226]/70 via-[#061226]/15 to-transparent" />
                              </div>
                              <div className="p-[12px]">
                                <p className="font-[Rajdhani] uppercase font-[900] text-[13px] text-[#0c1830] m-0 leading-[1.2]">{label}</p>
                                <p className="font-['Open_Sans'] text-[12px] text-[#1f2a3a]/80 mt-[6px] m-0 leading-[1.55]">
                                  {tr(`${NS}.related.cardHint`, `${NS}.related.cardHint`)}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </section>
                ) : null}
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-[20px]">
              {overviewText ? (
                <section id="overview" className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
                    <h2 className="font-[Rajdhani] uppercase font-[900] text-[18px] md:text-[20px] text-[#0c1830] m-0">
                      {tr(`${NS}.sections.overviewTitle`, `${NS}.sections.overviewTitle`)}
                    </h2>
                  </div>

                  <div className="px-[24px] md:px-[28px] py-[24px]">
                    <p className="font-['Open_Sans'] text-[15px] md:text-[16px] leading-[1.8] text-[#1f2a3a] m-0 max-w-[680px]">{overviewText}</p>
                  </div>
                </section>
              ) : null}

              {renderCardSection(
                "scope",
                tr(`${NS}.sections.scopeTitle`, `${NS}.sections.scopeTitle`),
                scopeIntro,
                scopeBullets,
                null
              )}

              {renderCardSection(
                "challenges",
                tr(`${NS}.sections.challengesTitle`, `${NS}.sections.challengesTitle`),
                challengesIntro,
                challengesBullets,
                featureImage
              )}

              {renderCardSection(
                "approach",
                tr(`${NS}.sections.approachTitle`, `${NS}.sections.approachTitle`),
                approachIntro,
                approachBullets,
                null
              )}

              {renderCardSection(
                "safety",
                tr(`${NS}.sections.safetyTitle`, `${NS}.sections.safetyTitle`),
                safetyIntro,
                safetyBullets,
                null
              )}

              {renderCardSection(
                "results",
                tr(`${NS}.sections.resultsTitle`, `${NS}.sections.resultsTitle`),
                resultsIntro,
                resultsBullets,
                null
              )}

              <section
                id="services-used"
                className="bg-white rounded-none border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                <div className="px-[24px] md:px-[28px] py-[20px] border-b border-[#e0e0e0]">
                  <h2 className="font-[Rajdhani] uppercase font-[900] text-[18px] md:text-[20px] text-[#0c1830] m-0">
                    {tr(`${NS}.sections.servicesUsedTitle`, `${NS}.sections.servicesUsedTitle`)}
                  </h2>
                </div>

                <div className="px-[24px] md:px-[28px] py-[24px]">
                  <ul className="space-y-[10px]">
                    {servicesUsed.map((svc, idx) => (
                      <li key={`${safeId}-svc-${idx}`} className="flex items-start gap-[10px]">
                        <span className="mt-[9px] w-[8px] h-[8px] rounded-full bg-[#214f9b] flex-shrink-0" />
                        <Link
                          to={langPath(`/services/serviceItem?service=${encodeURIComponent(svc.key)}`)}
                          className="font-['Open_Sans'] text-[15px] md:text-[16px] text-[#1f2a3a] hover:text-[#214f9b] transition leading-[1.7]"
                          aria-label={svc.aria}
                        >
                          {svc.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section
                id="project-cta"
                className="rounded-none overflow-hidden border border-[#1b3155] bg-gradient-to-br from-[#214f9b] to-[#132a4a] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="px-[18px] sm:px-[22px] md:px-[26px] py-[20px] border-b border-white/15">
                  <h2 className="font-[Rajdhani] uppercase font-[900] text-[18px] text-white m-0">
                    {tr(`${NS}.sections.ctaTitle`, `${NS}.sections.ctaTitle`)}
                  </h2>
                </div>

                <div className="px-[18px] sm:px-[22px] md:px-[26px] py-[18px] space-y-[14px]">
                  <p className="font-['Open_Sans'] text-[15px] text-white/90 leading-[1.9] m-0">{tr(`${keyBase}.cta.text`, `${NS}.cta.text`)}</p>

                  <div className="flex flex-col sm:flex-row gap-[10px]">
                    <Link
                      to={langPath("/contact")}
                      className="inline-flex items-center justify-center rounded-none px-[18px] py-[12px] font-[Rajdhani] font-[900] uppercase text-[14px] text-white bg-[#FF8A00] hover:bg-[#ffaa44] transition shadow-[0_14px_40px_rgba(0,0,0,0.25)]"
                      aria-label={tr(`${NS}.cta.primaryAria`, `${NS}.cta.primaryAria`)}
                    >
                      {tr(`${NS}.cta.primary`, `${NS}.cta.primary`)}
                    </Link>

                    <Link
                      to={langPath("/projects")}
                      className="inline-flex items-center justify-center rounded-none px-[18px] py-[12px] font-[Rajdhani] font-[900] uppercase text-[14px] text-white border border-white/35 bg-white/10 hover:bg-white/15 transition"
                      aria-label={tr(`${NS}.cta.secondaryAria`, `${NS}.cta.secondaryAria`)}
                    >
                      {tr(`${NS}.cta.secondary`, `${NS}.cta.secondary`)}
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          style={{ padding: "clamp(16px, 4vw, 48px)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute w-[48px] h-[48px] bg-white/10 hover:bg-white/20 rounded-none flex items-center justify-center text-white text-[28px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            style={{ top: "clamp(16px, 4vw, 48px)", right: "clamp(16px, 4vw, 48px)" }}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <div
            ref={lightboxRef}
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt={lightboxAlt || "Project image"}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-none shadow-2xl"
              style={{
                maxWidth: "min(1200px, 100%)",
                maxHeight: "calc(100vh - 2 * clamp(16px, 4vw, 48px))"
              }}
              loading="eager"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectDetails