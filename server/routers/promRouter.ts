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

// need to connect routes to other paths before certain controllers
router.get('/cores', 
  promController.getCores, 
  (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.cores);
});

router.get('/mem', 
  promController.getMem, 
  (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.mem);
});

export default router;
