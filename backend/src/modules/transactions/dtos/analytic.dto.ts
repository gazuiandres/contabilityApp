export interface BasedAnalytics {
  category: string;
  amount: string;
}

export interface ProcessedAnalytics {
  data: number[];
  categoryLabels: string[];
}

export interface AnalyticDecripted {
  [key: string]: {
    category: string;
    total: number;
  };
}
