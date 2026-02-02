
import React from 'react';
import { Criterion, EligibilityStatus } from '../types';

interface Props {
  criterion: Criterion;
  onAction: () => void;
}

const EligibilityCard: React.FC<Props> = ({ criterion, onAction }) => {
  const getStatusStyle = (status: EligibilityStatus) => {
    switch (status) {
      case EligibilityStatus.COMPLETED:
        return 'bg-green-100 text-green-700';
      case EligibilityStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  const getStatusLabel = (status: EligibilityStatus) => {
    switch (status) {
      case EligibilityStatus.COMPLETED: return 'Completed';
      case EligibilityStatus.IN_PROGRESS: return 'In Progress';
      default: return 'Not Started';
    }
  };

  return (
    <div className="border border-slate-100 rounded-xl p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        {criterion.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-slate-800">{criterion.title}</h4>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getStatusStyle(criterion.status)}`}>
            {getStatusLabel(criterion.status)}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed">
          {criterion.description}
        </p>
        <button 
          onClick={onAction}
          className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
        >
          {criterion.cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EligibilityCard;
