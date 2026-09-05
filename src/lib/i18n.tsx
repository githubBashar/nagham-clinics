import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * Simple i18n setup for the bilingual (AR/EN) prototype.
 * - `lang` drives every string via the `t` object.
 * - The provider sets <html lang> and <html dir> so Arabic renders fully RTL
 *   (mirrored layout, not just translated text).
 * - Arabic copy uses neutral/masculine-form address (احجز، اكتشف) so it
 *   speaks to all patients, not only women.
 * - Spacing utilities in components use logical properties (ms-*, me-*, text-start)
 *   so the mirror happens automatically when dir flips.
 */

export type Lang = 'ar' | 'en'

const dict = {
  ar: {
    dir: 'rtl' as const,
    nav: {
      about: 'عن العيادة',
      team: 'فريقنا',
      services: 'خدماتنا',
      why: 'لماذا نغم؟',
      gallery: 'العيادة',
      testimonials: 'آراء مرضانا',
      contact: 'تواصل معنا',
      book: 'احجز موعدك',
      menu: 'القائمة',
    },
    hero: {
      eyebrow: 'عيادات نغم الطبية — دمشق',
      title: 'ابتسامة صحية، وثقة تليق بكم.',
      tagline: 'مركز متكامل للأسنان والتجميل والعناية الطبية في قلب دمشق.',
      lead: 'فريق من الاختصاصيين، أحدث التجهيزات، وأجواء راقية صُمّمت لراحتكم — كل ما تحتاجونه لصحتكم وجمالكم تحت سقف واحد.',
      ctaPrimary: 'احجز استشارتك الآن',
      ctaSecondary: 'اكتشف خدماتنا',
      badge: 'تأسست 2025',
      scroll: 'تابع للأسفل',
    },
    about: {
      eyebrow: 'عن العيادة',
      title: 'طبيبة تعرف أن التفاصيل الصغيرة تصنع الفرق الكبير',
      p1: 'تقود عيادات نغم الدكتورة نغم سلّوم، اختصاصية طب الفم وجراحة الأسنان، برؤية تجمع بين الدقة الطبية والذوق الرفيع. كل حالة تُدرس بعناية، وكل نتيجة تُصمَّم لتلائم ملامح كل مريض على حدة.',
      p2: 'من موقعنا في ساحة الشهبندر نقدم تجربة علاجية متكاملة: عيادات مجهزة بأحدث التقنيات، فريق يغطي عشرة اختصاصات، ومعايير تعقيم ومتابعة لا تقبل المساومة.',
      markers: [
        { value: 'اختصاص', label: 'طب الفم وجراحة الأسنان' },
        { value: '2025', label: 'مركز حديث في قلب دمشق' },
        { value: '10+', label: 'اختصاصات تحت سقف واحد' },
      ],
      cta: 'تعرّف على خدماتنا',
      portraitCaption: 'د. نغم سلّوم — اختصاصي طب الفم وجراحة الأسنان',
    },
    team: {
      eyebrow: 'فريقنا الطبي',
      title: 'أطباء اختصاصيون لكل حالة',
      lead: 'فريق متعدد الاختصاصات بقيادة د. نغم سلّوم — لكل حالة طبيبها الاختصاصي، ولكل مريض خطة علاج خاصة به.',
      items: [
        { name: 'د. نغم سلّوم', role: 'المؤسِّسة — طب الفم وجراحة الأسنان', tag: 'الأسنان والجراحة' },
        { name: 'د. لينا الحداد', role: 'الجلدية والتجميل', tag: 'البشرة والليزر' },
        { name: 'د. عمر خليل', role: 'طب وجراحة الأسنان', tag: 'الزراعة والتركيبات' },
        { name: 'د. رنا يوسف', role: 'العيادات النسائية', tag: 'صحة المرأة' },
      ],
      note: 'الصور والأسماء (باستثناء د. نغم سلّوم) توضيحية — تُستبدل ببيانات الفريق الحقيقية فور اعتمادها.',
    },
    services: {
      eyebrow: 'خدماتنا',
      title: 'كل ما تحتاجونه لابتسامة واثقة وإطلالة متألقة',
      lead: 'عشرة اختصاصات، فريق واحد، ومكان واحد في قلب دمشق. اختاروا ما يناسبكم — والباقي علينا.',
      items: [
        { key: 'dental', title: 'طب الأسنان', desc: 'زراعة وعلاجات شاملة — لتأكلوا وتتحدثوا وتبتسموا بثقة تامة.' },
        { key: 'skin', title: 'البشرة', desc: 'عناية متخصصة تُعيد للبشرة نضارتها وإشراقها الطبيعي.' },
        { key: 'botox', title: 'البوتوكس', desc: 'ملامح أكثر نعومة وإطلالة أصغر سناً — بمظهر طبيعي لا مصطنع.' },
        { key: 'filler', title: 'الفيلر', desc: 'توازن دقيق للملامح يُبرز الجمال الطبيعي بلمسة خفيفة.' },
        { key: 'mesotherapy', title: 'الميزوثيرابي', desc: 'تغذية عميقة للبشرة والشعر من الداخل — نتائج تلمسونها بأنفسكم.' },
        { key: 'laser', title: 'الليزر', desc: 'أحدث أجهزة الليزر لبشرة ناعمة ونتائج مريحة وآمنة.' },
        { key: 'surgery', title: 'الجراحات', desc: 'إجراءات جراحية دقيقة بأيدٍ خبيرة وأعلى معايير التعقيم.' },
        { key: 'gynecology', title: 'العيادات النسائية', desc: 'رعاية نسائية شاملة بخصوصية تامة وتفهّم لكل مرحلة من الحياة.' },
        { key: 'mens', title: 'عناية الرجل', desc: 'برامج عناية وتجميل صُمّمت خصيصاً لتلائم احتياجات الرجل.' },
        { key: 'nails', title: 'الأظافر', desc: 'عناية متكاملة بالأظافر بلمسة أنيقة تعكس الذوق الرفيع.' },
      ],
      cta: 'احجز استشارتك المجانية',
    },
    why: {
      eyebrow: 'لماذا نغم؟',
      title: 'أربعة أسباب تجعلنا خياركم الأول',
      items: [
        { title: 'فريق من الاختصاصيين', desc: 'كل حالة يشرف عليها طبيب اختصاصي في مجاله — لا حلول عامة، بل خطة علاج مصممة لكل مريض على حدة.' },
        { title: 'تجهيزات حديثة', desc: 'أجهزة وتقنيات عصرية في كل اختصاص، لتجربة علاج أدق وأسرع وأكثر راحة.' },
        { title: 'أجواء عائلية مريحة', desc: 'مساحة دافئة وآمنة صُمّمت لتشعروا فيها بالراحة من لحظة دخولكم — وأهلاً بعائلاتكم معكم.' },
        { title: 'موقع مركزي في دمشق', desc: 'في ساحة الشهبندر على الطريق الواصل لساحة المزرعة — سهلة الوصول من أي مكان في المدينة.' },
      ],
      cta: 'زورونا واكتشفوا الفرق',
    },
    gallery: {
      eyebrow: 'من إنستغرامنا',
      title: 'أحدث المنشورات من عياداتنا',
      lead: 'تابعوا يوميات العيادة، نصائح العناية، ولمحات من نتائج عملنا على إنستغرام وفيسبوك.',
      captions: ['طب الأسنان', 'الليزر', 'البوتوكس والفيلر', 'الميزوثيرابي', 'قبل وبعد', 'الأظافر', 'عناية الرجل', 'البشرة'],
      comingSoon: 'تابعونا على إنستغرام',
      cta: 'تابعوا @nagham_clinics',
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
      note: 'نتائج كل حالة تختلف من شخص لآخر — اسألوا طبيبكم عمّا يناسبكم.',
    },
    contact: {
      eyebrow: 'تواصلوا معنا',
      title: 'موعدكم الأول على بُعد رسالة واحدة',
      lead: 'اتصلوا بنا أو راسلونا على واتساب — سنجيب على أسئلتكم ونحجز لكم الموعد الأنسب.',
      addressLabel: 'العنوان',
      address: 'دمشق — ساحة الشهبندر، الطريق الواصل لساحة المزرعة',
      phoneLabel: 'اتصلوا بنا',
      whatsappCta: 'راسلونا على واتساب',
      mapCta: 'افتحوا الموقع على خرائط غوغل',
      mapLabel: 'ساحة الشهبندر — دمشق',
      followLabel: 'تابعونا',
      tabs: { whatsapp: 'واتساب', form: 'راسلونا مباشرة' },
      whatsappHint: 'يفتح واتساب برسالة جاهزة — أسرع طريقة للحجز.',
      form: {
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        servicesLabel: 'الخدمات المطلوبة',
        servicesHint: 'اختاروا كل ما ينطبق',
        message: 'رسالتكم',
        messagePlaceholder: 'أخبرونا باختصار عمّا تحتاجونه…',
        submit: 'أرسلوا الطلب',
        note: 'سنتواصل معكم خلال يوم عمل واحد لتأكيد الموعد.',
      },
    },
    booking: {
      title: 'احجز موعدك',
      lead: 'اختاروا الطريقة الأنسب لكم — واتساب فوري أو رسالة مفصّلة وسنعاود الاتصال بكم.',
      close: 'إغلاق',
    },
    footer: {
      tagline: 'عيادات نغم الطبية — رعاية متكاملة تليق بثقتكم.',
      quickLinks: 'روابط سريعة',
      contactTitle: 'تواصل',
      rights: '© 2026 عيادات نغم الطبية. جميع الحقوق محفوظة.',
      madeIn: 'دمشق — سوريا',
    },
    marquee: ['طب الأسنان', 'البشرة', 'البوتوكس', 'الفيلر', 'الميزوثيرابي', 'الليزر', 'الجراحات', 'العيادات النسائية', 'عناية الرجل', 'الأظافر'],
  },

  en: {
    dir: 'ltr' as const,
    nav: {
      about: 'About',
      team: 'Our Team',
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
      title: 'A healthy smile, and confidence that suits you.',
      tagline: 'A complete dental, aesthetic, and medical center in the heart of Damascus.',
      lead: 'A team of specialists, the latest equipment, and a premium setting designed around you — everything you need for your health and confidence under one roof.',
      ctaPrimary: 'Book your consultation',
      ctaSecondary: 'Explore our services',
      badge: 'ESTD 2025',
      scroll: 'Scroll to explore',
    },
    about: {
      eyebrow: 'About the clinic',
      title: 'A doctor who knows small details make the biggest difference',
      p1: 'NAGHAM Clinics is led by Dr. Nagham Saloum, specialist in oral & maxillofacial medicine and dental surgery, with a vision that pairs medical precision with refined taste. Every case is studied with care — every result designed to suit each patient\u2019s own features.',
      p2: 'From our location at Ash-Shahbandar Square we deliver a complete treatment experience: clinics equipped with the latest technology, a team covering ten specialties, and uncompromising standards of sterilization and follow-up.',
      markers: [
        { value: 'Specialist', label: 'Oral & dental surgery' },
        { value: '2025', label: 'Modern center, central Damascus' },
        { value: '10+', label: 'Specialties under one roof' },
      ],
      cta: 'Discover our services',
      portraitCaption: 'Dr. Nagham Saloum — Oral & Maxillofacial Medicine and Dental Surgery',
    },
    team: {
      eyebrow: 'Our medical team',
      title: 'A specialist for every case',
      lead: 'A multi-specialty team led by Dr. Nagham Saloum — every case gets its own specialist, every patient their own treatment plan.',
      items: [
        { name: 'Dr. Nagham Saloum', role: 'Founder — Oral & Maxillofacial Medicine and Dental Surgery', tag: 'Dental & Surgery' },
        { name: 'Dr. Lina Haddad', role: 'Dermatology & Aesthetics', tag: 'Skin & Laser' },
        { name: 'Dr. Omar Khalil', role: 'Dental Surgery', tag: 'Implants & Prosthetics' },
        { name: 'Dr. Rania Youssef', role: 'Gynecology', tag: 'Women’s Health' },
      ],
      note: 'Portraits and names (except Dr. Nagham Saloum) are placeholders — to be replaced with the real team’s details.',
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
        { key: 'gynecology', title: 'Gynecology', desc: 'Complete women\u2019s care with full privacy and understanding for every stage of life.' },
        { key: 'mens', title: 'Men\u2019s Care', desc: 'Care and aesthetic programs designed specifically around men\u2019s needs.' },
        { key: 'nails', title: 'Nails', desc: 'Complete nail care with an elegant finish that reflects your refined taste.' },
      ],
      cta: 'Book your free consultation',
    },
    why: {
      eyebrow: 'Why NAGHAM',
      title: 'Four reasons to make us your first choice',
      items: [
        { title: 'A team of specialists', desc: 'Every case is overseen by a physician specialized in that field — no generic solutions, only a treatment plan designed for each patient individually.' },
        { title: 'Modern equipment', desc: 'Contemporary devices and technology in every specialty, for a treatment experience that is more precise, faster, and more comfortable.' },
        { title: 'Comfortable, family-friendly space', desc: 'A warm, safe space designed for you to feel at ease from the moment you walk in — and your family is always welcome.' },
        { title: 'Central Damascus location', desc: 'At Ash-Shahbandar Square, on the road to Al-Mazzeh Square — easy to reach from anywhere in the city.' },
      ],
      cta: 'Visit us and feel the difference',
    },
    gallery: {
      eyebrow: 'From our Instagram',
      title: 'Latest posts from the clinic',
      lead: 'Follow clinic life, care tips, and glimpses of our work on Instagram and Facebook.',
      captions: ['Dental care', 'Laser', 'Botox & filler', 'Mesotherapy', 'Before & after', 'Nails', 'Men’s care', 'Skin'],
      comingSoon: 'Follow us on Instagram',
      cta: 'Follow @nagham_clinics',
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
    booking: {
      title: 'Book your appointment',
      lead: 'Choose whichever suits you — instant WhatsApp message, or a detailed request and we\u2019ll call you back.',
      close: 'Close',
    },
    footer: {
      tagline: 'NAGHAM Clinics — complete care worthy of your trust.',
      quickLinks: 'Quick links',
      contactTitle: 'Contact',
      rights: '© 2026 NAGHAM Clinics. All rights reserved.',
      madeIn: 'Damascus — Syria',
    },
    marquee: ['Dental', 'Skin', 'Botox', 'Filler', 'Mesotherapy', 'Laser', 'Surgery', 'Gynecology', 'Men\u2019s Care', 'Nails'],
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
