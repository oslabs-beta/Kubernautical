import type { Request, Response, NextFunction } from 'express';
import type { execController } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

const execController: execController = {
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
        log: 'Error in execController.namespace' + error,
        status: 400,
        message: { error: 'Error getting data' },
      });
    }
  },
  deployment: async (req: Request, res: Response, next: NextFunction) => {

    const { namespace, crud, image, deployment, replicas, type, port, targetPort, old, context } = req.query;
    // http://localhost:3000/api/exec/dep?namespace=test69&crud=create&image=swaggerapi/petstore3&deployment=test69deployment
    try {
      let action = ``;
      if (crud === `create`) action = `--image=${image}`;
      if (crud === `scale`) action = `--replicas=${replicas}`;
      if (crud === `delete`) action = ``;
      if (crud === `expose`) action = `--port=${port} --target-port=${targetPort} --type=${type}`;
      //TODO handle errors/edge cases from front end
      console.log('action:', action)
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
        log: 'Error in execController.deployment' + error,
        status: 400,
        message: { error: 'Error getting data' },
      });
    }
  }
};

export default execController;
