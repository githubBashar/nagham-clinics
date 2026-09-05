import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'

/**
 * Medical team. Portrait photos live in /public/images/team/.
 * Names/photos other than Dr. Nagham Saloum are placeholders until the
 * clinic supplies the real team data.
 */
const TEAM_PHOTOS = [
  '/images/team/nagham.jpg',
  '/images/team/derma.jpg',
  '/images/team/dentist.jpg',
  '/images/team/gyne.jpg',
]

export default function Team() {
  const { t } = useLanguage()

  return (
    <section id="team" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.team.eyebrow} title={t.team.title} lead={t.team.lead} />

        <Stagger className="mt-16 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {t.team.items.map((member, i) => (
            <StaggerItem key={member.name}>
              <article className="group text-center">
                {/* arch-framed portrait */}
                <div className="arch-frame relative mx-auto aspect-[3/4] w-full overflow-hidden border border-gold/25 bg-forest shadow-[0_18px_44px_-20px_rgba(31,61,43,0.35)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gold/60 group-hover:shadow-[0_28px_56px_-20px_rgba(31,61,43,0.45)]">
                  <img
                    src={TEAM_PHOTOS[i % TEAM_PHOTOS.length]}
                    alt={`${member.name} — ${member.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {/* specialty tag */}
                  <span className="absolute bottom-3 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-deep/80 px-3.5 py-1.5 text-[0.62rem] font-bold tracking-wide text-gold backdrop-blur-sm rtl:translate-x-1/2">
                    {member.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl text-forest sm:text-2xl">{member.name}</h3>
                <p className="mt-1.5 text-[0.8rem] font-medium leading-snug text-ink/55">{member.role}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-md text-center text-[0.72rem] leading-relaxed text-ink/35">
            {t.team.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
