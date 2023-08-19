import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { type MapController } from '../../types/types'

const mapController: MapController = {

  getElements: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { pods, namespaces, deployments, services, contexts, currentContext } = res.locals
      res.locals.elements = {
        pods,
        namespaces,
        deployments,
        services,
        contexts,
        currentContext
      }
      next()
    } catch (error) {
      next({
        log: `Error in mapController.getElements${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler
}

export default mapController
