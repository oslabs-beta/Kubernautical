import type { Request, Response, NextFunction } from 'express';
import type { execController } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

const execController: execController = {
  crud: async (req: Request, res: Response, next: NextFunction) => {
    const { namespace, crud } = req.query;
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
  }
};

export default execController;