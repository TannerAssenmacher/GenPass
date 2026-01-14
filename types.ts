
export interface PasswordSettings {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  funToType: boolean;
}

export interface SecurityReport {
  score: number;
  strength: 'Weak' | 'Moderate' | 'Strong' | 'Elite';
  analysis: string;
  timeToCrack: string;
  improvementTip: string;
}
