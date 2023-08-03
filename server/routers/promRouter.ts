import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import promController from '../controllers/promController';

const router = express.Router();


router.get('/metrics', promController.getMetrics, (req: Request, res: Response, next: NextFunction) => {
res.status(200).json(res.locals.data);
});

router.get('/cores', promController.getCores, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.cores);
  });

export default router;
