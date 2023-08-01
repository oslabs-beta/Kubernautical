import express from 'express';
const router = express.Router();
import promRouter from './promRouter';

router.use('/prom', promRouter);

export default router;
