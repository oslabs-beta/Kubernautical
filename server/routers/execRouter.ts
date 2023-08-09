import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import execController from '../controllers/execController';
const router = express.Router();


router.get('/', execController.crud, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.namespaces);
});

// router.get('/dep', execController.deployment, (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json(res.locals.namespaces);
// });

// router.get('/serv', execController.service, (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json(res.locals.namespaces);
// });


export default router;