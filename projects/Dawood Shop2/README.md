# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.








import React from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  SlidersHorizontal,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  ArrowRightCircle,
  Home,
} from "lucide-react";

export const Dashboard = ({ activeTab }) => {
  return (
    <div className="relative 
      backdrop-blur-xl text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className=" dashboard-header border-b pb-4">
          <div className="flex items-center gap-2 pb-6 text-sm opacity-90">
             <Home className="w-4 h-4" />
            <ArrowRightCircle className="w-4 h-4" />
          </div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Welcome to your dashboard </p>
        </div>
        <div>
          <h1 className="text-3xl tracking-tight">
            {activeTab || "Dashboard"}
          </h1>
          <p className="text-sm text-white/70">
            Track sales, expenses and daily performance
          </p>
        </div>

        {/* FUNCTION ICONS */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-white/60" size={18} />
            <input
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 rounded-xl 
              bg-white/10 border border-white/20 
              text-sm placeholder-white/60 
              focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <IconBtn icon={<Filter size={18} />} label="Filter" />
          <IconBtn icon={<SlidersHorizontal size={18} />} label="Advanced" />
          <IconBtn icon={<Download size={18} />} label="Export" />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">
        <StatCard
          title="Total Sales"
          value="R 12,450"
          icon={<DollarSign />}
          accent="from-emerald-400 to-green-500"
        />
        <StatCard
          title="Today"
          value="R 1,250"
          icon={<TrendingUp />}
          accent="from-sky-400 to-blue-500"
        />
        <StatCard
          title="Expenses"
          value="R 3,100"
          icon={<TrendingDown />}
          accent="from-rose-400 to-red-500"
        />
        <StatCard
          title="Records"
          value="124"
          icon={<ShoppingCart />}
          accent="from-orange-400 to-amber-500"
        />
      </div>

      {/* TABLE */}
      <div className="mt-8 rounded-2xl 
        bg-white/10 backdrop-blur-lg 
        border border-white/20 overflow-hidden">

        <div className="p-4 border-b border-white/20">
          <h2 className="font-semibold">Daily Records</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-white/10 text-white/70">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center text-white/60">
              <td colSpan="5" className="p-6">
                No records yet. Click <b>Add Record</b> to start.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FLOATING ADD BUTTON */}
      <button className="
        fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-orange-500 to-pink-500
        hover:scale-105 transition
        text-white rounded-full px-5 py-4
        shadow-xl shadow-orange-500/30
        flex items-center gap-2">
        <Plus />
        <span className="hidden md:inline font-medium">
          Add Record
        </span>
      </button>
    </div>
  );
};

/* ICON BUTTON */
const IconBtn = ({ icon, label }) => (
  <button
    title={label}
    className="
      p-3 rounded-xl 
      bg-white/10 border border-white/20
      hover:bg-white/20 transition
      shadow-md">
    {icon}
  </button>
);

/* STAT CARD */
const StatCard = ({ title, value, icon, accent }) => (
  <div className="
    rounded-2xl p-5 
    bg-white/10 backdrop-blur-lg 
    border border-white/20
    flex items-center justify-between">

    <div>
      <p className="text-sm text-white/70">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>

    <div className={`
      p-4 rounded-xl 
      bg-gradient-to-br ${accent}
      shadow-lg`}>
      {icon}
    </div>
  </div>
);
