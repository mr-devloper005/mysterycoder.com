"use client"

import * as React from 'react'
import { ChevronRight, Star } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Review = {
  author?: string
  rating?: number
  body?: string
}

function clampRating(value: unknown) {
  const asNumber = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  if (!Number.isFinite(asNumber)) return null
  return Math.max(0, Math.min(5, asNumber))
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${rounded} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = rounded >= index + 1
        return (
          <Star
            key={index}
            className={cn('h-4 w-4', filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300')}
          />
        )
      })}
    </div>
  )
}

export function DirectoryProfileTabs({
  about,
  audience,
  features,
  pricing,
  integrations,
  rating,
  reviewCount,
  reviews,
  rightRail,
}: {
  about: React.ReactNode
  audience?: React.ReactNode
  features?: React.ReactNode
  pricing?: React.ReactNode
  integrations?: React.ReactNode
  rating?: unknown
  reviewCount?: unknown
  reviews?: Review[]
  rightRail?: React.ReactNode
}) {
  const normalizedRating = clampRating(rating)
  const normalizedCount =
    typeof reviewCount === 'number'
      ? reviewCount
      : typeof reviewCount === 'string'
        ? Number(reviewCount)
        : null

  const tabs = React.useMemo(() => {
    const items: Array<{ id: string; label: string; show: boolean }> = [
      { id: 'about', label: 'About', show: true },
      { id: 'reviews', label: 'Reviews', show: Boolean(reviews?.length || normalizedRating !== null || normalizedCount !== null) },
      { id: 'pricing', label: 'Pricing', show: Boolean(pricing) },
      { id: 'features', label: 'Features', show: Boolean(features) },
    ]
    return items.filter((item) => item.show)
  }, [features, pricing, reviews, normalizedRating, normalizedCount])

  const [activeTab, setActiveTab] = React.useState(tabs[0]?.id ?? 'about')

  React.useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0]?.id ?? 'about')
    }
  }, [activeTab, tabs])

  return (
    <div className="rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-4 py-3 sm:px-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-full',
              activeTab === tab.id ? 'bg-slate-950 text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-950',
            )}
          >
            {tab.label}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-3 px-1 text-sm text-slate-600">
          {normalizedRating !== null ? (
            <span className="hidden items-center gap-2 sm:inline-flex">
              <Stars rating={normalizedRating} />
              <span className="font-medium text-slate-900">{normalizedRating.toFixed(1)}</span>
              {normalizedCount !== null && Number.isFinite(normalizedCount) ? (
                <span className="text-slate-500">({normalizedCount} reviews)</span>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-8">
          {audience ? (
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Audience</p>
              <div className="mt-3 text-sm leading-7 text-slate-700">{audience}</div>
            </section>
          ) : null}

          {activeTab === 'about' ? (
            <section>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">About</h2>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                  Learn more <ChevronRight className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-4 text-sm leading-8 text-slate-700">{about}</div>
            </section>
          ) : null}

          {activeTab === 'reviews' ? (
            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">Reviews</h2>
              <div className="mt-4 space-y-4">
                {reviews?.length ? (
                  reviews.slice(0, 4).map((review, index) => {
                    const reviewRating = clampRating(review.rating)
                    return (
                      <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-950">{review.author || 'Anonymous'}</p>
                          {reviewRating !== null ? <Stars rating={reviewRating} /> : null}
                        </div>
                        {review.body ? <p className="mt-3 text-sm leading-7 text-slate-600">{review.body}</p> : null}
                      </div>
                    )
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                    No reviews yet.
                  </div>
                )}
              </div>
            </section>
          ) : null}

          {activeTab === 'pricing' ? (
            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">Pricing</h2>
              <div className="mt-4 text-sm leading-8 text-slate-700">{pricing || 'Pricing details coming soon.'}</div>
            </section>
          ) : null}

          {activeTab === 'features' ? (
            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">Features</h2>
              <div className="mt-4 text-sm leading-8 text-slate-700">{features || 'Feature details coming soon.'}</div>
            </section>
          ) : null}
        </div>

        <div className="space-y-5">
          {rightRail}
          {integrations ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Integrations</p>
              <div className="mt-3 text-sm leading-7 text-slate-700">{integrations}</div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}

