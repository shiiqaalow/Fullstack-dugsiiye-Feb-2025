import { LayoutDashboard, ShoppingCart, ShoppingBag, ChartPie, Users, MessageCircleMore, Settings, Power, Atom } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
    const [active, setActive] = useState(0);

    const menu = [
        { name: "Dashboard", icon: <LayoutDashboard color="red" size={20} /> },
        { name: "Orders", icon: <ShoppingCart color="red" size={20} /> },
        { name: "Products", icon: <ShoppingBag color="red" size={20} /> },
        { name: "Overview", icon: <ChartPie color="red" size={20} /> },
        { name: "Customers", icon: <Users color="red" size={20} /> },
        { name: "Messages", icon: <MessageCircleMore color="red" size={20} /> },
        { name: "Settings", icon: <Settings color="red" size={20} /> },
    ];

    return (
        <div className="w-full md:w-64 bg-white/20 p-6 rounded-lg space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <Atom size={35} color="red" />
                <h1 className="text-2xl font-bold text-gray-900">Dawood Shop2</h1>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-2">
                {menu.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                            ${active === i ? "bg-white/50" : "hover:bg-white/20"}`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </button>
                ))}
            </div>

            {/* Logout */}
            <button className="flex items-center gap-3 pt-6">
                <Power color="red" size={20} />
                <span className="font-semibold text-gray-900 text-lg">Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
