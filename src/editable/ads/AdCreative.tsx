import { cn } from '@/lib/utils'
import type { SiteAd } from '@/lib/site-connector'

/**
 * Pure presentational banner (image + link). No data fetching, no client hooks —
 * safe to render from both the server `Ads` component and the client `AdRotator`.
 */
export function AdCreative({
  ad,
  className,
  imgClassName,
  showLabel = false,
  label = 'Sponsored',
  eager = false,
}: {
  ad: SiteAd
  className?: string
  imgClassName?: string
  showLabel?: boolean
  label?: string
  eager?: boolean
}) {
  return (
    <a
      href={ad.linkUrl}
      target={ad.openInNewTab === false ? undefined : '_blank'}
      rel="sponsored noopener noreferrer"
      data-ad-slot={ad.slot}
      data-ad-id={ad.id}
      aria-label={ad.altText || ad.name}
      className={cn('group relative block overflow-hidden', className)}
    >
      {showLabel ? (
        <span className="pointer-events-none absolute right-1 top-1 z-10 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/90">
          {label}
        </span>
      ) : null}
      <img
        src={ad.imageUrl}
        alt={ad.altText || ad.name}
        width={ad.width ?? undefined}
        height={ad.height ?? undefined}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]',
          imgClassName,
        )}
      />
    </a>
  )
}
