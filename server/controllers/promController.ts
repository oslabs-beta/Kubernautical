
import type { Request, Response, NextFunction } from 'express';
// import { promController } from '../../types';
import type { prometheusController } from '../../types/types';



// const promURL = 'http://localhost:9090/api/v1/query?query=';


const promController: prometheusController = {

    getMetrics: async (req : Request, res : Response, next : NextFunction) => {
        const { type } = req.query;
        let url = '';

        const start = new Date(Date.now() - 1440 * 60000).toISOString(); //24 hours
        const end = new Date(Date.now()).toISOString();
        //modularize queries, figure out how queries even work
            //namespace, pod, node
        if (type === 'cpu') url = `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=30m`;
        if (type === 'mem') url = `http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=${start}&end=${end}&step=30m`;

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
