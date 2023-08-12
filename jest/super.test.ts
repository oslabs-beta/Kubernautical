import { expect, test, jest, beforeEach, describe } from '@jest/globals'; 
import request from 'supertest';
import app from '../server/server';

// import routers
import promRouter from '../server/routers/promRouter';
//import clusters
import clusterController from '../server/controllers/clusterController';
import execController from '../server/controllers/execController';
import k6Controller from '../server/controllers/k6Controller';
import mapController from '../server/controllers/mapController';
import promController from '../server/controllers/promController';


jest.mock('../server/controllers/promController',()=>({
  getMetrics: jest.fn((req:any,res:any,next:any)=>{
    res.locals.data=[
      {metrics:{},
      values:[
          [1691785207.305,"1847914496"],
          [1691785807.305,"1858945024"],
          [1691786407.305,"1861873664"],
      ]
    }
  ]
    next()
  })
}))


// routers
app.use('/prom',promRouter)


// Basic test for cluster controller (more coming)
describe('Cluster Controller', () => {
  const properties = Object.keys(clusterController);

  test('should have setContext, getAllContexts, getAllPods, getAllNodes, getAllNamespaces, getAllServices, getAllDeployments, getAllIngresses properties from clusterController', () => {
   properties.forEach(prop => expect(clusterController).toHaveProperty(`${prop}`));
  });

  test('setContext should be an function', () => {
    properties.forEach((prop) => {
      expect(typeof (clusterController as any)[prop]).toBe('function');
      /* expect(prop.constructor.name).toBe('function'); */
    });
  });

});

// Basic test for exec controller (more coming)
describe('Exec Controller', () => {
  const properties = Object.keys(execController);

  test(`should have all properties from execController`, () => {
   properties.forEach(prop => expect(execController).toHaveProperty(`${prop}`));
  });

  test('setContext should be an function', () => {
    properties.forEach((prop) => {
      expect(typeof (execController as any)[prop]).toBe('function');
      /* expect(prop.constructor.name).toBe('function'); */
    });
  });

});

// Basic test for k6Controller controller (more coming)
describe('k6Controller Controller', () => {
  const properties = Object.keys(k6Controller);

  test(`should have all properties from k6Controller`, () => {
   properties.forEach(prop => expect(k6Controller).toHaveProperty(`${prop}`));
  });

  test('setContext should be an function', () => {
    properties.forEach((prop) => {
      expect(typeof (execController as any)[prop]).toBe('function');
      /* expect(prop.constructor.name).toBe('function'); */
    });
  });

});

// Basic test for mapController controller (more coming)
describe('mapController Controller', () => {
  const properties = Object.keys(mapController);

  test(`should have all properties from mapController`, () => {
   properties.forEach(prop => expect(mapController).toHaveProperty(`${prop}`));
  });

  test('setContext should be an function', () => {
    properties.forEach((prop) => {
      expect(typeof (mapController as any)[prop]).toBe('function');
      /* expect(prop.constructor.name).toBe('function'); */
    });
  });

});




// Test for error handler
describe('404 error handler', () => {
  test('should respond with a 404 status code for unknown API route', async () => {
    const res = await request(app).get('/non-existent-request') 
    expect(res.statusCode).toEqual(404);
  });
});

describe('promController',()=>{
  test('prom controller metrics returns valid response', async()=>{
    const res = await request(app).get('/api/prom/metrics?type=cpu&hour=24')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toEqual([
      {metrics:{},
      values:[
          [1691785207.305,"1847914496"],
          [1691785807.305,"1858945024"],
          [1691786407.305,"1861873664"],
      ]
    }
  ])
  })
})


