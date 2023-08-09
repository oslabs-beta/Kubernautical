import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import execController from '../controllers/execController';
const router = express.Router();


router.get('/ns', execController.add, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.namespaces);
});
router.get('/delete', execController.delete, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.namespaces);
});

export default router;