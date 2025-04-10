
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface PredictionInput {
  cropType: string;
  soilType: string;
  area: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface PredictionResult {
  id: string;
  date: string;
  input: PredictionInput;
  yieldPrediction: number;
  confidence: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
