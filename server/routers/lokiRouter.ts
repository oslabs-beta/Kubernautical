import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import lokiController from '../controllers/lokiController';
const router = express.Router();


router.get('/logs', lokiController.testing, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.data);
});


export default router;