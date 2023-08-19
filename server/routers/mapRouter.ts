import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import mapController from '../controllers/mapController'
import clusterController from '../controllers/clusterController'

const router = express.Router()

router.get(
  '/elements',
  clusterController.setContext,
  clusterController.getAllPods,
  // clusterController.getAllNodes,
  clusterController.getAllNamespaces,
  clusterController.getAllDeployments,
  clusterController.getAllServices,
  mapController.getElements,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.elements) // fix to send elements back

    // res.status(200).json(res.locals.result);
  }
)

export default router
