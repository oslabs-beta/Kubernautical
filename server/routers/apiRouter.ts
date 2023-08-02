import express from 'express';
const router = express.Router();
import promRouter from './promRouter';
import clusterRouter from './clusterRouter';

router.use('/prom', promRouter);
router.use('/cluster', clusterRouter)

export default router;
