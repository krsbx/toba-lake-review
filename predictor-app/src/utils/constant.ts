export const PREDICTION_RESULT = {
  POSITIVE: 'pos',
  NEGATIVE: 'neg',
  NEUTRAL: 'neu',
} as const;

export const RESULT = {
  [PREDICTION_RESULT.POSITIVE]: 'Positive',
  [PREDICTION_RESULT.NEGATIVE]: 'Negative',
  [PREDICTION_RESULT.NEUTRAL]: 'Neutral',
};
