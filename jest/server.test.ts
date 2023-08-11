// import fs from "fs";
// import path from "path";
// import Request from "supertest";
// import assert from "assert";
// import { exec, ChildProcess } from 'child_process';
import { expect } from '@jest/globals'; 
import supertest from 'supertest';
import express from 'express';
import { is } from 'cypress/types/bluebird';


const app = express(); 
const request = supertest(app);


// router.get('/namespaces', clusterController.getAllNamespaces, (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json(res.locals.namespaces);
// });
// router.get('/pods', clusterController.getAllPods, (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json(res.locals.pods);
// });
// router.get('/nodes', clusterController.getAllNodes, (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json(res.locals.nodes);
// });
// // router.get('/logs', clusterController.getAllPods, clusterController.getAllPodLogs, (req: Request, res: Response, next: NextFunction) => {
// //     res.status(200).json(res.locals.logs);
// // });

// //!---------------------------------------------These Routes are for testing (for now)------------------------------------->
// router.get('/services', clusterController.getAllServices, (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json(res.locals.services);
// });
// router.get('/deployments', clusterController.getAllDeployments, (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json(res.locals.deployments);
// });


// });
describe('404 error handler', () => {
  it('should respond with a 404 status code for unknown API route', async () => {
    const res = await request.get('/api/non-existent-route'); 
    expect(res.status).toBe(404);
  });
});

describe('API Routes', () => {
  it("should respond with namespaces data", async () => {
    const res = await request.get('/namespaces');
    console.log('Response:', res.status, res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  })
});


// import clusterRouter from '../server/routers/clusterRouter';
// import clusterController from '../server/controllers/clusterController';


// jest.mock('./', () => ({
//   listNamespace: jest.fn(() => Promise.resolve({ body: { items: [] } }))
// }));

// describe('Cluster Routes - Namespaces', () => {
//   beforeAll(() => {
//     app.use('/cluster', clusterRouter);
//   });

//   it('should respond with namespaces data', async () => {
//     const response = await request.get('/cluster/namespaces');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([]);
//   });
// });



