import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import { buildPathWithLang } from "../utils/langRouting"
import { getProducts } from "../data/productsCatalog"

const SITE_ORIGIN = "https://achiscaffolding.com"

function ensureModelViewerScript() {
  if (document.querySelector('script[data-model-viewer="true"]')) return
  const s = document.createElement("script")
  s.type = "module"
  s.async = true
  s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
  s.setAttribute("data-model-viewer", "true")
  document.head.appendChild(s)
}

const Products = () => {
const isLocked = (p) => p.locked === true

const [moveMode, setMoveMode] = useState(false)

const [activeSlug, setActiveSlug] = useState("")
const [targets, setTargets] = useState(() => ({}))

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

const toNumM = (s) => {
  const n = Number(String(s || "").replace("m", ""))
  return Number.isFinite(n) ? n : 0
}
const TiltCard = ({ children, className = "", maxTilt = 10, glare = true }) => {
  const ref = useRef(null)
  const [isHover, setIsHover] = useState(false)
  const [style, setStyle] = useState({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)" })

  const onMove = (e) => {
  const el = ref.current
  if (!el) return
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height

  const rx = (0.5 - py) * maxTilt
  const ry = (px - 0.5) * maxTilt

  el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`)
  el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`)

  setStyle({
    transform: `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0px)`,
  })
}


  const onLeave = () => {
    setIsHover(false)
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)" })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={() => setIsHover(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
style={{
  transformStyle: "preserve-3d",
  willChange: "transform",
  transition: "transform 120ms ease-out",
  ...style,
}}

    >
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
          style={{
            opacity: isHover ? 1 : 0,
            background:
              "radial-gradient(600px 260px at var(--mx,50%) var(--my,35%), rgba(255,255,255,0.35), transparent 60%)",
          }}
        />
      )}
      <div style={{ transform: "translateZ(18px)" }}>{children}</div>
    </motion.div>
  )
}

const fmtM = (n) => `${Number(n).toFixed(3)}m`

const getTargetY = (p) => {
  const stored = targets[p.slug]
  if (stored) return stored
  if (p.targetY) return `0m ${p.targetY} 0m`
  return "0m 0m 0m"
}



  const ADJUST_MODE = false


  const { t, i18n } = useTranslation()
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()

  const lang = String(i18n.resolvedLanguage || i18n.language || "en").toLowerCase()
  const pagePath = useMemo(() => "/products", [])
  const canonical = useMemo(() => `${SITE_ORIGIN}${buildPathWithLang(lang, pagePath)}`, [lang, pagePath])

  const products = useMemo(() => getProducts(), [])
  const mvRefs = useRef({})

const [debug, setDebug] = useState({ slug: "", orbit: "", target: "" })

const onMoveDrag = (slug, dx, dy) => {
  const el = mvRefs.current?.[slug]
  if (!el) return

  const current = targets[slug] || `0m ${products.find(x => x.slug === slug)?.targetY || "0m"} 0m`
  const [xS, yS, zS] = String(current).split(" ")
  const x = toNumM(xS)
  const y = toNumM(yS)
  const z = toNumM(zS)

  const step = 0.0009
  const nx = clamp(x + dx * step, -0.35, 0.35)
  const ny = clamp(y - dy * step, -0.35, 0.35)

  const next = `${fmtM(nx)} ${fmtM(ny)} ${fmtM(z)}`
  setTargets((prev) => ({ ...prev, [slug]: next }))

  try {
    el.setAttribute("camera-target", next)
  } catch (e) {}

  setDebug((d) => (d.slug === slug ? { ...d, target: next } : d))

}

const fmt = (n) => {
  const x = Number(n)
  if (!Number.isFinite(x)) return "0"
  return x.toFixed(3)
}


  useEffect(() => {
    ensureModelViewerScript()
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




  const updateDebugFromEl = (slug) => {
  const el = mvRefs.current?.[slug]
  if (!el || typeof el.getCameraOrbit !== "function" || typeof el.getCameraTarget !== "function") return
  const o = el.getCameraOrbit()
  const tg = el.getCameraTarget()
  setDebug({
    slug,
    orbit: `${fmt(o.theta)}rad ${fmt(o.phi)}rad ${fmt(o.radius)}m`,
    target: `${fmt(tg.x)}m ${fmt(tg.y)}m ${fmt(tg.z)}m`,
  })
}

const goToProduct = (e, slug) => {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  navigate(buildPathWithLang(lang, `/products/3d/${slug}`))
}




  return (
    <>
      <SEO title={t("products.seo.title")} description={t("products.seo.description")} canonical={canonical} />

<main className="w-full bg-white">
<section className="w-full bg-gradient-to-b from-[#f8fbff] via-[#f4f7fb] to-[#eef3f9] relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 opacity-[0.9] bg-[radial-gradient(1200px_520px_at_18%_12%,rgba(0,120,255,0.10),transparent_60%),radial-gradient(900px_460px_at_82%_18%,rgba(255,150,0,0.08),transparent_58%),radial-gradient(850px_520px_at_50%_95%,rgba(120,80,255,0.06),transparent_60%)]" />
<div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(90deg,rgba(27,49,85,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(27,49,85,0.08)_1px,transparent_1px)] bg-[size:56px_56px]" />
<div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_center,rgba(27,49,85,0.18)_0.6px,transparent_0.7px)] bg-[size:18px_18px]" />

          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] pt-[54px] md:pt-[70px] pb-[26px]">
          <motion.h1
  id="products-page-title"
  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
  transition={{ duration: 0.55, ease: "easeOut" }}
  className="
    text-[#214f9b]
    font-[900]
    uppercase
    leading-[1.1]
    text-center
    text-[36px]
    md:text-[48px]
    lg:text-[56px]
    font-[Rajdhani]
  "
>
  {t("products.h1")}
</motion.h1>


            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
className="text-center font-['Open_Sans'] text-[#5b6f8f]
           text-[15px] md:text-[16px] leading-[1.85]
           max-w-[980px] mx-auto mt-[18px]"
            >
              {t("products.lead")}
            </motion.p>
          </div>

          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] pb-[70px] md:pb-[92px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] md:gap-[20px]">
              {products.map((p, idx) => (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: reduceMotion ? 0 : Math.min(idx * 0.06, 0.18) }}
className="group
  relative
  overflow-hidden
  rounded-none
  border
  border-[#dfe8f5]
  bg-white
  shadow-[0_18px_42px_rgba(27,49,85,0.14)]
  transition-all
  duration-200
  ease-out
  hover:-translate-y-[6px]
  hover:shadow-[0_28px_80px_rgba(27,49,85,0.18)]
  hover:ring-1 hover:ring-[#214f9b]/20
  transition-transform transition-shadow transition-colors duration-200 ease-out
  group-hover:scale-[1.01] transition-transform duration-200 ease-out
"

    >
 <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.20)_40%,rgba(27,49,85,0.03))]" />


<div className="relative w-full h-[230px] md:h-[300px] lg:h-[320px] rounded-none bg-[linear-gradient(180deg,#f7faff_0%,#f3f7ff_45%,#eef3fb_100%)] border-b border-[#dfe8f5] overflow-hidden transition-transform duration-200 ease-out group-hover:scale-[1.01]">
  

  <div
    className="absolute inset-0"
    onContextMenu={(e) => {
      if (ADJUST_MODE) e.preventDefault()
    }}
    onMouseDown={(e) => {
      if (!ADJUST_MODE) return
      if (!moveMode) return
      if (e.button !== 0) return
      e.preventDefault()
      setActiveSlug(p.slug)
      setDebug((d) => ({ ...d, slug: p.slug }))
    }}
    onMouseUp={() => setActiveSlug("")}
    onMouseLeave={() => setActiveSlug("")}
    onMouseMove={(e) => {
      if (!ADJUST_MODE) return
      if (!moveMode) return
      if (activeSlug !== p.slug) return
      onMoveDrag(p.slug, e.movementX, e.movementY)
    }}
    style={{ cursor: ADJUST_MODE && moveMode ? "grabbing" : "default" }}
  >



    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(33,79,155,0.20),rgba(245,247,251,0)_55%)]" />
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_25%,rgba(40,80,158,0.12),rgba(245,247,251,0)_62%)]" />
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_85%_30%,rgba(0,180,255,0.10),rgba(245,247,251,0)_62%)]" />



      <model-viewer
  ref={(el) => {
    if (!el) return
    mvRefs.current[p.slug] = el

    if (!el.__achiDebugBound) {
      el.__achiDebugBound = true

      const handler = () => updateDebugFromEl(p.slug)
      el.__achiDebugHandler = handler

      el.addEventListener("camera-change", handler)
      el.addEventListener("pointerdown", () => {
        setDebug((d) => ({ ...d, slug: p.slug }))
        updateDebugFromEl(p.slug)
      })

      // Initial read after model-viewer is ready
      setTimeout(() => updateDebugFromEl(p.slug), 120)
    }
  }}
  src={p.model}
camera-controls={!isLocked(p)}
interaction-prompt={isLocked(p) ? "none" : "auto"}
auto-rotate={isLocked(p)}
rotation-per-second={isLocked(p) ? "8deg" : undefined}

  shadow-intensity="0"
environment-image=""
skybox-image=""
exposure="0.9"
tone-mapping="neutral"

camera-orbit={p.orbit || "0deg 70deg 260%"}
camera-target={p.target || `0m ${p.targetY || "0m"} 0m`}

  field-of-view="30deg"
  style={{
    width: "100%",
    height: "100%",
    background: "transparent",
    display: "block",
pointerEvents: "none"
  }}
/>
<div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)]" />
<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.85),inset_0_-60px_120px_rgba(27,49,85,0.06)]" />


   {ADJUST_MODE && debug.slug === p.slug && (
<div className="absolute left-[14px] bottom-[14px] z-[8] border border-[#d6e2f2] bg-white/90 text-[#1b3155] px-[12px] py-[8px] text-[12px] leading-[1.35] shadow-[0_10px_22px_rgba(27,49,85,0.14)]">
    <div className="font-[700] uppercase">{p.slug}</div>
    <div>orbit: {debug.orbit}</div>
    <div>target: {debug.target}</div>
  </div>
)}
  </div>

</div>


<div className="px-[14px] md:px-[16px] py-[12px] md:py-[14px] bg-gradient-to-b from-white to-[#f6f9fd] border-t border-[#dfe8f5]">
                    <div className="flex items-start justify-between gap-[14px]">
                      <div className="min-w-0">
<div className="mt-[2px]">
<button
  type="button"
  onClick={(e) => goToProduct(e, p.slug)}
  className="
    group
    relative
    text-left
    w-full
    font-[Rajdhani]
    text-[#1f4fd8]
    font-[900]
    uppercase
text-[16px]
md:text-[18px]
    leading-[1.15]
    tracking-[0.5px]
    focus:outline-none
  "
  aria-label={t("products.card.openAria", { title: t(p.titleKey) })}
  title={t("products.card.openTitle", { title: t(p.titleKey) })}
>
  <span className="relative inline-block">
    <span
      className="
        inline-block
        transition-transform
        duration-200
        ease-out
        group-hover:-translate-y-[1px]
        group-active:translate-y-[0px]
        group-active:scale-[0.985]
      "
    >
      {t(p.titleKey)}
    </span>

    <span
      className="
        pointer-events-none
        absolute
        left-0
        right-0
        -bottom-[3px]
        h-[2px]
        bg-current
        opacity-100
      "
      aria-hidden="true"
    />
  </span>
</button>




</div>

                      </div>


                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Products
