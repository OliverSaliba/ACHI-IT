// SectorsScrollStory: page scroll stops when section reaches sticky point; sectors advance one-by-one.
// Unlock on first scroll intent when at last slide (scroll down) or first slide (scroll up).
// Same design for all locales (glass card, progress bar, navbar-blue titles, slide animations).
import React, { useEffect, useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { sectors } from "../data/sectors"
import SmartLink from "../seo/SmartLink"
import "./SectorsScrollStory.css"

const NS = "homeSectors"
const HEADER_OFFSET = 90
const lastIndex = sectors.length - 1
const DELTA_THRESHOLD = 60
const COOLDOWN_MS = 450
const COOLDOWN_REDUCED_MS = 250

function applyBodyLock(scrollYToPreserve) {
  document.body.style.position = "fixed"
  document.body.style.top = `-${scrollYToPreserve}px`
  document.body.style.left = "0"
  document.body.style.right = "0"
  document.body.style.overflow = "hidden"
  document.body.style.width = "100%"
}

function removeBodyLockStyles() {
  document.body.style.position = ""
  document.body.style.top = ""
  document.body.style.left = ""
  document.body.style.right = ""
  document.body.style.overflow = ""
  document.body.style.width = ""
}

function restoreScrollAndNudge(targetY, direction) {
  removeBodyLockStyles()
  document.documentElement.classList.remove("sectors-scroll-locked")
  window.scrollTo(0, targetY)
  requestAnimationFrame(() => {
    window.scrollBy(0, direction > 0 ? 1 : -1)
    requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")))
  })
}

const NAVBAR_BLUE = "rgb(40, 80, 158)"
const NAVBAR_BLUE_DARK = "#1b3155"

const SectorsScrollStory = () => {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const [activeIndex, setActiveIndex] = useState(0)

  const slideDuration = reduceMotion ? 0.2 : 0.4
  const cooldownMs = reduceMotion ? COOLDOWN_REDUCED_MS : COOLDOWN_MS

  const slideTransition = reduceMotion
    ? { duration: 0.2 }
    : { type: "tween", duration: 0.4, ease: "easeOut" }
  const [isLocked, setIsLocked] = useState(false)

  const lockedRef = useRef(false)
  const indexRef = useRef(0)
  const transitioningRef = useRef(false)
  const deltaAccRef = useRef(0)
  const lastInputTsRef = useRef(0)
  const savedScrollYRef = useRef(0)
  const suppressLockRef = useRef(false)
  const hasEverLockedRef = useRef(false)
  const lastScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0)
  const SUPPRESS_MS = 250

  useEffect(() => {
    indexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    lockedRef.current = isLocked
  }, [isLocked])

  const getSectionBounds = () => {
    const el = sectionRef.current
    if (!el) return null
    return { top: el.offsetTop, height: el.offsetHeight }
  }

  const doLock = () => {
    const el = sectionRef.current
    if (!el) return
    const sectionTop = el.offsetTop
    const snapY = Math.max(0, sectionTop - HEADER_OFFSET)
    window.scrollTo(0, snapY)
    savedScrollYRef.current = snapY
    applyBodyLock(snapY)
    document.documentElement.classList.add("sectors-scroll-locked")
    window.dispatchEvent(new Event("scroll"))
    if (!hasEverLockedRef.current) {
      indexRef.current = 0
      setActiveIndex(0)
      hasEverLockedRef.current = true
    }
    transitioningRef.current = false
    lockedRef.current = true
    setIsLocked(true)
  }

  const doUnlockDown = () => {
    suppressLockRef.current = true
    const y = savedScrollYRef.current || (typeof window !== "undefined" ? window.scrollY : 0)
    restoreScrollAndNudge(y, 1)
    lockedRef.current = false
    setIsLocked(false)
    setTimeout(() => { suppressLockRef.current = false }, SUPPRESS_MS)
  }

  const doUnlockUp = () => {
    suppressLockRef.current = true
    const y = savedScrollYRef.current || (typeof window !== "undefined" ? window.scrollY : 0)
    restoreScrollAndNudge(y, -1)
    lockedRef.current = false
    setIsLocked(false)
    setTimeout(() => { suppressLockRef.current = false }, SUPPRESS_MS)
  }

  const tryAdvance = (direction) => {
    if (transitioningRef.current) return
    const current = indexRef.current
    if (direction > 0) {
      if (current < lastIndex) {
        transitioningRef.current = true
        deltaAccRef.current = 0
        lastInputTsRef.current = Date.now()
        indexRef.current = current + 1
        setActiveIndex(current + 1)
        setTimeout(() => { transitioningRef.current = false }, (slideDuration * 1000) + 80)
      } else {
        doUnlockDown()
      }
    } else {
      if (current > 0) {
        transitioningRef.current = true
        deltaAccRef.current = 0
        lastInputTsRef.current = Date.now()
        indexRef.current = current - 1
        setActiveIndex(current - 1)
        setTimeout(() => {
          transitioningRef.current = false
        }, (slideDuration * 1000) + 80)
      } else {
        doUnlockUp()
      }
    }
  }

  const onSlideAnimationComplete = () => {
    transitioningRef.current = false
  }

  const canAcceptInput = () => {
    if (transitioningRef.current) return false
    const now = Date.now()
    if (now - lastInputTsRef.current < cooldownMs) return false
    return true
  }

  useEffect(() => {
    const el = sectionRef.current
    if (!el || isLocked) return

    const check = () => {
      if (lockedRef.current) return
      if (suppressLockRef.current) return
      const y = window.scrollY
      const dir = y > lastScrollYRef.current ? "down" : "up"
      lastScrollYRef.current = y
      const sectionTop = el.offsetTop
      const sectionHeight = el.offsetHeight
      const lockThreshold = sectionTop - HEADER_OFFSET
      const leaveThreshold = sectionTop + sectionHeight - HEADER_OFFSET
      const rect = el.getBoundingClientRect()
      if (dir === "down") {
        if (y >= lockThreshold && y < leaveThreshold && rect.top <= HEADER_OFFSET + 2 && rect.top >= HEADER_OFFSET - 40) {
          doLock()
        }
      } else {
        if (rect.top <= HEADER_OFFSET + 2 && rect.bottom >= HEADER_OFFSET + 200) {
          doLock()
        }
      }
    }
    window.addEventListener("scroll", check, { passive: true })
    check()
    return () => window.removeEventListener("scroll", check)
  }, [isLocked])

  useEffect(() => {
    return () => {
      removeBodyLockStyles()
      document.documentElement.classList.remove("sectors-scroll-locked")
    }
  }, [])

  useEffect(() => {
    if (!isLocked) return

    const handleWheel = (e) => {
      e.preventDefault()
      if (!canAcceptInput()) return
      deltaAccRef.current += e.deltaY
      if (Math.abs(deltaAccRef.current) >= DELTA_THRESHOLD) {
        const direction = deltaAccRef.current > 0 ? 1 : -1
        deltaAccRef.current = 0
        lastInputTsRef.current = Date.now()
        tryAdvance(direction)
      }
    }
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [isLocked])

  useEffect(() => {
    if (!isLocked) return
    let startY = 0
    let touchAcc = 0
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY
      touchAcc = 0
    }
    const handleTouchMove = (e) => {
      const y = e.touches[0].clientY
      const dy = startY - y
      if (Math.abs(dy) < 20) return
      e.preventDefault()
      if (!canAcceptInput()) return
      touchAcc += dy
      if (Math.abs(touchAcc) >= DELTA_THRESHOLD) {
        const direction = touchAcc > 0 ? 1 : -1
        touchAcc = 0
        startY = y
        lastInputTsRef.current = Date.now()
        tryAdvance(direction)
      }
    }
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isLocked])

  useEffect(() => {
    if (!isLocked) return
    const onKeyDown = (e) => {
      if (e.key !== "ArrowDown" && e.key !== "PageDown" && e.key !== "ArrowUp" && e.key !== "PageUp") return
      e.preventDefault()
      if (!canAcceptInput()) return
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        lastInputTsRef.current = Date.now()
        tryAdvance(1)
      } else {
        lastInputTsRef.current = Date.now()
        tryAdvance(-1)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isLocked])

  /* Scroll logic unchanged. Below: single design for all locales (Italian-style). */

  return (
    <section
      ref={sectionRef}
      id="sectors-bar"
      aria-labelledby="sectors-scroll-story-title"
      className="relative flex items-center justify-center"
      style={{
        minHeight: "100vh",
        paddingTop: HEADER_OFFSET,
        paddingBottom: "2rem",
        boxSizing: "border-box",
        background: "#ffffff"
      }}
    >
      <p className="sr-only">{t(`${NS}.srDescription`)}</p>
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 90px - 2rem)" }}
      >
        <div className="relative" style={{ width: "min(1100px, 92vw)" }}>
          <div
            className="relative overflow-hidden"
            style={{
              width: "100%",
              minHeight: "min(560px, 70vh)",
              maxHeight: "min(560px, 70vh)",
              display: "flex",
              flexDirection: "column",
              padding: "clamp(24px, 4vw, 48px)",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderLeft: `4px solid ${NAVBAR_BLUE}`,
              borderRadius: 20,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)"
            }}
          >
            <header className="flex-shrink-0 mb-4 w-full" role="presentation" aria-hidden="true">
              <div
                className="w-full mb-2"
                style={{ height: 4, background: "#e5e7eb", borderRadius: 2, overflow: "hidden" }}
              >
                <div
                  style={{
                    width: `${lastIndex > 0 ? (100 * activeIndex) / lastIndex : 0}%`,
                    height: "100%",
                    background: NAVBAR_BLUE,
                    borderRadius: 2,
                    transition: "width 0.35s ease-out"
                  }}
                />
              </div>
              <div className="flex justify-between items-center text-[#1b3155]/80 text-sm font-[Rajdhani] font-[600]">
                <span>
                  {String(activeIndex + 1).padStart(2, "0")}/{String(lastIndex + 1).padStart(2, "0")}
                </span>
                <span className="sr-only">{t(`${NS}.scrollHint`)}</span>
              </div>
            </header>
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left justify-center min-h-0 relative">
              {sectors.map((sector, idx) => {
                const isActive = idx === activeIndex
                return (
                  <motion.div
                    key={sector.key}
                    className="absolute inset-0 flex flex-col items-center lg:items-start justify-center px-4 pt-2 pb-4 lg:pl-0"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: reduceMotion ? 1 : isActive ? 1 : 0.98,
                      y: reduceMotion ? 0 : isActive ? 0 : 12,
                      filter: reduceMotion ? "none" : isActive ? "blur(0px)" : "blur(4px)",
                      pointerEvents: isActive ? "auto" : "none"
                    }}
                    transition={slideTransition}
                    onAnimationComplete={isActive ? onSlideAnimationComplete : undefined}
                    aria-hidden={!isActive}
                  >
                    <div className="flex flex-col items-center lg:items-start max-w-md relative z-10">
                      <div
                        style={{
                          width: 88,
                          height: 88,
                          borderRadius: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          aspectRatio: "1 / 1",
                          background: "#f1f5f9",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                          marginBottom: "1rem"
                        }}
                      >
                        <i
                          className={`fa-solid ${sector.icon || "fa-building"}`}
                          style={{ fontSize: 36, lineHeight: 1, color: NAVBAR_BLUE_DARK }}
                          aria-hidden="true"
                        />
                      </div>
                      <h2
                        id={idx === 0 ? "sectors-scroll-story-title" : undefined}
                        className="font-[Rajdhani] text-[22px] md:text-[28px] lg:text-[32px] font-[700] uppercase leading-tight mb-2"
                        style={{ color: NAVBAR_BLUE_DARK }}
                      >
                        {t(`${NS}.items.${sector.key}.title`)}
                      </h2>
                      {t(`sectors.subtitles.${sector.key}`) && t(`sectors.subtitles.${sector.key}`) !== `sectors.subtitles.${sector.key}` && (
                        <span className="inline-block text-xs font-[Rajdhani] font-[500] mb-4 px-3 py-1 rounded-full" style={{ color: `${NAVBAR_BLUE_DARK}b3`, backgroundColor: `${NAVBAR_BLUE_DARK}14` }}>
                          {t(`sectors.subtitles.${sector.key}`)}
                        </span>
                      )}
                      <SmartLink
                        to="/sectors"
                        className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-[Rajdhani] text-base md:text-lg font-[600] uppercase text-white whitespace-nowrap shadow-md transition-all duration-200 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(40,80,158)]"
                        style={{ background: NAVBAR_BLUE, letterSpacing: "0.5px" }}
                        aria-label={t(`${NS}.items.${sector.key}.ariaLabel`, { title: t(`${NS}.items.${sector.key}.title`) })}
                      >
                        {t("nav.sectors")}
                        <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true" />
                      </SmartLink>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectorsScrollStory
