import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-[12vw] font-black text-slate-100 dark:text-slate-900 leading-none select-none">BELEGBOOST</h2>
            <div className="flex justify-center gap-8 mt-8 text-sm font-medium text-slate-500">
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
            </div>
             <p className="mt-8 text-slate-400 text-xs">© 2025 Modern Corp. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;