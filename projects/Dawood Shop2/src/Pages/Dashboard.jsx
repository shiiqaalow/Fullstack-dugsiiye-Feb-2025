import React, { useState } from "react";
import {
  Home,
  ArrowRightCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  PlusCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useOutletContext } from "react-router";

/* =======================
   DASHBOARD PAGE
======================= */
export const Dashboard = () => {

  const navigate = useNavigate();

  const { activeTab } = useOutletContext()

  const [addRecord, setAddRecord] = useState(false)

  const { register,reset,formState:{errors} } = useForm()

  const statsCards = [
    {
      label: "Total Sales",
      value: "R 12,450",
      icon: <DollarSign size={22} />,
      accent: "from-emerald-400 to-green-500",
    },
    {
      label: "Today",
      value: "R 1,250",
      icon: <TrendingUp size={22} />,
      accent: "from-sky-400 to-blue-500",
    },
    {
      label: "Expenses",
      value: "R 3,100",
      icon: <TrendingDown size={22} />,
      accent: "from-rose-400 to-red-500",
    },
    {
      label: "Records",
      value: "124",
      icon: <ShoppingCart size={22} />,
      accent: "from-orange-400 to-amber-500",
    },
  ];

  return (
    <div className="relative pt-20 text-white">

      {/* ================= STICKY DASHBOARD HEADER ================= */}
      <div
        className="
          sticky top-20 z-30
          backdrop-blur-xl
          border-b border-white/20
          px-6 py-5
        "
      >
        <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
          <Home size={14} />
          <ArrowRightCircle size={14} />
          <span>User</span>
        </div>

        <h1 className="text-3xl font-bold capitalize">
          {activeTab || "Dashboard"}
        </h1>
        <p className="text-sm text-white/70">
          Track sales, expenses and daily performance
        </p>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="px-6 py-8 space-y-10">

        {/* ACTION BAR */}
        <div className="flex items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-white/60" size={18} />
            <input
              placeholder="Search records..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20
              placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {[Filter, SlidersHorizontal, Download].map((Icon, i) => (
              <button
                key={i}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/20 rounded-2xl px-4 py-7 backdrop-blur-xl hover:scale-[1.02] transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">{card.label}</p>
                  <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PLACEHOLDER CONTENT ================= */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 min-h-[400px]">
          <h3 className="text-xl font-semibold mb-2">Recent Records</h3>
          <p className="text-white/70 text-sm">
            Sales records table will appear here.
          </p>
        </div>

        {addRecord && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <div className="w-full max-w-md mx-4 bg-white/15 border border-white/20 rounded-2xl shadow-2xl p-6 animate-scaleIn">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Add Record
                </h2>

                <button
                  onClick={() => setAddRecord(false)}
                  className="text-white/70 hover:text-red-400 transition cursor-pointer bg-white/20 hover:bg-white/10 w-6 h-6 rounded-3xl flex justify-center items-center "
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <input
                  type="text"
                  placeholder="Description"
                  className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
                  Cancel
                </button>

                <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition">
                  Save
                </button>
              </div>

            </div>
          </div>
        )}


      </div>

      {/* ================= FLOATING ADD BUTTON ================= */}
      <Link
        to="transactions"
        onClick={() => {
          console.log("clicked")
          setAddRecord(true)
        }}
        disabled={addRecord ? 'hover:bg-green-700' : ''}
        className="
          fixed bottom-6 right-6 z-50
          bg-orange-500 hover:bg-orange-600
          p-4 rounded-2xl shadow-2xl
          hover:scale-110 transition cursor-pointer
        "
      >
        <PlusCircle size={24} />
      </Link>
    </div>
  );
};
