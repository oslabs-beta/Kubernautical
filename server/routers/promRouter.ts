import express from 'express';
const router = express.Router();


router.post('/metrics', promController.getMetrics, (req,res,next)=> {
    
});

export default router;
