
import React, { useState, useEffect } from 'react';
import { Criterion, GMVHistory } from '../types';
import GMVTracker from './GMVTracker';
import { explainBureauCheck } from '../services/geminiService';

interface Props {
  criterion: Criterion;
  gmvHistory: GMVHistory[];
  onClose: () => void;
  onComplete: (id: string) => void;
}

const ActionModal: React.FC<Props> = ({ criterion, gmvHistory, onClose, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bureauInfo, setBureauInfo] = useState('');

  useEffect(() => {
    if (criterion.actionType === 'BUREAU') {
      explainBureauCheck().then(setBureauInfo);
    }
  }, [criterion]);

  const handleFinish = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete(criterion.id);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-transform transform translate-y-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{criterion.icon}</span>
            <h3 className="text-xl font-bold text-slate-800">{criterion.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-8">
          {criterion.actionType === 'GMV' && <GMVTracker history={gmvHistory} />}
          
          {criterion.actionType === 'DOCS' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Please provide a valid document to verify your business existence.</p>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-400 transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">☁️</div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700">Tap to upload Document</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, PNG or JPG (Max 5MB)</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="doc" className="w-4 h-4 text-blue-600" defaultChecked />
                  <span className="text-sm text-slate-700">GST Certificate</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="doc" className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-slate-700">Udyam/MSME Registration</span>
                </label>
              </div>
            </div>
          )}

          {criterion.actionType === 'BANK' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Link your primary business account for automated verification via AA (Account Aggregator).</p>
              <div className="grid grid-cols-3 gap-3">
                {['HDFC', 'ICICI', 'SBI', 'Axis', 'KMB', 'PNB'].map(bank => (
                  <button key={bank} className="p-3 border rounded-xl hover:border-blue-500 transition-all font-bold text-slate-600 text-sm">
                    {bank}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <span className="text-green-500">🔒</span> Encrypted & RBI Regulated Process
              </div>
            </div>
          )}

          {criterion.actionType === 'BUREAU' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-semibold mb-1">Expert Advice</p>
                <p className="text-xs text-blue-600 leading-relaxed italic">
                  {bureauInfo || "Checking your score helps us find the best interest rates for you."}
                </p>
              </div>
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">👤</div>
                  <div>
                    <p className="text-sm font-bold">PAN: *****902L</p>
                    <p className="text-xs text-slate-400">Linked to your Merchant Account</p>
                  </div>
                </div>
                <label className="flex items-start gap-3 mt-4">
                  <input type="checkbox" className="mt-1 rounded text-blue-600" />
                  <span className="text-xs text-slate-500 leading-relaxed">
                    I authorize Paytm to fetch my credit bureau score. I understand this is a soft inquiry and will not impact my credit score.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 sticky bottom-0 bg-white pt-2">
          <button 
            disabled={isProcessing}
            onClick={onClose}
            className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
          >
            Go Back
          </button>
          <button 
            onClick={handleFinish}
            disabled={isProcessing}
            className={`flex-[2] py-4 bg-paytm-blue text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${isProcessing ? 'opacity-80' : ''}`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              criterion.actionType === 'GMV' ? 'Close' : 'Complete Step'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
