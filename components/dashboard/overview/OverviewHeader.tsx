import React from 'react';

const OverviewHeader: React.FC<{ gridClass: string }> = ({ gridClass }) => {
  return (
    <div className={`hidden md:grid ${gridClass} py-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 select-none border-b border-slate-100 dark:border-slate-800 border-x border-t border-transparent mb-2`}>
        <div>Mandant / Quelle</div>
        <div>Berater</div>
        <div>Zeitraum</div>
        <div>Saldo</div>
        <div>Eingang</div>
        <div className="text-right">Status</div>
    </div>
  );
};

export default OverviewHeader;
