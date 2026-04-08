'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

type LoginFormProps = {
  inputClassName: string
  buttonClassName: string
  defaultRedirect?: string
}

export function LoginForm({ inputClassName, buttonClassName, defaultRedirect = '/' }: LoginFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const redirectTo = searchParams.get('from') || defaultRedirect

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      router.replace(redirectTo.startsWith('/') ? redirectTo : defaultRedirect)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <label className="grid gap-1.5 text-sm">
        <span className="sr-only">Email</span>
        <input
          className={inputClassName}
          placeholder="Email address"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="sr-only">Password</span>
        <input
          className={inputClassName}
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={isLoading} className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:opacity-60 ${buttonClassName}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
