// Frontend/src/pages/Projects.js
import React, { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import ProjectCard from "../components/projects/ProjectCard"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang } from "../utils/langRouting"

const Projects = () => {
  const { t, i18n } = useTranslation()
  const NS = "projectsPage"
  const location = useLocation()
  const { urlLang } = useLangRouter()

  const base = process.env.PUBLIC_URL || ""

  const effectiveLang = urlLang || i18n.language || "en"

  const langPath = (path) => buildPathWithLang(effectiveLang, path)

  const isArabic = String(effectiveLang).toLowerCase().startsWith("ar")

  const projects = useMemo(
    () => [
      {
        id: "aishti-mall",
        key: "aishtiMall",
        img: `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/Home Banner 5.JPG`,
      },
      {
        id: "beirut-business-center",
        key: "beirutBusinessCenter",
        img: `${base}/assets/workDone/BEIRUT BUSINESS CENTER - SEN EL FIL/SDC17897.JPG`,
      },
      {
        id: "hotel-le-gray",
        key: "hotelLeGray",
        img: `${base}/assets/workDone/HOTEL LE GRAY/IMG_2186.JPG`,
      },
    ],
    [base]
  )

  const heroBg = `${base}/assets/workDone/AISHTI MALL - JAL EL DIB/edit.JPG`
  const heroStyle = useMemo(() => ({ backgroundImage: `url("${heroBg}")` }), [heroBg])

  return (
    <main className="bg-[#f5f7fb] text-[#1b3155]">
      <SEO title={t(`${NS}.seo.title`)} description={t(`${NS}.seo.description`)} canonical={t(`${NS}.seo.canonical`)} />

      <section className="relative bg-no-repeat bg-cover bg-center overflow-hidden">
        <div
          className={`absolute inset-0 ${isArabic ? "scale-x-[-1] origin-center" : ""}`}
          style={heroStyle}
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-0 bg-[rgba(0,35,90,0.55)] backdrop-brightness-[0.9]" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`relative z-10 w-full h-full flex flex-col justify-center
                     pt-[110px] pb-[200px] md:pt-[130px] md:pb-[240px]
                     pl-[20px] md:pl-[70px] pr-[20px]
                     ${isArabic ? "text-right md:pr-[70px] md:pl-[20px]" : "text-left"}`}
        >
          <h1 className="font-[Rajdhani] text-white text-h1 font-[700] uppercase mb-[12px]">{t(`${NS}.hero.title`)}</h1>

          <p className={`text-white/90 font-['Open_Sans'] text-body leading-[1.7] max-w-[650px] ${isArabic ? "ml-auto" : ""}`}>
            {t(`${NS}.hero.description`)}
          </p>

          <div className={`mt-[28px] ${isArabic ? "flex justify-start" : ""}`}>
            <a
              href={t(`${NS}.hero.whatsapp.href`)}
              target="_blank"
              rel="noreferrer"
              aria-label={t(`${NS}.hero.whatsapp.ariaLabel`)}
              className="inline-flex w-fit px-[28px] sm:px-[34px]
                         text-[12px] md:text-[15px]
                         text-white font-[Rajdhani] font-[700] leading-[29px]
                         py-[15px]
                         bg-[#28509E] rounded-[12px] uppercase
                         hover:bg-[#25D366]
                         border-[#FFF] hover:border-[#25D366]
                         border-solid border-2
                         transition duration-500 heroBtn"
            >
              {t(`${NS}.hero.whatsapp.label`)}
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-[50px] md:py-[70px]">
        <div className="w-[90%] max-w-[1400px] mx-auto px-[20px]">
          <h2 className="text-center font-[Rajdhani] text-[#003A80] text-[36px] md:text-[42px] font-[700] uppercase leading-[1.2] mb-[50px]">
            {t(`${NS}.section.allProjectsTitle`)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} langPath={langPath} baseUrl={base} t={t} NS={NS} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Projects
