// src/components/projects/ProjectCard.js
import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { buildPathWithLang } from "../../utils/langRouting"
import { useLangRouter } from "../../routing/LangRouter"
import { useTranslation } from "react-i18next"

const ProjectCard = ({ project, baseUrl, t, NS }) => {
  const { urlLang } = useLangRouter()
  const { i18n } = useTranslation()

  const title = t(`${NS}.items.${project.key}.title`)
  const desc = t(`${NS}.items.${project.key}.desc`)
  const tags = t(`${NS}.items.${project.key}.tags`, { returnObjects: true }) || []
  const imgAlt = t(`${NS}.items.${project.key}.imgAlt`)
  const viewMore = t(`${NS}.buttons.viewMore`)
  const tagsAria = t(`${NS}.aria.tags`, { title })

  const locationTag = Array.isArray(tags) && tags.length > 0 ? tags[tags.length - 1] : ""
  const category = Array.isArray(tags) && tags.length > 0 ? tags[0] : ""
  const scale = Array.isArray(tags) && tags.length > 1 ? tags[1] : ""

  const effectiveLang = urlLang || i18n.language || "en"

  const to = useMemo(
    () => buildPathWithLang(effectiveLang, `/project/${project.id}`),
    [effectiveLang, project.id]
  )

  const enhancedAlt = locationTag ? `${imgAlt} - ${locationTag}` : imgAlt

  return (
    <article
      className="group bg-white overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                 border border-[#e5e7eb]
                 transition-all duration-300 ease-out
                 hover:shadow-[0_8px_24px_rgba(0,58,128,0.15)]
                 hover:-translate-y-1
                 hover:border-[#003A80]
                 flex flex-col h-full"
    >
      <Link
        to={to}
        className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-[#003A80] focus:ring-offset-2"
        aria-label={`${title} - ${viewMore}`}
      >
        <div className="relative w-full overflow-hidden bg-[#f5f7fb]">
          <img
            src={project.img}
            alt={enhancedAlt}
            className="w-full aspect-[16/9] object-cover object-center
                       transition-transform duration-500 ease-out
                       group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
            width="600"
            height="338"
          />
        </div>

        <div className="flex flex-col flex-1 p-[24px] md:p-[28px]">
          <h3
            className="font-[Rajdhani] text-[#003A80] text-[24px] md:text-[26px] font-[700]
                       uppercase leading-[1.3] mb-[12px]
                       group-hover:text-[#214f9b] transition-colors duration-300
                       relative inline-block
                       after:absolute after:bottom-0 after:left-0
                       after:w-0 after:h-[2px] after:bg-[#003A80]
                       after:transition-all after:duration-300
                       group-hover:after:w-full"
          >
            {title}
          </h3>

          <p
            className="font-['Open_Sans'] text-[#4a5c7a] text-[15px] md:text-[16px]
                       leading-[1.6] mb-[16px] flex-1
                       overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.6",
            }}
          >
            {desc}
          </p>

          <div className="flex flex-wrap gap-[8px] mb-[20px]" aria-label={tagsAria}>
            {category && (
              <span
                className="inline-flex items-center px-[12px] py-[6px]
                           bg-[#eaf2ff] text-[#1d4fa2]
                           text-[12px] uppercase font-[Rajdhani] font-[600]
                           rounded-[4px]"
              >
                {category}
              </span>
            )}

            {scale && (
              <span
                className="inline-flex items-center px-[12px] py-[6px]
                           bg-[#f0f4ff] text-[#214f9b]
                           text-[12px] uppercase font-[Rajdhani] font-[600]
                           rounded-[4px]"
              >
                {scale}
              </span>
            )}

            {locationTag && (
              <span
                className="inline-flex items-center px-[12px] py-[6px]
                           bg-[#f5f7fb] text-[#4a5c7a]
                           text-[12px] uppercase font-[Rajdhani] font-[600]
                           rounded-[4px]"
              >
                📍 {locationTag}
              </span>
            )}
          </div>

          <div className="mt-auto">
            <div
              className="inline-flex items-center justify-center gap-[8px]
                         font-[Rajdhani] uppercase text-[14px] font-[700]
                         text-[#003A80] border-2 border-[#003A80]
                         px-[20px] py-[10px] rounded-[4px]
                         transition-all duration-300
                         group-hover:bg-[#003A80] group-hover:text-white
                         pointer-events-none"
            >
              <span>{viewMore}</span>
              <svg
                className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProjectCard
