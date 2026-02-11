// // src/components/AeoJsonLd.js
// import React, { useEffect, useRef } from "react"

// /**
//  * JSON-LD Schema Injector for AEO
//  * Safely injects JSON-LD without duplicates on SPA navigation
//  */
// const AeoJsonLd = ({ schema, id }) => {
//   const scriptRef = useRef(null)

//   useEffect(() => {
//     if (!schema || !id) return

//     // Remove existing script with same ID
//     const existing = document.getElementById(id)
//     if (existing) {
//       existing.remove()
//     }

//     // Create new script element
//     const script = document.createElement("script")
//     script.id = id
//     script.type = "application/ld+json"
//     script.text = JSON.stringify(schema)
//     document.head.appendChild(script)

//     scriptRef.current = script

//     // Cleanup on unmount
//     return () => {
//       if (scriptRef.current && scriptRef.current.parentNode) {
//         scriptRef.current.parentNode.removeChild(scriptRef.current)
//       }
//     }
//   }, [schema, id])

//   return null
// }

// export default AeoJsonLd


// src/components/AeoJsonLd.js

import React from "react"

const AeoJsonLd = () => null

export default AeoJsonLd
