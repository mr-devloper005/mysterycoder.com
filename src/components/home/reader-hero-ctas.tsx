'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

const btnPrimary =
  'inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-900'
const btnSecondary =
  'inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50'

export function ReaderHeroCtas() {
  const { isAuthenticated, hasHydrated } = useAuth()

  if (!hasHydrated) {
    return (
      <div className="mt-8 space-y-6" aria-hidden>
        <div className="h-12 max-w-[11rem] animate-pulse rounded-full bg-black/10" />
        <div className="h-4 max-w-[14rem] animate-pulse rounded bg-black/10" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/articles" className={btnPrimary}>
            Browse articles
          </Link>
          <Link href="/create/article" className={btnSecondary}>
            New article
          </Link>
        </div>
        <p className="mt-6 text-sm text-neutral-800">
          You’re signed in — jump in where you left off.
        </p>
      </>
    )
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link href="/register" className={btnPrimary}>
          Get started
        </Link>
      </div>
      <p className="mt-6 text-sm text-neutral-800">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-black underline-offset-4 hover:underline">
          Log in
        </Link>
      </p>
    </>
  )
}
