
import { PredictionInput, PredictionResult } from "@/types";

// Local storage key for prediction history
const PREDICTION_HISTORY_KEY = "crop-yield-predictions";

// Mock ML model prediction
export const predictYield = (input: PredictionInput): PredictionResult => {
  // This is a simplified mock model that would be replaced by an actual ML model
  // or an API call to a backend service in a production environment
  
  // Generate a base yield based on crop type (in tons per hectare)
  const cropBaseYields: Record<string, number> = {
    "rice": 4.5,
    "wheat": 3.8,
    "maize": 7.5,
    "potato": 20.0,
    "cotton": 2.2,
    "sugarcane": 70.0,
    "coffee": 1.8,
    "jute": 2.5,
    "coconut": 12.0,
    "mungbean": 1.2
  };
  
  const baseYield = cropBaseYields[input.cropType] || 5.0;
  
  // Apply factors based on soil nutrients
  const nitrogenFactor = 1 + (input.nitrogen / 140) * 0.3;
  const phosphorusFactor = 1 + (input.phosphorus / 140) * 0.2;
  const potassiumFactor = 1 + (input.potassium / 140) * 0.1;
  
  // Apply factors based on environmental conditions
  const phFactor = 1 - Math.abs((input.ph - 6.5) / 7) * 0.4;
  const temperatureFactor = Math.min(1, 0.7 + input.temperature / 100);
  const humidityFactor = Math.min(1, 0.7 + input.humidity / 300);
  const rainfallFactor = Math.min(1, 0.5 + input.rainfall / 3000);
  
  // Apply soil type factor
  const soilTypeFactor: Record<string, number> = {
    "clay": 0.95,
    "clayLoam": 1.05,
    "loam": 1.1,
    "sandyLoam": 1.0,
    "sandy": 0.85,
    "silt": 1.0,
    "siltyLoam": 1.1
  };
  
  // Calculate final yield prediction
  let yieldPrediction = baseYield * 
    nitrogenFactor * 
    phosphorusFactor * 
    potassiumFactor * 
    phFactor * 
    temperatureFactor * 
    humidityFactor * 
    rainfallFactor * 
    (soilTypeFactor[input.soilType] || 1.0);
  
  // Add some randomness to simulate real-world variation
  yieldPrediction *= (0.9 + Math.random() * 0.2);
  
  // Scale by area (hectares)
  const totalYield = yieldPrediction * input.area;
  
  // Calculate a mock confidence level
  const confidence = 75 + Math.random() * 20;
  
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    input,
    yieldPrediction: parseFloat(totalYield.toFixed(2)),
    confidence: parseFloat(confidence.toFixed(1))
  };
};

// Save prediction to history
export const savePrediction = (prediction: PredictionResult, userId: string) => {
  const historyKey = `${PREDICTION_HISTORY_KEY}-${userId}`;
  const history = getPredictionHistory(userId);
  localStorage.setItem(historyKey, JSON.stringify([prediction, ...history]));
};

// Get prediction history for a user
export const getPredictionHistory = (userId: string): PredictionResult[] => {
  const historyKey = `${PREDICTION_HISTORY_KEY}-${userId}`;
  const history = localStorage.getItem(historyKey);
  return history ? JSON.parse(history) : [];
};

// Clear prediction history for a user
export const clearPredictionHistory = (userId: string) => {
  const historyKey = `${PREDICTION_HISTORY_KEY}-${userId}`;
  localStorage.removeItem(historyKey);
};
