import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * Simple i18n setup for the bilingual (AR/EN) prototype.
 * - `lang` drives every string via the `t` object.
 * - The provider sets <html lang> and <html dir> so Arabic renders fully RTL
 *   (mirrored layout, not just translated text).
 * - Spacing utilities in components use logical properties (ms-*, me-*, text-start)
 *   so the mirror happens automatically when dir flips.
 */

export type Lang = 'ar' | 'en'

const dict = {
  ar: {
    dir: 'rtl' as const,
    nav: {
      about: 'عن العيادة',
      services: 'خدماتنا',
      why: 'لماذا نغم؟',
      gallery: 'العيادة',
      testimonials: 'آراء مرضانا',
      contact: 'تواصلي معنا',
      book: 'احجزي موعدك',
      menu: 'القائمة',
    },
    hero: {
      eyebrow: 'عيادات نغم الطبية — دمشق',
      title: 'نعود إليكم بخطوة أقوى، ورؤية أكبر.',
      tagline: 'لأن ما بُني بثقتكم يستحق أن يستمر.',
      lead: 'ابتسامتك وصحتك وجمالك بين أيدٍ اختصاصية. مركز متكامل للأسنان والتجميل والعناية الطبية في قلب دمشق — بأجواء راقية صُمّمت من أجلك.',
      ctaPrimary: 'احجزي استشارتك الآن',
      ctaSecondary: 'اكتشفي خدماتنا',
      badge: 'تأسست 2025',
      scroll: 'تابعي للأسفل',
    },
    about: {
      eyebrow: 'عن العيادة',
      title: 'طبيبة تعرف أن التفاصيل الصغيرة تصنع الفرق الكبير',
      p1: 'تقود عيادات نغم الدكتورة نغم سلّوم، اختصاصية طب الفم وجراحة الأسنان، برؤية تجمع بين الدقة الطبية والذوق الرفيع. كل حالة تُدرس بعناية، وكل نتيجة تُصمَّم لتلائم ملامحك أنتِ.',
      p2: 'في عام 2025 أعدنا افتتاح أبوابنا في ساحة الشهبندر بمركز أكبر وتجهيزات أحدث — امتداد طبيعي لثقة مرضانا التي كبرت عاماً بعد عام.',
      markers: [
        { value: 'اختصاص', label: 'طب الفم وجراحة الأسنان' },
        { value: '2025', label: 'انطلاقة جديدة بخطوة أقوى' },
        { value: '10+', label: 'اختصاصات تحت سقف واحد' },
      ],
      cta: 'تعرّفي على خدماتنا',
      portraitCaption: 'د. نغم سلّوم — اختصاصي طب الفم وجراحة الأسنان',
    },
    services: {
      eyebrow: 'خدماتنا',
      title: 'كل ما تحتاجينه لابتسامة واثقة وإطلالة متألقة',
      lead: 'عشرة اختصاصات، فريق واحد، ومكان واحد في قلب دمشق. اختاري ما يناسبك — والباقي علينا.',
      items: [
        { key: 'dental', title: 'طب الأسنان', desc: 'زراعة وعلاجات شاملة — لتأكلي وتتحدثي وتبتسمي بثقة تامة.' },
        { key: 'skin', title: 'البشرة', desc: 'عناية متخصصة تُعيد لبشرتك نضارتها وإشراقها الطبيعي.' },
        { key: 'botox', title: 'البوتوكس', desc: 'ملامح أكثر نعومة وإطلالة أصغر سناً — بمظهر طبيعي لا مصطنع.' },
        { key: 'filler', title: 'الفيلر', desc: 'توازن دقيق للملامح يُبرز جمالك الطبيعي بلمسة خفيفة.' },
        { key: 'mesotherapy', title: 'الميزوثيرابي', desc: 'تغذية عميقة للبشرة والشعر من الداخل — نتائج تلمسينها بنفسك.' },
        { key: 'laser', title: 'الليزر', desc: 'أحدث أجهزة الليزر لبشرة ناعمة ونتائج مريحة وآمنة.' },
        { key: 'surgery', title: 'الجراحات', desc: 'إجراءات جراحية دقيقة بأيدٍ خبيرة وأعلى معايير التعقيم.' },
        { key: 'gynecology', title: 'العيادات النسائية', desc: 'رعاية نسائية شاملة بخصوصية تامة وتفهّم لكل مرحلة من حياتك.' },
        { key: 'mens', title: 'عناية الرجل', desc: 'برامج عناية وتجميل صُمّمت خصيصاً لتلائم احتياجات الرجل.' },
        { key: 'nails', title: 'الأظافر', desc: 'عناية متكاملة بالأظافر بلمسة أنيقة تعكس ذوقك الرفيع.' },
      ],
      cta: 'احجزي استشارتك المجانية',
    },
    why: {
      eyebrow: 'لماذا نغم؟',
      title: 'أربعة أسباب تجعلنا خيارك الأول',
      items: [
        { title: 'فريق من الاختصاصيين', desc: 'كل حالة يشرف عليها طبيب اختصاصي في مجاله — لا حلول عامة، بل خطة علاج مصممة لك وحدك.' },
        { title: 'تجهيزات حديثة', desc: 'أجهزة وتقنيات عصرية في كل اختصاص، لتجربة علاج أدق وأسرع وأكثر راحة.' },
        { title: 'أجواء نسائية عائلية', desc: 'مساحة دافئة وآمنة صُمّمت لتشعري فيها بالراحة من لحظة دخولك — وأهلاً بعائلتك معك.' },
        { title: 'موقع مركزي في دمشق', desc: 'في ساحة الشهبندر على الطريق الواصل لساحة المزرعة — سهلة الوصول من أي مكان في المدينة.' },
      ],
      cta: 'زورونا واكتشفي الفرق',
    },
    gallery: {
      eyebrow: 'داخل العيادة',
      title: 'مساحة صُمّمت لتشبهك',
      lead: 'صور حقيقية من عياداتنا ستُضاف قريباً — هذه لمحة عن الأجواء التي بانتظارك.',
      captions: ['الاستقبال', 'غرفة العلاج', 'قسم التجميل', 'عيادة الأسنان', 'صالة الانتظار', 'جناح الليزر'],
      comingSoon: 'صورة قريباً',
    },
    testimonials: {
      eyebrow: 'آراء مرضانا',
      title: 'ثقتكم هي قصتنا الحقيقية',
      lead: 'كلمات من مرضى اختاروا نغم — وما زالوا يعودون إليها.',
      items: [
        { quote: 'من أول استشارة حسّيت إنو حالتي بأيد أمينة. الاهتمام بالتفاصيل والمتابعة بعد الجلسة شي ما شفته بغير مكان.', name: 'س. م.', service: 'عيادة الأسنان' },
        { quote: 'النتيجة طبيعية جداً وما حدا لاحظ شي غير إنو صرت أرتاح لشكلي بالمراية. شكراً على الذوق والاحتراف.', name: 'ر. ع.', service: 'البوتوكس والفيلر' },
        { quote: 'المكان مرتب والطاقم لطيف، وأهم شي إنو شرحولي كل خطوة قبل ما يبلشوا. تجربة مريحة من الألف للياء.', name: 'ن. ح.', service: 'العناية بالبشرة' },
      ],
      note: 'نتائج كل حالة تختلف من شخص لآخر — اسألي طبيبك عمّا يناسبك أنتِ.',
    },
    contact: {
      eyebrow: 'تواصلي معنا',
      title: 'موعدك الأول على بُعد رسالة واحدة',
      lead: 'اتصلي بنا أو راسلينا على واتساب — سنجيب على أسئلتك ونحجز لك الموعد الأنسب.',
      addressLabel: 'العنوان',
      address: 'دمشق — ساحة الشهبندر، الطريق الواصل لساحة المزرعة',
      phoneLabel: 'اتصلي بنا',
      whatsappCta: 'راسلينا على واتساب',
      mapCta: 'افتحي الموقع على خرائط غوغل',
      mapLabel: 'ساحة الشهبندر — دمشق',
      followLabel: 'تابعينا',
      tabs: { whatsapp: 'واتساب', form: 'راسلينا مباشرة' },
      whatsappHint: 'يفتح واتساب برسالة جاهزة — أسرع طريقة للحجز.',
      form: {
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        servicesLabel: 'الخدمات المطلوبة',
        servicesHint: 'اختاري كل ما ينطبق',
        message: 'رسالتك',
        messagePlaceholder: 'أخبرينا باختصار عمّا تحتاجينه…',
        submit: 'أرسلي الطلب',
        note: 'سنتواصل معك خلال يوم عمل واحد لتأكيد الموعد.',
      },
    },
    marquee: ['طب الأسنان', 'البشرة', 'البوتوكس', 'الفيلر', 'الميزوثيرابي', 'الليزر', 'الجراحات', 'العيادات النسائية', 'عناية الرجل', 'الأظافر'],
    footer: {
      tagline: 'عيادات نغم الطبية — لأن ما بُني بثقتكم يستحق أن يستمر.',
      quickLinks: 'روابط سريعة',
      contactTitle: 'تواصل',
      rights: '© 2026 عيادات نغم الطبية. جميع الحقوق محفوظة.',
      madeIn: 'دمشق — سوريا',
    },
  },

  en: {
    dir: 'ltr' as const,
    nav: {
      about: 'About',
      services: 'Services',
      why: 'Why NAGHAM',
      gallery: 'The Clinic',
      testimonials: 'Testimonials',
      contact: 'Contact',
      book: 'Book Appointment',
      menu: 'Menu',
    },
    hero: {
      eyebrow: 'NAGHAM Clinics — Damascus',
      title: 'We return with a stronger step, and a bigger vision.',
      tagline: 'Because what was built on your trust deserves to continue.',
      lead: 'Your smile, health, and confidence in specialist hands. A complete dental, aesthetic, and medical center in the heart of Damascus — in a premium setting designed around you.',
      ctaPrimary: 'Book your consultation',
      ctaSecondary: 'Explore our services',
      badge: 'ESTD 2025',
      scroll: 'Scroll to explore',
    },
    about: {
      eyebrow: 'About the clinic',
      title: 'A doctor who knows small details make the biggest difference',
      p1: 'NAGHAM Clinics is led by Dr. Nagham Saloum, specialist in oral & maxillofacial medicine and dental surgery, with a vision that pairs medical precision with refined taste. Every case is studied with care — every result designed to suit your features, and yours alone.',
      p2: 'In 2025 we reopened our doors at Ash-Shahbandar Square with a larger center and the latest equipment — a natural continuation of the trust our patients have placed in us, year after year.',
      markers: [
        { value: 'Specialist', label: 'Oral & dental surgery' },
        { value: '2025', label: 'Relaunched, stronger' },
        { value: '10+', label: 'Specialties under one roof' },
      ],
      cta: 'Discover our services',
      portraitCaption: 'Dr. Nagham Saloum — Oral & Maxillofacial Medicine and Dental Surgery',
    },
    services: {
      eyebrow: 'Our services',
      title: 'Everything you need for a confident smile and a radiant look',
      lead: 'Ten specialties, one team, one address in the heart of Damascus. Choose what you need — we take care of the rest.',
      items: [
        { key: 'dental', title: 'Dental', desc: 'Implants and complete dental care — eat, speak, and smile with total confidence.' },
        { key: 'skin', title: 'Skin', desc: 'Specialist skincare that restores your skin\u2019s natural glow and freshness.' },
        { key: 'botox', title: 'Botox', desc: 'Softer features and a younger-looking you — naturally, never artificial.' },
        { key: 'filler', title: 'Filler', desc: 'Precisely balanced features that highlight your natural beauty with a light touch.' },
        { key: 'mesotherapy', title: 'Mesotherapy', desc: 'Deep nourishment for skin and hair from within — results you can feel yourself.' },
        { key: 'laser', title: 'Laser', desc: 'The latest laser technology for smooth skin and comfortable, safe results.' },
        { key: 'surgery', title: 'Surgery', desc: 'Precise surgical procedures in expert hands, with the highest sterilization standards.' },
        { key: 'gynecology', title: 'Gynecology', desc: 'Complete women\u2019s care with full privacy and understanding for every stage of your life.' },
        { key: 'mens', title: 'Men\u2019s Care', desc: 'Care and aesthetic programs designed specifically around men\u2019s needs.' },
        { key: 'nails', title: 'Nails', desc: 'Complete nail care with an elegant finish that reflects your refined taste.' },
      ],
      cta: 'Book your free consultation',
    },
    why: {
      eyebrow: 'Why NAGHAM',
      title: 'Four reasons to make us your first choice',
      items: [
        { title: 'A team of specialists', desc: 'Every case is overseen by a physician specialized in that field — no generic solutions, only a treatment plan designed for you alone.' },
        { title: 'Modern equipment', desc: 'Contemporary devices and technology in every specialty, for a treatment experience that is more precise, faster, and more comfortable.' },
        { title: 'Women-focused, family-friendly', desc: 'A warm, safe space designed for you to feel at ease from the moment you walk in — and your family is always welcome.' },
        { title: 'Central Damascus location', desc: 'At Ash-Shahbandar Square, on the road to Al-Mazzeh Square — easy to reach from anywhere in the city.' },
      ],
      cta: 'Visit us and feel the difference',
    },
    gallery: {
      eyebrow: 'Inside the clinic',
      title: 'A space designed to feel like you',
      lead: 'Real photos from our clinics are coming soon — this is a glimpse of the atmosphere waiting for you.',
      captions: ['Reception', 'Treatment room', 'Aesthetics suite', 'Dental clinic', 'Waiting lounge', 'Laser suite'],
      comingSoon: 'Photo coming soon',
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Your trust is our true story',
      lead: 'Words from patients who chose NAGHAM — and keep coming back.',
      items: [
        { quote: 'From the very first consultation I felt my case was in safe hands. The attention to detail and the follow-up after each session is something I haven\u2019t seen anywhere else.', name: 'S. M.', service: 'Dental clinic' },
        { quote: 'The result looks completely natural — nobody noticed anything except that I\u2019m more comfortable with what I see in the mirror. Thank you for the taste and professionalism.', name: 'R. A.', service: 'Botox & filler' },
        { quote: 'The place is spotless, the team is kind, and most importantly they explained every step before starting. A comfortable experience from A to Z.', name: 'N. H.', service: 'Skincare' },
      ],
      note: 'Every case is different — ask your doctor what suits you best.',
    },
    contact: {
      eyebrow: 'Contact us',
      title: 'Your first appointment is one message away',
      lead: 'Call us or message us on WhatsApp — we\u2019ll answer your questions and book the time that suits you best.',
      addressLabel: 'Address',
      address: 'Damascus — Ash-Shahbandar Square, on the road to Al-Mazzeh Square',
      phoneLabel: 'Call us',
      whatsappCta: 'Message us on WhatsApp',
      mapCta: 'Open in Google Maps',
      mapLabel: 'Ash-Shahbandar Square — Damascus',
      followLabel: 'Follow us',
      tabs: { whatsapp: 'WhatsApp', form: 'Message us directly' },
      whatsappHint: 'Opens WhatsApp with a ready-made message — the fastest way to book.',
      form: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email address',
        phone: 'Phone number',
        servicesLabel: 'Services you\u2019re interested in',
        servicesHint: 'Select all that apply',
        message: 'Your message',
        messagePlaceholder: 'Briefly tell us what you need…',
        submit: 'Send request',
        note: 'We will get back to you within one business day to confirm your appointment.',
      },
    },
    marquee: ['Dental', 'Skin', 'Botox', 'Filler', 'Mesotherapy', 'Laser', 'Surgery', 'Gynecology', 'Men\u2019s Care', 'Nails'],
    footer: {
      tagline: 'NAGHAM Clinics — because what was built on your trust deserves to continue.',
      quickLinks: 'Quick links',
      contactTitle: 'Contact',
      rights: '© 2026 NAGHAM Clinics. All rights reserved.',
      madeIn: 'Damascus — Syria',
    },
  },
}

export type Dict = Omit<(typeof dict)['en'], 'dir'>

const LanguageContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Dict
  rtl: boolean
}>({ lang: 'ar', setLang: () => {}, toggle: () => {}, t: dict.ar, rtl: true })

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Arabic is the clinic's primary language — it is the default
  const [lang, setLang] = useState<Lang>('ar')

  useEffect(() => {
    // Flip the whole document direction; logical CSS utilities handle the mirror
    document.documentElement.lang = lang
    document.documentElement.dir = dict[lang].dir
  }, [lang])

  const toggle = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'))

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggle, t: dict[lang] as unknown as Dict, rtl: dict[lang].dir === 'rtl' }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
