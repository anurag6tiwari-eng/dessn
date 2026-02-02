
import React from 'react';
import { GMVHistory } from '../types';

interface Props {
  history: GMVHistory[];
}

const GMVTracker: React.FC<Props> = ({ history }) => {
  const GOAL = 10000;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-800 font-medium">Why Soundbox GMV?</p>
        <p className="text-xs text-blue-600 mt-1">High digital sales show your business is active and growing. Keeping this above ₹10k reduces your interest rates.</p>
      </div>

      <div className="space-y-5">
        {history.map((h, i) => {
          const progress = Math.min((h.amount / GOAL) * 100, 100);
          return (
            <div key={i} className="relative">
              <div className="flex justify-between items-center mb-1 text-xs font-semibold uppercase text-slate-400">
                <span>{h.month}</span>
                <span className={h.amount >= GOAL ? 'text-green-600' : 'text-slate-600'}>
                  ₹{h.amount.toLocaleString()} / ₹{GOAL.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${h.amount >= GOAL ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {h.amount >= GOAL && (
                <span className="absolute -right-2 -top-2 bg-green-500 text-white rounded-full p-0.5 text-[8px] border-2 border-white">
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200">
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Estimated completion</p>
        <p className="text-sm font-bold text-slate-800">45 Days Remaining</p>
      </div>
    </div>
  );
};

export default GMVTracker;
