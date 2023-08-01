
import type { Request, Response, NextFunction } from 'express';



// const promURL = 'http://localhost:9090/api/v1/query?query=';


const promController = {

    getMetrics: async (req: Request, res: Response, next: NextFunction) => {
        const { type } = req.query;
        let url = '';
        if (type === 'cpu') url = 'http://localhost:9090/api/v1/query?query=container_cpu_usage_seconds_total';
        if (type === 'mem') url = 'http://localhost:9090/api/v1/query?query=container_memory_usage_bytes';

        try {
            const response = await fetch(url);
            const data = await response.json();

            //figure out what we want
            res.locals.data = data.data.result;

            return next();
        } catch (error) {
            return next(error);
        }
    }

};

export default promController;
