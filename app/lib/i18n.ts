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

// Platform marketing/landing page copy. Hebrew and English only (Arabic
// falls back to English) — same scope decision as the dashboard.
type LandingText = {
  ownerLogin: string;
  eyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  ctaCreateStore: string;
  ctaLiveExample: string;
  steps: { number: string; title: string; body: string }[];
  featuresHeading: string;
  features: { title: string; body: string }[];
  finalHeading: string;
  finalSubtitle: string;
  finalCta: string;
  footer: string;
};

const landingTextHe: LandingText = {
  ownerLogin: "כניסת בעלי חנויות",
  eyebrow: "לעסקים קטנים",
  heroTitleLine1: "לעסק שלכם מגיע",
  heroTitleLine2: "חלון ראווה משלו",
  heroSubtitle:
    "פותחים חנות אונליין עם כתובת משלכם תוך דקות, מעלים מוצרים מהדשבורד, והלקוחות מזמינים ישירות בוואטסאפ — בלי מפתח, בלי סליקה, בלי סיבוכים.",
  ctaCreateStore: "פתחו חנות בחינם",
  ctaLiveExample: "לדוגמה חיה",
  steps: [
    {
      number: "01",
      title: "נרשמים ובוחרים כתובת",
      body: "יוצרים חשבון בדקה ובוחרים את שם הסאב-דומיין של החנות — הכתובת שלכם באוויר מיד.",
    },
    {
      number: "02",
      title: "מעלים מוצרים מהדשבורד",
      body: "שם, מחיר ותמונה מהטלפון — התמונה נדחסת ומותאמת אוטומטית, בלי צורך בעריכה.",
    },
    {
      number: "03",
      title: "מקבלים הזמנות בוואטסאפ",
      body: "כל לקוח שלוחץ 'הזמנה' פותח לכם שיחת וואטסאפ מוכנה עם שם המוצר והמחיר. בלי סליקה, בלי מורכבות.",
    },
  ],
  featuresHeading: "הכל כלול",
  features: [
    { title: "כתובת אישית לחנות", body: "כל עסק מקבל סאב-דומיין משלו תחת הדומיין הראשי — נראה מקצועי מהיום הראשון." },
    { title: "הזמנות ישירות לוואטסאפ", body: "בלי עמוד תשלום מסובך. הלקוח שולח הודעה, אתם סוגרים את העסקה כרגיל." },
    { title: "דשבורד ניהול פשוט", body: "מוסיפים, עורכים ומוחקים מוצרים בעצמכם — בלי לגעת בקוד ובלי לחכות למפתח." },
    { title: "תמונות שמטופלות אוטומטית", body: "מעלים תמונה מהטלפון והמערכת דואגת לדחיסה ולאיכות התצוגה, בכל מכשיר." },
    { title: "תלת-לשוני מהקופסה", body: "עברית, ערבית ואנגלית זמינות ללקוחות שלכם בלחיצת כפתור, בלי עבודה נוספת." },
    { title: "בנוי למובייל", body: "רוב הלקוחות גולשים מהטלפון — כך גם החנות שלכם נראית ומתפקדת הכי טוב שם." },
  ],
  finalHeading: "מוכנים להיות אונליין?",
  finalSubtitle: "ההרשמה חינמית ולוקחת פחות מדקה. אין צורך בכרטיס אשראי.",
  finalCta: "פתחו את החנות שלכם",
  footer: "Vitrina — פלטפורמת חנויות לעסקים קטנים",
};

const landingTextEn: LandingText = {
  ownerLogin: "Store owner login",
  eyebrow: "For small businesses",
  heroTitleLine1: "Your business deserves",
  heroTitleLine2: "its own storefront",
  heroSubtitle:
    "Open an online store with your own address in minutes, add products from your dashboard, and customers order straight to WhatsApp — no developer, no payment gateway, no hassle.",
  ctaCreateStore: "Create your store for free",
  ctaLiveExample: "See a live example",
  steps: [
    {
      number: "01",
      title: "Sign up and choose your address",
      body: "Create an account in a minute and pick your store's subdomain — your address is live instantly.",
    },
    {
      number: "02",
      title: "Add products from your dashboard",
      body: "Name, price, and a photo from your phone — the image is compressed and optimized automatically, no editing needed.",
    },
    {
      number: "03",
      title: "Get orders on WhatsApp",
      body: "Every customer who taps 'Order' opens a ready-made WhatsApp chat with the product name and price. No checkout, no complexity.",
    },
  ],
  featuresHeading: "Everything included",
  features: [
    { title: "Your own store address", body: "Every business gets its own subdomain under the main domain — looks professional from day one." },
    { title: "Orders straight to WhatsApp", body: "No complicated checkout page. The customer sends a message, you close the sale as usual." },
    { title: "Simple management dashboard", body: "Add, edit, and delete products yourself — no code, no waiting on a developer." },
    { title: "Images handled automatically", body: "Upload a photo from your phone and the system takes care of compression and display quality on every device." },
    { title: "Trilingual out of the box", body: "Hebrew, Arabic, and English are available to your customers at the tap of a button, no extra work." },
    { title: "Built for mobile", body: "Most customers browse from their phone — so your store looks and works best there too." },
  ],
  finalHeading: "Ready to go online?",
  finalSubtitle: "Signing up is free and takes less than a minute. No credit card required.",
  finalCta: "Open your store",
  footer: "Vitrina — a storefront platform for small businesses",
};

export const landingText: Record<Locale, LandingText> = {
  he: landingTextHe,
  en: landingTextEn,
  ar: landingTextEn,
};
