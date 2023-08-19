import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import k6Controller from '../controllers/k6Controller'

const router = express.Router()

router.get(
  '/test',
  k6Controller.testing,

  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Load test triggered succeessfully' })
  }
)

export default router
