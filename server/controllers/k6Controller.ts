import type { Request, Response, NextFunction } from 'express';
import type { k6Controller } from '../../types/types';
import { exec, execFile } from 'child_process';
require('dotenv').config();



const k6Controller: k6Controller = {
    testing: async (req: Request, res: Response, next: NextFunction) => {
        console.log('hello from the load')
        try {
            // const command = 'export INGRESS_EP k6 run scripts/loadtest.js';
            const command = `export INGRESS_EP=${process.env.INGRESS_EP} && k6 run scripts/loadtest.js`;
            exec(command, (err) => {
                if (err !== null) {
                    throw new Error();
                }
            });
            return next();
        } catch (err) {
            return next(err);
        }
    }
};

export default k6Controller;