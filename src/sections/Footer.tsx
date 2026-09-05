import { Facebook, Globe, Instagram, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { LogoMark } from '@/components/Logo'
import { CLINIC } from '@/lib/constants'

export default function Footer() {
  const { t, lang, toggle } = useLanguage()

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#why', label: t.nav.why },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* brand */}
        <div className="flex flex-col items-start gap-5">
          <LogoMark emblemSize={48} onDark />
          <p className="max-w-sm text-sm leading-relaxed text-ivory/60">{t.footer.tagline}</p>
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-full border border-ivory/25 px-4 py-2 text-xs font-bold tracking-wide text-ivory transition-all duration-200 hover:border-gold hover:text-gold"
            aria-label="Switch language / تبديل اللغة"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        {/* quick links */}
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-gold">{t.footer.quickLinks}</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-ivory/70 transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* contact + social */}
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-gold">{t.footer.contactTitle}</h3>
          <div className="flex flex-col gap-2 text-sm text-ivory/70">
            {CLINIC.phones.map((p, i) => (
              <a key={p} href={`tel:${CLINIC.phonesIntl[i]}`} className="nums-latin w-fit transition-colors hover:text-gold" dir="ltr">
                {p}
              </a>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {[
              { href: CLINIC.instagram, icon: Instagram, label: 'Instagram' },
              { href: CLINIC.facebook, icon: Facebook, label: 'Facebook' },
              { href: CLINIC.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-200 hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ivory/45 sm:flex-row sm:px-8">
          <span>{t.footer.rights}</span>
          <span>{t.footer.madeIn}</span>
        </div>
      </div>
    </footer>
  )
}
