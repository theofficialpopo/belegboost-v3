import React from 'react';
import { Save, HardDrive, Printer } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="bg-[#c0c0c0] p-8 border-t-2 border-white">
      <div className="max-w-4xl mx-auto">
        <fieldset className="border-2 border-white border-t-[#808080] border-l-[#808080] p-4">
            <legend className="px-2 font-bold text-black">System Capabilities</legend>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-white border-2 border-[#808080] flex items-center justify-center mb-2">
                        <Save size={32} className="text-black" />
                    </div>
                    <h3 className="font-bold underline text-black">Auto-Save</h3>
                    <p className="text-sm mt-1 text-black">Saves to C:\DOCS automatically every 5 minutes.</p>
                </div>

                 <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-white border-2 border-[#808080] flex items-center justify-center mb-2">
                        <HardDrive size={32} className="text-black" />
                    </div>
                    <h3 className="font-bold underline text-black">Disk Compression</h3>
                    <p className="text-sm mt-1 text-black">Doubles your hard drive space* (*Results vary).</p>
                </div>

                 <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-white border-2 border-[#808080] flex items-center justify-center mb-2">
                        <Printer size={32} className="text-black" />
                    </div>
                    <h3 className="font-bold underline text-black">Fax Support</h3>
                    <p className="text-sm mt-1 text-black">Send digital belege to physical fax machines.</p>
                </div>
            </div>
        </fieldset>

        <div className="mt-8 bg-black p-2 overflow-hidden border-2 border-[#808080] border-b-white border-r-white">
            <p className="text-green-500 font-mono text-sm animate-marquee whitespace-nowrap">
                *** NEWS FLASH *** BELEGBOOST WINS "BEST UTILITY" AWARD AT COMDEX '98 *** UPGRADE YOUR RAM TODAY ***
            </p>
        </div>
      </div>
    </section>
  );
};

export default Features;