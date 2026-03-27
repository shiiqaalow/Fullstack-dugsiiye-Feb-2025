import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ChartBarBig,
  FileText,
  Power,
  Sparkle,
  X,
  Crown,
  Rocket,
  Home,
  BarChart3,
  Users,
  ShoppingBag,
  SidebarIcon,
  Settings,
} from "lucide-react";

const menus = [
  {
    id: "overview",
    label: "Overview",
    icon: Home,
    gradient: "from-purple-500 to-rose-500",
    hover: "from-purple-400 to-rose-400",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-500",
    hover: "from-blue-400 to-cyan-400",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    gradient: "from-green-500 to-teal-500",
    hover: "from-green-400 to-teal-400",
  },
  {
    id: "sales",
    label: "Sales",
    icon: ShoppingBag,
    gradient: "from-purple-500 to-pink-500",
    hover: "from-purple-400 to-pink-400",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    gradient: "from-white/40 to-gray-500",
    hover: "from-white/40 to-gray-400",
  },
  
];


export const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside
      className={`
      fixed top-0 left-0 z-50
      h-screen w-70
      bg-white/10 backdrop-blur-2xl
      border-r border-white/20
      text-white flex flex-col
      transition-transform duration-500 ease-in-out
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
  `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center h-20 px-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center">
            <Sparkle className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Dawood <span className="text-orange-500">Shop</span>
            </h1>
            <p className="text-sm">Belhar Center</p>
          </div>
        </div>

        {/* CLOSE BUTTON (mobile only) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden p-2 rounded-full bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* MENUS */}
      <nav className="flex flex-col gap-3 mt-6 px-4">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => {
              setActiveTab(menu.id)
              setIsSidebarOpen(false) // close on mobile
            }}
            className={`
              group flex items-center gap-4 px-5 py-2 rounded-2xl
              transition-all duration-300 cursor-pointer
              ${
                activeTab === menu.id
                  ? `bg-gradient-to-r ${menu.hover}`
                  : `hover:bg-gradient-to-r ${menu.hover}`
              }
            `}
          >
            {/* ICON */}
            <div
              className={`p-2 rounded-xl bg-gradient-to-r ${menu.gradient}
              group-hover:scale-110 transition-transform duration-300`}
            >
              <menu.icon className="w-5 h-5" />
            </div>

            <span className="font-semibold">{menu.label}</span>
          </button>
        ))}
      </nav>

      {/* UPGRADE */}
      <div className="mt-auto p-6">
        <div className="bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
              <Crown />
            </div>
            <div>
              <h3 className="font-bold">Ultra Pro</h3>
              <p className="text-xs text-white/60">Advanced Analytics</p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 py-2 rounded-3xl font-bold hover:scale-105 transition cursor-pointer">
            <Rocket className="inline w-4 h-4 mr-2" />
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  )
}

