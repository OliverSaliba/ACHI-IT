// src/components/AeoFaqSection.js
import React, { useMemo, useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"

/**
 * FAQ Section for AEO
 * Premium accordion-style FAQ section with smooth animations
 * All content remains in DOM for AEO/SEO purposes
 */
const AeoFaqSection = () => {
  const { t, i18n } = useTranslation()
  const isArabic = String(i18n.resolvedLanguage || i18n.language).toLowerCase().startsWith("ar")
  const [openIndex, setOpenIndex] = useState(null) // All collapsed on initial load
  const panelRefs = useRef([])
  const [isDesktop, setIsDesktop] = useState(false)

  // Close all FAQs on language change (reset state)
  useEffect(() => {
    setOpenIndex(null)
    panelRefs.current.forEach((ref) => {
      if (ref) ref.style.maxHeight = "0px"
    })
  }, [i18n.language])

  // Detect desktop for responsive padding
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  const faqs = useMemo(
    () => [
      {
        q: t("aeoFaq.q1.question", "Who is ACHI Scaffolding?"),
        a: t(
          "aeoFaq.q1.answer",
          "ACHI Scaffolding is a scaffolding company in Lebanon providing access scaffolding, façade scaffolding, and temporary access solutions. The company serves commercial, residential, and industrial projects across Lebanon, including Beirut, Mount Lebanon, North Lebanon, South Lebanon, and the Bekaa region."
        ),
      },
      {
        q: t("aeoFaq.q2.question", "What scaffolding services does ACHI provide?"),
        a: t(
          "aeoFaq.q2.answer",
          "ACHI Scaffolding provides access scaffolding systems for construction and maintenance, façade scaffolding for building exteriors and renovation, temporary access solutions for occupied buildings and hotels, and shoring and structural propping systems. The company offers installation, rental, and specialized laborforce services."
        ),
      },
      {
        q: t("aeoFaq.q3.question", "Where does ACHI Scaffolding operate?"),
        a: t(
          "aeoFaq.q3.answer",
          "ACHI Scaffolding operates across Lebanon, serving clients in Beirut, Mount Lebanon, North Lebanon, South Lebanon, and the Bekaa region. The company provides scaffolding services for projects throughout the country."
        ),
      },
      {
        q: t("aeoFaq.q4.question", "Does ACHI provide scaffolding for occupied buildings and hotels?"),
        a: t(
          "aeoFaq.q4.answer",
          "Yes, ACHI Scaffolding provides scaffolding solutions for occupied buildings and hotels. The company specializes in temporary access systems that allow work to proceed while maintaining building operations and guest safety. ACHI Scaffolding has experience with phased installation and controlled access for sensitive urban sites."
        ),
      },
      {
        q: t("aeoFaq.q5.question", "How can clients contact ACHI Scaffolding?"),
        a: t(
          "aeoFaq.q5.answer",
          "Clients can contact ACHI Scaffolding by phone at +961 03 322 811, by email at achi.gr@hotmail.com, or via WhatsApp. The company provides technical consultation and project support for scaffolding requirements across Lebanon."
        ),
      },
    ],
    [t]
  )

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Update max-height when opening/closing for smooth animation
  useEffect(() => {
    panelRefs.current.forEach((ref, index) => {
      if (ref) {
        if (openIndex === index) {
          // Set to measured height when opening
          const height = ref.scrollHeight
          ref.style.maxHeight = `${height}px`
        } else {
          // Set to 0 when closing
          ref.style.maxHeight = "0px"
        }
      }
    })
  }, [openIndex])

  // Initialize all panels to closed state on mount
  useEffect(() => {
    panelRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.maxHeight = "0px"
      }
    })
  }, [])

  // Chevron Icon Component
  const ChevronIcon = ({ isOpen }) => (
    <svg
      className="w-[18px] h-[18px] text-[#0B2B5B] transition-transform duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex-shrink-0"
      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  )

  return (
    <section id="faq" className="bg-[#f8f9fa] py-[40px] md:py-[64px]">
      <div className="w-[90%] max-w-[980px] mx-auto px-[20px]">
        <h2
          className="font-[Rajdhani] text-[#003A80] text-[26px] md:text-[36px] font-[700] mb-[24px] text-center tracking-normal"
        >
          {t("aeoFaq.title", "Frequently Asked Questions")}
        </h2>

        <div className="space-y-[14px]" style={{ direction: isArabic ? "rtl" : "ltr" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const answerId = `faq-answer-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <article
                key={index}
                className="bg-white rounded-none border border-[rgba(15,23,42,0.10)] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[rgba(15,23,42,0.15)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                {/* Question Button */}
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full flex items-center justify-between gap-[16px] focus:outline-none focus:ring-2 focus:ring-[#0B2B5B] focus:ring-offset-2 focus:ring-offset-white rounded-none transition-colors duration-150"
                  style={{
                    paddingInlineStart: isDesktop ? "22px" : "16px",
                    paddingInlineEnd: isDesktop ? "22px" : "16px",
                    paddingBlockStart: isDesktop ? "20px" : "16px",
                    paddingBlockEnd: isDesktop ? "20px" : "16px",
                  }}
                >
                  <h3
                    className="font-[Rajdhani] text-[#0B2B5B] text-[16px] md:text-[18px] font-[600] leading-[1.4] flex-1"
                    style={{ textAlign: isArabic ? "right" : "left" }}
                  >
                    {faq.q}
                  </h3>
                  <ChevronIcon isOpen={isOpen} />
                </button>

                {/* Answer Panel - Always in DOM for AEO */}
                <div
                  ref={(el) => (panelRefs.current[index] = el)}
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden transition-all duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    maxHeight: isOpen && panelRefs.current[index] ? `${panelRefs.current[index].scrollHeight}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-4px)",
                    transitionProperty: "max-height, opacity, transform",
                  }}
                >
                  <div
                    className="border-t border-[rgba(15,23,42,0.08)]"
                    style={{
                      paddingInlineStart: isDesktop ? "22px" : "16px",
                      paddingInlineEnd: isDesktop ? "22px" : "16px",
                      paddingBlockEnd: isDesktop ? "20px" : "16px",
                    }}
                  >
                    <div
                      style={{
                        paddingBlockStart: isDesktop ? "20px" : "16px",
                        paddingBlockEnd: "0px",
                        paddingInlineStart: "0px",
                        paddingInlineEnd: "0px",
                      }}
                    >
                      <p
                        className="font-['Open_Sans'] text-[16px] leading-[1.7] text-[rgba(15,23,42,0.80)]"
                        style={{ textAlign: isArabic ? "right" : "left" }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AeoFaqSection
