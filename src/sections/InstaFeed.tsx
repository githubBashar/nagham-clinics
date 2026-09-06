import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Instagram } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

/**
 * "Latest on Instagram" — native Instagram post embeds (official
 * blockquote.instagram-media + Instagram's own embed.js, exactly what the
 * "..." > Embed > Copy embed code" flow generates). No API token, no scraper.
 *
 * GENERIC: this section renders whatever permalinks are listed below.
 * To show newer posts, open a post/reel in Instagram > "..." > Copy Link,
 * strip any "?stkn=..." / "?igsh=..." tracking part, and replace the URLs
 * here — the first 3 entries are embedded. No other code change needed.
 *
 * (Fully automatic "always the newest 3 posts" requires Instagram's official
 * API with an access token that expires every 60 days and a server to
 * refresh it — Meta does not allow fetching a profile's posts from the
 * browser without one. This config list is the maintenance-free alternative.)
 */
const POST_URLS: string[] = [
  'https://www.instagram.com/reel/Dc6oBScjanF/',
  'https://www.instagram.com/reel/Dc3fWhEoBt1/',
  'https://www.instagram.com/reel/DctfGexIvbe/',
]

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

/** Load Instagram's embed.js exactly once, then process new blockquotes. */
function useInstagramEmbed(dep: unknown) {
  useEffect(() => {
    if (!document.querySelector('script[data-ig-embed]')) {
      const s = document.createElement('script')
      s.src = 'https://www.instagram.com/embed.js'
      s.async = true
      s.defer = true
      s.setAttribute('data-ig-embed', '')
      document.body.appendChild(s)
    } else {
      window.instgrm?.Embeds.process()
    }
  }, [dep])
}

function EmbedCard({ url, index }: { url: string; index: number }) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  // Fallback: if Instagram's script is blocked (ad blocker / offline / slow
  // network), the blockquote never becomes an iframe -> show a styled
  // placeholder card linking to the real post instead of a broken box.
  useEffect(() => {
    setFailed(false)
    const timer = window.setTimeout(() => {
      if (ref.current && !ref.current.querySelector('iframe')) setFailed(true)
    }, 8000)
    return () => window.clearTimeout(timer)
  }, [url])

  return (
    <div className="overflow-hidden rounded-2xl border border-sage bg-white shadow-[0_10px_30px_-18px_rgba(31,61,43,0.25)]">
      <div ref={ref} className={failed ? 'hidden' : '[&_.instagram-media]:!my-0 [&_.instagram-media]:!min-w-0'}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
        />
      </div>
      {failed && (
        <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/5 ring-1 ring-gold/30">
            <Instagram className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </span>
          <span className="text-xs font-semibold text-ink/60" dir="ltr">
            @nagham_clinics · Post {index + 1}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-5 py-2.5 text-xs font-bold text-forest transition-colors hover:border-gold/60 hover:bg-gold/5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t.insta.viewPost}
          </a>
        </div>
      )}
    </div>
  )
}

export default function InstaFeed() {
  const { t, lang } = useLanguage()
  useInstagramEmbed(lang)

  return (
    <section id="instagram" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.insta.eyebrow} title={t.insta.title} lead={t.insta.lead} />

        <Stagger className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {POST_URLS.slice(0, 3).map((url) => (
            <StaggerItem key={url}>
              <EmbedCard url={url} index={POST_URLS.indexOf(url)} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-12 text-center">
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-ivory transition-all duration-200 hover:scale-[1.03] hover:bg-forest-soft"
          >
            <Instagram className="h-4.5 w-4.5" />
            {t.insta.cta}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
