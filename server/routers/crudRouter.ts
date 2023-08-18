import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import crudController from '../controllers/crudController';
const router = express.Router();


router.get('/ns', crudController.namespace, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: `success` });
});
router.get('/dep', crudController.deployment, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: `success` });
});
router.get('/svc', crudController.service, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: `success` });
});


export default router;