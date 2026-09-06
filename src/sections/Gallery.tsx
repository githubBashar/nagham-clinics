import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Heart, Instagram, MessageCircle, Play, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

/**
 * Instagram feed section: one tile per REAL post from @nagham_clinics.
 * Each tile shows a cover photo; tapping it opens a large overlay with
 * Instagram's official embed (/reel|p/<id>/embed/captioned) — the post
 * plays nearly full-screen. No API token, no scraper.
 *
 * GENERIC: to feature newer posts, open a post/reel in Instagram >
 * "..." > Copy Link, strip any "?stkn=..."/"?igsh=..." tracking part, and
 * replace the URLs in REAL_POSTS below. Keep one cover per post in
 * REAL_POST_COVERS (drop the image into /public/images/gallery/).
 */
const REAL_POSTS: string[] = [
  'https://www.instagram.com/reel/Dc6oBScjanF/',
  'https://www.instagram.com/reel/Dc3fWhEoBt1/',
  'https://www.instagram.com/reel/DctfGexIvbe/',
  'https://www.instagram.com/reel/Dcl1eMnopWs/',
]

/**
 * Optional cover photo for each real post (shown in the tile until the
 * visitor taps play). GENERIC: to refresh a tile's preview, open the post
 * on Instagram, screenshot/long-press the video cover, and drop the image
 * into /public/images/gallery/ under the same name listed here. Leaving an
 * entry as `null` shows the neutral play tile instead.
 * (Instagram serves post images only inside its own embed — there is no
 * token-free way to pull the cover image file automatically.)
 */
const REAL_POST_COVERS: (string | null)[] = [
  '/images/gallery/laser.jpg',
  '/images/gallery/dental.jpg',
  '/images/gallery/botox.jpg',
  '/images/gallery/meso.jpg',
]

/**
 * A real Instagram post that looks and sizes EXACTLY like a photo tile:
 * cover photo, play button, like/comment bar. Tapping opens a large
 * overlay where the official Instagram embed plays the post nearly
 * full-screen — close via the X, the backdrop or Esc.
 * If Instagram is blocked (ad blocker / offline), the overlay falls back
 * to a link to the post instead of showing a broken box.
 */
function RealTile({ url, caption, cover }: { url: string; caption: string; cover: string | null }) {
  const { t } = useLanguage()
  const hostRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const embedUrl = `${url.replace(/\/+$/, '')}/embed/captioned/`

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

  // Lock page scroll while the overlay is open; close on Esc.
  useEffect(() => {
    if (!playing) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [playing])

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-sage bg-white shadow-[0_10px_30px_-18px_rgba(31,61,43,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_22px_44px_-18px_rgba(31,61,43,0.35)]">
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

      {/* media area — cover photo; the whole area is the play button, so a
          single tap opens the large overlay immediately */}
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="relative block aspect-square w-full cursor-pointer overflow-hidden bg-ivory text-start"
        aria-label={t.insta.viewPost}
      >
        {cover && (
          <img
            src={cover}
            alt={caption}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        )}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-forest/25 transition-colors group-hover:bg-forest/35">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/90 text-ivory shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
            <Play className="ms-0.5 h-5 w-5 fill-current" />
          </span>
          <span className="rounded-full bg-forest-deep/70 px-3 py-1 text-[0.62rem] font-semibold text-ivory/90 backdrop-blur-sm" dir="ltr">
            @nagham_clinics
          </span>
        </span>
      </button>

      {/* like / comment bar */}
      <div className="flex items-center gap-4 px-3.5 py-2.5">
        <Heart className="h-4 w-4 text-ink/45 transition-colors group-hover:text-gold" strokeWidth={1.5} />
        <MessageCircle className="h-4 w-4 text-ink/45" strokeWidth={1.5} />
        <span className="ms-auto text-[0.68rem] font-medium text-ink/45">{caption}</span>
      </div>

      {/* large overlay player — nearly full-screen Instagram embed */}
      {playing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-deep/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setPlaying(false)}
          role="dialog"
          aria-modal="true"
          aria-label={caption}
        >
          <div
            className="relative max-h-full w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPlaying(false)
              }}
              className="absolute end-3 top-3 z-[110] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-forest-deep text-ivory shadow-lg transition-transform hover:scale-105 hover:bg-forest"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div ref={hostRef} className="max-h-[85vh] overflow-y-auto">
              {failed ? (
                <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
                  <Instagram className="h-8 w-8 text-gold" strokeWidth={1.5} />
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-bold text-forest transition-colors hover:border-gold/60 hover:bg-gold/5"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t.insta.viewPost}
                  </a>
                </div>
              ) : (
                <iframe
                  src={embedUrl}
                  title={caption}
                  allow="encrypted-media; clipboard-write"
                  className="h-[80vh] w-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Gallery() {
  const { t } = useLanguage()

  // Exactly the real posts, nothing else: one tile per REAL_POSTS entry.
  const tiles = REAL_POSTS.map((url, i) => ({
    url,
    cover: REAL_POST_COVERS[i] ?? null,
    caption: t.gallery.captions[i % t.gallery.captions.length],
  }))

  return (
    <section id="gallery" className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} />

        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {tiles.map((tile) => (
            <StaggerItem key={tile.url}>
              <RealTile url={tile.url} caption={tile.caption} cover={tile.cover} />
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
