import { asyncMw } from 'express-asyncmw';
import { predict } from 'utils/predict';

export const predictsMw = asyncMw(async (req, res, next) => {
  req.predicts = await predict(req.body.reviews);

  return next();
});

export const predictMw = asyncMw(async (req, res, next) => {
  req.predicts = await predict(req.body.review);

  return next();
});

export const returnPredictionMw = asyncMw(async (req, res) => {
  const results: Record<string, TLR.PredictionResult> = {};

  (req.predicts as TLR.PredictionResult[]).forEach((result, index) => {
    results[`result${index + 1}`] = result as TLR.PredictionResult;
  });

  return res.json(results);
});
