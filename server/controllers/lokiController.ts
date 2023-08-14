import type { Request, Response, NextFunction } from 'express';
import type { lokiController } from '../../types/types';
require('dotenv').config();


const GATE = process.env.LOKI_GATE;

const lokiController: lokiController = {
  testing: async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { namespace, limit, start, end, log } = req.query
      // {namespace="loki"} |= "error" != "info"
      // console.log('hi from loki controller');

      // Stephen's Loki gateway ip, can also use domain name here instead? havent tested
      const lokiEndpoint = `http://${GATE}/loki/api/v1/query_range?query=`;
      let logQuery = ``

      if (namespace) logQuery = `{namespace="${namespace}"}`;
      // havent tested  start and end yet
      if (start && end) logQuery += `{time >= ${start} and time <= ${end}}`;

      // need to modularize logQuery string still
      if (log === 'error') {
        logQuery += ` |= "${log}" != "info"`
      }
      if (log === 'info') {
        logQuery += ` |= "${log}" != "error"`
      }
      if (limit) logQuery += `&limit=${limit}`;
      const query = lokiEndpoint + logQuery;
      // console.log('query:', query);
      const response = await fetch(query);
      const data = await response.json();

      // let result = data.data.result;
      // const logs: any[] = [];
      // result.forEach((object: any) => {
      //   const stream = object.stream;
      //   const values = object.values;


      //   values.forEach((value: any) => {
      //     const log = {
      //       timestamp: value[0],
      //       message: value[1],
      //       namespace: stream.namespace,
      //       container: stream.container,
      //       pod: stream.pod,
      //       job: stream.job,
      //     };
      //     logs.push(log);
      //   });
      // });
      // console.log('logs:', logs);

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