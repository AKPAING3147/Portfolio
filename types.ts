export interface PredictionResponse {
  year: string;
  prediction: string;
}

export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  era: '1955' | '1985' | '2015' | '1885';
}
