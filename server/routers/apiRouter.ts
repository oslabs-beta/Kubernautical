import express from 'express';
import promRouter from './promRouter';
import clusterRouter from './clusterRouter';
import mapRouter from './mapRouter';
import k6Router from './k6Router';
import execRouter from './execRouter';
const router = express.Router();



router.use('/prom', promRouter);
router.use('/cluster', clusterRouter);
router.use('/map', mapRouter);
router.use('/k6', k6Router);
router.use('/exec', execRouter);

export default router;