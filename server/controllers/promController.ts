import type { Request, Response, NextFunction } from 'express';
import type { prometheusController } from '../../types/types';


//start and end total time period, step is how often to grab data point
// [time in minutes] averages to smoothe the graph
//sum 
//summation
//rate 
//per second usage
//100 does (changed for 2.82 (940*3/1000) cores)
//number of cores used * 100/2.82 (cores used * 35.46)
//how to find available cores dynamically ---- Steves next task


const promController: prometheusController = {

    getMetrics: async (req: Request, res: Response, next: NextFunction) => {

        //? default start, stop, step, query string
        let start = new Date(Date.now() - 1440 * 60000).toISOString(); //24 hours
        let end = new Date(Date.now()).toISOString();
        let step = 10;
        let query = 'http://localhost:9090/api/v1/query_range?query=';

        const { type, hour } = req.query;
        const userCores = 100 / res.locals.cores;
        start = new Date(Date.now() - Number(hour) * 3600000).toISOString();
        step = Math.ceil((step / (24 / Number(hour))));

        //!<-------------------------------------------------------QUERIES FOR ENTIRE CLUSTER---------------------------------------------------------------->
        // if (type === 'cpu') query = `sum(rate(container_cpu_usage_seconds_total{container!=""}[5m]))*35.46&start=${start}&end=${end}&step=30m`;
        // if (type === 'mem') query = `sum(container_memory_usage_bytes{container!=""})&start=${start}&end=${end}&step=30m`;

        if (type === 'cpu') query += `sum(rate(container_cpu_usage_seconds_total{container!=""}[5m]))*${userCores}&start=${start}&end=${end}&step=${step}m`;
        if (type === 'mem') query += `sum(container_memory_usage_bytes{container!=""})&start=${start}&end=${end}&step=${step}m`;

        try {
            const response = await fetch(query);
            const data = await response.json();
            res.locals.data = data.data.result;
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getCores: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const query = `sum(kube_node_status_allocatable{resource="cpu"})`;
            const response = await fetch(`http://localhost:9090/api/v1/query?query=sum(kube_node_status_allocatable{resource="cpu"})`);
            const data = await response.json();

            const cores = data.data.result[0].value[1]
            res.locals.cores = cores

            return next();
        } catch (error) {
            return next(error);
        }
    },
    // might need to change, unsure of number 
    // need to work on still
    getMem: async (req: Request, res: Response, next: NextFunction) => {

        try {
            // resource => memory, cpu 
            const response = await fetch(`http://localhost:9090/api/v1/query?query=sum(kube_node_status_allocatable{resource="memory"})`);
            const data = await response.json();

            // console.log('data:', data.data.result[0].value[1]);
            // const cores = data.data.result[0].value[1]
            // res.locals.cores = cores
            // console.log('res.locals.cores:', res.locals.cores);
            return next();
        } catch (error) {
            return next(error);
        }
    }

};

export default promController;
