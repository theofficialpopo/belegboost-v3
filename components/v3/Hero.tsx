import React from 'react';
import { X, Minus, Square } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-[#008080] dark:bg-black p-4 md:p-12 min-h-[80vh] flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
      
      <div className="w-full max-w-3xl bg-[#c0c0c0] border-2 border-white border-b-[#404040] border-r-[#404040] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
        {/* Title Bar */}
        <div className="bg-[#000080] px-2 py-1 flex items-center justify-between text-white">
            <span className="font-bold tracking-wider">Welcome to BelegBoost Setup Wizard</span>
            <div className="flex gap-1">
                <button className="w-4 h-4 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-black"><Minus size={10} /></button>
                <button className="w-4 h-4 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-black"><Square size={8} /></button>
                <button className="w-4 h-4 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-black"><X size={10} /></button>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 text-black font-mono">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 bg-white border-2 border-[#808080] border-b-white border-r-white shadow-inner flex items-center justify-center shrink-0">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Floppy" alt="Computer" className="w-24 h-24" />
                </div>
                
                <div>
                    <h1 className="text-2xl font-bold mb-4">Digitize Your Belege Like It's 1999!</h1>
                    <p className="mb-6 leading-relaxed">
                        Welcome to the future of accounting. BelegBoost 98 connects your 
                        <span className="bg-yellow-200 px-1">Information Superhighway</span> directly to DATEV.
                        Now with <span className="text-red-600 blink animate-pulse font-bold">MULTIMEDIA</span> support!
                    </p>
                    
                    <ul className="list-disc pl-4 space-y-1 mb-6 text-sm">
                        <li>Compatible with MS-DOS 6.22</li>
                        <li>Requires 4MB RAM (8MB Recommended)</li>
                        <li>Y2K Compliant (Mostly)</li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-[#808080] border-b-white h-[2px] w-full"></div>
            <div className="flex justify-end gap-4 mt-4">
                <button className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                    &lt; Back
                </button>
                <button className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white ring-1 ring-black ring-offset-1 ring-offset-[#c0c0c0]">
                    Next &gt;
                </button>
                <button className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                    Cancel
                </button>
            </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;