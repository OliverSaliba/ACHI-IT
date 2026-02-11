// src/components/services/SingleService.js
import React, { useEffect, useMemo } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, useReducedMotion } from "framer-motion"
import ImageWebp from "../ImageWebp"
import SEO from "../SEO"
import { useLangRouter } from "../../routing/LangRouter"
import { buildPathWithLang } from "../../utils/langRouting"

const SITE_ORIGIN = "https://achiscaffolding.com"

const ALLOWED_SERVICE_KEYS = [
  "facades",
  "suspended",
  "proppingShoring",
  "adjustableProps",
  "accessStairs",
  "unloadingLoadingPlatforms",
  "highCapacity",
  "eventScaffolding",
]

const SERVICE_KEY_TO_SLUG = {
  facades: "facade-scaffolding",
  suspended: "suspended-scaffolding",
  proppingShoring: "propping-shoring",
  adjustableProps: "adjustable-props",
  accessStairs: "access-stairs",
  unloadingLoadingPlatforms: "unloading-loading-platforms",
  highCapacity: "high-capacity-structures",
  eventScaffolding: "event-scaffolding",
}

const SERVICE_SLUG_TO_KEY = Object.entries(SERVICE_KEY_TO_SLUG).reduce((acc, [k, slug]) => {
  acc[slug] = k
  return acc
}, {})

// TODO Italian content: pages mentioned but missing full content – do not create yet:
// Piattaforme per sale interne, Scale, Monticharichi, Puntellamenti, Puntelli, Parapetti, Consulenza e progettazione.
// Italian service slugs (URL under /it/servizi/:slug). Scroll logic unchanged.
const ITALIAN_SERVICE_SLUG_TO_KEY = {
  "manodopera-specializzata-ponteggi-italia": "manodopera",
  "ponteggi-sospesi-italia": "ponteggiSospesi",
  "noleggio-a-caldo-ponteggi-italia": "noleggioCaldo",
  "noleggio-a-freddo-ponteggi-italia": "noleggioFreddo",
  "ponteggi-per-facciate-italia": "ponteggiFacciate",
  "ponteggi-per-ponte-italia": "ponteggiPonte",
  "impalcature-per-eventi-italia": "impalcatureEventi",
  "copertura-provvisoria-sottotetto-italia": "coperturaSottotetto",
  "ponteggi-per-costruzioni-speciali-italia": "costruzioniSpeciali",
  "sicurezza-sul-lavoro-ponteggi-italia": "sicurezzaLavoro",
  "ponteggi-multidirezionali-italia": "multidirezionali",
  "ponteggi-tradizionali-telai-prefabbricati-italia": "tradizionaliTelai",
  "ponteggi-tubi-e-giunti-italia": "tubiGiunti",
}

const ITALIAN_SERVICE_KEY_TO_SLUG = {
  manodopera: "manodopera-specializzata-ponteggi-italia",
  ponteggiSospesi: "ponteggi-sospesi-italia",
  noleggioCaldo: "noleggio-a-caldo-ponteggi-italia",
  noleggioFreddo: "noleggio-a-freddo-ponteggi-italia",
  ponteggiFacciate: "ponteggi-per-facciate-italia",
  ponteggiPonte: "ponteggi-per-ponte-italia",
  impalcatureEventi: "impalcature-per-eventi-italia",
  coperturaSottotetto: "copertura-provvisoria-sottotetto-italia",
  costruzioniSpeciali: "ponteggi-per-costruzioni-speciali-italia",
  sicurezzaLavoro: "sicurezza-sul-lavoro-ponteggi-italia",
  multidirezionali: "ponteggi-multidirezionali-italia",
  tradizionaliTelai: "ponteggi-tradizionali-telai-prefabbricati-italia",
  tubiGiunti: "ponteggi-tubi-e-giunti-italia",
}

const ALLOWED_ITALIAN_KEYS = [
  "manodopera", "ponteggiSospesi", "noleggioCaldo", "noleggioFreddo", "ponteggiFacciate",
  "ponteggiPonte", "impalcatureEventi", "coperturaSottotetto", "costruzioniSpeciali",
  "sicurezzaLavoro", "multidirezionali", "tradizionaliTelai", "tubiGiunti",
]

// Italian long-form body: liquid glass + modern animations (content unchanged).
function ItalianLongFormBody({ NS, t, serviceKey, V, reduceMotion, handleScrollToContact }) {
  const base = `${NS}.longForm`
  const extended = t(`${base}.extendedParagraph`, { defaultValue: "" })
  const tableTitle = t(`${base}.tableTitle`, { defaultValue: "" })
  const tableHeaderRequisito = t(`${base}.tableHeaderRequisito`, { defaultValue: "Requisito" })
  const tableHeaderDettaglio = t(`${base}.tableHeaderDettaglio`, { defaultValue: "Dettaglio obbligatorio 2026" })
  const tableHeaderSanzione = t(`${base}.tableHeaderSanzione`, { defaultValue: "Sanzione se manca" })
  const tableRowCount = parseInt(t(`${base}.tableRowCount`, { defaultValue: "0" }), 10) || 0
  const prezziTitle = t(`${base}.prezziTitle`, { defaultValue: "" })
  const prezziCount = parseInt(t(`${base}.prezziCount`, { defaultValue: "0" }), 10) || 0
  const vantaggiTitle = t(`${base}.vantaggiTitle`, { defaultValue: "" })
  const vantaggiCount = parseInt(t(`${base}.vantaggiCount`, { defaultValue: "0" }), 10) || 0
  const formTitle = t(`${base}.formTitle`, { defaultValue: "" })
  const formSubtitle = t(`${base}.formSubtitle`, { defaultValue: "" })
  const formFieldCount = parseInt(t(`${base}.formFieldCount`, { defaultValue: "0" }), 10) || 0
  const disclaimer = t(`${base}.disclaimer`, { defaultValue: "" })
  const ctaFinale = t(`${base}.ctaFinale`, { defaultValue: "" })

  const section1Title = t(`${base}.section1Title`, { defaultValue: "" })
  const section1BulletCount = parseInt(t(`${base}.section1BulletCount`, { defaultValue: "0" }), 10) || 0

  const staggerItem = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" } } }

  return (
    <>
      {extended && (
        <section className="w-full bg-[#f5f7fa] py-[54px] border-b border-[#e7ebf0]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div
              variants={V.fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="relative rounded-2xl overflow-hidden p-[1px] bg-gradient-to-br from-[#28509E]/25 via-white/40 to-[#0ea5e9]/15 shadow-[0_8px_32px_rgba(40,80,158,0.08)]"
            >
              <div className="rounded-2xl bg-white/75 backdrop-blur-xl border border-white/40 px-[28px] md:px-[36px] py-[28px] md:py-[32px]">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.5 }}
                  className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.8] max-w-[980px] mx-auto whitespace-pre-line"
                >
                  {extended}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {section1Title && (
        <section className="w-full bg-white py-[54px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur-xl border border-[#e2e8f0]/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)] p-[28px] md:p-[36px] relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#28509E] to-[#0ea5e9] rounded-l-full" />
              <motion.h2
                variants={staggerItem}
                className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[18px] pl-4 tracking-wide"
              >
                {section1Title}
              </motion.h2>
              {section1BulletCount > 0 && (
                <ul className="space-y-3 pl-4">
                  {Array.from({ length: section1BulletCount }, (_, i) => t(`${base}.section1Bullet${i}`, { defaultValue: "" })).filter(Boolean).map((text, i) => (
                    <motion.li
                      key={i}
                      variants={staggerItem}
                      className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.8] flex items-start gap-3"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#28509E] shrink-0 ring-4 ring-[#28509E]/20" />
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {tableTitle && tableRowCount > 0 && (
        <section className="w-full bg-[#f5f7fa] py-[54px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] overflow-x-auto">
            <motion.h2
              variants={V.fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[22px] tracking-wide pb-3 border-b border-[#28509E]/20"
            >
              {tableTitle}
            </motion.h2>
            <motion.div
              variants={V.fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl border border-[#e2e8f0]/80 shadow-[0_8px_40px_rgba(40,80,158,0.06)]"
            >
              <table className="w-full min-w-[640px] border-collapse text-left font-['Open_Sans'] text-[15px]">
                <thead>
                  <tr className="bg-[#28509E] text-white">
                    <th scope="col" className="px-[20px] py-[16px] font-[700] first:rounded-tl-2xl">{tableHeaderRequisito}</th>
                    <th scope="col" className="px-[20px] py-[16px] font-[700]">{tableHeaderDettaglio}</th>
                    <th scope="col" className="px-[20px] py-[16px] font-[700] last:rounded-tr-2xl">{tableHeaderSanzione}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: tableRowCount }, (_, i) => ({
                    requisito: t(`${base}.tableRow${i}Requisito`, { defaultValue: "" }),
                    dettaglio: t(`${base}.tableRow${i}Dettaglio`, { defaultValue: "" }),
                    sanzione: t(`${base}.tableRow${i}Sanzione`, { defaultValue: "" }),
                  })).filter((row) => row.requisito || row.dettaglio || row.sanzione).map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="border-b border-[#e8ecf2] last:border-0 hover:bg-[#f0f4fa]/80 transition-colors"
                    >
                      <td className="px-[20px] py-[14px] text-[#2a2a2a]">{row.requisito}</td>
                      <td className="px-[20px] py-[14px] text-[#2a2a2a]">{row.dettaglio}</td>
                      <td className="px-[20px] py-[14px] text-[#2a2a2a]">{row.sanzione}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>
      )}

      {prezziTitle && prezziCount > 0 && (
        <section className="w-full bg-white py-[54px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="rounded-2xl overflow-hidden bg-[#f8fafc]/90 backdrop-blur-xl border border-[#e2e8f0]/80 shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-[28px] md:p-[36px]"
            >
              <motion.h2 variants={staggerItem} className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[22px] tracking-wide">
                {prezziTitle}
              </motion.h2>
              <ul className="space-y-3">
                {Array.from({ length: prezziCount }, (_, i) => t(`${base}.prezzi${i}`, { defaultValue: "" })).filter(Boolean).map((text, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.8] flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#0ea5e9] shrink-0 ring-4 ring-[#0ea5e9]/25" />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {vantaggiTitle && vantaggiCount > 0 && (
        <section className="w-full bg-[#f5f7fa] py-[54px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.h2
              variants={V.fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[22px] tracking-wide"
            >
              {vantaggiTitle}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: vantaggiCount }, (_, i) => t(`${base}.vantaggi${i}`, { defaultValue: "" })).filter(Boolean).map((text, i) => (
                <motion.div
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
                  className="rounded-xl bg-white/70 backdrop-blur-xl border border-[#e2e8f0]/80 px-5 py-4 shadow-[0_4px_20px_rgba(15,23,42,0.05)] flex items-start gap-3"
                >
                  <span className="mt-0.5 w-8 h-8 rounded-lg bg-[#28509E]/15 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#28509E]" />
                  </span>
                  <span className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.75]">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(formTitle || formSubtitle) && formFieldCount > 0 && (
        <section className="w-full bg-white py-[54px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="rounded-2xl overflow-hidden p-[1px] bg-gradient-to-br from-[#28509E]/30 to-[#0ea5e9]/15 shadow-[0_8px_32px_rgba(40,80,158,0.08)]"
            >
              <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 px-[28px] md:px-[36px] py-[28px] md:py-[32px]">
                {formTitle && (
                  <motion.h2 variants={staggerItem} className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[8px] tracking-wide">
                    {formTitle}
                  </motion.h2>
                )}
                {formSubtitle && (
                  <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] mb-[18px]">{formSubtitle}</p>
                )}
                <ul className="space-y-2 mb-6">
                  {Array.from({ length: formFieldCount }, (_, i) => t(`${base}.formField${i}`, { defaultValue: "" })).filter(Boolean).map((text, i) => (
                    <motion.li key={i} variants={staggerItem} className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.7] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28509E]/60" />
                      {text}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={V.fadeUp} className="mt-[24px]">
                  <motion.button
                    type="button"
                    onClick={handleScrollToContact}
                    whileHover={reduceMotion ? undefined : { y: -2, boxShadow: "0 12px 28px rgba(40,80,158,0.35)" }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-flex items-center justify-center px-[44px] py-[18px] rounded-xl bg-[#28509E] text-white font-[Rajdhani] font-[800] text-[16px] uppercase cursor-pointer shadow-[0_8px_24px_rgba(40,80,158,0.3)] hover:bg-[#1b3155] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 border border-white/20"
                  >
                    {t(`${base}.formButton`, { defaultValue: "Invia Richiesta – Ti contattiamo subito" })}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {disclaimer && (
        <section className="w-full bg-[#f5f7fa] py-[40px] border-t border-[#e7ebf0]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/60 backdrop-blur-md border border-[#e2e8f0]/80 px-5 py-4 max-w-[980px]"
            >
              <p className="font-['Open_Sans'] text-[#555] text-[14px] leading-[1.7] italic">
                {disclaimer}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {ctaFinale && (
        <section className="w-full bg-white py-[40px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-r from-[#28509E]/10 to-[#0ea5e9]/10 backdrop-blur-sm border border-[#28509E]/15 px-6 py-4 inline-block"
            >
              <p className="font-['Open_Sans'] text-[#1b3155] text-[17px] font-[700]">
                {ctaFinale}
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}

const SingleService = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const { urlLang } = useLangRouter()
  const reduceMotion = useReducedMotion()

  const publicBase = (process.env.PUBLIC_URL || "").replace(/\/+$/, "")
  const pathname = location.pathname || ""
  const pathnameNoBase =
    publicBase && pathname.toLowerCase().startsWith(publicBase.toLowerCase()) ? pathname.slice(publicBase.length) || "/" : pathname

  const cleanPath = (pathnameNoBase || "/").replace(/^\/(fr|lb|it)(?=\/|$)/, "")
  const isHome = cleanPath === "/" || cleanPath === ""

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const rawServiceKeyFromQuery = useMemo(() => decodeURIComponent(searchParams.get("service") || "").trim(), [searchParams])

  const routeServiceSlug = (params.serviceSlug || "").trim()

  const resolved = useMemo(() => {
    const isItalian = urlLang === "it"

    if (routeServiceSlug) {
      if (isItalian) {
        const keyFromSlug = ITALIAN_SERVICE_SLUG_TO_KEY[routeServiceSlug]
        if (keyFromSlug && ALLOWED_ITALIAN_KEYS.includes(keyFromSlug)) {
          return { serviceKey: keyFromSlug, serviceSlug: routeServiceSlug, source: "slug", isItalian: true }
        }
        return { serviceKey: "manodopera", serviceSlug: ITALIAN_SERVICE_KEY_TO_SLUG.manodopera, source: "slug-invalid-italian", isItalian: true }
      }
      const italianSlug = Object.keys(ITALIAN_SERVICE_SLUG_TO_KEY).includes(routeServiceSlug)
      if (italianSlug) {
        return { serviceKey: "facades", serviceSlug: SERVICE_KEY_TO_SLUG.facades, source: "slug-invalid-non-italian" }
      }
      const keyFromSlug = SERVICE_SLUG_TO_KEY[routeServiceSlug]
      if (keyFromSlug && ALLOWED_SERVICE_KEYS.includes(keyFromSlug)) {
        return { serviceKey: keyFromSlug, serviceSlug: routeServiceSlug, source: "slug" }
      }
      return { serviceKey: "facades", serviceSlug: SERVICE_KEY_TO_SLUG.facades, source: "slug-invalid" }
    }

    if (rawServiceKeyFromQuery && isItalian && ALLOWED_ITALIAN_KEYS.includes(rawServiceKeyFromQuery)) {
      const slug = ITALIAN_SERVICE_KEY_TO_SLUG[rawServiceKeyFromQuery] || ITALIAN_SERVICE_KEY_TO_SLUG.manodopera
      return { serviceKey: rawServiceKeyFromQuery, serviceSlug: slug, source: "query", isItalian: true }
    }
    if (rawServiceKeyFromQuery && !isItalian && ALLOWED_SERVICE_KEYS.includes(rawServiceKeyFromQuery)) {
      const slug = SERVICE_KEY_TO_SLUG[rawServiceKeyFromQuery] || SERVICE_KEY_TO_SLUG.facades
      return { serviceKey: rawServiceKeyFromQuery, serviceSlug: slug, source: "query" }
    }

    if (isItalian) {
      return { serviceKey: "manodopera", serviceSlug: ITALIAN_SERVICE_KEY_TO_SLUG.manodopera, source: "default", isItalian: true }
    }
    return { serviceKey: "facades", serviceSlug: SERVICE_KEY_TO_SLUG.facades, source: "default" }
  }, [routeServiceSlug, rawServiceKeyFromQuery, urlLang])

  const serviceKey = resolved.serviceKey
  const serviceSlug = resolved.serviceSlug

  useEffect(() => {
    const isLegacyRoute = cleanPath === "/services/serviceItem"
    if (isLegacyRoute) {
      const targetPath = buildPathWithLang(urlLang, `/services/${serviceSlug}`)
      navigate(targetPath, { replace: true })
      return
    }

    if (resolved.source === "slug-invalid-non-italian") {
      const targetPath = buildPathWithLang(urlLang, `/services/${SERVICE_KEY_TO_SLUG.facades}`)
      navigate(targetPath, { replace: true })
      return
    }

    if (urlLang !== "it" && routeServiceSlug && ITALIAN_SERVICE_SLUG_TO_KEY[routeServiceSlug]) {
      const targetPath = buildPathWithLang(urlLang, `/services/${SERVICE_KEY_TO_SLUG.facades}`)
      navigate(targetPath, { replace: true })
      return
    }

    if (resolved.source === "slug-invalid" || resolved.source === "slug-invalid-italian") {
      const targetPath =
        urlLang === "it"
          ? buildPathWithLang(urlLang, `/services/${ITALIAN_SERVICE_KEY_TO_SLUG.manodopera}`)
          : buildPathWithLang(urlLang, `/services/${SERVICE_KEY_TO_SLUG.facades}`)
      navigate(targetPath, { replace: true })
      return
    }
  }, [cleanPath, navigate, resolved.source, routeServiceSlug, serviceSlug, urlLang])

  const goToHomeSection = (id) => {
    const hash = id.startsWith("#") ? id : `#${id}`
    if (!isHome) {
      const home = buildPathWithLang(urlLang, "/")
      navigate(`${home}${hash}`)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }, 250)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
  }

  const handleScrollToContact = (e) => {
    e.preventDefault()
    goToHomeSection("contactForm")
  }

  const base = process.env.PUBLIC_URL || ""
  const NS = `singleService.${serviceKey}`

  const canonicalPath = buildPathWithLang(urlLang, `/services/${serviceSlug}`)
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`

  const safetyImage = useMemo(() => {
    const facadeFallback = {
      webp: `${base}/assets/services/facade.webp`,
      img: `${base}/assets/services/facade.webp`,
    }
    const map = {
      facades: facadeFallback,
      suspended: {
        webp: `${base}/assets/services/Suspended.png`,
        img: `${base}/assets/services/Suspended.png`,
      },
      proppingShoring: {
        webp: `${base}/assets/services/propping.png`,
        img: `${base}/assets/services/propping.png`,
      },
      adjustableProps: {
        webp: `${base}/assets/services/adjustable.png`,
        img: `${base}/assets/services/adjustable.png`,
      },
      accessStairs: {
        webp: `${base}/assets/services/stairs2.webp`,
        img: `${base}/assets/services/stairs2.webp`,
      },
      unloadingLoadingPlatforms: {
        webp: `${base}/assets/services/G3.jpg`,
        img: `${base}/assets/services/G3.jpg`,
      },
      highCapacity: {
        webp: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
        img: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
      },
      eventScaffolding: {
        webp: `${base}/assets/services/eventScaffolding.jpeg`,
        img: `${base}/assets/services/eventScaffolding.jpeg`,
      },
      manodopera: facadeFallback,
      ponteggiSospesi: facadeFallback,
      noleggioCaldo: facadeFallback,
      noleggioFreddo: facadeFallback,
      ponteggiFacciate: facadeFallback,
      ponteggiPonte: facadeFallback,
      impalcatureEventi: facadeFallback,
      coperturaSottotetto: facadeFallback,
      costruzioniSpeciali: facadeFallback,
      sicurezzaLavoro: facadeFallback,
      multidirezionali: facadeFallback,
      tradizionaliTelai: facadeFallback,
      tubiGiunti: facadeFallback,
    }
    return map[serviceKey] || facadeFallback
  }, [base, serviceKey])

  const heroImage = useMemo(() => {
    const facadeFallback = {
      webp: `${base}/assets/services/facade.webp`,
      img: `${base}/assets/services/facade.webp`,
    }
    const map = {
      facades: facadeFallback,
      suspended: {
        webp: `${base}/assets/services/Suspended scaffolding 1 2(1).png`,
        img: `${base}/assets/services/Suspended scaffolding 1 2(1).png`,
      },
      proppingShoring: {
        webp: `${base}/assets/services/SDC14429(1).png`,
        img: `${base}/assets/services/SDC14429(1).png`,
      },
      adjustableProps: {
        webp: `${base}/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png`,
        img: `${base}/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png`,
      },
      accessStairs: {
        webp: `${base}/assets/services/stairs.webp`,
        img: `${base}/assets/services/stairs.webp`,
      },
      unloadingLoadingPlatforms: {
        webp: `${base}/assets/services/loading.jpg`,
        img: `${base}/assets/services/loading.jpg`,
      },
      highCapacity: {
        webp: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
        img: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
      },
      eventScaffolding: {
        webp: `${base}/assets/services/eventScaffolding.jpeg`,
        img: `${base}/assets/services/eventScaffolding.jpeg`,
      },
      manodopera: facadeFallback,
      ponteggiSospesi: facadeFallback,
      noleggioCaldo: facadeFallback,
      noleggioFreddo: facadeFallback,
      ponteggiFacciate: facadeFallback,
      ponteggiPonte: facadeFallback,
      impalcatureEventi: facadeFallback,
      coperturaSottotetto: facadeFallback,
      costruzioniSpeciali: facadeFallback,
      sicurezzaLavoro: facadeFallback,
      multidirezionali: facadeFallback,
      tradizionaliTelai: facadeFallback,
      tubiGiunti: facadeFallback,
    }
    return map[serviceKey] || facadeFallback
  }, [base, serviceKey])

  const isItalianLongForm = urlLang === "it" && ALLOWED_ITALIAN_KEYS.includes(serviceKey)
  const hasLongFormContent = useMemo(() => {
    if (!isItalianLongForm) return false
    const intro = t(`singleService.${serviceKey}.hero.intro`, { defaultValue: "" })
    return typeof intro === "string" && intro.length > 0
  }, [isItalianLongForm, serviceKey, t])

  const V = {
    page: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: reduceMotion ? { duration: 0 } : { duration: 0.35 } },
    },
    heroLeft: {
      hidden: { opacity: 0, y: 18 },
      show: { opacity: 1, y: 0, transition: reduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" } },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 18 },
      show: { opacity: 1, y: 0, transition: reduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" } },
    },
    stagger: {
      hidden: {},
      show: { transition: reduceMotion ? {} : { staggerChildren: 0.08, delayChildren: 0.05 } },
    },
    card: {
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" } },
    },
  }

  return (
    <>
      <motion.main id="main-content" className="w-full bg-white" variants={V.page} initial="hidden" animate="show">
        <SEO
          title={t(`${NS}.seo.title`)}
          description={t(`${NS}.seo.description`)}
          canonical={canonicalUrl}
          ogUrl={canonicalUrl}
          ogType="website"
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#28509E] focus:text-white focus:rounded focus:font-bold"
        >
          {t(`${NS}.a11y.skipToContent`)}
        </a>

        <header className="w-full bg-gradient-to-br from-[#28509E] to-[#1b3155] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
            <div className="absolute -top-[140px] -left-[140px] w-[340px] h-[340px] bg-white/30 blur-3xl rounded-full" />
            <div className="absolute -bottom-[160px] -right-[160px] w-[380px] h-[380px] bg-white/25 blur-3xl rounded-full" />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch relative min-h-0">
            <div className="w-full flex-1 flex min-w-0 order-2 lg:order-1">
              <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] py-[28px] md:py-[36px] flex items-center">
                <motion.div variants={V.stagger} initial="hidden" animate="show" className="w-full">
                  <motion.h1
                    variants={V.heroLeft}
                    className="font-[Rajdhani] text-white font-[650] uppercase text-[30px] md:text-[38px] lg:text-[50px] leading-[1.05] mb-[16px]"
                  >
                    {t(`${NS}.hero.h1`)}
                  </motion.h1>

                  <motion.p
                    variants={V.heroLeft}
                    className="font-['Open_Sans'] text-white/90 text-[17px] md:text-[19px] leading-[1.65] mb-[22px] max-w-[640px]"
                  >
                    {t(`${NS}.hero.intro`)}
                  </motion.p>

                  <motion.div variants={V.heroLeft} className="flex flex-col sm:flex-row gap-[14px]">
                    <Link
                      to={buildPathWithLang(urlLang, "/projects")}
                      className="group inline-flex items-center justify-center px-[34px] py-[14px] bg-transparent border-2 border-white text-white font-[Rajdhani] font-[800] text-[16px] uppercase transition rounded-[0] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#28509E] hover:bg-white/10 hover:translate-y-[-1px]"
                      aria-label={t(`${NS}.hero.secondaryButtonAria`)}
                    >
                      <span className="relative">
                        {t(`${NS}.hero.secondaryButton`)}
                        <span className="absolute left-0 -bottom-[6px] h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="w-full flex-1 relative min-h-0 order-first lg:order-last aspect-[4/3] lg:aspect-auto">
              <div className="relative w-full h-full">
                <motion.div
                  initial={reduceMotion ? false : { scale: 1.04, opacity: 0.85 }}
                  animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  transition={reduceMotion ? undefined : { duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1830]/65 via-[#0c1830]/10 to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none z-20" />

                  <ImageWebp
                    srcWebp={heroImage.webp}
                    src={heroImage.img}
                    alt={t(`${NS}.images.heroAlt`)}
                    className="absolute inset-0 w-full h-full object-cover !rounded-none"
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </header>

        {hasLongFormContent ? (
          <ItalianLongFormBody
            NS={NS}
            t={t}
            serviceKey={serviceKey}
            V={V}
            reduceMotion={reduceMotion}
            handleScrollToContact={handleScrollToContact}
          />
        ) : (
        <>
        <section className="w-full bg-[#f5f7fa] py-[54px] border-b border-[#e7ebf0]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div variants={V.fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
              <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.8] mb-[30px] text-center max-w-[980px] mx-auto">
                {t(`${NS}.overview.paragraph`)}
              </p>

              <div className="flex flex-wrap justify-center gap-[14px]">
                {[0, 1, 2].map((idx) => (
                  <motion.div
                    key={idx}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    transition={reduceMotion ? undefined : { duration: 0.18 }}
                    className="group inline-flex items-center px-[22px] py-[12px] bg-white border border-[#e0e6ee] rounded-[0] shadow-sm hover:shadow-md hover:border-[#d7deea]"
                  >
                    <span className="w-[8px] h-[8px] bg-[#ff8a00] mr-[10px] transition-transform duration-200 group-hover:scale-[1.15]" />
                    <span className="font-['Open_Sans'] text-[#1b3155] text-[15px] font-[700]">{t(`${NS}.overview.chips.${idx}`)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full bg-white py-[76px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div variants={V.stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }} className="grid grid-cols-1 md:grid-cols-2 gap-[26px]">
              <motion.article
                variants={V.card}
                className="bg-white border border-[#e0e6ee] p-[32px] rounded-[0] shadow-sm h-full flex flex-col relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-[80px] -right-[80px] w-[220px] h-[220px] bg-[#28509E]/10 blur-2xl rounded-full" />
                <div className="flex items-center gap-[16px] mb-[18px] relative">
                  <div className="w-[52px] h-[52px] flex items-center justify-center bg-[#28509E] rounded-[0] flex-shrink-0 shadow-sm">
                    <svg className="w-[28px] h-[28px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] font-[800] uppercase leading-[1.1]">
                    {t(`${NS}.sections.typicalApplications.title`)}
                  </h2>
                </div>

                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.8] mb-[18px]">
                  {t(`${NS}.sections.typicalApplications.intro`)}
                </p>

                <ul className="list-disc pl-[24px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.8] space-y-[8px] flex-1">
                  {[0, 1, 2, 3].map((idx) => (
                    <li key={idx} className="marker:text-[#28509E]">
                      {t(`${NS}.sections.typicalApplications.bullets.${idx}`)}
                    </li>
                  ))}
                </ul>

                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.8] mt-[18px]">
                  {t(`${NS}.sections.typicalApplications.closing`)}
                </p>
              </motion.article>

              <motion.article
                variants={V.card}
                className="bg-white border border-[#e0e6ee] p-[32px] rounded-[0] shadow-sm h-full flex flex-col relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="absolute -bottom-[90px] -left-[90px] w-[260px] h-[260px] bg-[#ff8a00]/10 blur-2xl rounded-full" />
                <div className="flex items-center gap-[16px] mb-[18px] relative">
                  <div className="w-[52px] h-[52px] flex items-center justify-center bg-[#28509E] rounded-[0] flex-shrink-0 shadow-sm">
                    <svg className="w-[28px] h-[28px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] font-[800] uppercase leading-[1.1]">
                    {t(`${NS}.sections.urbanConstraints.title`)}
                  </h2>
                </div>

                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.8] mb-[14px]">
                  {t(`${NS}.sections.urbanConstraints.intro`)}
                </p>

                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.8] mb-[14px] font-[700] text-[#1b3155]">
                  {t(`${NS}.sections.urbanConstraints.leadIn`)}
                </p>

                <ul className="list-disc pl-[24px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.8] space-y-[8px] flex-1">
                  {[0, 1, 2, 3].map((idx) => (
                    <li key={idx} className="marker:text-[#28509E]">
                      {t(`${NS}.sections.urbanConstraints.bullets.${idx}`)}
                    </li>
                  ))}
                </ul>

                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.8] mt-[18px]">
                  {t(`${NS}.sections.urbanConstraints.closing`)}
                </p>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <section className="w-full bg-[#f5f7fa] py-[76px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div variants={V.fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }}>
              <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[44px] font-[900] uppercase text-center mb-[44px]">
                {t(`${NS}.sections.engineeringApproach.title`)}
              </h2>

              <p className="sr-only">{t(`${NS}.sections.engineeringApproach.intro`)}</p>

              <motion.div
                variants={V.stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[26px]"
              >
                {[0, 1, 2, 3].map((idx, index) => (
                  <motion.div
                    key={idx}
                    variants={V.card}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={reduceMotion ? undefined : { duration: 0.18 }}
                    className="bg-white border border-[#e0e6ee] p-[28px] rounded-[0] shadow-sm relative overflow-hidden hover:shadow-lg hover:border-[#d7deea] transition"
                  >
                    <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
                    <div className="flex items-center gap-[14px] mb-[14px]">
                      <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#28509E] text-white font-[Rajdhani] font-[900] text-[20px] rounded-[0] flex-shrink-0 shadow-sm">
                        {index + 1}
                      </div>
                      <div className="h-[1px] flex-1 bg-[#e7ebf0]" />
                    </div>

                    <p className="font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.8]">
                      {t(`${NS}.sections.engineeringApproach.bullets.${idx}`)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <p className="sr-only">{t(`${NS}.sections.engineeringApproach.closing`)}</p>
            </motion.div>
          </div>
        </section>

        <section className="w-full bg-white py-[76px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div
              variants={V.stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] items-stretch"
            >
              <motion.div variants={V.card} className="h-full">
                <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[44px] font-[900] uppercase mb-[18px]">
                  {t(`${NS}.sections.safetyCoordination.title`)}
                </h2>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.85] mb-[18px]">
                  {t(`${NS}.sections.safetyCoordination.intro`)}
                </p>
                <p className="font-['Open_Sans'] text-[#1b3155] text-[16px] leading-[1.85] mb-[16px] font-[800]">
                  {t(`${NS}.sections.safetyCoordination.leadIn`)}
                </p>
                <ul className="list-disc pl-[24px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.85] space-y-[8px]">
                  {[0, 1, 2, 3].map((idx) => (
                    <li key={idx} className="marker:text-[#28509E]">
                      {t(`${NS}.sections.safetyCoordination.bullets.${idx}`)}
                    </li>
                  ))}
                </ul>
                <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.85] mt-[18px]">
                  {t(`${NS}.sections.safetyCoordination.closing`)}
                </p>
              </motion.div>

              <motion.aside
                variants={V.card}
                className="h-full min-h-[320px] lg:min-h-0 border border-[#e0e6ee] shadow-sm rounded-[0] relative overflow-hidden bg-[#0c1830]"
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={reduceMotion ? undefined : { duration: 0.18 }}
                aria-label={t(`${NS}.images.safetyAlt`)}
              >
                <img
                  src={safetyImage.img}
                  alt={t(`${NS}.images.safetyAlt`)}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-[#28509E]/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1830]/10 via-transparent to-[#0c1830]/35 z-20" />
                <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none z-30" />
              </motion.aside>
            </motion.div>
          </div>
        </section>

        <section className="w-full bg-[#f5f7fa] py-[76px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div variants={V.fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }}>
              <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[44px] font-[900] uppercase text-center mb-[16px]">
                {t(`${NS}.sections.whyMatters.title`)}
              </h2>

              <p className="sr-only">{t(`${NS}.sections.whyMatters.intro`)}</p>

              <div className="bg-white border border-[#e0e6ee] p-[36px] md:p-[48px] rounded-[0] shadow-sm max-w-[980px] mx-auto mb-[26px] relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r from-[#28509E] to-[#ff8a00]" />
                <ul className="space-y-[18px] relative">
                  {[0, 1, 2].map((idx) => (
                    <li key={idx} className="flex items-start gap-[14px]">
                      <div className="w-[10px] h-[10px] bg-[#28509E] mt-[10px] flex-shrink-0" />
                      <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[17px] leading-[1.85]">
                        <span className="font-[800] text-[#1b3155]">{t(`${NS}.sections.whyMatters.bullets.${idx}`)}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="sr-only">{t(`${NS}.sections.whyMatters.closing`)}</p>
            </motion.div>
          </div>
        </section>

        <section className="w-full bg-white py-[76px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <motion.div variants={V.fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }}>
              <h2 className="font-[Rajdhani] text-[#1b3155] text-[36px] md:text-[44px] font-[900] uppercase text-center mb-[16px]">
                {t(`${NS}.sections.locationCoverage.title`)}
              </h2>
              <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] md:text-[18px] leading-[1.85] mb-[0] text-center max-w-[980px] mx-auto">
                {t(`${NS}.sections.locationCoverage.text`)}
              </p>
            </motion.div>
          </div>
        </section>
        </>
        )}

        <section className="w-full bg-gradient-to-r from-[#28509E] to-[#1b3155] py-[84px] text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
            <div className="absolute -top-[120px] left-[10%] w-[320px] h-[320px] bg-white/25 blur-3xl rounded-full" />
            <div className="absolute -bottom-[150px] right-[8%] w-[360px] h-[360px] bg-white/20 blur-3xl rounded-full" />
          </div>

          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] text-center relative">
            <motion.div variants={V.stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <motion.h2 variants={V.fadeUp} className="font-[Rajdhani] text-white text-[36px] md:text-[52px] font-[900] uppercase mb-[18px]">
                {t(`${NS}.cta.title`)}
              </motion.h2>

              <motion.p variants={V.fadeUp} className="font-['Open_Sans'] text-white/90 text-[18px] md:text-[20px] leading-[1.85] mb-[12px] max-w-[860px] mx-auto">
                {t(`${NS}.cta.text1`)}
              </motion.p>

              <motion.p variants={V.fadeUp} className="font-['Open_Sans'] text-white/90 text-[18px] md:text-[20px] leading-[1.85] mb-[34px] max-w-[860px] mx-auto">
                {t(`${NS}.cta.text2`)}
              </motion.p>

              <motion.div variants={V.fadeUp} className="flex justify-center">
                <motion.button
                  type="button"
                  onClick={handleScrollToContact}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={reduceMotion ? undefined : { duration: 0.18 }}
                  className="group inline-flex items-center justify-center px-[44px] py-[18px] bg-[#ff8a00] text-white font-[Rajdhani] font-[900] text-[18px] uppercase rounded-[0] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#28509E] cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.22)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.28)]"
                  aria-label={t(`${NS}.cta.buttonAria`)}
                >
                  <span className="relative">
                    {t(`${NS}.cta.buttonText`)}
                    <span className="absolute left-0 -bottom-[6px] h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </>
  )
}

export default SingleService
