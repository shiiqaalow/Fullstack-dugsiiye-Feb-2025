import {
  Home,
  LayoutDashboard,
  Calendar,
  User,
} from "lucide-react";
import { NavLink } from "react-router";

export const BottomNav = () => {
  const navItems = [
    { title: "Home", icon: Home, link: "/" },
    { title: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
    { title: "Daily", icon: Calendar, link: "/daily" },
    { title: "Profile", icon: User, link: "/profile" },
  ];

  return (
    <>
      {/* Spacer so content doesn't hide behind nav */}
      <div className="h-20 md:hidden" />

      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-gradient-to-t from-indigo-700 via-purple-700 to-pink-700 pt-10 shadow-2xl">
          <div className="flex items-center justify-around h-16">
            {navItems.map((nav, index) => {
              const Icon = nav.icon;

              return (
                <NavLink key={index} to={nav.link} className="flex-1">
                  {({ isActive }) => (
                    <div className="flex flex-col items-center justify-center gap-1">
                      {/* ICON */}
                      <div
                        className={`
                          relative flex items-center justify-center
                          w-11 h-11 rounded-xl transition-all duration-300
                          ${
                            isActive
                              ? "bg-orange-500 text-white scale-110 shadow-lg"
                              : "text-white/70 bg-white/20 hover:bg-white/30"
                          }
                        `}
                      >
                        <Icon size={22} />

                        {/* Active dot
                        {isActive && (
                          <span className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full" />
                        )} */}
                      </div>

                      {/* LABEL */}
                      <span
                        className={`
                          text-[14px] transition
                          ${
                            isActive
                              ? "text-orange-400 font-semibold"
                              : "text-white/70"
                          }
                        `}
                      >
                        {nav.title}
                      </span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
