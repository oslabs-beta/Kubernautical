import express from 'express'
import promRouter from './promRouter'
import clusterRouter from './clusterRouter'
import mapRouter from './mapRouter'
import k6Router from './k6Router'
import crudRouter from './crudRouter'
import lokiRouter from './lokiRouter'

const router = express.Router()

// routes for various functional parts of the application
router.use('/prom', promRouter)
router.use('/cluster', clusterRouter)
router.use('/map', mapRouter)
router.use('/k6', k6Router)
router.use('/crud', crudRouter)
router.use('/loki', lokiRouter)

export default router
