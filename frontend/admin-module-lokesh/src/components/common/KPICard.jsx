// src/components/common/KPICard.jsx
import React from 'react';

const KPICard = ({ title, value, icon: Icon, colorClass }) => {
  return (
   <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg shadow-black/20 flex items-center justify-between">

      {/* Left side: Text Data */}
      <div>
        <h4 className="text-slate-400 text-sm">{title}</h4>
<p className="text-white text-2xl font-bold">{value}</p>

      </div>
      
      {/* Right side: The Icon with a colored background */}
      <div className={`p-3 rounded-lg ${colorClass}`}>
  <Icon className="w-6 h-6" />
</div>


    </div>
  );
};

export default KPICard;