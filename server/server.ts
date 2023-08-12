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

export default app




