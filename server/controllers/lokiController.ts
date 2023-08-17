import type { Request, Response, NextFunction } from 'express';
import type { lokiController } from '../../types/types';
require('dotenv').config();


const GATE = process.env.LOKI_GATE;

const lokiController: lokiController = {
  testing: async (req: Request, res: Response, next: NextFunction) => {
    // {cluster=~".+"} |= "level=error"

    try {
      const { namespace, limit, start, end, log } = req.query

      // lokiEndpoint using exposed gateway IP via load balancer
      const lokiEndpoint = `http://${GATE}/loki/api/v1/query_range?query=`;
      let logQuery = ``

      if (namespace) logQuery = `{namespace="${namespace}"}`;
  
      // havent tested  start and end yet
      // if (start && end) logQuery += `{time >= ${start} and time <= ${end}}`;

      // query by type, error or info
      if (log) logQuery += ` |= "level=${log}"`
      
      // if (limit) logQuery += `&limit=${limit}`;
      const query = lokiEndpoint + logQuery;
      console.log('query:', query);
      const response = await fetch(query);
      const data = await response.json();

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