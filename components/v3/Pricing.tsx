import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section className="bg-[#c0c0c0] p-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <table className="w-full border-collapse border-2 border-[#808080] bg-white text-black font-mono">
            <thead>
                <tr className="bg-[#000080] text-white">
                    <th className="border border-[#808080] p-2 text-left">SKU Name</th>
                    <th className="border border-[#808080] p-2 text-left">Features (Shareware)</th>
                    <th className="border border-[#808080] p-2 text-right">Price (DM)</th>
                    <th className="border border-[#808080] p-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-[#808080] p-2 font-bold">Shareware Ver.</td>
                    <td className="border border-[#808080] p-2">Includes Nag Screen, 250 files</td>
                    <td className="border border-[#808080] p-2 text-right">0.00</td>
                    <td className="border border-[#808080] p-2 text-center">
                        <a href="#" className="underline text-blue-800">Download.exe</a>
                    </td>
                </tr>
                <tr className="bg-yellow-100">
                    <td className="border border-[#808080] p-2 font-bold">Registered Ver.</td>
                    <td className="border border-[#808080] p-2">No Nag Screen, CD-ROM included</td>
                    <td className="border border-[#808080] p-2 text-right">29.99</td>
                    <td className="border border-[#808080] p-2 text-center">
                        <button className="bg-[#c0c0c0] px-2 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs">ORDER NOW</button>
                    </td>
                </tr>
                 <tr>
                    <td className="border border-[#808080] p-2 font-bold">Enterprise Lic.</td>
                    <td className="border border-[#808080] p-2">50 Users, Manual included</td>
                    <td className="border border-[#808080] p-2 text-right">89.99</td>
                    <td className="border border-[#808080] p-2 text-center">
                         <a href="#" className="underline text-blue-800">Mail Form</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <p className="text-xs text-center mt-4 font-mono text-gray-600">* Plus shipping and handling. Allow 6-8 weeks for delivery.</p>
      </div>
    </section>
  );
};

export default Pricing;