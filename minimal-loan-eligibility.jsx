import React, { useState } from 'react';
import { TrendingUp, CheckCircle, Circle, FileText, Upload, Shield, ChevronRight, X, Clock } from 'lucide-react';

export default function MinimalLoanEligibility() {
  const [showDocumentSheet, setShowDocumentSheet] = useState(false);

  // GMV timeline data
  const timeline = [
    { 
      month: 'Jan', 
      fullMonth: 'January 2026',
      gmv: 12500, 
      target: 10000, 
      status: 'complete',
      date: '31 Jan'
    },
    { 
      month: 'Feb', 
      fullMonth: 'February 2026',
      gmv: 11200, 
      target: 10000, 
      status: 'complete',
      date: '28 Feb'
    },
    { 
      month: 'Mar', 
      fullMonth: 'March 2026',
      gmv: 8300, 
      target: 10000, 
      status: 'in-progress',
      date: 'In progress'
    }
  ];

  const completedMonths = timeline.filter(m => m.status === 'complete').length;
  const currentGmv = timeline[2].gmv;
  const targetGmv = timeline[2].target;
  const remaining = targetGmv - currentGmv;
  const daysLeft = 3; // example

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&family=Fraunces:wght@600&display=swap');
        
        * {
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        
        .display-font {
          font-family: 'Fraunces', serif;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .scale-in {
          animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .bottom-sheet-backdrop {
          backdrop-filter: blur(4px);
          background: rgba(0, 0, 0, 0.3);
        }
        
        .timeline-connector {
          background: linear-gradient(to right, #10b981 0%, #10b981 50%, #e5e7eb 50%, #e5e7eb 100%);
        }
        
        .progress-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Clean Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="display-font text-2xl text-slate-900 mb-1">
          Loan Eligibility
        </h1>
        <p className="text-slate-500 text-sm">
          {completedMonths} of 3 months completed
        </p>
      </div>

      {/* GMV Timeline - Horizontal */}
      <div className="px-6 mb-8">
        <div className="bg-slate-50 rounded-2xl p-6">
          {/* Timeline Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-slate-900 font-semibold text-lg mb-0.5">
                ₹{currentGmv.toLocaleString('en-IN')}
              </div>
              <div className="text-slate-500 text-sm">
                This month's GMV
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-600 font-medium text-sm mb-0.5">
                ₹{remaining.toLocaleString('en-IN')} more
              </div>
              <div className="text-slate-400 text-xs">
                {daysLeft} days left
              </div>
            </div>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-5 left-5 right-5 h-0.5 timeline-connector" />
            
            {/* Month Nodes */}
            <div className="relative flex justify-between">
              {timeline.map((month, idx) => (
                <div key={idx} className="flex flex-col items-center" style={{ width: '33%' }}>
                  {/* Node Circle */}
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-3 z-10
                    ${month.status === 'complete' 
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-200' 
                      : month.status === 'in-progress'
                      ? 'bg-white border-2 border-blue-500 shadow-lg shadow-blue-100'
                      : 'bg-white border-2 border-slate-200'
                    }
                  `}>
                    {month.status === 'complete' ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : month.status === 'in-progress' ? (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                  
                  {/* Month Label */}
                  <div className="text-center">
                    <div className={`
                      font-medium text-sm mb-1
                      ${month.status === 'in-progress' ? 'text-slate-900' : 'text-slate-500'}
                    `}>
                      {month.month}
                    </div>
                    <div className={`
                      text-xs
                      ${month.status === 'complete' 
                        ? 'text-emerald-600 font-medium' 
                        : month.status === 'in-progress'
                        ? 'text-blue-600 font-medium'
                        : 'text-slate-400'
                      }
                    `}>
                      {month.status === 'complete' 
                        ? `₹${(month.gmv / 1000).toFixed(0)}K`
                        : month.status === 'in-progress'
                        ? `₹${(month.gmv / 1000).toFixed(1)}K`
                        : '—'
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Context */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="flex items-start gap-2.5">
              <TrendingUp className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-600 text-sm leading-relaxed">
                Maintain <span className="font-medium text-slate-900">₹10,000 monthly GMV</span> to unlock by end of March
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-xs font-medium tracking-wide">UNLOCK SOONER</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* Actions Section */}
      <div className="px-6 space-y-3">
        
        {/* Credit Check - Highlighted as Fastest */}
        <button className="w-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-left relative overflow-hidden group">
          {/* Performance Tag */}
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-semibold">Instant</span>
          </div>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-white font-semibold text-base mb-1">
                Credit Bureau Check
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                One-time verification • No credit score impact
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm">Get instant approval</span>
            <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
        </button>

        {/* Document Upload - Collapsed */}
        <button 
          onClick={() => setShowDocumentSheet(true)}
          className="w-full bg-white border-2 border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all active:scale-[0.98] text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="text-slate-900 font-semibold text-base mb-1">
                  Upload Documents
                </h3>
                <p className="text-slate-500 text-sm">
                  Business verification via GST or bank statement
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </div>
        </button>
      </div>

      {/* Bottom Sheet for Document Options */}
      {showDocumentSheet && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bottom-sheet-backdrop z-40 fade-in"
            onClick={() => setShowDocumentSheet(false)}
          />
          
          {/* Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 slide-up">
            <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden">
              {/* Sheet Header */}
              <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="display-font text-xl text-slate-900">
                    Document Verification
                  </h2>
                  <button 
                    onClick={() => setShowDocumentSheet(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                <p className="text-slate-500 text-sm">
                  Choose any <span className="font-medium text-slate-700">one</span> document type to verify
                </p>
              </div>

              {/* Sheet Content */}
              <div className="px-6 py-4 space-y-3 overflow-y-auto max-h-[calc(80vh-100px)]">
                
                {/* Option 1: GST Certificate */}
                <button className="w-full bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-colors text-left group">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FileText className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 font-semibold text-sm mb-1">
                        GST Certificate
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        Valid GST registration document
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>PDF or image</span>
                    <span>•</span>
                    <span>~2 minutes</span>
                  </div>
                </button>

                {/* Option 2: Business Registration */}
                <button className="w-full bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-colors text-left group">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FileText className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 font-semibold text-sm mb-1">
                        Business Registration
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        Shop establishment or MSME certificate
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>PDF or image</span>
                    <span>•</span>
                    <span>~2 minutes</span>
                  </div>
                </button>

                {/* Option 3: Bank Statement */}
                <button className="w-full bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-colors text-left group">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Upload className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 font-semibold text-sm mb-1">
                        Bank Statement
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        Last 3 months of business transactions
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>PDF format</span>
                    <span>•</span>
                    <span>~3 minutes</span>
                  </div>
                </button>

              </div>

              {/* Sheet Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Your documents are encrypted and stored securely. We only use them for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Padding */}
      <div className="h-24" />
    </div>
  );
}
