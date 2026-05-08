'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  ChevronDown,
  FileText,
  Menu,
  Search,
  User,
  X,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const shell = 'border-b border-neutral-200/80 bg-white text-[#111] shadow-[0_1px_0_rgba(0,0,0,0.04)]'

export function ReaderNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const qFromUrl = pathname === '/search' ? (searchParams.get('q') ?? '') : ''
  const { user, logout, isAuthenticated, hasHydrated } = useAuth()

  const articleTask = SITE_CONFIG.tasks.find((t) => t.key === 'article' && t.enabled)
  const profileTask = SITE_CONFIG.tasks.find((t) => t.key === 'profile' && t.enabled)

  const browseItems = useMemo(
    () =>
      [articleTask, profileTask].filter(Boolean) as NonNullable<typeof articleTask>[],
    [articleTask, profileTask],
  )

  return (
    <header className={cn('sticky top-0 z-50 w-full', shell)}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE_CONFIG.name} home`}>
          <img
            src="/favicon.png?v=20260413"
            alt=""
            width={220}
            height={56}
            className="h-9 w-auto max-w-[min(200px,46vw)] object-contain object-left sm:h-10 sm:max-w-[220px]"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100">
              Browse
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              {browseItems.map((task) => (
                <DropdownMenuItem key={task.key} asChild>
                  <Link href={task.route}>{task.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100">
              Community
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/community">Community hub</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">Help</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <form
          action="/search"
          method="get"
          role="search"
          className="hidden min-w-0 flex-1 justify-center md:flex"
        >
          <label className="relative flex w-full max-w-xl items-center">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-4 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
            <input
              key={`nav-q-${pathname}-${qFromUrl}`}
              type="search"
              name="q"
              defaultValue={qFromUrl}
              placeholder="Search articles, profiles…"
              autoComplete="off"
              className="h-10 w-full rounded-full border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none ring-offset-2 transition hover:border-neutral-300 hover:bg-white focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 lg:inline-flex">
              Write
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {articleTask ? (
                <DropdownMenuItem asChild>
                  <Link href="/create/article" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    New article
                  </Link>
                </DropdownMenuItem>
              ) : null}
              {profileTask ? (
                <DropdownMenuItem asChild>
                  <Link href={profileTask.route} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Your profile
                  </Link>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>

          {!hasHydrated ? (
            <div className="hidden h-9 w-[7.5rem] animate-pulse rounded-full bg-neutral-100 sm:block" aria-hidden />
          ) : isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-3 font-semibold text-neutral-800">
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-black px-4 font-semibold text-white hover:bg-neutral-900">
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            <form
              action="/search"
              method="get"
              role="search"
              className="flex gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-2"
              onSubmit={() => setOpen(false)}
            >
              <label className="sr-only" htmlFor="reader-nav-mobile-search">
                Search
              </label>
              <input
                key={`m-nav-q-${pathname}-${qFromUrl}`}
                id="reader-nav-mobile-search"
                type="search"
                name="q"
                defaultValue={qFromUrl}
                placeholder="Search…"
                className="min-w-0 flex-1 rounded-lg border-0 bg-transparent px-2 text-sm outline-none"
              />
              <Button type="submit" size="sm" className="shrink-0 rounded-lg bg-black px-3 font-semibold text-white">
                <Search className="h-4 w-4" />
                <span className="sr-only">Submit search</span>
              </Button>
            </form>
            {browseItems.map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                {task.label}
              </Link>
            ))}
            <Link href="/community" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-neutral-50" onClick={() => setOpen(false)}>
              Community
            </Link>
            {articleTask ? (
              <Link
                href="/create/article"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                <FileText className="h-4 w-4" />
                New article
              </Link>
            ) : null}
            {hasHydrated && isAuthenticated && user ? (
              <div className="mt-3 border-t border-neutral-200 pt-4">
                <p className="px-1 text-sm font-semibold text-neutral-900">{user.name}</p>
                <p className="mt-1 truncate px-1 text-xs text-neutral-500">{user.email}</p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 w-full rounded-full border-neutral-200"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                >
                  Sign out
                </Button>
              </div>
            ) : null}
            {hasHydrated && !isAuthenticated ? (
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1 rounded-full border border-neutral-200 py-2.5 text-center text-sm font-semibold" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link href="/register" className="flex-1 rounded-full bg-black py-2.5 text-center text-sm font-semibold text-white" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
