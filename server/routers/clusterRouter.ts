import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import clusterController from '../controllers/clusterController';

const router = express.Router();

// routes for retrieving imorantant cluster information
// setContext called before every route to obatin the correct cluster information based on user selected cluster
router.get('/namespaces', clusterController.setContext, clusterController.getAllNamespaces, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.namespaces);
});
router.get('/pods', clusterController.setContext, clusterController.getAllPods, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.pods);
});
router.get('/nodes', clusterController.setContext, clusterController.getAllNodes, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.nodes);
});
router.get('/services', clusterController.setContext, clusterController.getAllServices, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.services);
});
router.get('/deployments', clusterController.setContext, clusterController.getAllDeployments, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.deployments);
});

//!---------------------------------------------These Routes are for testing (for now)------------------------------------->
router.get('/ingresses', clusterController.setContext, clusterController.getAllIngresses, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.ingresses);
});

export default router;
