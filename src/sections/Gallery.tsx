import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Heart, Instagram, MessageCircle, Play } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

/**
 * Instagram feed section. The first tiles are REAL posts from
 * @nagham_clinics, embedded natively (official blockquote.instagram-media +
 * Instagram's own embed.js — exactly what "..." > Embed > Copy embed code
 * generates; no API token, no scraper). The remaining tiles are styled post
 * frames (avatar row with the clinic logo, photo, like/comment bar) whose
 * photos live in /public/images/gallery/.
 *
 * GENERIC: to feature newer real posts, open a post/reel in Instagram >
 * "..." > Copy Link, strip any "?stkn=..."/"?igsh=..." tracking part, and
 * put the URL at the front of REAL_POSTS below — tiles fill from the start
 * with as many real posts as are listed; the rest use gallery photos.
 */
const REAL_POSTS: string[] = [
  'https://www.instagram.com/reel/Dc6oBScjanF/',
  'https://www.instagram.com/reel/Dc3fWhEoBt1/',
  'https://www.instagram.com/reel/DctfGexIvbe/',
]

const POST_IMAGES = [
  '/images/gallery/dental.jpg',
  '/images/gallery/laser.jpg',
  '/images/gallery/botox.jpg',
  '/images/gallery/meso.jpg',
  '/images/gallery/veneers.jpg',
  '/images/gallery/nails.jpg',
  '/images/gallery/men.jpg',
  '/images/gallery/skin.jpg',
]

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

/**
 * A real Instagram post that looks and sizes EXACTLY like the photo tiles:
 * same header (logo + handle), square media area, like/comment bar. The
 * media area holds Instagram's official iframe embed (/reel|p/<id>/embed) —
 * tap the play button and the reel plays right inside the tile.
 * If Instagram is blocked (ad blocker / offline), the tile degrades to a
 * linked cover instead of a broken box.
 */
function RealTile({ url, caption }: { url: string; caption: string }) {
  const { t } = useLanguage()
  const hostRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const embedUrl = `${url.replace(/\/+$/, '')}/embed`

  // If the iframe can't load within 8s, treat the embed as blocked.
  useEffect(() => {
    if (!playing) return
    setFailed(false)
    const timer = window.setTimeout(() => {
      const frame = hostRef.current?.querySelector('iframe')
      if (!frame || frame.offsetHeight < 50) setFailed(true)
    }, 8000)
    return () => window.clearTimeout(timer)
  }, [playing, url])

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-sage bg-white shadow-[0_10px_30px_-18px_rgba(31,61,43,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_22px_44px_-18px_rgba(31,61,43,0.35)]">      {/* post header: clinic logo avatar + handle (same as photo tiles) */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5">
        <img
          src="/images/logo.png"
          alt="NAGHAM Clinics"
          className="h-7 w-7 rounded-full object-cover ring-1 ring-gold/40"
        />
        <span className="text-xs font-semibold text-ink/80" dir="ltr">
          nagham_clinics
        </span>
        <Instagram className="ms-auto h-3.5 w-3.5 text-ink/30" strokeWidth={1.5} />
      </div>

      {/* media area — same square as the photo tiles */}
      <div ref={hostRef} className="relative aspect-square overflow-hidden bg-ivory">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-3 bg-forest/[0.03] transition-colors hover:bg-gold/10"
            aria-label={t.insta.viewPost}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Play className="ms-0.5 h-5 w-5 fill-current" />
            </span>
            <span className="text-[0.65rem] font-semibold text-ink/50" dir="ltr">
              @nagham_clinics
            </span>
          </button>
        ) : failed ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-forest/[0.03] px-4 text-center"
          >
            <Instagram className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold text-forest">
              <ExternalLink className="h-3 w-3" />
              {t.insta.viewPost}
            </span>
          </a>
        ) : (
          /* Official Instagram embed: the post media fills the tile; the
             iframe's own caption bar is cropped below the square. */
          <iframe
            src={embedUrl}
            title={caption}
            loading="lazy"
            allow="encrypted-media; clipboard-write"
            className="absolute left-0 top-0 h-[200%] w-full border-0"
          />
        )}
      </div>

      {/* like / comment bar (same as photo tiles) */}
      <div className="flex items-center gap-4 px-3.5 py-2.5">
        <Heart className="h-4 w-4 text-ink/45 transition-colors group-hover:text-gold" strokeWidth={1.5} />
        <MessageCircle className="h-4 w-4 text-ink/45" strokeWidth={1.5} />
        <span className="ms-auto text-[0.68rem] font-medium text-ink/45">{caption}</span>
      </div>

      {/* whole tile links to the real post (Instagram's own attribution);
          the play button above (z-20) wins the click to start the video */}
      {!playing && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-10"
          aria-label={t.insta.viewPost}
        />
      )}
    </div>
  )
}

export default function Gallery() {
  const { t } = useLanguage()

  // Tiles fill left-to-right: real embeds first, styled photo tiles after.
  const tiles = t.gallery.captions.map((caption, i) => ({
    caption,
    realUrl: REAL_POSTS[i] ?? null,
    photo: POST_IMAGES[i % POST_IMAGES.length],
  }))

  return (
    <section id="gallery" className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} />

        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {tiles.map((tile) => (
            <StaggerItem key={tile.realUrl ?? tile.caption}>
              {tile.realUrl ? (
                <RealTile url={tile.realUrl} caption={tile.caption} />
              ) : (
                <a
                  href={CLINIC.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-sage bg-white shadow-[0_10px_30px_-18px_rgba(31,61,43,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_22px_44px_-18px_rgba(31,61,43,0.35)]"
                >
                  {/* post header: clinic logo avatar + handle */}
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5">
                    <img
                      src="/images/logo.png"
                      alt="NAGHAM Clinics"
                      className="h-7 w-7 rounded-full object-cover ring-1 ring-gold/40"
                    />
                    <span className="text-xs font-semibold text-ink/80" dir="ltr">
                      nagham_clinics
                    </span>
                    <Instagram className="ms-auto h-3.5 w-3.5 text-ink/30" strokeWidth={1.5} />
                  </div>

                  {/* post photo */}
                  <div className="relative aspect-square overflow-hidden bg-ivory">
                    <img
                      src={tile.photo}
                      alt={tile.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/10"
                      aria-hidden
                    />
                  </div>

                  {/* like / comment bar */}
                  <div className="flex items-center gap-4 px-3.5 py-2.5">
                    <Heart className="h-4 w-4 text-ink/45 transition-colors group-hover:text-gold" strokeWidth={1.5} />
                    <MessageCircle className="h-4 w-4 text-ink/45" strokeWidth={1.5} />
                    <span className="ms-auto text-[0.68rem] font-medium text-ink/45">{tile.caption}</span>
                  </div>
                </a>
              )}
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
            {t.gallery.cta}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
