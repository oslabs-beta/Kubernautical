import type { Request, Response, NextFunction } from 'express';
import type { execController } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

const execController: execController = {
  namespace: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace, crud } = req.query;
    try {
      const command = `kubectl ${crud} namespace ${namespace}`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        console.log(`stdout:`, stdout);
        return next();
      });
    } catch (err) {
      return next(err);
    }
  },
  deployment: async (req: Request, res: Response, next: NextFunction) => {

    const { namespace, crud, image, deployment, replicas, type, port, targetPort, old } = req.query;
    // http://localhost:3000/api/exec/dep?namespace=test69&crud=create&image=swaggerapi/petstore3&deployment=test69deployment
    try {
      let action = ``;
      if (crud === `create`) action = `--image=${image}`;
      if (crud === `scale`) action = `--replicas=${replicas}`;
      if (crud === `delete`) action = ``;
      if (crud === `expose`) action = `--port=${port} --target-port=${targetPort} --type=${type}`;

      console.log('action:', action)
      const command = `kubectl ${crud} deployment ${deployment} ${action ? `${action}` : ''} -n ${namespace}`;
      console.log('command:', command)
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        console.log(`stdout:`, stdout);

        return setTimeout(() => next(), old && replicas ? old < replicas ? 5000 : 45000 : 0); //45 works
      });
    } catch (err) {
      return next(err);
    }
  },
  test: async (req: Request, res: Response, next: NextFunction) => {

    // const {  } = req.query;
    
    try {
      const command = `kubectl get namespaces`;
      console.log('command:', command)
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        const test = stdout;
        console.log(`stdout:`, stdout);
        console.log(`test:`, test);

        return next()
      });
    } catch (err) {
      return next(err);
    }
  },

};

export default execController;