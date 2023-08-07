import express from 'express';
const router = express.Router();
import promRouter from './promRouter';
import clusterRouter from './clusterRouter';
import mapRouter from './mapRouter';
import k6Router from './k6Router';

router.use('/prom', promRouter);
router.use('/cluster', clusterRouter)
router.use('/map', mapRouter)
router.use('/k6', k6Router)

export default router;