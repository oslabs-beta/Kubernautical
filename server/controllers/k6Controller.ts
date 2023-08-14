import type { Request, Response, NextFunction } from 'express';
import type { k6Controller } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

const k6Controller: k6Controller = {
    testing: async (req: Request, res: Response, next: NextFunction) => {
        const { vus, duration, ip } = req.query;
        try {
            const command = `export INGRESS_EP=http://${ip} && k6 run${vus ? ` --vus ${vus}` : ''}${duration ? ` --duration ${duration}s` : ''} scripts/loadtest.js`;
            exec(command, (err) => {
                if (err !== null) {
                    throw new Error();
                }
            });
            return next();
        } catch (error) {
            return next({
                log: 'Error in k6Controller.testing' + error,
                status: 400,
                message: { error: 'Error getting data' },
            });
        }
    }
};

export default k6Controller;