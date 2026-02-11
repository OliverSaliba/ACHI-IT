// Frontend/src/pages/PrivacyPolicy.js
import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang } from "../utils/langRouting"

const PrivacyPolicy = () => {
  const { t } = useTranslation()
  const { urlLang } = useLangRouter()

  const canonicalUrl = `https://achiscaffolding.com${buildPathWithLang(urlLang, "/privacy-policy")}`

  const sections = useMemo(
    () => [
      { id: "introduction", key: "introduction" },
      { id: "information-collected", key: "informationCollected" },
      { id: "how-we-use", key: "howWeUse" },
      { id: "third-party", key: "thirdParty" },
      { id: "data-retention", key: "dataRetention" },
      { id: "your-rights", key: "yourRights" },
      { id: "cookies", key: "cookies" },
      { id: "contact-us", key: "contactUs" },
    ],
    []
  )

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <main className="bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] min-h-screen">
      <SEO title={t("privacy.seo.title")} description={t("privacy.seo.description")} canonical={canonicalUrl} />

      {/* Hero Section with Modern Gradient */}
      <div className="relative bg-[rgb(40,80,158)] pt-[80px] md:pt-[100px] pb-[60px] md:pb-[80px] overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ff8e26] rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-[1000px] mx-auto px-[20px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Icon Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-[80px] h-[80px] bg-white/10 backdrop-blur-md mb-[24px] border border-white/20"
            >
              <i className="fa-solid fa-shield-halved text-[36px] text-white" aria-hidden="true"></i>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-[Rajdhani] text-[42px] md:text-[56px] lg:text-[64px] font-[700] uppercase text-white leading-[1.1] mb-[16px]"
            >
              {t("privacy.title")}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-[10px] bg-white/10 backdrop-blur-md px-[12px] py-[6px] border border-white/20 mx-auto"
            >
              <i className="fa-regular fa-calendar text-white/80 text-[14px] flex-shrink-0" aria-hidden="true"></i>
              <span className="font-['Open_Sans'] text-[14px] md:text-[15px] text-white/90 font-[500]">
                {t("privacy.lastUpdated.label")}: {t("privacy.lastUpdated.value")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-[20px] py-[60px] md:py-[80px]">
        {/* Table of Contents - Modern Card Design */}
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          aria-label={t("privacy.toc.ariaLabel")}
          className="relative bg-white p-[32px] md:p-[40px] shadow-[0_20px_60px_rgba(0,58,128,0.08)] mb-[60px] md:mb-[80px] border border-[#e2e8f0]"
        >
          {/* Decorative gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#28509E] via-[#3a6bb8] to-[#4a7ec9] overflow-hidden" />
          
          <div className="mb-[28px]">
            <div className="flex items-center gap-[12px]">
              <div className="flex items-center justify-center w-[48px] h-[48px] bg-gradient-to-br from-[#28509E] to-[#3a6bb8] flex-shrink-0">
                <i className="fa-solid fa-list-ul text-[20px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[26px] md:text-[30px] font-[700] uppercase text-[#28509E]">
                {t("privacy.toc.title")}
              </h2>
            </div>
          </div>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            {sections.map((section, index) => (
              <motion.li
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="group w-full min-w-0 text-left flex items-center gap-[14px] p-[16px] bg-gradient-to-br from-[#28509E] to-[#3a6bb8] hover:bg-white/20 hover:backdrop-blur-xl border border-[#28509E]/30 hover:border-white/40 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#28509E]"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-[32px] h-[32px] bg-white/20 backdrop-blur-md group-hover:bg-white/30 group-hover:backdrop-blur-xl group-hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)] border border-white/30 group-hover:border-white/50 font-[Rajdhani] font-[700] text-[15px] text-white transition-all duration-300">
                    {index + 1}
                  </div>
                  <span className="min-w-0 font-['Open_Sans'] text-[15px] md:text-[16px] text-white group-hover:text-white font-[500] transition-colors duration-300">
                    {t(`privacy.sections.${section.key}.title`)}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Section: Introduction */}
        <motion.section
          id="introduction"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#28509E] to-[#3a6bb8] shadow-[0_8px_20px_rgba(40,80,158,0.2)] flex-shrink-0">
                <i className="fa-solid fa-info-circle text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.introduction.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.introduction.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px] last:mb-0"
            >
              {para}
            </p>
          ))}
        </motion.section>

        {/* Section: Information We Collect */}
        <motion.section
          id="information-collected"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#3a6bb8] to-[#28509E] shadow-[0_8px_20px_rgba(40,80,158,0.2)] flex-shrink-0">
                <i className="fa-solid fa-database text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.informationCollected.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.informationCollected.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px]"
            >
              {para}
            </p>
          ))}
          <ul className="space-y-[14px] mt-[24px]">
            {t("privacy.sections.informationCollected.items", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start gap-[12px] p-[16px] bg-gradient-to-r from-[#f8fafc] to-transparent border-l-4 border-[#28509E]">
                <i className="fa-solid fa-check-circle text-[18px] text-[#28509E] mt-[2px] flex-shrink-0" aria-hidden="true"></i>
                <span className="font-['Open_Sans'] text-[15px] md:text-[16px] text-[#4a5c7a] leading-[1.7]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Section: How We Use Your Information */}
        <motion.section
          id="how-we-use"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#3a6bb8] to-[#4a7ec9] shadow-[0_8px_20px_rgba(40,80,158,0.2)] flex-shrink-0">
                <i className="fa-solid fa-gears text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.howWeUse.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.howWeUse.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px]"
            >
              {para}
            </p>
          ))}
          <ul className="space-y-[14px] mt-[24px]">
            {t("privacy.sections.howWeUse.items", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start gap-[12px] p-[16px] bg-gradient-to-r from-[#f8fafc] to-transparent border-l-4 border-[#28509E]">
                <i className="fa-solid fa-arrow-right text-[16px] text-[#28509E] mt-[3px] flex-shrink-0" aria-hidden="true"></i>
                <span className="font-['Open_Sans'] text-[15px] md:text-[16px] text-[#4a5c7a] leading-[1.7]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Section: Third-Party Services */}
        <motion.section
          id="third-party"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#ff8e26] to-[#ff6b00] shadow-[0_8px_20px_rgba(255,142,38,0.2)] flex-shrink-0">
                <i className="fa-solid fa-link text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.thirdParty.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.thirdParty.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px]"
            >
              {para}
            </p>
          ))}
          <ul className="space-y-[14px] mt-[24px]">
            {t("privacy.sections.thirdParty.items", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start gap-[12px] p-[16px] bg-gradient-to-r from-[#fff5eb] to-transparent border-l-4 border-[#ff8e26]">
                <i className="fa-solid fa-share-nodes text-[16px] text-[#ff8e26] mt-[3px] flex-shrink-0" aria-hidden="true"></i>
                <span className="font-['Open_Sans'] text-[15px] md:text-[16px] text-[#4a5c7a] leading-[1.7]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Section: Data Retention */}
        <motion.section
          id="data-retention"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] shadow-[0_8px_20px_rgba(14,165,233,0.2)] flex-shrink-0">
                <i className="fa-solid fa-clock text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.dataRetention.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.dataRetention.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px] last:mb-0"
            >
              {para}
            </p>
          ))}
        </motion.section>

        {/* Section: Your Rights */}
        <motion.section
          id="your-rights"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#22c55e] to-[#16a34a] shadow-[0_8px_20px_rgba(34,197,94,0.2)] flex-shrink-0">
                <i className="fa-solid fa-user-shield text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.yourRights.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.yourRights.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px]"
            >
              {para}
            </p>
          ))}
          <ul className="space-y-[14px] mt-[24px]">
            {t("privacy.sections.yourRights.items", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start gap-[12px] p-[16px] bg-gradient-to-r from-[#f0fdf4] to-transparent border-l-4 border-[#22c55e]">
                <i className="fa-solid fa-shield-check text-[16px] text-[#22c55e] mt-[3px] flex-shrink-0" aria-hidden="true"></i>
                <span className="font-['Open_Sans'] text-[15px] md:text-[16px] text-[#4a5c7a] leading-[1.7]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Section: Cookies & Tracking */}
        <motion.section
          id="cookies"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#a855f7] to-[#9333ea] shadow-[0_8px_20px_rgba(168,85,247,0.2)] flex-shrink-0">
                <i className="fa-solid fa-cookie-bite text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.cookies.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.cookies.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px]"
            >
              {para}
            </p>
          ))}
          <ul className="space-y-[14px] mt-[24px]">
            {t("privacy.sections.cookies.items", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start gap-[12px] p-[16px] bg-gradient-to-r from-[#faf5ff] to-transparent border-l-4 border-[#a855f7]">
                <i className="fa-solid fa-cookie text-[16px] text-[#a855f7] mt-[3px] flex-shrink-0" aria-hidden="true"></i>
                <span className="font-['Open_Sans'] text-[15px] md:text-[16px] text-[#4a5c7a] leading-[1.7]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Section: Contact Us */}
        <motion.section
          id="contact-us"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[50px] md:mb-[60px] bg-white p-[28px] md:p-[36px] shadow-[0_12px_40px_rgba(0,58,128,0.06)] border border-[#e2e8f0] hover:shadow-[0_16px_50px_rgba(0,58,128,0.1)] transition-shadow duration-300"
        >
          <div className="mb-[24px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-[#f59e0b] to-[#d97706] shadow-[0_8px_20px_rgba(245,158,11,0.2)] flex-shrink-0">
                <i className="fa-solid fa-envelope text-[24px] text-white" aria-hidden="true"></i>
              </div>
              <h2 className="font-[Rajdhani] text-[30px] md:text-[36px] font-[700] uppercase text-[#28509E]">
                {t("privacy.sections.contactUs.title")}
              </h2>
            </div>
            <div className="mt-[18px] h-[2px] w-full bg-gradient-to-r from-[#28509E] to-transparent" />
          </div>
          {t("privacy.sections.contactUs.paragraphs", { returnObjects: true }).map((para, i) => (
            <p
              key={i}
              className="font-['Open_Sans'] text-[15px] md:text-[17px] text-[#4a5c7a] leading-[1.8] mb-[18px]"
            >
              {para}
            </p>
          ))}
          <div className="relative mt-[28px] bg-gradient-to-br from-[#28509E] to-[#3a6bb8] p-[28px] md:p-[32px] shadow-[0_16px_40px_rgba(40,80,158,0.15)] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#ff8e26]/10 rounded-full blur-[60px]" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <div className="flex items-start gap-[14px] p-[20px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center w-[40px] h-[40px] bg-white/20 flex-shrink-0">
                  <i className="fa-solid fa-envelope text-[18px] text-white" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="font-[Rajdhani] text-[14px] font-[600] uppercase text-white/80 mb-[4px]">
                    {t("privacy.sections.contactUs.emailLabel")}
                  </p>
                  <a
                    href={`mailto:${t("privacy.sections.contactUs.emailAddress")}`}
                    className="font-['Open_Sans'] text-[15px] md:text-[16px] text-white font-[500] hover:text-[#ff8e26] transition-colors duration-200 break-all"
                  >
                    {t("privacy.sections.contactUs.emailAddress")}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-[14px] p-[20px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center w-[40px] h-[40px] bg-white/20 flex-shrink-0">
                  <i className="fa-solid fa-phone text-[18px] text-white" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="font-[Rajdhani] text-[14px] font-[600] uppercase text-white/80 mb-[4px]">
                    {t("privacy.sections.contactUs.phoneLabel")}
                  </p>
                  <a
                    href={`tel:${t("privacy.sections.contactUs.phoneNumber")}`}
                    className="font-['Open_Sans'] text-[15px] md:text-[16px] text-white font-[500] hover:text-[#ff8e26] transition-colors duration-200"
                  >
                    {t("privacy.sections.contactUs.phoneNumber")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bottom notice - Modern Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#f8fafc] to-white p-[32px] md:p-[40px] border-2 border-[#e2e8f0] shadow-[0_8px_30px_rgba(0,58,128,0.04)] text-center overflow-hidden"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-[60px] h-[60px] border-t-4 border-l-4 border-[#28509E]" />
          <div className="absolute bottom-0 right-0 w-[60px] h-[60px] border-b-4 border-r-4 border-[#ff8e26]" />
          
          <div className="relative z-10 flex flex-col items-center gap-[16px]">
            <div className="flex items-center justify-center w-[56px] h-[56px] bg-gradient-to-br from-[#28509E] to-[#3a6bb8] shadow-[0_8px_20px_rgba(40,80,158,0.2)]">
              <i className="fa-solid fa-bell text-[24px] text-white" aria-hidden="true"></i>
            </div>
            <p className="font-['Open_Sans'] text-[15px] md:text-[16px] text-[#4a5c7a] leading-[1.8] max-w-[700px]">
              {t("privacy.footer.notice")}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default PrivacyPolicy
