import path from 'path';

export const ROOT_PATH = path.join(__dirname, '../../');

export const PREDICTION_RESULT = {
  POSITIVE: 'pos',
  NEGATIVE: 'neg',
  NEUTRAL: 'neu',
} as const;
