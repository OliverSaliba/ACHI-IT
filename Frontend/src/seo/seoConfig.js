import { hasFilterParams } from "./urlUtils"

const BASE_URL = "https://achiscaffolding.com"
const SITE_NAME = "ACHI Scaffolding"

export const DEFAULT_SEO = {
  en: {
    title: "Construction & Industrial Scaffolding Systems | ACHI Scaffolding",
    description:
      "ACHI Scaffolding delivers access systems, shoring, and scaffolding solutions for construction, restoration, and industrial projects. Request technical consultation.",
  },
  fr: {
    title: "Entreprise d’échafaudage au Liban | ACHI",
    description:
      "ACHI Scaffolding fournit des systèmes d’accès, d’étaiement et d’échafaudage pour la construction, la restauration et les sites industriels au Liban.",
  },
  ar: {
    title: "عشي للسقالات | شركة سقالات في لبنان",
    description:
      "تقدم ACHI Scaffolding خدمات السقالات وأنظمة الوصول والتدعيم للمشاريع الإنشائية والصناعية وأعمال الترميم في لبنان.",
  },
  ogImage: `${BASE_URL}/assets/ArchiScaffoldinglogo.png`,
  siteName: SITE_NAME,
}

export const ROUTE_SEO_CONFIG = {
  "/": {
    en: {
      title: "Scaffolding Company in Lebanon | ACHI Scaffolding",
      description:
        "Professional scaffolding services in Lebanon: access systems, shoring, and engineered solutions for construction, restoration, and industrial projects.",
    },
    fr: {
      title: "Entreprise d’échafaudage au Liban | ACHI",
      description:
        "Services d’échafaudage au Liban : systèmes d’accès, étaiement et solutions techniques pour la construction, la restauration et l’industrie.",
    },
    ar: {
      title: "عشي للسقالات | شركة سقالات في لبنان",
      description:
        "خدمات سقالات في لبنان: أنظمة وصول، تدعيم وشدات، وحلول هندسية لمشاريع البناء والترميم والصناعة.",
    },
    indexable: true,
  },

  "/about": {
    en: {
      title: "About Us | ACHI Scaffolding",
      description:
        "Learn about ACHI Scaffolding, a leading provider of construction and industrial scaffolding systems, access solutions, and technical expertise.",
    },
    fr: {
      title: "À propos | ACHI",
      description:
        "Découvrez ACHI Scaffolding, entreprise d’échafaudage au Liban spécialisée en solutions d’accès, d’étaiement et expertise technique.",
    },
    ar: {
      title: "من نحن | عشي للسقالات",
      description:
        "تعرف على ACHI Scaffolding شركة سقالات في لبنان تقدم حلول الوصول والتدعيم وخبرة فنية للمشاريع الصناعية والإنشائية.",
    },
    indexable: true,
  },

  "/products": {
    en: {
      title: "Scaffolding Products | ACHI Scaffolding",
      description:
        "Browse scaffolding products, access systems, shoring equipment, and temporary works components for industrial and commercial projects.",
    },
    fr: {
      title: "Produits d’échafaudage | ACHI",
      description:
        "Produits et équipements d’échafaudage : systèmes d’accès, étaiement, coffrage et composants de travaux temporaires.",
    },
    ar: {
      title: "منتجات السقالات | عشي للسقالات",
      description:
        "منتجات ومعدات السقالات: أنظمة الوصول، التدعيم، الشدات والقوالب، وملحقات الأعمال المؤقتة.",
    },
    indexable: true,
  },

  "/services": {
    en: {
      title: "Scaffolding Services | ACHI Scaffolding",
      description:
        "Scaffolding installation, dismantling, supervision, rental, and engineered temporary works for construction and industrial projects.",
    },
    fr: {
      title: "Services d’échafaudage | ACHI",
      description:
        "Montage, démontage, supervision, location d’échafaudages, étaiement et solutions de travaux temporaires pour chantiers et sites industriels.",
    },
    ar: {
      title: "خدمات السقالات | عشي للسقالات",
      description:
        "تركيب وفك وإشراف وتأجير السقالات، وخدمات التدعيم وأعمال مؤقتة هندسية للمشاريع الإنشائية والصناعية.",
    },
    indexable: true,
  },

  "/services/serviceItem": {
    en: {
      title: "Scaffolding Service | ACHI Scaffolding",
      description: "Service details for our scaffolding and temporary works solutions.",
    },
    fr: {
      title: "Service d’échafaudage | ACHI",
      description: "Détails du service : échafaudage, accès temporaire, étaiement et travaux temporaires.",
    },
    ar: {
      title: "خدمة سقالات | عشي للسقالات",
      description: "تفاصيل الخدمة ضمن حلول السقالات وأنظمة الوصول والتدعيم والأعمال المؤقتة.",
    },
    indexable: false,
  },

  "/projects": {
    en: {
      title: "Our Projects | ACHI Scaffolding",
      description: "Explore our scaffolding project portfolio across construction, restoration, and industrial sectors.",
    },
    fr: {
      title: "Projets | ACHI",
      description: "Réalisations en échafaudage pour la construction, la restauration et la maintenance industrielle.",
    },
    ar: {
      title: "المشاريع | عشي للسقالات",
      description: "استعرض مشاريع السقالات في البناء والترميم والصيانة الصناعية.",
    },
    indexable: true,
  },

  "/sectors": {
    en: {
      title: "Industry Sectors | ACHI Scaffolding",
      description: "Construction, restoration, industrial maintenance, infrastructure, and events.",
    },
    fr: {
      title: "Secteurs | ACHI",
      description: "Construction, restauration, maintenance industrielle, infrastructures et événements.",
    },
    ar: {
      title: "القطاعات | عشي للسقالات",
      description: "البناء والترميم والصيانة الصناعية والبنية التحتية والفعاليات.",
    },
    indexable: true,
  },

  "/gallery": {
    en: { title: "Project Gallery | ACHI Scaffolding", description: "Scaffolding installations and project highlights." },
    fr: { title: "Galerie | ACHI", description: "Installations d’échafaudage et projets réalisés." },
    ar: { title: "المعرض | عشي للسقالات", description: "صور تركيبات السقالات وأبرز المشاريع." },
    indexable: true,
  },

  "/blog": {
    en: { title: "Blog | ACHI Scaffolding", description: "Insights on scaffolding systems, temporary works, safety, and execution." },
    fr: { title: "Blog | ACHI", description: "Conseils et informations sur l’échafaudage, les travaux temporaires et la sécurité chantier." },
    ar: { title: "المدونة | عشي للسقالات", description: "مقالات عن السقالات والأعمال المؤقتة والسلامة والتنفيذ في الموقع." },
    indexable: true,
  },

  "/blog-post-1": {
    en: { title: "Blog Post | ACHI Scaffolding", description: "Scaffolding and temporary works insights." },
    fr: { title: "Article | ACHI", description: "Échafaudage et travaux temporaires : conseils." },
    ar: { title: "مقال | عشي للسقالات", description: "محتوى عن السقالات والأعمال المؤقتة." },
    indexable: true,
  },
  "/blog-post-2": {
    en: { title: "Blog Post | ACHI Scaffolding", description: "Scaffolding and temporary works insights." },
    fr: { title: "Article | ACHI", description: "Échafaudage et travaux temporaires : conseils." },
    ar: { title: "مقال | عشي للسقالات", description: "محتوى عن السقالات والأعمال المؤقتة." },
    indexable: true,
  },
  "/blog-post-3": {
    en: { title: "Blog Post | ACHI Scaffolding", description: "Scaffolding and temporary works insights." },
    fr: { title: "Article | ACHI", description: "Échafaudage et travaux temporaires : conseils." },
    ar: { title: "مقال | عشي للسقالات", description: "محتوى عن السقالات والأعمال المؤقتة." },
    indexable: true,
  },

  "/careers": {
    en: {
      title: "Careers | ACHI Scaffolding",
      description:
        "Explore career opportunities at ACHI Scaffolding. Join a professional scaffolding company and temporary works contractor delivering complex projects across Lebanon.",
      canonical: "/careers",
    },
    fr: {
      title: "Carrières | ACHI",
      description:
        "Découvrez les opportunités de carrière chez ACHI Scaffolding. Rejoignez une entreprise d’échafaudage et de travaux temporaires au Liban.",
      canonical: "/fr/careers",
    },
    ar: {
      title: "الوظائف | عشي للسقالات",
      description:
        "استكشف فرص العمل لدى عشي للسقالات. انضم إلى شركة سقالات ومقاول أعمال مؤقتة ينفذ مشاريع معقدة في لبنان.",
      canonical: "/lb/careers",
    },
    indexable: true,
  }

}

export const NOINDEX_PATTERNS = [/^\/admin/, /^\/login/, /^\/dashboard/, /^\/cart/, /^\/checkout/, /^\/thank-you/]

export const isRouteIndexable = (pathname, search = "", lang = "en") => {
  for (const pattern of NOINDEX_PATTERNS) {
    if (pattern.test(pathname)) return false
  }
  if (hasFilterParams(pathname + search)) return false

  const routeConfig = ROUTE_SEO_CONFIG[pathname]
  if (!routeConfig) return true

  if (routeConfig.indexable === false) return false

  const langCfg = routeConfig[lang]
  if (langCfg && langCfg.indexable === false) return false

  return true
}

export const getRouteSEO = (pathname, lang = "en", search = "") => {
  const routeConfig = ROUTE_SEO_CONFIG[pathname] || {}
  const cfg = routeConfig[lang] || routeConfig.en || {}
  const defaults = DEFAULT_SEO[lang] || DEFAULT_SEO.en

  return {
    title: cfg.title || defaults.title,
    description: cfg.description || defaults.description,
    ogImage: cfg.ogImage || DEFAULT_SEO.ogImage,
    canonical: cfg.canonical || "",
    indexable: cfg.indexable !== undefined ? cfg.indexable : isRouteIndexable(pathname, search, lang),
  }
}

export const CANONICAL_ROUTES = [
  "/",
  "/about",
  "/products",
  "/services",
  "/projects",
  "/sectors",
  "/gallery",
  "/blog",
  "/blog-post-1",
  "/blog-post-2",
  "/blog-post-3",
  "/careers",
]
