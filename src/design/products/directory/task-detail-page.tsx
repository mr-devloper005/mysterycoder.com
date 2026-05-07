import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Star, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Button } from '@/components/ui/button'
import { DirectoryProfileTabs } from '@/components/tasks/directory-profile-tabs'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const audience = typeof content.audience === 'string' ? content.audience : ''
  const pricing = typeof content.pricing === 'string' ? content.pricing : ''
  const startingPrice =
    typeof content.startingPrice === 'string'
      ? content.startingPrice
      : typeof content.starting_price === 'string'
        ? content.starting_price
        : ''
  const integrations = typeof content.integrations === 'string' ? content.integrations : ''
  const features = Array.isArray(content.features) ? content.features.filter((item): item is string => typeof item === 'string') : []
  const rating = typeof content.rating === 'number' || typeof content.rating === 'string' ? content.rating : null
  const reviewCount =
    typeof content.reviewCount === 'number' || typeof content.reviewCount === 'string'
      ? content.reviewCount
      : typeof content.reviewsCount === 'number' || typeof content.reviewsCount === 'string'
        ? content.reviewsCount
        : null
  const reviews = Array.isArray(content.reviews) ? (content.reviews as unknown[]) : []
  const normalizedReviews = reviews
    .map((item) => (item && typeof item === 'object' ? (item as Record<string, unknown>) : null))
    .filter((item): item is Record<string, unknown> => Boolean(item))
    .map((item) => ({
      author: typeof item.author === 'string' ? item.author : typeof item.name === 'string' ? item.name : undefined,
      rating: typeof item.rating === 'number' || typeof item.rating === 'string' ? item.rating : undefined,
      body: typeof item.body === 'string' ? item.body : typeof item.comment === 'string' ? item.comment : undefined,
    }))
    .filter((item) => item.author || item.body || typeof item.rating !== 'undefined')
  const cover = images[0]
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
        </Link>

        {task === 'profile' ? (
          <>
            <section className="relative overflow-hidden rounded-[2.4rem] border border-slate-200 bg-slate-950 shadow-[0_28px_80px_rgba(15,23,42,0.25)]">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),rgba(0,0,0,0.7)_60%)]" />
                <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute inset-0 opacity-40">
                  <ContentImage src={cover} alt="" fill className="object-cover blur-[1px]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/70 to-slate-950" />
              </div>

              <div className="relative px-6 pb-8 pt-7 sm:px-10 sm:pb-10">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70">
                  <span className="rounded-full bg-white/10 px-3 py-1">Home</span>
                  <span className="text-white/40">/</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{taskLabel}</span>
                </div>

                <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex items-start gap-5">
                    <div className="relative size-20 overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:size-24">
                      <ContentImage src={logo || cover} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{category || taskLabel}</p>
                      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{post.title}</h1>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
                        {rating !== null ? (
                          <span className="inline-flex items-center gap-2">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-white">{String(rating)}</span>
                            {reviewCount !== null ? <span className="text-white/50">({String(reviewCount)} reviews)</span> : null}
                          </span>
                        ) : null}
                        {website ? <a href={website} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">Website</a> : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {website ? (
                      <Button asChild className="rounded-full bg-emerald-500 px-6 text-sm font-semibold text-emerald-950 hover:bg-emerald-400">
                        <a href={website} target="_blank" rel="noreferrer">
                          Visit website <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="secondary" className="rounded-full px-6 text-sm font-semibold">
                      <Link href={taskRoute}>Browse more</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-10">
              <DirectoryProfileTabs
                about={<p>{description}</p>}
                audience={audience ? <p>{audience}</p> : undefined}
                features={features.length ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {features.slice(0, 8).map((item) => (
                      <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : highlights.length ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {highlights.slice(0, 8).map((item) => (
                      <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : undefined}
                pricing={pricing ? (
                  <div className="space-y-3">
                    {startingPrice ? (
                      <p className="text-sm font-semibold text-slate-900">
                        Starting price: <span className="font-normal text-slate-700">{startingPrice}</span>
                      </p>
                    ) : null}
                    <p>{pricing}</p>
                  </div>
                ) : startingPrice ? (
                  <p className="text-sm text-slate-700">
                    Starting price: <span className="font-semibold text-slate-900">{startingPrice}</span>
                  </p>
                ) : undefined}
                integrations={integrations ? <p>{integrations}</p> : undefined}
                rating={rating ?? undefined}
                reviewCount={reviewCount ?? undefined}
                reviews={normalizedReviews.length ? normalizedReviews : undefined}
                rightRail={
                  <>
                    <section className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Quick facts</p>
                      <div className="mt-4 grid gap-3 text-sm text-slate-700">
                        {startingPrice ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Starting price</span>
                            <span className="font-semibold text-slate-950">{startingPrice}</span>
                          </div>
                        ) : null}
                        {website ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Website</span>
                            <span className="truncate font-medium text-slate-950">{website.replace(/^https?:\/\//, '')}</span>
                          </div>
                        ) : null}
                        {email ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Email</span>
                            <span className="truncate font-medium text-slate-950">{email}</span>
                          </div>
                        ) : null}
                        {phone ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Phone</span>
                            <span className="truncate font-medium text-slate-950">{phone}</span>
                          </div>
                        ) : null}
                        {location ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Location</span>
                            <span className="truncate font-medium text-slate-950">{location}</span>
                          </div>
                        ) : null}
                      </div>
                      {website ? (
                        <Button asChild className="mt-5 w-full rounded-full bg-slate-950 text-white hover:bg-slate-800">
                          <a href={website} target="_blank" rel="noreferrer">Start now</a>
                        </Button>
                      ) : null}
                    </section>

                    {mapEmbedUrl ? (
                      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 px-5 py-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Location</p>
                        </div>
                        <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-56 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                      </section>
                    ) : null}
                  </>
                }
              />
            </div>
          </>
        ) : (
          <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div>
              <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                <div className="relative h-[420px] overflow-hidden bg-slate-100">
                  <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                </div>
                {images.length > 1 ? (
                  <div className="grid grid-cols-4 gap-3 p-4">
                    {images.slice(1, 5).map((image) => (
                      <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <ContentImage src={image} alt={post.title} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">About this {task}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Structured details instead of a generic content block.</h2>
                <p className="mt-4 text-sm leading-8 text-slate-600">{description}</p>
                {highlights.length ? (
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {highlights.slice(0, 4).map((item) => (
                      <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category || taskLabel}</p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {location ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><MapPin className="h-4 w-4" /> {location}</div> : null}
                  {phone ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Phone className="h-4 w-4" /> {phone}</div> : null}
                  {email ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Mail className="h-4 w-4" /> {email}</div> : null}
                  {website ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Globe className="h-4 w-4" /> {website}</div> : null}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                  <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">Browse more</Link>
                </div>
              </div>

              {mapEmbedUrl ? (
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                  <div className="border-b border-slate-200 px-6 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                  </div>
                  <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              ) : null}

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Quick trust cues</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {['Clear contact details', 'Stronger business framing', 'Map and location cues', 'Related surfaces nearby'].map((item) => (
                    <div key={item} className="rounded-[1.3rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{task === 'profile' ? 'Similar profiles' : 'Related surfaces'}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{task === 'profile' ? 'Keep exploring related picks.' : 'Keep browsing nearby matches.'}</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
