import { exec } from 'child_process'
import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { type CrudController } from '../../types/types'

const crudController: CrudController = {
  namespace: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { namespace, crud, context } = req.query
    try {
      const command = `kubectl config use-context ${context as string}\
       && kubectl ${crud as string} namespace ${namespace as string}`
      exec(command, (err, stdout, stderr) => {
        if (err != null) {
          console.log('Error executing command:', err)
          throw new Error()
        }
        console.log('stdout:', stdout)
        next()
      })
    } catch (error) {
      next({
        log: `Error in crudController.namespace${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler,
  deployment: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      namespace,
      crud,
      image,
      deployment,
      replicas,
      type,
      port,
      targetPort,
      old,
      context,
      name
    } = req.query
    try {
      let action = ''
      switch (crud) {
        case 'create':
          action = `--image=${image as string}`
          break
        case 'scale':
          action = `--replicas=${replicas as string}`
          break
        case 'expose':
          action = `--port=${port as string} --target-port=${targetPort as string}\
           --type=${type as string} --name=${name as string}`
          break
        default:
          break
      }
      // TODO handle errors/edge cases from front end
      const command = `kubectl config use-context ${context as string} \
       && kubectl ${crud as string} deployment ${deployment as string}\
       ${action !== undefined ? `${action}` : ''} -n ${namespace as string}`
      console.log('command:', command)
      exec(command, (err, stdout, stderr) => {
        if (err != null) {
          console.log('Error executing command:', err)
          throw new Error()
        }
        console.log('stdout:', stdout)
        let timeOut = 2000
        if (old !== undefined && replicas !== undefined) {
          timeOut = old < replicas ? 5000 : 45000
        }
        return setTimeout(() => {
          next()
        }, timeOut) // 45 works
      })
    } catch (error) {
      next({
        log: `Error in crudController.deployment${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler,
  service: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { namespace, crud, service, context } = req.query
    // type port and targetPort
    try {
      const action = ''
      switch (crud) {
        case 'create':
          // action = `--image=${image}`;
          break
        case 'scale':
          // action = `--replicas=${replicas}`;
          break
        case 'expose':
          // action = `--port=${port} --target-port=${targetPort} --type=${type}`;
          break
        default:
          break
      }
      // TODO handle errors/edge cases from front end
      const command = `kubectl config use-context ${context as string}\
      && kubectl ${crud as string} svc ${service as string}\
      ${action !== undefined ? `${action}` : ''} -n ${namespace as string}`
      console.log('command:', command)
      exec(command, (err, stdout, stderr) => {
        if (err != null) {
          console.log('Error executing command:', err)
          throw new Error()
        }
        console.log('stdout:', stdout)
        return setTimeout(() => { next() }, 1000)
      })
    } catch (error) {
      next({
        log: `Error in crudController.deployment${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler
}

export default crudController
