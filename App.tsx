
import React, { useState, useEffect, useCallback } from 'react';
import { EligibilityStatus, MerchantState, Criterion } from './types';
import Header from './components/Header';
import EligibilityCard from './components/EligibilityCard';
import GMVTracker from './components/GMVTracker';
import ActionModal from './components/ActionModal';
import SuccessState from './components/SuccessState';
import { getEligibilityAdvice } from './services/geminiService';

const INITIAL_CRITERIA: Criterion[] = [
  {
    id: '1',
    title: 'Soundbox GMV Milestone',
    description: 'Maintain ₹10k+ monthly GMV for 3 consecutive months.',
    status: EligibilityStatus.IN_PROGRESS,
    icon: '🔊',
    cta: 'View Progress',
    actionType: 'GMV'
  },
  {
    id: '2',
    title: 'Business Documents',
    description: 'Verify your business with GST, Trade License, or Udyam.',
    status: EligibilityStatus.NOT_STARTED,
    icon: '📄',
    cta: 'Upload Now',
    actionType: 'DOCS'
  },
  {
    id: '3',
    title: 'Bank Statement',
    description: 'Securely link your bank account to show business cashflow.',
    status: EligibilityStatus.NOT_STARTED,
    icon: '🏦',
    cta: 'Link Bank',
    actionType: 'BANK'
  },
  {
    id: '4',
    title: 'Instant Bureau Check',
    description: 'Initiate a soft credit pull to check your credit health.',
    status: EligibilityStatus.NOT_STARTED,
    icon: '📈',
    cta: 'Check Score',
    actionType: 'BUREAU'
  }
];

const App: React.FC = () => {
  const [merchant, setMerchant] = useState<MerchantState>({
    name: 'Sharma Sweets',
    isEligible: false,
    gmvHistory: [
      { month: 'Oct 2024', amount: 12500, isMet: true },
      { month: 'Nov 2024', amount: 9200, isMet: false },
      { month: 'Dec 2024', amount: 0, isMet: false }
    ],
    criteria: INITIAL_CRITERIA
  });

  const [activeModal, setActiveModal] = useState<Criterion | null>(null);
  const [advice, setAdvice] = useState<string>('Loading your personalized growth tip...');

  useEffect(() => {
    const fetchAdvice = async () => {
      const tip = await getEligibilityAdvice(merchant);
      setAdvice(tip);
    };
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = (criterion: Criterion) => {
    setActiveModal(criterion);
  };

  const updateStatus = useCallback((id: string, newStatus: EligibilityStatus) => {
    setMerchant(prev => {
      const updatedCriteria = prev.criteria.map(c => 
        c.id === id ? { ...c, status: newStatus } : c
      );
      const isEligible = updatedCriteria.some(c => c.status === EligibilityStatus.COMPLETED);
      return {
        ...prev,
        criteria: updatedCriteria,
        isEligible
      };
    });
    setActiveModal(null);
  }, []);

  if (merchant.isEligible) {
    return <SuccessState merchantName={merchant.name} onReset={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen pb-12 bg-gray-50">
      <Header merchantName={merchant.name} />
      
      <main className="max-w-xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Your Eligibility Hub</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              0/1 Completed
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Complete <span className="font-bold text-slate-800">any one</span> action below to unlock your loan offer. We're here to help you get ready.
          </p>

          <div className="space-y-4">
            {merchant.criteria.map(criterion => (
              <EligibilityCard 
                key={criterion.id} 
                criterion={criterion} 
                onAction={() => handleAction(criterion)} 
              />
            ))}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">💡</div>
            <h3 className="font-bold">Growth Assistant Tip</h3>
          </div>
          <p className="text-blue-50 text-sm leading-relaxed italic">
            "{advice}"
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-slate-400 text-xs px-6">
          Eligibility is refreshed daily. Paytm uses bank-grade security to protect your business data.
        </div>
      </main>

      {activeModal && (
        <ActionModal 
          criterion={activeModal} 
          gmvHistory={merchant.gmvHistory}
          onClose={() => setActiveModal(null)}
          onComplete={(id) => updateStatus(id, EligibilityStatus.COMPLETED)}
        />
      )}
    </div>
  );
};

export default App;
