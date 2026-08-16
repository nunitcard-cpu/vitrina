export type Locale = "he" | "ar" | "en";

export const locales: Locale[] = ["he", "ar", "en"];
export const defaultLocale: Locale = "he";

type UiText = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroCta: string;
  heroDelivery: string;
  collectionHeading: string;
  piecesSuffix: (count: number) => string;
  orderViaWhatsapp: string;
  productMessage: (name: string, price: number) => string;
  genericMessage: string;
  callLabel: string;
  orderNowLabel: string;
  shopLabel: string;
};

export const localeLabels: Record<Locale, string> = {
  he: "עברית",
  en: "English",
  ar: "العربية",
};

export const uiText: Record<Locale, UiText> = {
  he: {
    heroBadge: "קולקציית העונה החדשה",
    heroTitleLine1: "רהיטים שנועדו",
    heroTitleLine2: "להישאר",
    heroSubtitle:
      "מיטות, ספות וכורסאות בעבודת יד לבית המודרני. הזמנה תוך דקות — משלוח עד הבית בתל אביב.",
    heroCta: "לצפייה בקולקציה",
    heroDelivery: "משלוח חינם מעל ₪500",
    collectionHeading: "הקולקציה",
    piecesSuffix: (count) => `${count} פריטים`,
    orderViaWhatsapp: "הזמנה בוואטסאפ",
    productMessage: (name, price) =>
      `היי! אשמח להזמין את "${name}" (₪${price}). זה זמין?`,
    genericMessage: "היי! יש לי שאלה לגבי הקולקציה שלכם.",
    callLabel: "התקשרו",
    orderNowLabel: "הזמינו עכשיו",
    shopLabel: "לקנייה",
  },
  en: {
    heroBadge: "New Season Collection",
    heroTitleLine1: "Furniture built",
    heroTitleLine2: "to last",
    heroSubtitle:
      "Handcrafted beds, sofas and armchairs for the modern home. Order in minutes — home delivery in Tel Aviv.",
    heroCta: "Shop the Collection",
    heroDelivery: "Free delivery over ₪500",
    collectionHeading: "The Collection",
    piecesSuffix: (count) => `${count} pieces`,
    orderViaWhatsapp: "Order via WhatsApp",
    productMessage: (name, price) =>
      `Hi! I'd like to order the "${name}" (₪${price}). Is it available?`,
    genericMessage: "Hi! I have a question about your collection.",
    callLabel: "Call",
    orderNowLabel: "Order Now",
    shopLabel: "Shop",
  },
  ar: {
    heroBadge: "تشكيلة الموسم الجديد",
    heroTitleLine1: "أثاث مصمم",
    heroTitleLine2: "ليدوم",
    heroSubtitle:
      "أسرّة وكنبايات وكراسي بصناعة يدوية للبيت العصري. اطلب خلال دقايق — ووصل لباب بيتك بتل أبيب.",
    heroCta: "تسوق التشكيلة",
    heroDelivery: "توصيل مجاني فوق ₪500",
    collectionHeading: "التشكيلة",
    piecesSuffix: (count) => `${count} منتجات`,
    orderViaWhatsapp: "اطلب عبر واتساب",
    productMessage: (name, price) =>
      `مرحبا! بدي اطلب "${name}" (₪${price}). متوفر؟`,
    genericMessage: "مرحبا! عندي سؤال عن تشكيلتكم.",
    callLabel: "اتصل",
    orderNowLabel: "اطلب الآن",
    shopLabel: "تسوق",
  },
};

export type TagKey = "New" | "Bestseller" | "Sale";

export const tagLabels: Record<Locale, Record<TagKey, string>> = {
  he: { New: "חדש", Bestseller: "רב מכר", Sale: "מבצע" },
  ar: { New: "جديد", Bestseller: "الأكثر مبيعاً", Sale: "عرض" },
  en: { New: "New", Bestseller: "Bestseller", Sale: "Sale" },
};
