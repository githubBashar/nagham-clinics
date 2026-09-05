import { Reveal } from './Reveal'

/** Editorial section heading: small tracked eyebrow + large serif title + optional lead */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  onDark = false,
  align = 'center',
}: {
  eyebrow: string
  title: string
  lead?: string
  onDark?: boolean
  align?: 'center' | 'start'
}) {
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : 'text-start items-start'
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] ${
            onDark ? 'text-gold' : 'text-gold'
          }`}
        >
          <span className="h-px w-8 bg-gold/70" aria-hidden />
          {eyebrow}
          <span className="h-px w-8 bg-gold/70" aria-hidden />
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display text-4xl leading-[1.15] sm:text-5xl ${
            onDark ? 'text-ivory' : 'text-forest'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className={`text-base leading-relaxed sm:text-lg ${onDark ? 'text-ivory/70' : 'text-ink/65'}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
