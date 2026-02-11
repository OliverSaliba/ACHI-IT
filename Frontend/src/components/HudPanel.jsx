// Italian Chi Siamo only – HUD-style panel with corner brackets. No text.
import React from "react"
import styles from "../pages/ChiSiamoIt.module.css"

export function HudPanel({ children, className = "", id }) {
  return (
    <div id={id} className={`${styles.hudPanel} ${className}`.trim()}>
      <span className={styles.hudPanelGlint} aria-hidden="true" />
      <span className={styles.hudCorner} data-corner="tl" aria-hidden="true" />
      <span className={styles.hudCorner} data-corner="tr" aria-hidden="true" />
      <span className={styles.hudCorner} data-corner="bl" aria-hidden="true" />
      <span className={styles.hudCorner} data-corner="br" aria-hidden="true" />
      {children}
    </div>
  )
}

/** Italian-only: HUD panel with title (from i18n). No hardcoded strings. */
export function HudCard({ title, children, className = "", id }) {
  return (
    <HudPanel id={id} className={className}>
      {title != null && title !== "" ? (
        <h2 className={styles.panelH2}>{title}</h2>
      ) : null}
      {children}
    </HudPanel>
  )
}
