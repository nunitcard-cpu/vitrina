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

// Store-owner dashboard chrome. Hebrew and English only for now (Arabic
// falls back to English) — this is an internal admin tool, not the
// customer-facing storefront, so full 3-locale coverage isn't needed yet.
type DashboardText = {
  signupTitle: string;
  storeNameLabel: string;
  subdomainLabel: string;
  whatsappLabel: string;
  whatsappPlaceholder: string;
  emailLabel: string;
  passwordLabel: string;
  createStoreButton: string;
  alreadyHaveStore: string;
  logIn: string;
  loginTitle: string;
  checkEmailMessage: string;
  logInButton: string;
  newHere: string;
  createStoreLink: string;
  logOut: string;
  noProducts: string;
  addProductHeading: string;
  productNameLabel: string;
  priceLabel: string;
  originalPriceLabel: string;
  tagLabel: string;
  tagNone: string;
  photoLabel: string;
  uploadingImage: string;
  previewAlt: string;
  saving: string;
  saveChanges: string;
  addProductButton: string;
  editButton: string;
  cancelButton: string;
  deleteButton: string;
};

const dashboardTextHe: DashboardText = {
  signupTitle: "פתחו את החנות שלכם",
  storeNameLabel: "שם החנות",
  subdomainLabel: "סאב-דומיין",
  whatsappLabel: "מספר וואטסאפ (קידומת מדינה + ספרות, בלי +)",
  whatsappPlaceholder: "972501234567",
  emailLabel: "אימייל",
  passwordLabel: "סיסמה",
  createStoreButton: "צור חנות",
  alreadyHaveStore: "כבר יש לך חנות?",
  logIn: "התחברות",
  loginTitle: "כניסת בעלי חנויות",
  checkEmailMessage: "בדקו את המייל שלכם לאישור החשבון, ואז התחברו כאן.",
  logInButton: "התחברות",
  newHere: "חדשים כאן?",
  createStoreLink: "פתחו חנות",
  logOut: "התנתקות",
  noProducts: "אין עדיין מוצרים — הוסיפו את הראשון למטה.",
  addProductHeading: "הוספת מוצר",
  productNameLabel: "שם המוצר",
  priceLabel: "מחיר (₪)",
  originalPriceLabel: "מחיר קודם (אופציונלי, מוצג עם קו חוצה)",
  tagLabel: "תגית",
  tagNone: "ללא",
  photoLabel: "תמונת מוצר",
  uploadingImage: "מעלה תמונה…",
  previewAlt: "תצוגה מקדימה",
  saving: "שומר…",
  saveChanges: "שמור שינויים",
  addProductButton: "הוסף מוצר",
  editButton: "עריכה",
  cancelButton: "ביטול",
  deleteButton: "מחיקה",
};

const dashboardTextEn: DashboardText = {
  signupTitle: "Create your store",
  storeNameLabel: "Store name",
  subdomainLabel: "Subdomain",
  whatsappLabel: "WhatsApp number (country code + digits, no +)",
  whatsappPlaceholder: "972501234567",
  emailLabel: "Email",
  passwordLabel: "Password",
  createStoreButton: "Create store",
  alreadyHaveStore: "Already have a store?",
  logIn: "Log in",
  loginTitle: "Store owner login",
  checkEmailMessage: "Check your email to confirm your account, then log in here.",
  logInButton: "Log in",
  newHere: "New here?",
  createStoreLink: "Create a store",
  logOut: "Log out",
  noProducts: "No products yet — add your first one below.",
  addProductHeading: "Add a product",
  productNameLabel: "Product name",
  priceLabel: "Price (₪)",
  originalPriceLabel: "Original price (optional, shown crossed out)",
  tagLabel: "Tag",
  tagNone: "None",
  photoLabel: "Product photo",
  uploadingImage: "Uploading image…",
  previewAlt: "Preview",
  saving: "Saving…",
  saveChanges: "Save changes",
  addProductButton: "Add product",
  editButton: "Edit",
  cancelButton: "Cancel",
  deleteButton: "Delete",
};

export const dashboardText: Record<Locale, DashboardText> = {
  he: dashboardTextHe,
  en: dashboardTextEn,
  ar: dashboardTextEn,
};
