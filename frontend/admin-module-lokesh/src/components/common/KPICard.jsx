import React from "react";

const KPICard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        p-6 rounded-xl
        shadow-sm dark:shadow-black/20
        flex items-center justify-between
        transition-colors
      "
    >
      {/* Text */}
      <div>
        <h4 className="text-slate-500 dark:text-slate-400 text-sm">
          {title}
        </h4>
        <p className="text-slate-900 dark:text-white text-2xl font-bold">
          {value}
        </p>
      </div>

      {/* Icon */}
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default KPICard;
