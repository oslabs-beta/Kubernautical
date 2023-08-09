import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import promController from '../controllers/promController';

const router = express.Router();


router.get('/metrics', 
  promController.getCores, 
  promController.getMetrics,
  (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.data);
});


router.get('/mem', 
  promController.getMetrics,
  promController.getMem, 
  (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.memoryPercents);
});

router.get('/cpu', 
  promController.getCores,
  promController.getMetrics,
  promController.getCpu, 
  (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.cpuPercents);
});

export default router;
