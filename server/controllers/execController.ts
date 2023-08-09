import type { Request, Response, NextFunction } from 'express';
import type { execController } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

const execController: execController = {
    add: async (req: Request, res: Response, next: NextFunction) => {
        const { namespace } = req.query;
        // try {
        //   console.log('hi')
        //   const command = `kubectl get namespaces`;
        //   exec(command, (err, stdout, stderr) => {
        //         if (err) {
        //           console.log('Error executing command:', err);
        //             throw new Error();
        //         }
        //         console.log('stdout:', err);
        //         res.locals.namespaces = stdout;
        //         console.log(res.locals.namespaces)
        //         return next();
        //     });
        //     // res.locals.namespace = namespaces;
        // } catch (err) {
        //     return next(err);
        // }
        try {
          const command = `kubectl create namespace ${namespace}`;
          exec(command, (err, stdout, stderr) => {
                if (err) {
                  console.log('Error executing command:', err);
                    throw new Error();
                }
                console.log('stdout:', err);
                // res.locals.namespaces = stdout;
                console.log('stdout:', stdout);
                return next();
            });
        } catch (err) {
          return next(err);
        }
    }
};

export default execController;