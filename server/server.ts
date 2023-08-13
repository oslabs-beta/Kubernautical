import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { ServerError } from '../types/types';
import path from 'path';
import apiRouter from './routers/apiRouter';


const PORT = 3000;


const app = express();
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, '../client')));

//add routes

app.use('/api', apiRouter);

app.use((req, res) => {
    res.sendStatus(404);
});

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
        log: 'Error caught in global handler',
        status: 500,
        message: { err: 'An error occurred' }
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    console.log(err);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});






// total mem cluster
    //`http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=${start}&end=${end}&step=10m`
// total cpu cluster
    //`http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=10m`


//node transmit cluster level
    //`http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[10m]))&start=${start}&end=${end}&step=10m`
//node recieve cluster level
    //`http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total[10m]))&start=${start}&end=${end}&step=10m`


// export const start = new Date(Date.now() - 1440 * 60000).toISOString(); //24 hours
// export const end = new Date(Date.now()).toISOString();