// Frontend/src/components/SectorsBar.js
import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { sectors } from "../data/sectors"
import SmartLink from "../seo/SmartLink"

const ACCENT = "#28509E"

const SectorsBar = () => {
  const { t, i18n } = useTranslation()
  const isItalian = String(i18n.resolvedLanguage || i18n.language || "").toLowerCase().startsWith("it")

  const NS = "homeSectors"

  const getTitle = (sector) => t(`${NS}.items.${sector.key}.title`)

  const getAriaLabel = (sector) => t(`${NS}.items.${sector.key}.ariaLabel`, { title: getTitle(sector) })
  const getTitleAttr = (sector) => t(`${NS}.items.${sector.key}.titleAttr`, { title: getTitle(sector) })

  // Innovative layout for Italian home: bento grid, accent borders, refined typography
  if (isItalian) {
    return (
      <section
        id="sectors-bar"
        className="relative py-[80px] md:py-[100px] overflow-hidden"
        aria-labelledby="sectors-bar-title"
        style={{
          background: `linear-gradient(165deg, #eef4fc 0%, #f8fafc 45%, #ffffff 100%)`,
          backgroundAttachment: "scroll"
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }}
        />

        <div className="relative w-[90%] max-w-[1200px] mx-auto px-0">
          <motion.header
            className="text-center mb-[48px] md:mb-[56px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              id="sectors-bar-title"
              className="font-[Rajdhani] text-[28px] md:text-[38px] lg:text-[42px] font-[700] uppercase tracking-tight text-[#1a1a1a] mb-[12px]"
            >
              {t(`${NS}.title`)}
            </h2>
            <div
              className="w-[64px] h-[4px] mx-auto"
              style={{ backgroundColor: ACCENT }}
            />
          </motion.header>

          <p className="sr-only">{t(`${NS}.srDescription`)}</p>

          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[24px] list-none p-0 m-0"
            aria-label={t(`${NS}.listAriaLabel`)}
            dir="ltr"
          >
            {sectors.map((sector, idx) => (
              <motion.li
                key={sector.key || idx}
                className={`list-none ${idx === 0 ? "sm:col-span-2" : ""}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4) }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <SmartLink
                  to="/sectors"
                  className="group block h-full bg-white border-0 rounded-none p-[24px] md:p-[28px] flex flex-col focus:outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-2 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(40,80,158,0.12)] active:translate-y-0 border-l-4 border-l-[#28509E] shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  aria-label={getAriaLabel(sector)}
                  title={getTitleAttr(sector)}
                >
                  <div
                    className="mb-[16px] w-[52px] h-[52px] md:w-[56px] md:h-[56px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <i
                      className={`fa-solid ${sector.icon || "fa-building"} text-white text-[22px] md:text-[24px]`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-[Rajdhani] text-[#1a1a1a] text-[18px] md:text-[20px] font-[700] uppercase leading-[1.25] mt-auto transition-colors duration-300 group-hover:text-[#28509E]">
                    {getTitle(sector)}
                  </h3>
                </SmartLink>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  // Default layout (non-Italian)
  return (
    <section id="sectors-bar" className="py-[70px] bg-[#f5f7fb]" aria-labelledby="sectors-bar-title">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <motion.h2
          id="sectors-bar-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-[Rajdhani] text-h2 font-[700] uppercase mb-[40px] text-[#003A80] text-center"
        >
          {t(`${NS}.title`)}
        </motion.h2>

        <p className="sr-only">{t(`${NS}.srDescription`)}</p>

        <div className="relative md:overflow-visible overflow-x-auto scrollbar-hide pb-[10px] md:pb-0 -mx-[20px] md:mx-0 px-[20px] md:px-0">
          <ul className="flex flex-nowrap gap-[16px] lg:gap-[20px]" aria-label={t(`${NS}.listAriaLabel`)} dir="ltr">
            {sectors.map((sector, idx) => (
              <motion.li
                key={sector.key || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[160px] md:flex-1 md:min-w-0 list-none"
              >
                <SmartLink
                  to="/sectors"
                  className="group block bg-white rounded-[0] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[24px] md:p-[28px] h-full flex flex-col items-center text-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-[4px] active:scale-[0.98] md:active:scale-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#214f9b] focus:ring-offset-2"
                  aria-label={getAriaLabel(sector)}
                  title={getTitleAttr(sector)}
                >
                  <div className="mb-[12px] md:mb-[16px] w-[56px] h-[56px] md:w-[64px] md:h-[64px] flex items-center justify-center flex-shrink-0">
                    <i
                      className={`fa-solid ${sector.icon || "fa-building"} text-[#214f9b] text-[36px] md:text-[40px] group-hover:text-[#ff8e26] group-hover:scale-110 transition-all duration-300`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-[Rajdhani] text-[#214f9b] text-h6 md:text-h5 lg:text-h4 font-[600] uppercase leading-[1.3] group-hover:text-[#ff8e26] transition-colors duration-300">
                    {getTitle(sector)}
                  </h3>
                </SmartLink>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SectorsBar
