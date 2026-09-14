import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/login/actions'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user has 'admin' role in user_roles table
  const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).maybeSingle();
  if (roleData?.role !== 'admin') { 
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-brandRed mb-4">Access Denied</h1>
          <p className="text-textLight mb-6">You do not have administrative privileges.</p>
          <form action={logout}>
            <button className="px-6 py-2 bg-brandRed text-white rounded hover:bg-red-700 transition">Sign Out</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-charcoal border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandRed">
            Tsaro CMS
          </h2>
          <p className="text-xs text-textMuted mt-1 break-words">{user.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="block px-4 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/pages" className="block px-4 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
            Pages & Content
          </Link>
          <Link href="/admin/menus" className="block px-4 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
            Menus
          </Link>
          <Link href="/admin/media" className="block px-4 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
            Media Library
          </Link>
          <Link href="/admin/settings" className="block px-4 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
            Global Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <button className="w-full px-4 py-2 text-sm font-medium text-brandRed hover:bg-brandRed/10 rounded transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto relative tactical-mesh">
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-transparent to-obsidian/80 pointer-events-none"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  )
}
