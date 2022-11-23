import { Router } from 'express';
import * as predictsMw from 'middleware/predicts';

const router = Router();

router.post('/predicts', predictsMw.predictsMw, predictsMw.returnPredictionMw);
router.post('/predict', predictsMw.predictMw, predictsMw.returnPredictionMw);

export default router;
