// Frontend/src/pages/Careers.js
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import SEO from "../components/SEO"
import { buildPathWithLang } from "../utils/langRouting"

const Careers = () => {
  const { t, i18n } = useTranslation()
  const reduceMotion = useReducedMotion()

  const lang = useMemo(
    () => String(i18n.resolvedLanguage || i18n.language || "en").toLowerCase(),
    [i18n.resolvedLanguage, i18n.language]
  )
  const isArabic = lang === "lb" || lang.startsWith("ar")
  const langDep = i18n.resolvedLanguage || i18n.language

  const heroRef = useRef(null)
  const detailsRefOuter = useRef(null)

  const pagePath = useMemo(() => "/careers", [])

  const canonical = useMemo(() => {
    return `https://achiscaffolding.com${buildPathWithLang(lang, pagePath)}`
  }, [lang, pagePath])

  const positions = useMemo(() => {
    const items = t("careers.positions.items", { returnObjects: true })
    return Array.isArray(items) ? items : []
  }, [t, langDep])

  const faqs = useMemo(() => {
    const items = t("careers.faq.items", { returnObjects: true })
    return Array.isArray(items) ? items : []
  }, [t, langDep])

  const whyItems = useMemo(() => {
    const items = t("careers.why.items", { returnObjects: true })
    return Array.isArray(items) ? items : []
  }, [t, langDep])

  const envTags = useMemo(() => {
    const items = t("careers.environment.tags", { returnObjects: true })
    return Array.isArray(items) ? items : []
  }, [t, langDep])

  const [openId, setOpenId] = useState(null)
  const [activeLocation, setActiveLocation] = useState("all")

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const V = {
    page: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: reduceMotion ? { duration: 0 } : { duration: 0.35 } },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 18 },
      show: { opacity: 1, y: 0, transition: reduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" } },
    },
    card: {
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" } },
    },
    stagger: {
      hidden: {},
      show: { transition: reduceMotion ? {} : { staggerChildren: 0.08, delayChildren: 0.05 } },
    },
  }

  // ---------- Roles (Jobs + Internships) ----------
  const internships = useMemo(() => {
    const a = {
      id: "intern-digital-marketing",
      type: "internship",
      title: t("careers.internships.items.digitalMarketing.title"),
      location: t("careers.internships.items.digitalMarketing.location"),
      summary: t("careers.internships.items.digitalMarketing.summary"),
      requirements: t("careers.internships.items.digitalMarketing.requirements", { returnObjects: true }),
    }

    const b = {
      id: "intern-civil-engineering",
      type: "internship",
      title: t("careers.internships.items.civilEngineering.title"),
      location: t("careers.internships.items.civilEngineering.location"),
      summary: t("careers.internships.items.civilEngineering.summary"),
      requirements: t("careers.internships.items.civilEngineering.requirements", { returnObjects: true }),
    }

    const normalize = (x) => ({ ...x, requirements: Array.isArray(x.requirements) ? x.requirements : [] })
    return [normalize(a), normalize(b)]
  }, [t, langDep])

  const jobs = useMemo(() => {
    return Array.isArray(positions) ? positions.map((p) => ({ ...p, type: "job" })) : []
  }, [positions])

  const allRoles = useMemo(() => {
    return [...jobs, ...internships]
  }, [jobs, internships])

  const tabs = useMemo(() => {
    return [
      { key: "all", label: t("careers.positions.filters.all") },
      { key: "job", label: t("careers.positions.filters.jobs") },
      { key: "internship", label: t("careers.positions.filters.internships") },
    ]
  }, [t, langDep])

  const visibleRoles = useMemo(() => {
    if (activeLocation === "all") return allRoles
    return allRoles.filter((r) => String(r?.type || "") === activeLocation)
  }, [allRoles, activeLocation])

  const selectedRole = useMemo(() => {
    if (!visibleRoles.length) return null
    const found = visibleRoles.find((x) => x.id === openId)
    return found || visibleRoles[0]
  }, [visibleRoles, openId])

  useEffect(() => {
    if (!visibleRoles.length) return
    const exists = visibleRoles.some((r) => r.id === openId)
    if (!exists) setOpenId(visibleRoles[0].id)
  }, [visibleRoles, openId])

  const getTypeLabel = useCallback(
    (type) => (String(type) === "internship" ? t("careers.positions.badges.internship") : t("careers.positions.badges.job")),
    [t, langDep]
  )

  const openRoleAndScroll = useCallback((id) => {
    setOpenId(id)
    requestAnimationFrame(() => {
      detailsRefOuter?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  const enableScroll = activeLocation === "all"
  const listClasses = enableScroll ? "max-h-[520px] md:max-h-[620px] overflow-y-auto pr-[6px]" : ""

  return (
    <>
    <SEO title={t("careers.seoTitle")} description={t("careers.seoDescription")} canonical={canonical} />
    <motion.main  dir={isArabic ? "rtl" : "ltr"}  className="w-full bg-white"  variants={V.page}  initial="hidden"  animate="show">

        <section ref={heroRef} aria-labelledby="careers-hero-title"  className="w-full bg-gradient-to-br from-[#28509E] to-[#1b3155] text-white relative overflow-hidden"  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-[160px] -left-[160px] w-[420px] h-[420px] bg-white/25 blur-3xl rounded-full" />
      <div className="absolute -bottom-[190px] -right-[190px] w-[520px] h-[520px] bg-white/20 blur-3xl rounded-full" />
    </div>

    <motion.div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-[0.14]"
      animate={reduceMotion ? {} : { backgroundPosition: ["0px 0px", "28px 28px"] }}
      transition={reduceMotion ? {} : { duration: 10, ease: "linear", repeat: Infinity }}
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    />

    {!reduceMotion && (
      <>
        <motion.div
          aria-hidden="true"
          className="absolute left-[8%] top-[22%] w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 46, ease: "linear", repeat: Infinity }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-[-120px] top-[55%] w-[420px] h-[420px] border border-white/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
      </>
    )}

    <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] py-[42px] md:py-[58px] relative">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-[22px] lg:gap-[28px] items-start">
        <motion.div variants={V.stagger} initial="hidden" animate="show">
          <motion.div  variants={V.fadeUp} className=" sr-only inline-flex items-center gap-[10px] bg-white/10 border border-white/20 px-[14px] py-[8px] rounded-[0]" >
            <motion.span
              className="w-[8px] h-[8px] bg-[#ff8a00]"
              animate={reduceMotion ? {} : { scale: [1, 1.35, 1] }}
              transition={reduceMotion ? {} : { duration: 1.6, ease: "easeInOut", repeat: Infinity }}
            />
            <span className="font-[Rajdhani] font-[800] uppercase text-[14px] tracking-[0.02em]">
              {t("careers.heroPill")}
            </span>
          </motion.div>

          <motion.h1
            id="careers-hero-title"
            variants={V.fadeUp}
            className="font-[Rajdhani] text-white font-[700] uppercase
              text-[28px] md:text-[38px] lg:text-[44px]
              leading-[1.15] mt-[16px]"
          >
            {t("careers.h1")}
          </motion.h1>

          <motion.p
            variants={V.fadeUp}
            className="font-['Open_Sans'] text-white/90 text-[16px] md:text-[18px] leading-[1.85] mt-[14px] max-w-[900px]"
          >
            {t("careers.intro")}
          </motion.p>
        </motion.div>

        <motion.aside
          aria-label={t("careers.positions.trustText")}
          variants={V.card}
          initial="hidden"
          animate="show"
          className="bg-white/10 border border-white/20 rounded-[0] overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
        >
          <div className="h-[4px] bg-gradient-to-r from-[#ff8a00] to-white/40" />
          <div className="p-[18px] md:p-[22px]">
            <div className="mt-[6px] grid gap-[10px]">
              {[t("careers.heroFloatingTags.0"), t("careers.heroFloatingTags.1"), t("careers.heroFloatingTags.2")].map(
                (label, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={reduceMotion ? {} : { y: -2 }}
                    transition={reduceMotion ? {} : { duration: 0.18 }}
                    className="flex items-center gap-[12px] bg-white/10 border border-white/20 px-[14px] py-[12px] rounded-[0]"
                  >
                    <span className="w-[10px] h-[10px] bg-[#ff8a00] flex-shrink-0" />
                    <span className="font-['Open_Sans'] text-white/90 font-[800] text-[13px] md:text-[14px] leading-[1.4]">
                      {label}
                    </span>
                  </motion.div>
                )
              )}
            </div>

            <div className="mt-[16px] border-t border-white/15 pt-[14px]">
              <div className="font-['Open_Sans'] text-white/85 text-[13px] leading-[1.8]">
                {t("careers.positions.trustText")}
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
        </section>


        {/* WHY + ENV */}
        <section aria-labelledby="careers-why-env-title" className="w-full bg-[#f5f7fa] py-[54px] border-b border-[#e7ebf0]">
  <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
    <motion.div
      variants={V.stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-[22px]"
    >
      <h2 id="careers-why-env-title" className="sr-only">
        {t("careers.why.title")} — {t("careers.environment.title")}
      </h2>

      <motion.article variants={V.card} className="bg-white border border-[#e0e6ee] rounded-[0] shadow-sm overflow-hidden">
        <div className="h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
        <div className="p-[26px] md:p-[32px]">
          <h3 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[30px] font-[900] uppercase leading-[1.1]">
            {t("careers.why.title")}
          </h3>

          <ul className="mt-[14px] space-y-[10px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.85]">
            {whyItems.slice(0, 4).map((x, idx) => (
              <li key={idx} className="flex items-start gap-[12px]">
                <span aria-hidden="true" className="w-[10px] h-[10px] bg-[#28509E] mt-[10px] flex-shrink-0" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.article>

      <motion.article variants={V.card} className="bg-white border border-[#e0e6ee] rounded-[0] shadow-sm overflow-hidden">
        <div className="h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
        <div className="p-[26px] md:p-[32px]">
          <h3 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[30px] font-[900] uppercase leading-[1.1]">
            {t("careers.environment.title")}
          </h3>

          <p className="mt-[14px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.85]">
            {t("careers.environment.text")}
          </p>

          <p className="sr-only">
            {envTags && envTags.length ? envTags.join(", ") : ""}
          </p>

          <div className="mt-[18px] flex flex-wrap gap-[10px]" role="list">
            {envTags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                role="listitem"
                className="inline-flex items-center px-[14px] py-[10px] bg-[#f5f7fa] border border-[#e0e6ee] rounded-[0] font-['Open_Sans'] text-[#1b3155] font-[800] text-[13px]"
              >
                <span aria-hidden="true" className="w-[8px] h-[8px] bg-[#ff8a00] mr-[10px]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  </div>
        </section>


        {/* OPEN POSITIONS */}
        <section  id="open-positions"  aria-labelledby="careers-open-positions-title"  className="w-full bg-white py-[76px]">
  <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
    <motion.div variants={V.fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }}>
      <h2
        id="careers-open-positions-title"
        className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[44px] font-[900] uppercase mb-[10px]"
      >
        {t("careers.positions.title")}
      </h2>
      <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.85] max-w-[980px]">
        {t("careers.positions.subtitle")}
      </p>
    </motion.div>

    <motion.div
      variants={V.fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-[18px] flex flex-wrap gap-[10px]"
      role="tablist"
      aria-label={t("careers.positions.title")}
    >
      {tabs.map((tab) => {
        const active = activeLocation === tab.key
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`open-positions-panel-${tab.key}`}
            id={`open-positions-tab-${tab.key}`}
            onClick={() => {
              setActiveLocation(tab.key)
              requestAnimationFrame(() => {
                const nextList = tab.key === "all" ? allRoles : allRoles.filter((r) => String(r?.type || "") === tab.key)
                if (nextList?.[0]?.id) setOpenId(nextList[0].id)
              })
            }}
            className={[
              "px-[16px] py-[10px] border rounded-[0] font-['Open_Sans'] font-[800] text-[13px] uppercase tracking-[0.02em] transition",
              active ? "bg-[#28509E] text-white border-[#28509E]" : "bg-white text-[#1b3155] border-[#e0e6ee] hover:bg-[#f5f7fa]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        )
      })}
    </motion.div>

    <div className="mt-[26px] grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-[20px]">
      {/* LIST */}
      <motion.div
        variants={V.card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white border border-[#e0e6ee] rounded-[0] shadow-sm overflow-hidden"
        id={`open-positions-panel-${activeLocation}`}
        role="tabpanel"
        aria-labelledby={`open-positions-tab-${activeLocation}`}
      >
        <div className="h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
        

        <div className="p-[12px]">
          <div
            role="list"
            className={[
              "grid gap-[10px]",
              listClasses,
              "scrollbar-thin scrollbar-thumb-[#cfd8e6] scrollbar-track-transparent",
            ].join(" ")}
            style={{ scrollbarWidth: "thin" }}
          >
            {visibleRoles.map((role) => {
              const active = openId === role.id
              return (
                <div
                  role="listitem"
                  key={role.id}
                  className={[
                    "w-full border rounded-[0] transition",
                    active ? "bg-[#f5f7fa] border-[#d7deea]" : "bg-white border-[#e0e6ee] hover:bg-[#f5f7fa]",
                  ].join(" ")}
                >
                  <div className="px-[16px] py-[14px]">
                    <div dir={isArabic ? "ltr" : undefined} className="flex items-start justify-between gap-[14px]">
                      <button
                        type="button"
                        onClick={() => openRoleAndScroll(role.id)}
                          dir={isArabic ? "rtl" : undefined}
                        className={`${isArabic ? "order-2 text-right" : "order-1 text-left"} flex-1`}
                        aria-label={`${t("careers.positions.openRole")} ${role.title}`}
                      >
                        <div className="font-[Rajdhani] text-[#1b3155] font-[900] uppercase text-[16px] leading-[1.2]">
                          {role.title}
                        </div>
                        <div className="mt-[6px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] opacity-90">{role.location}</div>

                        <div className="mt-[8px] inline-flex items-center gap-[8px]">
                          <span aria-hidden="true" className="w-[6px] h-[6px] bg-[#ff8a00]" />
                          <span className="font-['Open_Sans'] text-[12px] font-[800] uppercase tracking-[0.02em] text-[#1b3155] opacity-85">
                            {getTypeLabel(role.type)}
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => openRoleAndScroll(role.id)}
                        className={`w-[44px] h-[44px] border border-[#e0e6ee] bg-white grid place-items-center rounded-[0] flex-shrink-0 hover:bg-[#f5f7fa] transition ${isArabic ? "order-1" : "order-2"}`}
                        aria-label={`${t("careers.positions.openRole")} ${role.title}`}
                      >
<span className="arrow-icon text-[#1b3155] font-[900] leading-none" aria-hidden="true">→</span>



                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* DETAILS */}
      <motion.div
        ref={detailsRefOuter}
        variants={V.card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white border border-[#e0e6ee] rounded-[0] shadow-sm overflow-hidden relative scroll-mt-[140px] md:scroll-mt-[160px]"
        aria-live="polite"
      >
        <div className="h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />

        <AnimatePresence mode="wait">
          {selectedRole ? (
            <motion.article
              key={selectedRole.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-[22px] md:p-[28px]"
              aria-labelledby={`role-title-${selectedRole.id}`}
            >
              <h3
                id={`role-title-${selectedRole.id}`}
                className="font-[Rajdhani] text-[#1b3155] font-[900] uppercase text-[22px] md:text-[30px] leading-[1.1]"
              >
                {selectedRole.title}
              </h3>

              <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
                <div className="font-['Open_Sans'] text-[#2a2a2a] text-[14px] opacity-90">{selectedRole.location}</div>
                <span aria-hidden="true" className="w-[6px] h-[6px] bg-[#ff8a00]" />
                <div className="font-['Open_Sans'] text-[12px] font-[800] uppercase tracking-[0.02em] text-[#1b3155] opacity-85">
                  {getTypeLabel(selectedRole.type)}
                </div>
              </div>

              <p className="mt-[16px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.85]">{selectedRole.summary}</p>

              <div className="mt-[18px] border border-[#e0e6ee] bg-[#f5f7fa] rounded-[0] overflow-hidden">
                <div className="px-[16px] py-[12px] border-b border-[#e0e6ee]">
                  <div className="font-[Rajdhani] text-[#1b3155] font-[900] uppercase text-[15px]">
                    {t("careers.positions.requirementsTitle")}
                  </div>
                </div>
                <div className="px-[16px] py-[12px]">
                  <ul className="space-y-[10px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] leading-[1.85]">
                    {(selectedRole.requirements || []).map((r, i) => (
                      <li key={i} className="flex items-start gap-[12px]">
                        <span aria-hidden="true" className="w-[10px] h-[10px] bg-[#ff8a00] mt-[10px] flex-shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-[18px] flex flex-wrap gap-[12px]">
                <a
                  href={`mailto:${t("careers.apply.email")}?subject=${encodeURIComponent(
                    `${t("careers.apply.emailSubjectPrefix")} - ${selectedRole.title}`
                  )}`}
                  className="inline-flex items-center justify-center px-[22px] py-[12px] bg-[#28509E] text-white border border-[#28509E] rounded-[0] font-[Rajdhani] font-[900] uppercase text-[15px] hover:opacity-95 transition"
                >
                  {t("careers.positions.applyForThisRole")}
                </a>

                <button
                  type="button"
                  onClick={() => scrollToId("how-to-apply")}
                  className="inline-flex items-center justify-center px-[22px] py-[12px] bg-white text-[#1b3155] border border-[#e0e6ee] rounded-[0] font-[Rajdhani] font-[900] uppercase text-[15px] hover:bg-[#f5f7fa] transition"
                >
                  {t("careers.positions.howToApply")}
                </button>
              </div>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
        </section>

        {/* APPLY + FAQ */}
        <section
  id="how-to-apply"
  aria-labelledby="careers-how-to-apply-title"
  className="w-full bg-[#f5f7fa] py-[76px]"
>
  <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
    <motion.div
      variants={V.stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-[22px]"
    >
      <h2 id="careers-how-to-apply-title" className="sr-only">
        {t("careers.apply.title")} — {t("careers.faq.title")}
      </h2>

      <motion.article variants={V.card} className="bg-white border border-[#e0e6ee] rounded-[0] shadow-sm overflow-hidden">
        <div className="h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
        <div className="p-[26px] md:p-[32px]">
          <h3 className="font-[Rajdhani] text-[#1b3155] text-[32px] md:text-[30px] font-[900] uppercase leading-[1.1]">
            {t("careers.apply.title")}
          </h3>

          <p className="mt-[14px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.85] max-w-[900px]">
            {t("careers.apply.text")}
          </p>

          <div className="mt-[16px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] opacity-90">
            {t("careers.apply.emailLabel")} <span className="font-[800]">{t("careers.apply.email")}</span>
          </div>

          <div className="mt-[18px] flex flex-wrap gap-[12px]">
            <a
              href={`mailto:${t("careers.apply.email")}?subject=${encodeURIComponent(t("careers.apply.defaultEmailSubject"))}`}
              className="inline-flex items-center justify-center px-[26px] py-[14px] bg-[#ff8a00] text-white border border-[#ff8a00] rounded-[0] font-[Rajdhani] font-[900] uppercase text-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.24)] transition"
            >
              {t("careers.apply.cta")}
            </a>

            <button
              type="button"
              onClick={() => scrollToId("open-positions")}
              className="inline-flex items-center justify-center px-[26px] py-[14px] bg-white text-[#1b3155] border border-[#e0e6ee] rounded-[0] font-[Rajdhani] font-[900] uppercase text-[16px] hover:bg-[#f5f7fa] transition"
            >
              {t("careers.apply.backToRoles")}
            </button>
          </div>
        </div>
      </motion.article>

      <motion.article variants={V.card} className="bg-white border border-[#e0e6ee] rounded-[0] shadow-sm overflow-hidden">
        <div className="h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
        <div className="p-[26px] md:p-[32px]">
          <h3 className="font-[Rajdhani] text-[#1b3155] text-[24px] md:text-[30px] font-[900] uppercase leading-[1.1]">
            {t("careers.apply.whatToIncludeTitle")}
          </h3>

          <ul className="mt-[14px] space-y-[10px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] leading-[1.85]">
            {(t("careers.apply.whatToIncludeItems", { returnObjects: true }) || []).map((x, idx) => (
              <li key={idx} className="flex items-start gap-[12px]">
                <span aria-hidden="true" className="w-[10px] h-[10px] bg-[#28509E] mt-[10px] flex-shrink-0" />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-[18px] bg-[#f5f7fa] border border-[#e0e6ee] rounded-[0] p-[16px]">
            <div className="font-[Rajdhani] text-[#1b3155] font-[900] uppercase text-[15px]">{t("careers.apply.tipTitle")}</div>
            <div className="mt-[6px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] leading-[1.85]">{t("careers.apply.tipText")}</div>
          </div>
        </div>
      </motion.article>
    </motion.div>

    <motion.div
      variants={V.fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      className="mt-[22px] bg-white border border-[#e0e6ee] rounded-[0] shadow-sm overflow-hidden"
      aria-labelledby="careers-faq-title"
    >
      <div className="h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
      <div className="p-[26px] md:p-[32px]">
        <h3
          id="careers-faq-title"
          className="font-[Rajdhani] text-[#1b3155] text-[32px] md:text-[30px] font-[900] uppercase leading-[1.1]"
        >
          {t("careers.faq.title")}
        </h3>

        <div className="mt-[18px] grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {faqs.map((f, idx) => (
            <details key={idx} className="bg-[#f5f7fa] border border-[#e0e6ee] rounded-[0] px-[18px] py-[14px]">
              <summary className="cursor-pointer font-[Rajdhani] font-[900] uppercase text-[#1b3155] text-[15px]">
                {f.q}
              </summary>
              <div className="mt-[10px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] leading-[1.85]">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
        </section>

      </motion.main>
    </>
  )
}

export default Careers
