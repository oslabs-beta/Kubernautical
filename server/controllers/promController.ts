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

        const { type, hour, scope, name } = req.query; //pods--->scope, podname---->name

        //api/prom/metrics?type=cpu&hour=24&name=gmp-system
        //^hour is required
        const userCores = 100 / res.locals.cores;
        start = new Date(Date.now() - Number(hour) * 3600000).toISOString();
        step = Math.ceil((step / (24 / Number(hour))));
        // console.log(scope, name)
        
        //!<-------------------------------------------------------QUERIES (NOW MODULARIZED)---------------------------------------------------------------->
        if (type === 'cpu') query += `sum(rate(container_cpu_usage_seconds_total{container!="",${scope ? `${scope}="${name}"` : ''}}[10m]))*${userCores}`;
        if (type === 'mem') query += `sum(container_memory_usage_bytes{container!="",${scope ? `${scope}="${name}"` : ''}})`;
        if (type === 'trans') query += `sum(rate(container_network_transmit_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
        if (type === 'rec') query += `sum(rate(container_network_receive_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
        if (type === 'req') query += `sum(kube_pod_container_resource_requests{resource="cpu"}${scope ? `{${scope}="${name}"}` : ''})*${userCores}`; //requested divided by available

        query += `&start=${start}&end=${end}&step=${step}m`;

        console.log('query:', query);
        try {
            const response = await fetch(query + query);
            const data = await response.json();

            // console.log('data:', data.data)
            
            res.locals.data = data.data.result;

            return next();
        } catch (error) {
            return next(error);
        }
    },

    getCores: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await fetch(`http://localhost:9090/api/v1/query?query=sum(kube_node_status_allocatable{resource="cpu"})`);
            const data = await response.json();
            const cores = data.data.result[0].value[1]
            res.locals.cores = cores
            return next();
        } catch (error) {
            return next(error);
        }
    },
    //TODO doesnt work
    getMem: async (req: Request, res: Response, next: NextFunction) => {

        console.log('in getMem')

        let start = new Date(Date.now() - 1440 * 60000).toISOString(); //24 hours
        let end = new Date(Date.now()).toISOString();
        let step = 10;

        const { hour } = req.query;

        start = new Date(Date.now() - Number(hour) * 3600000).toISOString();
        step = Math.ceil((step / (24 / Number(hour))));

        let mem = [];
        let range = `&start=${start}&end=${end}&step=${step}`;
        let query = `http://localhost:9090/api/v1/query_range?query=`;

        console.log('res.locals.data:', res.locals.data[0].values.slice(-1)[0][1]);
        const lastUsed = res.locals.data[0].values.slice(-1)[0][1];

        let totalQ = query + `sum(node_memory_MemTotal_bytes)` + range;

        let reqQ = query + `sum(kube_pod_container_resource_requests{resource="memory"})` + range;
        // console.log(reqQ)

        try {
            const totRes = await fetch(totalQ);
            const totData = await totRes.json();
            const lastTot = totData.data.result[0].values.slice(-1)[0][1];
            // console.log('test', lastTot)
            
            const reqRes = await fetch(reqQ);
            const reqData = await reqRes.json();
            const lastReq = reqData.data.result[0].values.slice(-1)[0][1];

            const remMem = lastTot - lastUsed;
            mem.push(lastUsed,lastReq,remMem);
            const percents = mem.map((value) => (value/lastTot) *100);
            console.log(percents)


            res.locals.mem = percents;
            
            return next();
        } catch (err) {
        console.error('Error fetching metrics:', err);
        
        }
    }

};

export default promController;