// src/components/services/ServiceSection.js
import React, { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import ImageWebp from "../ImageWebp"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useLangRouter } from "../../routing/LangRouter"
import { buildPathWithLang } from "../../utils/langRouting"

const SERVICE_ITEMS_LEBANON = (ASSET) => [
  {
    id: "facade-scaffolding",
    titleKey: "homeServicesOverview.items.facade.title",
    altKey: "homeServicesOverview.items.facade.alt",
    img: `${ASSET}/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png`,
    to: "/services/facade-scaffolding",
  },
  {
    id: "suspended-scaffolding",
    titleKey: "homeServicesOverview.items.suspended.title",
    altKey: "homeServicesOverview.items.suspended.alt",
    img: `${ASSET}/assets/services/Suspended scaffolding 1 2(1).png`,
    to: "/services/suspended-scaffolding",
  },
  {
    id: "propping-shoring",
    titleKey: "homeServicesOverview.items.proppingShoring.title",
    altKey: "homeServicesOverview.items.proppingShoring.alt",
    img: `${ASSET}/assets/services/SDC14429(1).png`,
    to: "/services/propping-shoring",
  },
  {
    id: "adjustable-props",
    titleKey: "homeServicesOverview.items.adjustableProps.title",
    altKey: "homeServicesOverview.items.adjustableProps.alt",
    img: `${ASSET}/assets/services/20819369_135108873765021_8187137705964148355_o (1) 2(1).png`,
    to: "/services/adjustable-props",
  },
  {
    id: "high-capacity",
    titleKey: "homeServicesOverview.items.highCapacity.title",
    altKey: "homeServicesOverview.items.highCapacity.alt",
    img: `${ASSET}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
    to: "/services/high-capacity-structures",
  },
  {
    id: "event-scaffolding",
    titleKey: "homeServicesOverview.items.eventScaffolding.title",
    altKey: "homeServicesOverview.items.eventScaffolding.alt",
    img: `${ASSET}/assets/services/eventScaffolding.jpeg`,
    to: "/services/event-scaffolding",
  },
]

const ITALIAN_CARD_IDS = ["manodopera", "noleggioCaldo", "sospesi"]

const ServiceSection = () => {
  const { t } = useTranslation()
  const { urlLang } = useLangRouter()
  const reduceMotion = useReducedMotion()
  const ASSET = process.env.PUBLIC_URL || ""

  const isItalian = urlLang === "it"

  const servicesListIt = useMemo(() => {
    if (!isItalian) return []
    const raw = t("home.services.listIt", { returnObjects: true })
    return Array.isArray(raw) ? raw : []
  }, [isItalian, t])

  const services = useMemo(() => {
    if (isItalian && servicesListIt.length > 0) {
      return servicesListIt.map((item, idx) => ({
        id: `it-${idx}`,
        title: typeof item === "object" && item !== null && "title" in item ? item.title : String(item),
        slug: typeof item === "object" && item !== null && "slug" in item ? item.slug : "/services",
      }))
    }
    if (isItalian) {
      return ITALIAN_CARD_IDS.map((id) => ({
        id,
        titleKey: `home.services.cards.${id}.title`,
        altKey: `home.services.cards.${id}.alt`,
        toKey: `home.services.cards.${id}.href`,
        img: `${ASSET}/assets/services/361641065_768035905323121_6701313797518833287_n 2(2).png`,
      }))
    }
    return SERVICE_ITEMS_LEBANON(ASSET)
  }, [isItalian, servicesListIt, ASSET])

  const isItalianGrid = isItalian && servicesListIt.length > 0

  const containerVariants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  }

  const cardVariants = {
    hidden: reduceMotion
      ? {}
      : { opacity: 0, y: 24, scale: 0.96 },
    show: reduceMotion
      ? {}
      : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <section id="services" aria-labelledby="home-services-title">
      <header className="px-[20px] sm:px-[20px] lg:px-[50px]">
        <motion.h2
          id="home-services-title"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-h2 font-[Rajdhani] font-[700] uppercase mb-[40px] text-[#003A80] my-[30px] lg:mt-[30px] lg:mb-[50px]"
        >
          {t("nav.services")}
        </motion.h2>
      </header>

      {isItalianGrid ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] lg:gap-[24px] px-[20px] sm:px-[20px] lg:px-[50px] mb-[40px]"
        >
          {services.map((s) => (
            <motion.div key={s.id} variants={cardVariants} className="h-full">
              <Link
                to={buildPathWithLang(urlLang, s.slug)}
                className="service-card-futuristic focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28509E] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-labelledby={`service-title-${s.id}`}
              >
                <div className="relative z-10 px-[20px] py-[22px] min-h-[120px] flex flex-col justify-between">
                  <h3
                    id={`service-title-${s.id}`}
                    className="service-card-title text-[17px] sm:text-[18px] font-saira font-[700] leading-[1.35] text-[#1b3155] mb-[12px]"
                  >
                    {s.title}
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
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-fr gap-[24px] justify-items-stretch lg:px-[50px] sm:px-[20px] px-[20px] mb-[40px]"
        >
          {services.map((s) => (
            <Link
              key={s.id}
              to={buildPathWithLang(urlLang, s.toKey ? t(s.toKey) : s.to)}
              className="relative flex group/parent bg-transparent text-left items-start flex-col w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
              style={{ borderRadius: 0 }}
              aria-labelledby={`${s.id}-title`}
            >
              <div className="relative group w-full overflow-hidden" style={{ borderRadius: 0 }}>
                <ImageWebp
                  srcWebp={s.img}
                  src={s.img}
                  className="object-cover w-full block h-[220px] md:h-[280px] lg:h-[300px] xl:h-[320px]"
                  style={{ borderRadius: 0, objectFit: "cover", width: "100%" }}
                  alt={t(s.altKey)}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="w-full pt-[12px] text-left">
                <h3
                  id={`${s.id}-title`}
                  className="text-[22px] font-saira font-[900] sm:font-[900] md:font-[900] lg:font-[800] xl:font-[800] 2xl:font-[800] leading-[1.4] text-[#28509E] mt-[0px] mb-[0px] capitalize inline-block border-b-[2px] border-[#28509E] pb-[6px]"
                >
                  {t(s.titleKey)}
                </h3>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      <div className="w-full text-center mt-[-15px] md:mt-[20px] lg:mt-[30px] mb-[80px]">
        <Link
          to={buildPathWithLang(urlLang, "/services")}
          className="group inline-flex items-center justify-center gap-[8px] text-small md:text-body text-white font-saira font-[700] px-[32px] py-[14px] bg-[#003A80] rounded-[8px] hover:bg-[#28509E] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28509E] focus-visible:ring-offset-2"
          aria-label={isItalian ? t("home.services.cardsCta") : t("homeServicesOverview.viewAll")}
        >
          {isItalian ? t("home.services.cardsCta") : t("homeServicesOverview.viewAll")}
          <svg className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default ServiceSection
