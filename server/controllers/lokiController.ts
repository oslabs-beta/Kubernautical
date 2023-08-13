import type { Request, Response, NextFunction } from 'express';
import type { lokiController } from '../../types/types';



const lokiController: lokiController = {


  testing: async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      console.log('hi from loki controller');

      const lokiEndpoint = 'http://34.30.165.202';
      const logQuery = `{namespace="petstore3"}`
 
      const response = await fetch(`${lokiEndpoint}/loki/api/v1/query_range?query=${encodeURIComponent(logQuery)}&limit=100`);
      const data = await response.json();


      console.log('data:', response);
  
      res.locals.data = data;
  
      return next();
    } catch (error) {
      return next({
        log: 'Error happened at lokiController.logs' + error,
        status: 400,
        message: { error: 'Error getting data' },
      });
    }
  }
};

export default lokiController;