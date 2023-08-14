import type { Request, Response, NextFunction } from 'express';
import type { lokiController } from '../../types/types';
import { result } from 'cypress/types/lodash';
import { any } from 'cypress/types/bluebird';



const lokiController: lokiController = {


  testing: async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      // {namespace="loki"} |= "error" != "info"
      const {namespace, limit, start, end, log} = req.query
      console.log('hi from loki controller');

      const lokiEndpoint = 'http://34.30.165.202/loki/api/v1/query_range?query=';
      let logQuery = ``
      
      if (namespace) logQuery = `{namespace="${namespace}"}`;
      if (start && end) logQuery += `{time >= ${start} and time <= ${end}}`;
      if (log === 'error') { 
        // if (logQuery) logQuery += ', ';
        // logQuery += `{level=~"${log}"}`;
        // // logQuery += `{level="level=${log}"}`;
        logQuery += ` |= "${log}" != "info"`
      }
      if (log === 'info') { 
        // if (logQuery) logQuery += ', ';
        // logQuery += `{level=~"${log}"}`;
        // // logQuery += `{level="level=${log}"}`;
        logQuery += ` |= "${log}" != "error"`
      }
      if (limit) logQuery += `&limit=${limit}`;
    
 
      const query = lokiEndpoint + logQuery;
      console.log('query:', query);
      
      const response = await fetch(query);
      const data = await response.json();

      let result = data.data.result;

      const logs: any[] = [];

      result.forEach((object: any) => {
        const stream = object.stream;
        const values = object.values;

  
        values.forEach((value: any) => {
          const log = {
            timestamp: value[0],
            message: value[1],
            namespace: stream.namespace, 
            container: stream.container,
            pod: stream.pod,
            job: stream.job,
          };

          logs.push(log);
        });
      });

      console.log('logs:', logs);

      res.locals.data = logs;
  
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