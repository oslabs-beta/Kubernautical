import type { Request, Response, NextFunction } from 'express';
import type { mapController } from '../../types/types';

const mapController: mapController = {


  getElements: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pods, namespaces, deployments, services, contexts } = res.locals;
      res.locals.elements = {
        pods,
        namespaces,
        deployments,
        services,
        contexts
      }
      return next();
    } catch (err) {
      return next(err);
    }
  }
};

export default mapController;
