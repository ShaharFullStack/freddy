import { marqueeItems } from '../constants'

export default function Marquee({ dark = true }) {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className={`overflow-hidden py-5 ${dark ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-dark2)]'}`}>
      <div className="marquee-track flex gap-0 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-4 text-sm font-bold tracking-[3px] uppercase px-8 ${dark ? 'text-[var(--color-dark)]' : 'text-[var(--color-gold)]'}`}
          >
            {item}
            <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-[var(--color-dark)]/40' : 'bg-[var(--color-gold)]/40'}`} />
          </span>
        ))}
      </div>
    </div>
  )
}
