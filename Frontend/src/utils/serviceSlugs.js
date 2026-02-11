export const SERVICE_KEY_TO_SLUG = {
  facades: "facade-scaffolding",
  suspended: "suspended-scaffolding",
  proppingShoring: "propping-shoring",
  adjustableProps: "adjustable-props",
  highCapacity: "high-capacity-structures",
  eventScaffolding: "event-scaffolding",
}

export const SERVICE_SLUG_TO_KEY = Object.fromEntries(
  Object.entries(SERVICE_KEY_TO_SLUG).map(([k, v]) => [v, k])
)

export function getSlugForServiceKey(key) {
  return SERVICE_KEY_TO_SLUG[String(key || "").trim()] || null
}

export function getServiceKeyForSlug(slug) {
  return SERVICE_SLUG_TO_KEY[String(slug || "").trim()] || null
}
