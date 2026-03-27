import { Bell, Moon, Search, Sidebar, Sun, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

export const DashHeader = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  currentTime,
  isLoggedIn,
  // setIsLoggedIn,
}) => {

  const [ theme,setTheme ] = useState(false)
  return (
    <header className="w-full bg-white/20 backdrop-blur-md text-white px-4 md:px-6 py-3">
      <div className="flex flex-col  gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* Sidebar toggle */}
          <button
            className=" lg:hidden cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Sidebar className="w-7 h-7" />
          </button>

          {/* Title & Date */}
          <div>
            <h1 className="text-lg md:text-xl font-semibold capitalize">
              {activeTab}
            </h1>
            <p className="text-xs md:text-sm text-white/80">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* SEARCH */}
          <div className="flex items-center bg-white/20 rounded-md px-3 py-2">
            <Search className="w-4 h-4 " />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent text-sm outline-none placeholder-white/70 w-40"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Themes */}
            <button 
              className="cursor-pointer"
              onClick={()=>setTheme(!theme)}
              >
                {theme ? <Moon/> : <Sun />}
            </button>
            {/* NOTIFICATIONS */}
            <div className="relative cursor-pointer">
              <Bell className="w-6 h-6" />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 text-[10px] 
                flex items-center justify-center rounded-full bg-red-500
                animate-pulse"
              >
                2
              </span>
            </div>

            {/* PROFILE */}
            {isLoggedIn ? (
              <Link  
                to='signup'
                className="relative flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer"
              >
                <div 
                  className="w-9 h-9 flex items-center justify-center  bg-gradient-to-r from-orange-400 to-orange-600
                  hover:from-orange-500 hover:to-orange-700
                  font-semibold rounded-md cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </div>
                <span
                  className="absolute top-1 right-2 w-3.5 h-3.5
                  bg-rose-600 border-2 border-white rounded-full
                  animate-pulse"
                ></span>
              </Link>
            ) : (
              <Link  
                to='signup'
                className="relative flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer"
              >
                <div 
                  className="w-9 h-9 flex items-center justify-center  bg-gradient-to-r from-orange-400 to-orange-600
                  hover:from-orange-500 hover:to-orange-700
                  font-semibold rounded-md cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </div>
                <span
                  className="absolute top-1 right-2 w-3.5 h-3.5
                  bg-green-400 border-2 border-white rounded-full
                  animate-pulse"
                ></span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
