// src/components/services/ServicesPageAllServices.js
import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import ImageWebp from "../ImageWebp"
import { useLangRouter } from "../../routing/LangRouter"
import { buildPathWithLang } from "../../utils/langRouting"

const LEBANON_SERVICE_KEYS = ["facades", "suspended", "proppingShoring", "adjustableProps", "highCapacity", "eventScaffolding"]

const ITALIAN_SERVICE_KEYS = [
  "manodopera",
  "ponteggiSospesi",
  "noleggioCaldo",
  "noleggioFreddo",
  "ponteggiFacciate",
  "ponteggiPonte",
  "impalcatureEventi",
  "coperturaSottotetto",
  "costruzioniSpeciali",
  "sicurezzaLavoro",
  "multidirezionali",
  "tradizionaliTelai",
  "tubiGiunti",
]

const SERVICES_LEBANON = [
  { key: "facades", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "suspended", imgWebp: "/assets/services/Suspended scaffolding 1 2(1).png", img: "/assets/services/Suspended scaffolding 1 2(1).png" },
  { key: "proppingShoring", imgWebp: "/assets/services/SDC14429(1).png", img: "/assets/services/SDC14429(1).png" },
  { key: "adjustableProps", imgWebp: "/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png", img: "/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png" },
  { key: "highCapacity", imgWebp: "/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG", img: "/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG" },
  { key: "eventScaffolding", imgWebp: "/assets/services/eventScaffolding.jpeg", img: "/assets/services/eventScaffolding.jpeg" }
]

const SERVICES_ITALY = [
  { key: "manodopera", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "ponteggiSospesi", imgWebp: "/assets/services/Suspended scaffolding 1 2(1).png", img: "/assets/services/Suspended scaffolding 1 2(1).png" },
  { key: "noleggioCaldo", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "noleggioFreddo", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "ponteggiFacciate", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "ponteggiPonte", imgWebp: "/assets/services/Suspended scaffolding 1 2(1).png", img: "/assets/services/Suspended scaffolding 1 2(1).png" },
  { key: "impalcatureEventi", imgWebp: "/assets/services/eventScaffolding.jpeg", img: "/assets/services/eventScaffolding.jpeg" },
  { key: "coperturaSottotetto", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "costruzioniSpeciali", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "sicurezzaLavoro", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "multidirezionali", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "tradizionaliTelai", imgWebp: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png", img: "/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png" },
  { key: "tubiGiunti", imgWebp: "/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png", img: "/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png" },
]

const LEBANON_KEY_TO_SLUG = {
  facades: "facade-scaffolding",
  suspended: "suspended-scaffolding",
  proppingShoring: "propping-shoring",
  adjustableProps: "adjustable-props",
  highCapacity: "high-capacity-structures",
  eventScaffolding: "event-scaffolding"
}

const ITALIAN_KEY_TO_SLUG = {
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

const ServicesPageAllServices = () => {
  const { t } = useTranslation()
  const { urlLang } = useLangRouter()
  const reduceMotion = useReducedMotion()
  const NS = "servicesPage.allServices"

  const isItalian = urlLang === "it"

  const servicesListIt = useMemo(() => {
    if (!isItalian) return []
    const raw = t("home.services.listIt", { returnObjects: true })
    return Array.isArray(raw) ? raw : []
  }, [isItalian, t])

  const isItalianFullList = isItalian && servicesListIt.length > 0

  const visibleServicesLebanon = useMemo(
    () => LEBANON_SERVICE_KEYS.map((k) => SERVICES_LEBANON.find((s) => s.key === k)).filter(Boolean),
    []
  )

  const containerVariants = {
    hidden: {},
    show: {
      transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.05, delayChildren: 0.06 },
    },
  }

  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 28, scale: 0.96 },
    show: reduceMotion ? {} : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  }

  if (isItalianFullList) {
    return (
      <section className="w-full bg-white py-[70px]" aria-labelledby="all-services-heading">
        <div className="max-w-[1250px] mx-auto px-[20px]">
          <motion.h2
            id="all-services-heading"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="font-[Rajdhani] text-[42px] font-[700] uppercase mb-[12px] text-[#003A80] text-center"
          >
            {t(`${NS}.title`)}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-[#4a5c7a] font-['Open_Sans'] text-[16px] leading-[1.7] max-w-[980px] mx-auto mt-[10px] mb-[40px]"
          >
            {t(`${NS}.description`)}
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] lg:gap-[24px]"
            role="list"
            aria-label={t(`${NS}.listAriaLabel`)}
          >
            {servicesListIt.map((item, idx) => {
              const title = typeof item === "object" && item !== null && "title" in item ? item.title : String(item)
              const slug = typeof item === "object" && item !== null && "slug" in item ? item.slug : "/services"
              const id = `it-svc-${idx}`

              return (
                <motion.div key={id} variants={cardVariants}>
                  <Link
                    to={buildPathWithLang(urlLang, slug)}
                    className="service-card-futuristic focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28509E] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    aria-labelledby={`service-page-title-${id}`}
                  >
                    <div className="relative z-10 px-[20px] py-[22px] min-h-[100px] flex flex-col justify-between">
                      <h3
                        id={`service-page-title-${id}`}
                        className="service-card-title text-[17px] sm:text-[18px] font-saira font-[700] leading-[1.35] text-[#1b3155] mb-[12px]"
                      >
                        {title}
                      </h3>
                      <span className="service-card-cta inline-flex items-center gap-[6px] text-[13px] font-saira font-[600] text-[#28509E]">
                        {t("home.services.cardsCta")}
                        <svg className="w-[14px] h-[14px] flex-shrink-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    )
  }

  const visibleServices = isItalian ? SERVICES_ITALY : visibleServicesLebanon
  if (!visibleServices.length) return null

  return (
    <section className="w-full bg-white py-[70px]" aria-labelledby="all-services-heading">
      <div className="max-w-[1250px] mx-auto px-[20px]">
        <h2
          id="all-services-heading"
          className="font-[Rajdhani] text-[42px] font-[700] uppercase mb-[12px] text-[#003A80] text-center"
        >
          {t(`${NS}.title`)}
        </h2>

        <p className="text-center text-[#4a5c7a] font-['Open_Sans'] text-[16px] leading-[1.7] max-w-[980px] mx-auto mt-[10px] mb-[35px]">
          {t(`${NS}.description`)}
        </p>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-fr gap-[24px]"
          role="list"
          aria-label={t(`${NS}.listAriaLabel`)}
        >
          {visibleServices.map((service) => {
            const title = isItalian
              ? t(`home.services.cards.${service.key}.title`)
              : t(`${NS}.items.${service.key}.title`)
            const imageAlt = isItalian
              ? t(`home.services.cards.${service.key}.alt`)
              : t(`${NS}.items.${service.key}.imageAlt`)
            const slug = isItalian ? ITALIAN_KEY_TO_SLUG[service.key] : (LEBANON_KEY_TO_SLUG[service.key] || "facade-scaffolding")
            const href = buildPathWithLang(urlLang, `/services/${slug}`)

            return (
              <Link
                key={service.key}
                to={href}
                className="relative flex group/parent bg-transparent text-left items-start flex-col w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
                style={{ borderRadius: 0 }}
                aria-label={title}
              >
                <div className="relative group w-full overflow-hidden aspect-square" style={{ borderRadius: 0 }}>
                  <ImageWebp
                    srcWebp={service.imgWebp}
                    src={service.img}
                    alt={imageAlt}
                    className="object-cover w-full h-full block"
                    style={{ borderRadius: 0, objectFit: "cover" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="w-full pt-[12px] text-left">
                  <h3 className="text-[22px] font-saira font-[900] sm:font-[900] md:font-[900] lg:font-[800] xl:font-[800] 2xl:font-[800] leading-[1.4] text-[#28509E] mt-[0px] mb-[0px] capitalize inline-block border-b-[2px] border-[#28509E] pb-[6px]">
                    {title}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesPageAllServices
