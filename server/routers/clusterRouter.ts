import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import clusterController from '../controllers/clusterController';
const router = express.Router();


router.get('/pods', clusterController.getAllPods, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.list);
});
router.get('/nodes', clusterController.getAllNodes, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.list);
});

export default router;
