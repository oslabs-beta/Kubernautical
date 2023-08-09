import type { Request, Response, NextFunction } from 'express';
import type { execController } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

const execController: execController = {
  namespace: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace, crud,  } = req.query;
    try {
      const command = `kubectl ${crud} namespace ${namespace}`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        console.log(stdout);
        return next();
      });
    } catch (err) {
      return next(err);
    }
  },
  deployment: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace, crud, image, deployment, replicas, type, port, targetPort } = req.query;
    try {
      // kubectl expose deployment <deployment-name> --port=x --target-port=x --type=LoadBalancer
      // kubectl scale deployment <deployment-name> --replicas=x -n <namespace>
      // kubectl create deployment <deploment-name> --image=x -n <namespace>
      // kubectl delete deployment <deploment-name> -n <namespace>
                                  // ${scope ? `${scope}="${name}"` : ''}
      let action = ``;
      if (crud === `create`) action = `--image=${image}`;
      if (crud === `scale`) action = `--replicas=${replicas}`;
      if (crud === `delete`) action = `--port=${port} --target-port=${targetPort} --type=${type}`; 
      const command = `kubectl ${crud} deployment ${deployment} ${action ? `${action}` : ''} -n ${namespace}`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        console.log(stdout);
        return next();
      });
    } catch (err) {
      return next(err);
    }
  },
  // service: async (req: Request, res: Response, next: NextFunction) => {
  //   const { namespace, crud, image, deployment } = req.query;
  //   try {
      
  //     const command = `kubectl ${crud} deployment ${deployment} --image=${image} -n ${namespace}`;
  //     exec(command, (err, stdout, stderr) => {
  //       if (err) {
  //         console.log('Error executing command:', err);
  //         throw new Error();
  //       }
  //       console.log(stdout);
  //       return next();
  //     });
  //   } catch (err) {
  //     return next(err);
  //   } 
  // },
}

// kubectl scale deployment <deployment-name> --replicas=

export default execController;