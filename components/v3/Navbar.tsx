import React from 'react';
import { Menu } from 'lucide-react';
import ThemeSelector from '../ThemeSelector';

const Navbar: React.FC = () => {
  return (
    <div className="bg-[#c0c0c0] border-b-2 border-white shadow-[0px_2px_0px_0px_#808080] p-1 flex items-center justify-between font-mono sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 bg-[#c0c0c0] px-2 py-1 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white">
                <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-yellow-500 grid grid-cols-2">
                    <div className="bg-red-600"></div><div className="bg-green-600"></div>
                    <div className="bg-blue-600"></div><div className="bg-yellow-600"></div>
                </div>
                <span className="font-bold text-black">Start</span>
            </button>
            <div className="hidden sm:block w-[2px] h-6 bg-[#808080] mx-2"></div>
            <span className="text-black font-bold hidden sm:block">BelegBoost 98 SE</span>
        </div>

        <div className="flex items-center gap-2">
           <ThemeSelector className="!rounded-none !border-2 !border-t-[#808080] !border-l-[#808080] !border-b-white !border-r-white !bg-[#c0c0c0]" />
           <div className="bg-black text-green-500 px-2 py-1 border-2 border-[#808080] font-mono text-sm">
             {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </div>
        </div>
    </div>
  );
};

export default Navbar;