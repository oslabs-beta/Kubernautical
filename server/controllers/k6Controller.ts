import { exec } from 'child_process'
import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { type K6Controller } from '../../types/types'

const k6Controller: K6Controller = {
  testing: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { vus, duration, ip } = req.query
    try {
      let command = `export INGRESS_EP=http://${ip} && k6 run`
      if (vus !== undefined && duration !== undefined) {
        command += ` --vus ${vus as string} --duration ${duration as string}s scripts/loadtest.js`
      } else throw new Error()
      console.log(command)
      exec(command, (err) => {
        if (err !== null) {
          throw new Error()
        }
      })
      next()
    } catch (error) {
      next({
        log: `Error in k6Controller.testing ${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler
}

export default k6Controller
