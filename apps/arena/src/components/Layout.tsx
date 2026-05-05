import { NavLink, Outlet } from 'react-router'

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-xl font-bold">DIPS Arena</h1>
          <p className="text-blue-300 text-sm mt-1">Journalsystem</p>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          <NavLink
            to="/pasienter"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            Pasientliste
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
