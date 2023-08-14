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
    //TODO refactor controllers

    getMetrics: async (req: Request, res: Response, next: NextFunction) => {
        const { type, hour, scope, name, notTime, ep } = req.query; //pods--->scope, podname---->name
        //? default start, stop, step, query string
        let start = new Date(Date.now() - 1440 * 60000).toISOString(); //24 hours
        let end = new Date(Date.now()).toISOString();
        let step = 10;
        let query = `http://${ep}/api/v1/${notTime ? 'query' : 'query_range'}?query=`;

        //api/prom/metrics?type=cpu&hour=24&name=gmp-system
        //^hour is required
        const userCores = 100 / res.locals.available;
        start = new Date(Date.now() - Number(hour) * 3600000).toISOString();
        step = Math.ceil((step / (24 / Number(hour))));

        //!<-------------------------------------------------------QUERIES (NOW MODULARIZED)---------------------------------------------------------------->
        if (type === 'cpu') query += `sum(rate(container_cpu_usage_seconds_total{container!="",${scope ? `${scope}="${name}"` : ''}}[10m]))${!notTime ? `*${userCores}` : ''}`;
        if (type === 'mem') query += `sum(container_memory_usage_bytes{container!="",${scope ? `${scope}="${name}"` : ''}})`;
        if (type === 'trans') query += `sum(rate(container_network_transmit_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
        if (type === 'rec') query += `sum(rate(container_network_receive_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
        if (!notTime) query += `&start=${start}&end=${end}&step=${step}m`;
        try {
            const response = await fetch(query);
            if (notTime && type === 'cpu') res.locals.usedCpu = Number((await response.json()).data.result[0].value[1]);
            else if (notTime && type === 'mem') res.locals.usedMem = Number((await response.json()).data.result[0].value[1]);
            else res.locals.data = (await response.json()).data.result;
            return next();
        } catch (error) {
            return next({
                log: 'Error in promController.getMetrics' + error,
                status: 400,
                message: { error: 'Error getting Data' },
            });
        }
    },
    getCores: async (req: Request, res: Response, next: NextFunction) => {
        const { ep } = req.query;
        try {
            const response = await fetch(`http://${ep}/api/v1/query?query=sum(kube_node_status_allocatable{resource="cpu"})`);
            res.locals.available = (await response.json()).data.result[0].value[1]
            return next();
        } catch (error) {
            return next({
                log: 'Error in promController.getCores' + error,
                status: 400,
                message: { error: 'Error getting Data' },
            });
        }
    },
    getCpu: async (req: Request, res: Response, next: NextFunction) => {
        const { ep } = req.query;
        const requestedQuery = `http://${ep}/api/v1/query?query=sum(kube_pod_container_resource_requests{resource="cpu"})`;
        try {
            const { usedCpu, available } = res.locals;
            const response = await fetch(requestedQuery);
            const requested = Number((await response.json()).data.result[0].value[1]);
            const remaining = available - (requested + usedCpu);
            const cpuArr = [usedCpu, requested, remaining];
            const cpuPercents = cpuArr.map((value) => (value / available) * 100);
            res.locals.cpuPercents = [{ usedCpu: cpuPercents[0] }, { requestedCpu: cpuPercents[1] }, { availableCpu: cpuPercents[2] }];
            return next();
        } catch (error) {
            return next({
                log: 'Error in promController.getCpu' + error,
                status: 400,
                message: { error: 'Error getting Data' },
            });
        }
    },
    getMem: async (req: Request, res: Response, next: NextFunction) => {
        const { ep } = req.query;
        let query = `http://${ep}/api/v1/query?query=`;
        let totalMemory = query + `sum(node_memory_MemTotal_bytes)`;
        let reqMemory = query + `sum(kube_pod_container_resource_requests{resource="memory"})`;

        try {
            const { usedMem } = res.locals;
            const response = await fetch(totalMemory);
            const totalMem = Number((await response.json()).data.result[0].value[1]);

            const response2 = await fetch(reqMemory);
            const reqMem = Number((await response2.json()).data.result[0].value[1]);

            const remaining = totalMem - (reqMem + usedMem);
            const memArr = [usedMem, reqMem, remaining];
            const memoryPercents = memArr.map((value) => (value / totalMem) * 100);
            res.locals.memoryPercents = [{ usedMemory: memoryPercents[1] }, { requestedMemory: memoryPercents[0] }, { availableMemory: memoryPercents[2] }];
            return next();
        } catch (error) {
            return next({
                log: 'Error in promController.getMem' + error,
                status: 400,
                message: { error: 'Error getting Data' },
            })
        }
    }
};

export default promController;