import { PREDICTION_RESULT } from '../utils/constant';

type PredictionResult =
  typeof PREDICTION_RESULT[keyof typeof PREDICTION_RESULT];

export type PredictionResponse = Record<string, PredictionResult>;

export as namespace TLR;
