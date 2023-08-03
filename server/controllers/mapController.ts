import type { Request, Response, NextFunction } from 'express';
import type { mapController } from '../../types/types';

const mapController: mapController = {


  getElements: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const elements = {
        nodes: res.locals.nodes,
        pods: res.locals.pods,
        namespaces: res.locals.namespaces,
        deployments: res.locals.deployments,
        services: res.locals.services
      };
      res.locals.elements = elements;
      return next();
    } catch (err) {
      return next(err);
    }
  }
};

export default mapController;
