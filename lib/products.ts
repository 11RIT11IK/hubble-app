export type Product =  {
	slug: string;
  name: string;
  category: string;
  tagline: string;
  features: string[];
}


export const MODEL_URL =
"/models/c41.glb";


export const products: Product[] = [
	 {
    slug: "c41qs",
    name: "C41QS",
    category: "NB-IoT module",
    tagline: "Compact NB2/NB1 module for low-power, wide-area IoT.",
    features: ["NB2 / NB1", "Optional GNSS", "Optional eSIM"],
  },
  {
    slug: "c16qs",
    name: "C16QS",
    category: "LTE module",
    tagline: "Cost-competitive cellular module with regional variants.",
    features: ["Low cost", "Regional variants", "Optional eSIM"],
  },
  {
    slug: "c42gm",
    name: "C42GM",
    category: "LPWA module",
    tagline: "Low-power cellular module for connected devices.",
    features: ["Low power", "GNSS ready", "Hubble managed"],
  },
  {
    slug: "c10gs",
    name: "C10GS",
    category: "GSM module",
    tagline: "Simple, reliable connectivity for legacy and basic IoT.",
    features: ["GSM / GPRS", "Compact design", "Hubble managed"],
  },
  {
    slug: "cqs315",
    name: "CQS315",
    category: "LTE Cat 4 smart module",
    tagline: "Smart module for IoT and automotive applications.",
    features: ["LTE Cat 4", "Optional eSIM", "Hubble managed"],
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}