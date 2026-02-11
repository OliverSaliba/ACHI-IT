import { publicAsset } from "../utils/publicAsset";

export const productsCatalog = [
{
  slug: "double-coupler",
  model: publicAsset("/assets/products/double_coupler.glb"),
  titleKey: "products.catalog.doubleCoupler.title",
  descKey: "products.catalog.doubleCoupler.desc",
oorbit: "0.605rad 1.473rad 0.661m",
target: "0.029m -0.122m -0.074m",

  specsKeys: [
  "products3d.items.doubleCoupler.specs.0",
  "products3d.items.doubleCoupler.specs.1",
  "products3d.items.doubleCoupler.specs.2",
],

  locked: true,
},
{
  slug: "swivel-coupler",
  model: publicAsset("/assets/products/swivel_coupler.glb"),
  titleKey: "products.catalog.swivelCoupler.title",
  descKey: "products.catalog.swivelCoupler.desc",
orbit: "-0.196rad 1.222rad 0.805m",
target: "0.041m -0.099m 0.016m",



  specsKeys: [
  "products3d.items.swivelCoupler.specs.0",
  "products3d.items.swivelCoupler.specs.1",
  "products3d.items.swivelCoupler.specs.2",
],

  locked: true
},
{
  slug: "half-coupler",
  model: publicAsset("/assets/products/half_coupler.glb"),
  titleKey: "products.catalog.halfCoupler.title",
  descKey: "products.catalog.halfCoupler.desc",
orbit: "0.000rad 1.222rad 0.550m",
target: "-0.124m -0.028m -0.004m",



  specsKeys: [
  "products3d.items.halfCoupler.specs.0",
  "products3d.items.halfCoupler.specs.1",
  "products3d.items.halfCoupler.specs.2",
],
  locked: true
},
  
{
  slug: "joint-coupler",
  model: publicAsset("/assets/products/joint_coupler.glb"),
  titleKey: "products.catalog.jointCoupler.title",
  descKey: "products.catalog.jointCoupler.desc",
orbit: "0.046rad 1.222rad 0.574m",
target: "-0.162m -0.033m -0.029m",


specsKeys: [
  "products3d.items.jointCoupler.specs.0",
  "products3d.items.jointCoupler.specs.1",
  "products3d.items.jointCoupler.specs.2",
],
  locked: true
},

{
  slug: "h-frame",
  model: publicAsset("/assets/products/h_frame.glb"),
  titleKey: "products.catalog.hFrame.title",
  descKey: "products.catalog.hFrame.desc",
orbit: "-0.158rad 1.222rad 6.811m",
target: "0.492m 0.315m -0.770m",


  specsKeys: [
  "products3d.items.hFrame.specs.0",
  "products3d.items.hFrame.specs.1",
  "products3d.items.hFrame.specs.2",
],
  locked: true
},

{
  slug: "stirrup-head",
  model: publicAsset("/assets/products/stirrup_head.glb"),
  titleKey: "products.catalog.stirrupHead.title",
  descKey: "products.catalog.stirrupHead.desc",
orbit: "0.000rad 1.222rad 7.848m",
target: "-0.001m 0.414m 0.008m",


  specsKeys: [
  "products3d.items.stirrupHead.specs.0",
  "products3d.items.stirrupHead.specs.1",
  "products3d.items.stirrupHead.specs.2",
],
  locked: true
},

]

export const getProducts = () => productsCatalog

export const findProductBySlug = (slug) => productsCatalog.find((p) => p.slug === slug)
