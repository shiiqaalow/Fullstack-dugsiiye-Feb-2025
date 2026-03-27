import { Bell, Menu, Moon, Sun, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { signOut } from "../lib/Auth";

export const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [theme, setTheme] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isLoggedIn, profile, user } = useAuth();

  const location = useLocation();

  // Detect dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

  const navbar = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: "/dashboard" },
    { label: "Analytics", link: "/analytics" },
    { label: "Transactions", link: "/transactions" },
  ];

  const avatar_Url = null

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center px-6 text-white">
          {/* LEFT: LOGO + DASHBOARD MENU BUTTON */}
          <div className="flex items-center gap-5">
            {isDashboard && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden cursor-pointer"
              >
                <Menu />
              </button>
            )}

            <h1 className="text-2xl font-bold">
              Dawood <span className="text-orange-400">Shop2</span>
            </h1>
          </div>

          {/* CENTER NAVBAR (Hide in Dashboard) */}
          {!isDashboard && (
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              {navbar.map((nav, index) => (
                <NavLink
                  key={index}
                  to={nav.link}
                  className={({isActive})=>
                    `hover:text-orange-400 text-lg ${
                      isActive 
                        ? "text-orange-400 border-b-2 border-orange-400"
                        : ""
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-6">
            {/* 🌙 THEME ICON ALWAYS VISIBLE */}
            <button 
              onClick={() => setTheme(!theme)} className="cursor-pointer"
            >
              {theme ? <Moon /> : <Sun />}
            </button>
            {/* Notification */}
            <button>
              <Bell/>
            </button>
            { isLoggedIn && (
               <div className="relative">
              {/* profile pic */}
              <button
                className="flex justify-center items-center  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full cursor-pointer"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {avatar_Url ? (
                  <img src={avatar_Url} className="w-9 h-9 rounded-full" />
                ) : (
                  <div className="uppercase bg-orange-500 hover:bg-orange-600 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center">
                    {profile?.username?.slice(0,2).toUpperCase()}
                  </div>
                  
                )}
              </button>
              {/* dropdown profile */}
              {isDropdownOpen && (
                <div
                  className=" absolute right-0 w-48 mt-1 bg-white shadow-lg rounded-md   z-10"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className=""></div>
                  <Link
                    to="profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Manage Profile
                  </Link>
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={async () => {
                      await signOut() 
                      toast.success("Logged out")
                    }}
                  >
                    Logout
                  </Link>
                  {/* </div> */}
                </div>
              )}
            </div>
            )}

            {/* MOBILE MENU BUTTON (Hide in Dashboard because dashboard uses sidebar) */}
            {!isDashboard && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden cursor-pointer"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            )}

            {/* AUTH BUTTONS (ONLY when NOT logged in, and NOT in dashboard) */}
            {!isDashboard && !isLoggedIn && (
              <div className="hidden md:flex gap-3">
                <Link
                  to="/signin"
                  className="font-semibold bg-orange-500 hover:bg-orange-600 px-6 py-1 rounded-md"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="font-semibold border border-orange-500 px-6 py-1 rounded-md hover:bg-orange-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* DARK OVERLAY */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 
        ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"} md:hidden`}
      />

      {/* MOBILE MENU */}
      <div
        className={`
        fixed top-20 left-0 w-full md:hidden z-50
        bg-gradient-to-br from-indigo-700/70 via-purple-700/70 to-pink-700/70
        backdrop-blur-xl border-b border-white/20 shadow-2xl
        transition-all duration-500
        ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}
        `}
      >
        {/* PROFILE SECTION */}
        {isLoggedIn && (
          <div className="flex flex-col gap-3 px-6 py-5 text-white border-b border-black/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="uppercase bg-orange-500 w-8 h-8 rounded-full flex justify-center items-center font-bold">
                  {profile?.username.split("ii")[0]}
                </div>

                <div>
                  <h1 className="text-xl">{profile?.username}</h1>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>

              <Bell />
            </div>

            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-center bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md font-semibold"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* NAV LINKS */}
        <div className="flex flex-col space-y-6 px-6 py-8 text-white text-lg font-medium">
          {navbar.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.link}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `${isActive ? "text-orange-500 border-b-2 border-orange-500" : ""}
                 hover:text-orange-400 font-semibold`
              }
            >
              {nav.label}
            </NavLink>
          ))}

          {/* AUTH BUTTONS MOBILE */}
          {!isLoggedIn && (
            
            <div className="flex flex-col gap-3 pt-4 border-t border-black/20 text-center">
              <Link
                onClick={()=>setIsMenuOpen(!isMenuOpen)}
                to="/signin"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md font-semibold"
              >
                Sign In
              </Link>

              <Link
                onClick={()=>setIsMenuOpen(!isMenuOpen)}
                to="/signup"
                className="border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
