import type { ReactNode } from 'react'
import { fetchSiteAds, type SiteAd } from '@/lib/site-connector'
import { AdCreative } from './AdCreative'
import { AdRotator } from './AdRotator'

export type AdsProps = {
  /** Placement key configured in the Master Panel, e.g. "sidebar", "in-feed", "header". */
  slot: string
  /** Wrapper / sizing classes — this is what lets the slot fit any shape. */
  className?: string
  /** Extra classes for the underlying <img>. */
  imgClassName?: string
  /**
   * Pick one fixed ad by position instead of rotating (e.g. one ad per feed row).
   * When set, rotation is disabled and the ad at this position is shown (wraps around).
   */
  index?: number
  /** Rotation is ON by default when a slot has multiple ads. Set false to pin the first ad. */
  rotate?: boolean
  /** Fallback dwell time (ms) when an ad has no panel-set `durationMs`. */
  defaultDurationMs?: number
  /** Pause rotation while the user hovers the ad (default true). */
  pauseOnHover?: boolean
  /** Show a small "Sponsored" tag over the creative. */
  showLabel?: boolean
  label?: string
  /** Load the image eagerly — use for above-the-fold header slots. */
  eager?: boolean
  /** Rendered when no ad targets this slot. Defaults to nothing. */
  fallback?: ReactNode
}

/**
 * Versatile, panel-driven ad slot.
 *
 * One component, any shape — control size/format via `className`, choose which ad
 * via `slot` + Master Panel targeting (global / category / specific sites).
 *
 * Rotation is automatic: if the panel returns several ads for a slot, they rotate,
 * with timing/order/frequency fully panel-controlled per ad (`durationMs`,
 * `priority`, `weight`). Server-rendered through the connector's revalidate +
 * stale-fallback layer, so everything updates from the panel WITHOUT a redeploy.
 *
 *   <Ads slot="sidebar" className="w-full rounded-lg" />        // auto-rotates if >1 ad
 *   <Ads slot="in-feed" index={i} className="my-6" />           // one fixed ad per feed row
 *   <Ads slot="header" eager className="h-24 w-full" />         // rotates, eager image
 *   <Ads slot="sidebar" rotate={false} />                       // pin the top-priority ad
 */
export default async function Ads({
  slot,
  className,
  imgClassName,
  index,
  rotate = true,
  defaultDurationMs,
  pauseOnHover = true,
  showLabel = false,
  label,
  eager = false,
  fallback = null,
}: AdsProps) {
  const safeSlot = typeof slot === 'string' ? slot.trim() : ''
  if (!safeSlot) return <>{fallback}</>

  const ads = await fetchSiteAds(safeSlot)
  if (!ads.length) return <>{fallback}</>

  const fixed = typeof index === 'number' && Number.isFinite(index)

  if (rotate && !fixed && ads.length > 1) {
    return (
      <AdRotator
        ads={ads}
        defaultDurationMs={defaultDurationMs}
        pauseOnHover={pauseOnHover}
        className={className}
        imgClassName={imgClassName}
        showLabel={showLabel}
        label={label}
      />
    )
  }

  const position = fixed ? Math.abs(Math.floor(index as number)) : 0
  const ad: SiteAd = ads[position % ads.length]

  return (
    <AdCreative
      ad={ad}
      className={className}
      imgClassName={imgClassName}
      showLabel={showLabel}
      label={label}
      eager={eager}
    />
  )
}
