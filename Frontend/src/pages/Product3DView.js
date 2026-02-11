// src/pages/Product3DView.js
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { buildPathWithLang } from "../utils/langRouting"
import { findProductBySlug } from "../data/productsCatalog"

const SITE_ORIGIN = "https://achiscaffolding.com"

const Product3DView = () => {
  const ADJUST_MODE = false

  const { t, i18n } = useTranslation()
  const lang = String(i18n.resolvedLanguage || i18n.language || "en").toLowerCase()
  const navigate = useNavigate()
  const { slug } = useParams()

  const viewerRef = useRef(null)
  const product = useMemo(() => findProductBySlug(slug), [slug])

  const isArabic = lang.startsWith("ar")


  const canonical = useMemo(() => {
    const prefix = lang.startsWith("fr") ? "/fr" : lang.startsWith("ar") ? "/lb" : ""
    const safe = encodeURIComponent(String(slug || ""))
    return `${SITE_ORIGIN}${prefix}/products/3d/${safe}`
  }, [slug, lang])

  const [moveMode, setMoveMode] = useState(false)
  const [targets, setTargets] = useState(() => ({}))
  const [debug, setDebug] = useState({ orbit: "", target: "" })

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  const toNumM = (s) => {
    const n = Number(String(s || "").replace("m", ""))
    return Number.isFinite(n) ? n : 0
  }

  const fmt = (n) => {
    const x = Number(n)
    if (!Number.isFinite(x)) return "0"
    return x.toFixed(3)
  }

  const fmtM = (n) => `${Number(n).toFixed(3)}m`

  const getLiveTarget = useCallback(() => {
    const live = targets[String(slug || "")]
    if (live) return live
    if (product?.target) return product.target
    return "auto"
  }, [targets, slug, product])



const catalogKey = useMemo(() => {
  // "products.catalog.doubleCoupler.title" → "products.catalog.doubleCoupler"
  const k = String(product?.titleKey || "")
  const m = k.match(/^(products\.catalog\.[^.]+)\./)
  return m ? m[1] : ""
}, [product])

const resolvedSpecs = useMemo(() => {
  if (!catalogKey) return []
  const arr = t(`${catalogKey}.specs`, { returnObjects: true, defaultValue: [] })
  return Array.isArray(arr) ? arr : []
}, [t, catalogKey])


  useEffect(() => {
    if (document.querySelector('script[data-model-viewer="true"]')) return
    const s = document.createElement("script")
    s.type = "module"
    s.async = true
    s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
    s.setAttribute("data-model-viewer", "true")
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    const onDown = (e) => {
      if (!ADJUST_MODE) return
      if (e.key === "Shift") setMoveMode(true)
    }
    const onUp = (e) => {
      if (!ADJUST_MODE) return
      if (e.key === "Shift") setMoveMode(false)
    }
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    return () => {
      window.removeEventListener("keydown", onDown)
      window.removeEventListener("keyup", onUp)
    }
  }, [ADJUST_MODE])

  const updateDebugFromEl = useCallback(() => {
    const el = viewerRef.current
    if (!el || typeof el.getCameraOrbit !== "function" || typeof el.getCameraTarget !== "function") return
    const o = el.getCameraOrbit()
    const tg = el.getCameraTarget()
    setDebug({
      orbit: `${fmt(o.theta)}rad ${fmt(o.phi)}rad ${fmt(o.radius)}m`,
      target: `${fmt(tg.x)}m ${fmt(tg.y)}m ${fmt(tg.z)}m`,
    })
  }, [])

  const onMoveDrag = useCallback(
    (dx, dy) => {
      const el = viewerRef.current
      if (!el) return

      const key = String(slug || "")
      const current = targets[key] || (product?.target ? product.target : "0m 0m 0m")
      const [xS, yS, zS] = String(current).split(" ")
      const x = toNumM(xS)
      const y = toNumM(yS)
      const z = toNumM(zS)

      const step = 0.0009
      const nx = clamp(x + dx * step, -0.6, 0.6)
      const ny = clamp(y - dy * step, -0.6, 0.6)

      const next = `${fmtM(nx)} ${fmtM(ny)} ${fmtM(z)}`
      setTargets((prev) => ({ ...prev, [key]: next }))

      try {
        el.setAttribute("camera-target", next)
      } catch (e) {}

      updateDebugFromEl()
    },
    [slug, targets, product, updateDebugFromEl]
  )

  const syncCanvasToHost = useCallback(() => {
    const el = viewerRef.current
    if (!el?.shadowRoot) return
    const fill = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "block",
      minWidth: "0",
      minHeight: "0",
    }
    const container = el.shadowRoot.querySelector(".container") || el.shadowRoot.querySelector("div")
    if (container) {
      Object.assign(container.style, fill)
    }
    const userInput = el.shadowRoot.querySelector(".userInput")
    if (userInput) {
      Object.assign(userInput.style, fill)
    }
    const slotCanvas = el.shadowRoot.querySelector(".slot.canvas")
    if (slotCanvas) {
      Object.assign(slotCanvas.style, fill)
    }
    const allCanvases = el.shadowRoot.querySelectorAll("canvas")
    allCanvases.forEach((c) => {
      if (c.id === "webgl-canvas") {
        Object.assign(c.style, { ...fill, objectFit: "contain", objectPosition: "center" })
      } else {
        c.style.display = "none"
      }
    })
  }, [])

  useEffect(() => {
    const el = viewerRef.current
    if (!el || !product) return

    const applyBase = () => {
      try {
        el.setAttribute("camera-controls", "")
        el.setAttribute("interaction-prompt", "none")
        el.setAttribute("shadow-intensity", "1")
        el.setAttribute("bounds", "tight")

        el.setAttribute("min-camera-orbit", "auto auto 40%")
        el.setAttribute("max-camera-orbit", "auto auto 800%")
        el.setAttribute("min-field-of-view", "18deg")
        el.setAttribute("max-field-of-view", "60deg")

        el.setAttribute("camera-orbit", product.orbit || "auto auto 140%")
        el.setAttribute("camera-target", getLiveTarget())
        el.setAttribute("field-of-view", product.fieldOfView || "28deg")

        el.setAttribute("ar-modes", "webxr scene-viewer quick-look")
      } catch (e) {}
    }

    const fit = () => {
      applyBase()
      syncCanvasToHost()
      if (typeof el.updateFraming === "function") el.updateFraming()
      updateDebugFromEl()
    }

    const onLoad = () => {
      requestAnimationFrame(() => requestAnimationFrame(() => fit()))
    }

    if (el.loaded) onLoad()
    else el.addEventListener("load", onLoad, { once: true })

    const onResize = () => fit()
    window.addEventListener("resize", onResize)

    let ro = null
    const parent = el.parentElement
    if (parent) {
      ro = new ResizeObserver(() => fit())
      ro.observe(parent)
    }

    const t1 = setTimeout(fit, 250)
    const t2 = setTimeout(fit, 700)
    const t3 = setTimeout(fit, 1200)

    const onCamera = () => updateDebugFromEl()
    el.addEventListener("camera-change", onCamera)

    return () => {
      window.removeEventListener("resize", onResize)
      if (ro && parent) ro.unobserve(parent)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      el.removeEventListener("camera-change", onCamera)
    }
  }, [product, getLiveTarget, updateDebugFromEl, syncCanvasToHost])

  if (!product) {
    return (
      <main className="bg-[#f5f7fb] text-[#1b3155]">
        <SEO title={t("products3d.notFound.seoTitle")} description={t("products3d.notFound.seoDesc")} canonical={canonical} />
        <section className="py-[80px]">
          <div className="w-[90%] max-w-[1200px] mx-auto">
            <div className="rounded-[18px] border border-white/70 bg-white shadow-[0_12px_40px_rgba(17,35,64,0.10)] p-[18px] md:p-[22px]">
              <h1 className="text-[#214f9b] font-[900] uppercase text-h3 md:text-h2">{t("products3d.notFound.h1")}</h1>
              <p className="mt-[10px] text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.7] max-w-[720px]">
                {t("products3d.notFound.lead")}
              </p>
              <button
                type="button"
                className="mt-[16px] inline-flex items-center justify-center px-[16px] py-[10px] rounded-[12px] bg-[#214f9b] text-white font-[900] uppercase text-[13px] hover:bg-[#1a3d7a] transition"
                onClick={() => navigate(buildPathWithLang(lang, "/products"))}
              >
                {t("products3d.notFound.back")}
              </button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-[#f5f7fb] text-[#1b3155]">
      <SEO title={`${t(product.titleKey)} | ACHI Scaffolding`} description={t(product.descKey)} canonical={canonical} />

      <style>{`
        model-viewer {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          outline: none !important;
          opacity: 1 !important;
          position: absolute !important;
          inset: 0 !important;
        }
        model-viewer::part(default-progress-bar) { display: none !important; }
        model-viewer::part(canvas) {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }
      `}</style>

      <section className="pt-[36px] pb-[18px]">
        <div className="w-[90%] max-w-[1200px] mx-auto flex items-start justify-between gap-[14px]">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-[10px]">
              <button
                type="button"
                className="shrink-0 inline-flex items-center justify-center w-[40px] h-[40px] rounded-[14px] bg-white border border-white/70 shadow-[0_10px_30px_rgba(17,35,64,0.10)] text-[#214f9b] hover:bg-[#eef3fb] transition"
                aria-label={t("products3d.backAria")}
                onClick={() => navigate(buildPathWithLang(lang, "/products"))}
              >
                {isArabic ? "→" : "←"}
              </button>

              <span className="inline-flex items-center px-[10px] py-[6px] rounded-full text-[12px] font-[900] uppercase bg-[#214f9b]/10 text-[#214f9b] border border-[#214f9b]/15">
                {t("products3d.badge")}

              
              </span>
            </div>

            <h1 className="mt-[12px] text-[#214f9b] font-[900] uppercase text-h2 md:text-h1 leading-[1.05]">{t(product.titleKey)}</h1>
            <p className="mt-[10px] text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.8] max-w-[880px]">{t(product.descKey)}</p>
          </div>


        </div>
      </section>

      <section className="pb-[60px]">
        <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-[18px]">
          <div className="rounded-[20px] overflow-hidden border border-white/70 bg-white shadow-[0_18px_55px_rgba(17,35,64,0.12)]">
            <div
              className="relative w-full h-[62vh] min-h-[420px] max-h-[720px] bg-[radial-gradient(circle_at_top,#e5efff,#f5f7fb_70%)]"
              onMouseDown={(e) => {
                if (!ADJUST_MODE) return
                if (!moveMode) return
                if (e.button !== 0) return
                e.preventDefault()
                updateDebugFromEl()
              }}
              onMouseMove={(e) => {
                if (!ADJUST_MODE) return
                if (!moveMode) return
                onMoveDrag(e.movementX, e.movementY)
              }}
              style={{ cursor: ADJUST_MODE && moveMode ? "grabbing" : "default" }}
            >
              <model-viewer
                ref={viewerRef}
                src={product.model}
                alt={t(product.titleKey)}
                camera-controls
                interaction-prompt="none"
                shadow-intensity="1"
                bounds="tight"
                camera-target={getLiveTarget()}
                camera-orbit={product.orbit || "auto auto 140%"}
                field-of-view={product.fieldOfView || "28deg"}
                min-field-of-view="18deg"
                max-field-of-view="60deg"
                min-camera-orbit="auto auto 40%"
                max-camera-orbit="auto auto 800%"
                ar-modes="webxr scene-viewer quick-look"
              />

              {ADJUST_MODE && (
                <div className="absolute left-[14px] bottom-[14px] z-[8] border border-[#d6e2f2] bg-white/90 text-[#1b3155] px-[12px] py-[8px] text-[12px] leading-[1.35] shadow-[0_10px_22px_rgba(27,49,85,0.14)]">
                  <div className="font-[700] uppercase">{t("products3d.adjust.debugTitle")}</div>
                  <div>
                    {t("products3d.adjust.debugOrbit")}: {debug.orbit}
                  </div>
                  <div>
                    {t("products3d.adjust.debugTarget")}: {debug.target}
                  </div>
                  <div className="mt-[6px] text-[#4a5c7a]">{t("products3d.adjust.hint")}</div>
                </div>
              )}
            </div>

            <div className="p-[16px] md:p-[18px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[12px] border-t border-[#e9eef7]">
              <div className="text-[13px] text-[#4a5c7a] leading-[1.7]">{t("products3d.hint")}</div>

              <a
                href="https://wa.me/96103322811"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-[14px] py-[10px] rounded-[12px] bg-[#214f9b] text-white font-[900] uppercase text-[13px] hover:bg-[#1a3d7a] transition"
              >
                {t("products3d.requestSpecs")}
              </a>
            </div>
          </div>

          <aside className="rounded-[20px] border border-white/70 bg-white shadow-[0_18px_55px_rgba(17,35,64,0.12)] p-[16px] md:p-[18px]">
            <h2 className="text-[#214f9b] font-[900] uppercase text-h4 md:text-h3">{t("products3d.specsTitle")}</h2>

{resolvedSpecs.length > 0 ? (
  <ul className="mt-[12px] space-y-[10px] text-[14px] text-[#1b3155]">
    {resolvedSpecs.map((text, idx) => (
      <li key={`${product.slug || "p"}-${idx}`} className="flex gap-[10px]">
        <span aria-hidden="true" className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[#214f9b]" />
        <span className="leading-[1.7]">{text}</span>
      </li>
    ))}
  </ul>
) : (
  <div className="mt-[12px] rounded-[14px] border border-[#e9eef7] bg-[#f7faff] p-[12px]">
    <p className="text-[13px] text-[#4a5c7a] leading-[1.7]">
      {t("products3d.specsEmpty")}
    </p>

    <a
      href="https://wa.me/96103322811"
      target="_blank"
      rel="noreferrer"
      className="mt-[10px] inline-flex w-full items-center justify-center px-[14px] py-[10px] rounded-[12px] bg-[#214f9b] text-white font-[900] uppercase text-[13px] hover:bg-[#1a3d7a] transition"
    >
      {t("products3d.requestSpecs")}
    </a>
  </div>
)}


          </aside>
        </div>
      </section>
    </main>
  )
}

export default Product3DView
