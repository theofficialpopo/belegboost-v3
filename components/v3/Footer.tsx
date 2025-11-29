import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#c0c0c0] border-t-2 border-white p-2 text-center font-mono text-xs text-black">
       <div className="border border-[#808080] border-b-white border-r-white p-2 bg-[#c0c0c0] inset-shadow">
          Best viewed with Netscape Navigator 4.0 at 800x600 resolution.
          <br/>
          You are visitor number: <span className="bg-black text-red-500 font-bold px-1 border border-white ml-1">01423</span>
       </div>
    </footer>
  );
};

export default Footer;