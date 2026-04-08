'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900" aria-label="Account">
          <Avatar className="h-9 w-9 border border-neutral-200">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 border border-neutral-200 bg-white p-0 shadow-lg">
        <div className="flex items-start gap-3 p-4">
          <Avatar className="h-11 w-11 shrink-0 border border-neutral-200">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-neutral-900">{user?.name || 'Signed in'}</p>
            <p className="mt-0.5 truncate text-xs text-neutral-500">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer rounded-none px-4 py-3 text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
