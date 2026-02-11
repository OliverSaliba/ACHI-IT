// Frontend/src/seo/SmartLink.jsx
import React from "react"
import { Link } from "react-router-dom"
import { buildInternalHref } from "./urlUtils"
import { buildPathWithLang, stripPublicBase, SUPPORTED_PREFIXES } from "../utils/langRouting"
import { useLangRouter } from "../routing/LangRouter"

const isExternal = (to) => {
  if (typeof to !== "string") return false
  return /^(https?:)?\/\//i.test(to) || /^mailto:/i.test(to) || /^tel:/i.test(to)
}

const hasLocalePrefix = (pathname) => {
  const clean = stripPublicBase(pathname || "/")
  const seg = clean.split("/").filter(Boolean)[0]?.toLowerCase()
  return SUPPORTED_PREFIXES.includes(seg)
}

const splitToParts = (to) => {
  if (typeof to !== "string") {
    return {
      pathname: to?.pathname || "/",
      search: to?.search || "",
      hash: to?.hash || "",
      rest: to || {},
    }
  }

  let pathname = to
  let search = ""
  let hash = ""

  const hashIndex = to.indexOf("#")
  if (hashIndex !== -1) {
    hash = to.slice(hashIndex)
    pathname = to.slice(0, hashIndex)
  }

  const queryIndex = pathname.indexOf("?")
  if (queryIndex !== -1) {
    search = pathname.slice(queryIndex)
    pathname = pathname.slice(0, queryIndex)
  }

  return { pathname: pathname || "/", search, hash, rest: null }
}

const SmartLink = ({ to, preserveLang = true, ...props }) => {
  const { urlLang } = useLangRouter()

  if (isExternal(to)) {
    return <a href={to} {...props} />
  }

  const parts = splitToParts(to)
  const normalizedPathname = buildInternalHref(typeof to === "string" ? to : (to?.pathname || "/")) || "/"

  let finalPathname = normalizedPathname
  if (preserveLang && urlLang && !hasLocalePrefix(normalizedPathname)) {
    finalPathname = buildPathWithLang(urlLang, normalizedPathname)
  }

  if (parts.rest) {
    return <Link to={{ ...parts.rest, pathname: finalPathname }} {...props} />
  }

  const finalTo = `${finalPathname}${parts.search || ""}${parts.hash || ""}`
  return <Link to={finalTo} {...props} />
}

export default SmartLink
