import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import execController from '../controllers/execController';
const router = express.Router();


router.get('/ns', execController.namespace, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({message: `success`});
});

router.get('/dep', execController.deployment, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({message: `success`});
});

// router.get('/serv', execController.service, (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json({message: `success`});
// });


export default router;