import type { Request, Response, NextFunction } from 'express';
import type { crudController } from '../../types/types';
import { exec } from 'child_process';

const crudController: crudController = {
  namespace: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace, crud, context } = req.query;
    try {
      const command = `kubectl config use-context ${context} && kubectl ${crud} namespace ${namespace}`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        console.log(`stdout:`, stdout);
        return next();
      });
    } catch (error) {
      return next({
        log: 'Error in crudController.namespace' + error,
        status: 400,
        message: { error: 'Error getting data' },
      });
    }
  },
  deployment: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace, crud, image, deployment, replicas, type, port, targetPort, old, context, name } = req.query;
    try {
      let action = '';
      switch (crud) {
        case 'create':
          action = `--image=${image}`;
          break;
        case 'scale':
          action = `--replicas=${replicas}`;
          break;
        case 'expose':
          action = `--port=${port} --target-port=${targetPort} --type=${type} --name=${name}`;
          break;
        default:
          break;
      }
      //TODO handle errors/edge cases from front end
      const command = `kubectl config use-context ${context} && kubectl ${crud} deployment ${deployment} ${action ? `${action}` : ''} -n ${namespace}`;
      console.log('command:', command)
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        console.log(`stdout:`, stdout);

        return setTimeout(() => next(), old && replicas ? old < replicas ? 5000 : 45000 : 2000); //45 works
      });
    } catch (error) {
      return next({
        log: 'Error in crudController.deployment' + error,
        status: 400,
        message: { error: 'Error getting data' },
      });
    }
  },
  service: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace, crud, service, type, port, targetPort, context } = req.query;
    try {
      let action = '';
      switch (crud) {
        case 'create':
          // action = `--image=${image}`;
          break;
        case 'scale':
          // action = `--replicas=${replicas}`;
          break;
        case 'expose':
          // action = `--port=${port} --target-port=${targetPort} --type=${type}`;
          break;
        default:
          break;
      }
      //TODO handle errors/edge cases from front end
      const command = `kubectl config use-context ${context} && kubectl ${crud} svc ${service} ${action ? `${action}` : ''} -n ${namespace}`;
      console.log('command:', command)
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        console.log(`stdout:`, stdout);
        return setTimeout(() => next(), 1000);
      });
    } catch (error) {
      return next({
        log: 'Error in crudController.deployment' + error,
        status: 400,
        message: { error: 'Error getting data' },
      });
    }
  }
};

export default crudController;
