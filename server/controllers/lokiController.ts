import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { type LokiController } from '../../types/types'

// require('dotenv').config()

// const GATE = process.env.LOKI_GATE;
const lokiController: LokiController = {
  testing: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // {cluster=~".+"} |= "level=error"
    try {
      const { namespace, log, pod, ep } = req.query
      // limit, start, and end
      // lokiEndpoint using exposed gateway IP via load balancer
      const lokiEndpoint = `http://${ep as string}/loki/api/v1/query_range?query=`
      let logQuery = `{namespace="${namespace as string}"${pod !== undefined && pod !== '' ? `, pod="${pod as string}"` : ''}}`

      // havent tested  start and end yet
      // if (start && end) logQuery += `{time >= ${start} and time <= ${end}}`;

      // query by type, error or info
      if (log !== undefined && log !== '') logQuery += ` |= "level=${log as string}"`

      // if (limit) logQuery += `&limit=${limit}`;
      const query = lokiEndpoint + logQuery
      const response = await fetch(query)
      const data = await response.json()

      res.locals.data = data

      next()
    } catch (error) {
      next({
        log: `Error happened at lokiController.logs${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler
}

export default lokiController
