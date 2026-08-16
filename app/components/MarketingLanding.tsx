const steps = [
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
];

const features = [
  { title: "כתובת אישית לחנות", body: "כל עסק מקבל סאב-דומיין משלו תחת הדומיין הראשי — נראה מקצועי מהיום הראשון." },
  { title: "הזמנות ישירות לוואטסאפ", body: "בלי עמוד תשלום מסובך. הלקוח שולח הודעה, אתם סוגרים את העסקה כרגיל." },
  { title: "דשבורד ניהול פשוט", body: "מוסיפים, עורכים ומוחקים מוצרים בעצמכם — בלי לגעת בקוד ובלי לחכות למפתח." },
  { title: "תמונות שמטופלות אוטומטית", body: "מעלים תמונה מהטלפון והמערכת דואגת לדחיסה ולאיכות התצוגה, בכל מכשיר." },
  { title: "תלת-לשוני מהקופסה", body: "עברית, ערבית ואנגלית זמינות ללקוחות שלכם בלחיצת כפתור, בלי עבודה נוספת." },
  { title: "בנוי למובייל", body: "רוב הלקוחות גולשים מהטלפון — כך גם החנות שלכם נראית ומתפקדת הכי טוב שם." },
];

export default function MarketingLanding() {
  return (
    <div className="flex flex-1 flex-col bg-background bg-noise">
      <header className="sticky top-0 z-40 border-b border-gold/15 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <span className="font-display text-lg italic font-semibold text-gold-bright">
            Vitrina
          </span>
          <a
            href="/dashboard/login"
            className="text-xs font-medium text-foreground/60 underline-offset-4 hover:text-gold-bright hover:underline"
          >
            כניסת בעלי חנויות
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 pt-12 pb-10 text-center sm:px-6 sm:pt-20">
          <span className="animate-shimmer inline-block rounded-full border border-gold/40 bg-gradient-to-r from-surface-2 via-surface to-surface-2 bg-[length:200%_100%] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
            לעסקים קטנים
          </span>
          <h1 className="mt-5 font-display text-4xl italic font-semibold leading-[1.1] text-foreground sm:text-5xl">
            לעסק שלכם מגיע
            <br />
            <span className="text-gradient-gold not-italic">חלון ראווה משלו</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/60 sm:text-base">
            פותחים חנות אונליין עם כתובת משלכם תוך דקות, מעלים מוצרים מהדשבורד, והלקוחות מזמינים
            ישירות בוואטסאפ — בלי מפתח, בלי סליקה, בלי סיבוכים.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/dashboard/signup"
              className="rounded-full bg-gradient-to-r from-gold-bright to-gold px-6 py-3 text-sm font-semibold text-[#171009] shadow-lg shadow-gold/20 transition-transform active:scale-95"
            >
              פתחו חנות בחינם
            </a>
            <a
              href="/?tenant=elamar"
              className="rounded-full border border-gold/25 px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-gold/50 hover:text-gold-bright"
            >
              לדוגמה חיה
            </a>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gold/10 bg-surface p-5"
              >
                <span className="font-display text-2xl italic font-semibold text-gold/50">
                  {step.number}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl italic font-semibold text-foreground">
            הכל כלול
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gold/10 bg-surface p-5"
              >
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-16 mt-14 max-w-xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl italic font-semibold text-foreground">
            מוכנים להיות אונליין?
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-foreground/60">
            ההרשמה חינמית ולוקחת פחות מדקה. אין צורך בכרטיס אשראי.
          </p>
          <a
            href="/dashboard/signup"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-gold-bright to-gold px-6 py-3 text-sm font-semibold text-[#171009] shadow-lg shadow-gold/20 transition-transform active:scale-95"
          >
            פתחו את החנות שלכם
          </a>
        </section>
      </main>

      <footer className="border-t border-gold/10 py-6 text-center text-xs text-foreground/40">
        Vitrina — פלטפורמת חנויות לעסקים קטנים
      </footer>
    </div>
  );
}
