
import React from 'react';

interface HeaderProps {
  merchantName: string;
}

const Header: React.FC<HeaderProps> = ({ merchantName }) => {
  return (
    <header className="bg-[#002E6E] pt-10 pb-20 px-6 rounded-b-[40px] shadow-lg">
      <div className="max-w-xl mx-auto flex justify-between items-start">
        <div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" 
            alt="Paytm Logo" 
            className="h-6 mb-4 brightness-0 invert"
          />
          <h1 className="text-2xl font-bold text-white mb-1">Hello, {merchantName}</h1>
          <p className="text-blue-100/80 text-sm">Build your credit and unlock business loans.</p>
        </div>
        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
