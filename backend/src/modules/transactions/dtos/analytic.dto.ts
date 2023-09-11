export interface BasedAnalytics {
  category: string;
  total: number;
}

export interface ProcessedAnalytics {
  data: number[];
  categoryLabels: string[];
}
