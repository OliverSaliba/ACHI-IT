import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useLangRouter } from "../routing/LangRouter"

const HERO_VIDEO_ITALY = "WhatsApp Video 2026-02-04 at 2.53.05 PM.mp4"

const Hero = ({ showMenu, setshowMenu, direction, userLang }) => {
  const { t } = useTranslation()
  const { urlLang } = useLangRouter()

  const heroTitle = t("home.hero.title")
  const heroSubtitle = t("home.hero.subtitle")
  const heroCta = t("home.hero.ctaSupport")
  const title = heroTitle === "home.hero.title" ? t("banner1.title") : heroTitle
  const subtitle = heroSubtitle === "home.hero.subtitle" ? t("banner1.subtitle") : heroSubtitle
  const ctaLabel = heroCta === "home.hero.ctaSupport" ? t("banner1.button") : heroCta

  const isItalian = urlLang === "it"
  const base = process.env.PUBLIC_URL || ""
  const videoSrc = `${base}/assets/${encodeURIComponent(HERO_VIDEO_ITALY)}`

  const panelBase =
    "flex flex-col ltr:ml-[20px] rtl:mr-[20px] max-w-[650px] sm:max-w-[720px] ltr:2xl:ml-[100px] ltr:xl:ml-[80px] ltr:lg:ml-[60px] ltr:md:ml-[40px] ltr:sm:ml-[20px] rtl:2xl:mr-[100px] rtl:xl:mr-[80px] rtl:lg:mr-[60px] rtl:md:mr-[40px] rtl:sm:mr-[20px] heroPanel"
  const panelSlide1 = `${panelBase} mt-[0px]`

  return (
    <div id="hero">
      <div
        className="relative min-h-[800px] md:min-h-[700px] flex items-center overflow-hidden"
        dir={direction}
      >
        {isItalian ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-firstSlideBg bg-no-repeat bg-cover bg-center"
            aria-hidden="true"
          />
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className={`${panelSlide1} relative z-10`}
        >
          <h2 className="font-[Rajdhani] uppercase text-white text-h2 font-[700] leading-[1.15] mb-[24px]">
            {title}
          </h2>

          <p className="text-body font-[400] text-white font-saira mb-[30px] leading-[26px]">
            {subtitle}
          </p>

          <a
            href="https://wa.me/+96103322811"
            target="_blank"
            rel="noreferrer"
            className="self-start inline-flex justify-center items-center px-[16px] py-[12px] text-[11px] 2xl:text-[13px] xl:text-[13px] lg:text-[13px] md:text-[13px] sm:text-[13px] text-white font-saira font-[700] leading-[26px] bg-[#28509E] rounded-[12px] uppercase hover:bg-[#25D366] border-[#FFF] hover:border-[#25D366] border-solid border-2 transition duration-500 heroBtn whitespace-nowrap"
          >
            {ctaLabel}
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero;
