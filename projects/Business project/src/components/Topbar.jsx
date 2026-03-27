import { Bell, Search, User } from 'lucide-react'

export const Topbar = () => {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm sticky top-0 z-20">

      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-5">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="text-sm font-medium">Dawood</span>
        </div>

      </div>
    </header>
  )
}
