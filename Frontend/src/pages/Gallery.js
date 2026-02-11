// src/pages/Gallery.js
import React, { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"

const PER_PAGE = 20

const Gallery = () => {
  const { t, i18n } = useTranslation()
  const NS = "galleryPage"

  const publicBase = process.env.PUBLIC_URL || ""

  const images = useMemo(() => {
    const root = `${publicBase}/assets/gallery`

   const files = [
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "17.jpg",
  "18.jpg",
  "2.JPG",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "26.jpg",
  "27.jpg",
  "29.JPG",
  "33.JPG",
  "34.JPG",
  "35.JPG",
  "36.JPG",
  "37.JPG",
  "38.jpg",
  "39.JPG",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "9.jpg",
  "new.jpg",
  "new1.jpg",
  "new10.jpg",
  "new11.jpg",
  "new12.jpg",
  "new13.jpg",
  "new2.jpg",
  "new3.jpg",
  "new4.jpg",
  "new5.jpg",
  "new6.jpg",
  "new7.jpg",
  "new8.webp",
  "new9.jpg",
]


    return files.map((name) => ({
      name,
      src: `${root}/${encodeURIComponent(name)}`,
    }))
  }, [publicBase])

  const totalPages = Math.ceil(images.length / PER_PAGE)
  const [currentPage, setCurrentPage] = useState(1)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState("")
  const [lightboxAlt, setLightboxAlt] = useState("")

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE
    const end = start + PER_PAGE
    return images.slice(start, end)
  }, [images, currentPage])

  const scrollToTopOfGallery = () => {
    const section = document.querySelector(".gallery-section")
    if (!section) return
    const top = section.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: "smooth" })
  }

  const openLightbox = (src, alt) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxSrc("")
    setLightboxAlt("")
  }

  const goToPage = (p) => {
    setCurrentPage(p)
    scrollToTopOfGallery()
  }

  const prev = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const next = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const scrollY = window.scrollY
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"
    document.documentElement.style.overflow = "hidden"

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.documentElement.style.overflow = ""
      window.scrollTo(0, scrollY)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [lightboxOpen])

  return (
    <>
      <SEO title={t(`${NS}.seo.title`)} description={t(`${NS}.seo.description`)} canonical={t(`${NS}.seo.canonical`)} />

      <div className="gallery-page" id="gallery">
        <style>{`
          .gallery-page {
            background-color: var(--bg-odd);
            min-height: 100vh;
            width: 100%;
            max-width: 100%;
            overflow-x: clip;
            position: relative;
          }

          .gallery-page * { box-sizing: border-box; }
          .gallery-page img { max-width: 100%; height: auto; }

          html[dir="rtl"] body,
          html[dir="rtl"] #root,
          html[dir="rtl"] .App,
          html[dir="rtl"] .gallery-page {
            width: 100%;
            max-width: 100%;
            overflow-x: clip;
          }

          .gallery-title-section {
            padding-top: 60px;
            padding-bottom: 10px;
            background: transparent;
            width: 100%;
            max-width: 100%;
            overflow-x: clip;
          }

          .gallery-title {
            font-family: var(--app-font, "Open Sans", Arial, Helvetica, sans-serif) !important;
            font-size: 42px !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            margin: 0 0 12px !important;
            color: #003A80 !important;
            text-align: center !important;
            line-height: 1.2 !important;
            padding: 0 16px;
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .gallery-intro {
            max-width: 920px;
            margin: 0 auto;
            text-align: center;
            color: #4a5c7a;
            font-size: 14px;
            line-height: 1.8;
            padding: 0 16px;
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .seo-links {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }

          .gallery-section {
            padding: 50px 0 70px;
            background-color: var(--bg-odd);
            width: 100%;
            max-width: 100%;
            overflow-x: clip;
          }

          .gallery-section .container {
            max-width: var(--max-container);
            margin: 0 auto;
            padding: 0 16px;
            width: 100%;
            min-width: 0;
          }

          .gallery-grid {
            display: grid;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            gap: 16px;
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            background-color: #dfe6f5;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
            cursor: zoom-in;
            opacity: 0;
            transform: translateY(12px) scale(0.98);
            animation: galleryFadeUp 0.6s ease forwards;
            aspect-ratio: 4 / 3;
            width: 100%;
            min-width: 0;
          }

          .gallery-item:nth-child(4n + 1) { animation-delay: 0.05s; }
          .gallery-item:nth-child(4n + 2) { animation-delay: 0.12s; }
          .gallery-item:nth-child(4n + 3) { animation-delay: 0.18s; }
          .gallery-item:nth-child(4n + 4) { animation-delay: 0.22s; }

          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease, filter 0.5s ease;
          }

          .gallery-item::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.35));
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .gallery-item:hover img { transform: scale(1.06); filter: saturate(1.05); }
          .gallery-item:hover::after { opacity: 1; }

          @keyframes galleryFadeUp { to { opacity: 1; transform: translateY(0) scale(1); } }

          .gallery-pagination {
            margin-top: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            width: 100%;
            max-width: 100%;
            overflow-x: clip;
            padding: 0 8px;
          }

          .gallery-page-numbers {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            min-width: 0;
            max-width: 100%;
          }

          .gallery-page-btn,
          .gallery-page-number {
            border: 1px solid #d0d7e6;
            background: #ffffff;
            color: #1f365c;
            font-family: var(--app-font, "Open Sans", Arial, Helvetica, sans-serif) !important;
            font-size: 13px;
            padding: 6px 14px;
            border-radius: 999px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            transition: 0.2s ease;
            max-width: 100%;
          }

          .gallery-page-btn[disabled] { opacity: 0.4; cursor: default; }

          .gallery-page-number.active,
          .gallery-page-number:hover,
          .gallery-page-btn:hover:not([disabled]) {
            background: #003c8f;
            color: #ffffff;
            border-color: #003c8f;
          }

          .lightbox {
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: clamp(16px, 4vw, 48px);
          }

          .lightbox.open { display: flex; }

          .lightbox-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(3px);
          }

          .lightbox-content {
            position: relative;
            z-index: 1;
            width: auto;
            height: auto;
            max-width: min(1200px, 100%);
            max-height: calc(100vh - 2 * clamp(16px, 4vw, 48px));
            border-radius: 0;
            overflow: visible;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
            background: transparent;
            animation: lightboxPop 0.25s ease-out;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .lightbox-content img {
            display: block;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: calc(100vh - 2 * clamp(16px, 4vw, 48px));
            object-fit: contain;
            border-radius: 0;
          }

          .lightbox-close {
            position: absolute;
            top: clamp(16px, 4vw, 48px);
            right: clamp(16px, 4vw, 48px);
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: none;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            cursor: pointer;
            font-size: 20px;
            line-height: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease, transform 0.2s ease;
          }

          .lightbox-close:hover { background: var(--accent); transform: translateY(-1px); }

          @keyframes lightboxPop {
            from { transform: translateY(10px) scale(0.97); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }

          @media (max-width: 1024px) {
            .gallery-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }

          @media (max-width: 820px) {
            .gallery-section .container { padding: 0 14px; }
            .gallery-grid { gap: 14px; }
          }

          @media (max-width: 720px) {
            .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }

          @media (max-width: 480px) {
            .gallery-grid { grid-template-columns: minmax(0, 1fr); }
          }
        `}</style>

        <div className="gallery-title-section">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="gallery-title"
          >
            {t(`${NS}.header.title`)}
          </motion.h1>

          <p className="gallery-intro">{t(`${NS}.header.description`)}</p>
        </div>

        <div className="seo-links" aria-hidden="true">
          <a href={t(`${NS}.sr.links.products.href`)}>{t(`${NS}.sr.links.products.label`)}</a>
          <a href={t(`${NS}.sr.links.projects.href`)}>{t(`${NS}.sr.links.projects.label`)}</a>
          <a href={t(`${NS}.sr.links.contact.href`)}>{t(`${NS}.sr.links.contact.label`)}</a>
        </div>

        <section className="gallery-section" aria-label={t(`${NS}.grid.ariaLabel`)}>
          <div className="container">
            <div className="gallery-grid" id="galleryGrid">
              {pageItems.map((img, idx) => {
                const globalIndex = (currentPage - 1) * PER_PAGE + idx + 1

                const altKey = `${NS}.grid.alts.${img.name}`
                const hasSpecificAlt = i18n.exists(altKey)
                const alt = hasSpecificAlt ? t(altKey) : t(`${NS}.grid.imageAlt`, { n: globalIndex })

                const openKey = `${NS}.grid.openAria.${img.name}`
                const hasSpecificOpen = i18n.exists(openKey)
                const openAria = hasSpecificOpen ? t(openKey) : t(`${NS}.grid.openImageAria`, { n: globalIndex })

                return (
                  <div
                    key={`${img.src}-${idx}`}
                    className="gallery-item"
                    onClick={() => openLightbox(img.src, alt)}
                    role="button"
                    tabIndex={0}
                    aria-label={openAria}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openLightbox(img.src, alt)
                    }}
                  >
                    <img loading="lazy" decoding="async" src={img.src} alt={alt} />
                  </div>
                )
              })}
            </div>

            {images.length > 0 && (
              <div className="gallery-pagination" aria-label={t(`${NS}.pagination.ariaLabel`)}>
                <button
                  type="button"
                  className="gallery-page-btn prev"
                  onClick={prev}
                  disabled={currentPage === 1}
                  aria-label={t(`${NS}.pagination.prevAria`)}
                >
                  {t(`${NS}.pagination.prev`)}
                </button>

                <div className="gallery-page-numbers" aria-label={t(`${NS}.pagination.pageNumbersAria`)}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`gallery-page-number ${p === currentPage ? "active" : ""}`}
                      onClick={() => goToPage(p)}
                      aria-label={t(`${NS}.pagination.goToPageAria`, { p })}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="gallery-page-btn next"
                  onClick={next}
                  disabled={currentPage === totalPages}
                  aria-label={t(`${NS}.pagination.nextAria`)}
                >
                  {t(`${NS}.pagination.next`)}
                </button>
              </div>
            )}
          </div>
        </section>

        <div
          className={`lightbox ${lightboxOpen ? "open" : ""}`}
          id="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t(`${NS}.lightbox.dialogAriaLabel`)}
        >
          <div
            className="lightbox-backdrop"
            onClick={closeLightbox}
            aria-label={t(`${NS}.lightbox.backdropAriaLabel`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") closeLightbox()
            }}
          />
          <div className="lightbox-content">
            <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label={t(`${NS}.lightbox.closeAriaLabel`)}>
              ×
            </button>
            <img src={lightboxSrc} alt={lightboxAlt} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Gallery
