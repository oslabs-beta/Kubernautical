import express from 'express';
const router = express.Router();
import promRouter from './promRouter';
import clusterRouter from './clusterRouter';
import mapRouter from './mapRouter';

router.use('/prom', promRouter);
router.use('/cluster', clusterRouter)
router.use('/map', mapRouter)

export default router;
