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
            console.log('hello from getMetrics')

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
            
            // *${userCores}
            if (type === 'cpu') query += `sum(rate(container_cpu_usage_seconds_total{container!="",${scope ? `${scope}="${name}"` : ''}}[10m]))`;
            if (type === 'mem') query += `sum(container_memory_usage_bytes{container!="",${scope ? `${scope}="${name}"` : ''}})`;
            if (type === 'trans') query += `sum(rate(container_network_transmit_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
            if (type === 'rec') query += `sum(rate(container_network_receive_bytes_total${scope ? `{${scope}="${name}"}` : ''}[10m]))`;
            // if (type === 'req') query += `sum(kube_pod_container_resource_requests{resource="cpu"}${scope ? `{${scope}="${name}"}` : ''})*${userCores}`; //requested divided by available
    
            if (!notTime) query += `&start=${start}&end=${end}&step=${step}m`;
    
            try {
                console.log(`query:`, query);

                const response = await fetch(query);
                // const data = response.json();
                
                if (notTime && type === 'cpu') {
       
                    const used = Number ((await response.json()).data.result[0].value[1]);
                    
                    // http://localhost:3000/api/prom/metrics?type=cpu&hour=24&notTime=true
                    res.locals.usedCpu = used
                 } else if (notTime) {
                    const usedMemory = Number((await response.json()).data.result[0].value[1]);
                    res.locals.usedMemory = usedMemory
                    
                 } else {
                    const data = await response.json();
                    res.locals.data = data.data.result;
                    
                }
       
                return next();
                } catch (error) {
                return next(error);
            }
        },

    getCores: async (req: Request, res: Response, next: NextFunction) => {
        console.log('hello from getCores')
        // count without(cpu, mode) (node_cpu_seconds_total{mode="idle"})
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
    getCpu: async (req: Request, res: Response, next: NextFunction) => {

        const requestedQuery = `http://localhost:9090/api/v1/query?query=sum(kube_pod_container_resource_requests{resource="cpu"})`;
        
        try {
            const used = res.locals.usedCpu
    
            const response2 = await fetch(requestedQuery);
            const requested = Number((await response2.json()).data.result[0].value[1]);

            const available = res.locals.cores;

            const remaining = available - (requested + used);

            const cpuArr = [used, requested, remaining];

            const cpuPercents = cpuArr.map((value) => (value/available) * 100);

            res.locals.cpuPercents = [{usedCPU: cpuPercents[0]}, {requestedCPU: cpuPercents[1]}, {allocatableCPU: cpuPercents[2]}];
            
            return next();

        } catch (error) {
            next(error);
        }
    },
    //TODO doesnt work
    getMem: async (req: Request, res: Response, next: NextFunction) => {

        // http://localhost:3000/api/prom/mem?type=mem&hour=24&notTime=true

        let query = `http://localhost:9090/api/v1/query?query=`;

        let totalMemory = query + `sum(node_memory_MemTotal_bytes)`;

        let reqMemory = query + `sum(kube_pod_container_resource_requests{resource="memory"})`;

        try {
            const response = await fetch(totalMemory);
            const totalMem = Number((await response.json()).data.result[0].value[1]);

            const response2 = await fetch(reqMemory);
            const reqMem = Number((await response2.json()).data.result[0].value[1]);

            const usedMem = res.locals.usedMemory;
            const remMem = totalMem - (reqMem + usedMem);
            
            const memArr = [reqMem, usedMem, remMem];

            const memoryPercents = memArr.map((value) => (value/totalMem) * 100);

            mem.push(reqMem, usedMem, remMem);
            const memoryPercents = mem.map((value) => (value / totalMem) * 100);

            res.locals.memoryPercents = [{ usedMemory: memoryPercents[0] }, { requestedMemory: memoryPercents[1] }, { allocatableMemory: memoryPercents[2] }];
            // totalMem
            return next();
        } catch (err) {
            console.error('Error fetching metrics:', err);

        }
    },
    doMathy: async (req: Request, res: Response, next: NextFunction) => {
        console.log('hello from mathy!')
        console.log('res.locals.data:', res.locals.data);
        const { type } = req.query;

        try {
            if (type === 'cpu') {

                const cores = res.locals.cores;
                const cpuValues = res.locals.data[0].values;

                const cpuPercents = cpuValues.map(([timestamp, value]: [any, any]) => {
                    const percent = (Number(value) / cores) * 100;
                    return [timestamp, percent];
                });
                // console.log('cpuPercents', cpuPercents)
                res.locals.data = cpuPercents;
            }
            

            // Update the original data with calculated percentages
            
            

            return next();
        } catch (error) {
            return next(error);
        }
    },


};

export default promController;