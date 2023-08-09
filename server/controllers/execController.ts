import type { Request, Response, NextFunction } from 'express';
import type { execController } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

const execController: execController = {
  add: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace } = req.query;
    try {
      const command = `kubectl create namespace ${namespace}`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('Error executing command:', err);
          throw new Error();
        }
        return next();

      });
    } catch (err) {
      return next(err);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace } = req.query;

    try {
      const command = `kubectl delete namespace ${namespace}`;
      exec(command, (err, stdout, stderr) => {
            if (err) {
              console.log('Error executing command:', err);
                throw new Error();
            }
            console.log('stdout:', stdout);
            return next();
        });
    } catch (err) {
      return next(err);
    }
  }
};

export default execController;