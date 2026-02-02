
export enum EligibilityStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  LOCKED = 'LOCKED'
}

export interface GMVHistory {
  month: string;
  amount: number;
  isMet: boolean;
}

export interface Criterion {
  id: string;
  title: string;
  description: string;
  status: EligibilityStatus;
  icon: string;
  cta: string;
  actionType: 'GMV' | 'DOCS' | 'BANK' | 'BUREAU';
}

export interface MerchantState {
  name: string;
  isEligible: boolean;
  gmvHistory: GMVHistory[];
  criteria: Criterion[];
}
