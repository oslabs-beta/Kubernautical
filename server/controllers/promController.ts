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
        const { type, hour, scope, name, notTime } = req.query; //pods--->scope, podname---->name
        //? default start, stop, step, query string
        let start = new Date(Date.now() - 1440 * 60000).toISOString(); //24 hours
        let end = new Date(Date.now()).toISOString();
        let step = 10;

        let query = `http://localhost:9090/api/v1/${notTime ? 'query' : 'query_range'}?query=`;

        //api/prom/metrics?type=cpu&hour=24&name=gmp-system
        //^hour is required
        const userCores = 100 / res.locals.cores;
        start = new Date(Date.now() - Number(hour) * 3600000).toISOString();
        step = Math.ceil((step / (24 / Number(hour))));

        //!<-------------------------------------------------------QUERIES (NOW MODULARIZED)---------------------------------------------------------------->
        if (type === 'cpu') query += `sum(rate(container_cpu_usage_seconds_total{container!="",${scope ? `${scope}="${name}"` : ''}}[10m]))*${userCores}`;
        if (type === 'mem') query += `sum(container_memory_usage_bytes{container!="",${scope ? `${scope}="${name}"` : ''}})`;
        if (type === 'trans') query += `sum(rate(container_network_transmit_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
        if (type === 'rec') query += `sum(rate(container_network_receive_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
        if (!notTime) query += `&start=${start}&end=${end}&step=${step}m`;

        try {
            const response = await fetch(query);
            if (notTime && type === 'cpu') res.locals.usedCpu = Number((await response.json()).data.result[0].value[1]);
            if (notTime && type === 'mem') res.locals.usedMem = Number((await response.json()).data.result[0].value[1]);
            else res.locals.data = (await response.json()).data.result;
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getCores: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await fetch(`http://localhost:9090/api/v1/query?query=sum(kube_node_status_allocatable{resource="cpu"})`);
            res.locals.cores = (await response.json()).data.result[0].value[1]
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getCpu: async (req: Request, res: Response, next: NextFunction) => {

        const requestedQuery = `http://localhost:9090/api/v1/query?query=sum(kube_pod_container_resource_requests{resource="cpu"})`;

        try {
            const { usedCpu, available } = res.locals;

            const response = await fetch(requestedQuery);
            const requested = Number((await response.json()).data.result[0].value[1]);

            const remaining = available - (requested + usedCpu);
            const cpuArr = [usedCpu, requested, remaining];
            const cpuPercents = cpuArr.map((value) => (value / available) * 100);

            res.locals.cpuPercents = [{ usedCPU: cpuPercents[0] }, { requestedCPU: cpuPercents[1] }, { availableCPU: cpuPercents[2] }];
            return next();

        } catch (error) {
            next(error);
        }
    },
    getMem: async (req: Request, res: Response, next: NextFunction) => {

        let query = `http://localhost:9090/api/v1/query?query=`;
        let totalMemory = query + `sum(node_memory_MemTotal_bytes)`;
        let reqMemory = query + `sum(kube_pod_container_resource_requests{resource="memory"})`;

        try {
            const { usedMem } = res.locals;
            const response = await fetch(totalMemory);
            const totalMem = Number((await response.json()).data.result[0].value[1]);

            const response2 = await fetch(reqMemory);
            const reqMem = Number((await response2.json()).data.result[0].value[1]);

            const remaining = totalMem - (reqMem + usedMem);
            const memArr = [reqMem, usedMem, remaining];
            const memoryPercents = memArr.map((value) => (value / totalMem) * 100);
            res.locals.memoryPercents = [{ usedMemory: memoryPercents[0] }, { requestedMemory: memoryPercents[1] }, { availableMemory: memoryPercents[2] }];
            return next();
        } catch (err) {
            console.error('Error fetching metrics:', err);

        }
    }
};

export default promController;