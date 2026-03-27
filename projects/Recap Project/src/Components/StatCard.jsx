import React from "react";

const StatCard = ({ title, amount, percent, icon, color }) => {
    const isPositive = percent.includes("+");

    return (
        <div className="flex flex-col bg-white/40 p-4 rounded-lg w-full space-y-4">
            {/* Icon + Amount */}
            <div className="flex items-center gap-3">
                <span className={`px-3 py-2 rounded-lg border-2 ${color}`}>
                    {icon}
                </span>
                <h1 className="font-bold text-lg">{amount}</h1>
            </div>

            {/* Title + Percent */}
            <div className="flex justify-between items-center">
                <h1 className="text-gray-500">{title}</h1>

                <span className={isPositive ? "text-green-600" : "text-red-600"}>
                    {percent}
                </span>

                {isPositive ? (
                    <span className="text-green-600">▲</span>
                ) : (
                    <span className="text-red-600">▼</span>
                )}
            </div>
        </div>
    );
};

export default StatCard;
