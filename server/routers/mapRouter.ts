import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import mapController from '../controllers/mapController';
import clusterController from '../controllers/clusterController';
const router = express.Router();


router.get('/',
    clusterController.getAllNodes,
    clusterController.getAllPods,
    mapController.getElements,
    (req: Request, res: Response, next: NextFunction) => {
        // res.status(200).json(res.locals.list); //fix to send elements back
    });

export default router;