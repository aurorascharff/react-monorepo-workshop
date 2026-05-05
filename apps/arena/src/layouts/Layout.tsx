import { NavLink, Outlet } from 'react-router'
import { Activity, LayoutDashboard, Users } from 'lucide-react'
import { cn } from '@klinikk/ui'

export function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-sidebar flex flex-col shrink-0">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Klinikk Arena</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2">Journalsystem</p>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/pasienter"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            }
          >
            <Users className="h-4 w-4" />
            Pasientliste
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
