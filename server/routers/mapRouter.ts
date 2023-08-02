import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import mapController from '../controllers/mapController';
import clusterController from '../controllers/clusterController';
import cluster from 'cluster';
const router = express.Router();


router.get('/elements', 
    clusterController.getAllPods,
    clusterController.getAllNodes, 
    clusterController.getAllNamespaces,
    mapController.getElements, 
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json(res.locals.elements); //fix to send elements back

        // res.status(200).json(res.locals.result);
});

export default router;