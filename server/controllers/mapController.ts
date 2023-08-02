import type { Request, Response, NextFunction } from 'express';
import type { mapController } from '../../types';

const mapController: mapController = {


  getElements: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('in mappy')
      // console.log('nodes', res.locals.nodes)
      // console.log('pods', res.locals.pods)
      // console.log('namespaces', res.locals.namespaces)
      const elements = {
        nodes: res.locals.nodes,
        pods: res.locals.pods,
        namespaces: res.locals.namespaces,
      };
      res.locals.elements = elements;
      console.log('els', res.locals.elements)
      console.log('out of mappy')

      return next();
    } catch (err) {

    }
  }

};

export default mapController;
