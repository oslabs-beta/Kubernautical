import express from 'express';
import promRouter from './promRouter';
import clusterRouter from './clusterRouter';
import mapRouter from './mapRouter';
import k6Router from './k6Router';
import execRouter from './execRouter';
import lokiRouter from './lokiRouter';
const router = express.Router();



router.use('/prom', promRouter);
router.use('/cluster', clusterRouter);
router.use('/map', mapRouter);
router.use('/k6', k6Router);
router.use('/exec', execRouter);
router.use('/loki', lokiRouter);

export default router;