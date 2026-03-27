import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Users,
  FileText,
  Settings,
  X,
  FilePenIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}) => {
  const { isLoggedIn, user, profile } = useAuth();

  const sidebar = [
    // { id: "dashboard", label: "Dashboard", link: "/dashboard", icon: <LayoutDashboard size={18} /> },
    {
      id: "analytics",
      label: "Analytics",
      link: "/dashboard/analytics",
      icon: <BarChart3 size={18} />,
    },
    {
      id: "records",
      label: "Records",
      link: "/dashboard/records",
      icon: <FilePenIcon size={18} />,
    },
    {
      id: "transactions",
      label: "Transactions",
      link: "/dashboard/transactions",
      icon: <CreditCard size={18} />,
    },
    {
      id: "customers",
      label: "Customers",
      link: "/dashboard/customers",
      icon: <Users size={18} />,
    },
    {
      id: "reports",
      label: "Reports",
      link: "/dashboard/reports",
      icon: <FileText size={18} />,
    },
  ];

  if (!isLoggedIn) return null;

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 bg-black/70 backdrop-blur-sm
          z-50 md:hidden
          transition-opacity
          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          w-72 bg-white/10 border-r border-white/20 text-white
          fixed top-0 md:top-20 left-0
          h-screen md:h-[calc(100vh-5rem)]
          z-50 flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* Close (mobile) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4"
        >
          <X />
        </button>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <div
             onClick={() => {
                setActiveTab('dashboard');
                setSidebarOpen(false);
                
              }} 
            className=" flex items-center gap-3 px-4 py-2 rounded-lg transition bg-orange-500 shadow-lg text-white cursor-pointer mb-15 text-lg font-bold">
            <div>
              <LayoutDashboard size={18} />
            </div>
            <div>
               <NavLink
              to='dashboard'
             
              className={`
                ${activeTab === 'dashboard'
                  ? "bg-orange-500 "
                  : "text-white/80 hover:bg-white/20"
                }
              `}
            >
              {/* <LayoutDashboard/> */}
              <span className="text-lg font-bold">Dashboard</span>
            </NavLink>
            </div>
          </div>
          <div className=" px-4 pb-3">
            <h1>Track your Bussiness</h1>
          </div>
          {sidebar.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${activeTab === item.id
                  ? "bg-orange-500 shadow-lg"
                  : "text-white/80 hover:bg-white/20"
                }
              `}
            >
              {item.icon}
              <span className="text-lg font-bold">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* User */}
        <div className="border-t border-white/20 p-4 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="uppercase bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">
              {profile?.username?.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1">
              <h2 className="font-semibold">{profile?.username}</h2>
              <p className="text-white/70 text-sm">{user?.email}</p>
            </div>

            <Settings className="cursor-pointer hover:text-orange-400" />
          </div>
        </div>
      </aside>
    </>
  );
};
