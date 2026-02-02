
import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  merchantName: string;
  onReset: () => void;
}

const SuccessState: React.FC<Props> = ({ merchantName, onReset }) => {
  const [congrats, setCongrats] = useState("You've unlocked a loan offer!");

  useEffect(() => {
    const fetchCongrats = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Create a very exciting 1-sentence headline for a merchant ${merchantName} who just became eligible for a business loan. Mention growth and success.`,
          config: { maxOutputTokens: 60 }
        });
        setCongrats(response.text);
      } catch (e) { /* fallback to default */ }
    };
    fetchCongrats();
  }, [merchantName]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-6xl animate-bounce">
          🎉
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-paytm-blue text-white rounded-full flex items-center justify-center text-xl font-bold border-4 border-white">
          ₹
        </div>
      </div>
      
      <h1 className="text-3xl font-extrabold text-slate-800 mb-4 leading-tight">
        {congrats}
      </h1>
      
      <p className="text-slate-500 mb-10 max-w-sm">
        Great work, {merchantName}! Your credit building efforts have paid off. You are now eligible for a merchant loan of up to <span className="text-slate-800 font-bold">₹5,00,000</span>.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <button 
          className="w-full py-5 bg-paytm-blue text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all"
        >
          See My Offer
        </button>
        <button 
          onClick={onReset}
          className="w-full py-4 text-slate-400 font-medium hover:text-slate-600 transition-colors"
        >
          Check other eligibility stats
        </button>
      </div>

      <div className="mt-12 pt-8 border-t w-full max-w-sm grid grid-cols-2 gap-4">
        <div className="text-left">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Interest Rate</p>
          <p className="text-sm font-bold text-green-600">Starting 1.5% p.m.</p>
        </div>
        <div className="text-left">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tenure</p>
          <p className="text-sm font-bold text-slate-800">Up to 12 Months</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessState;
