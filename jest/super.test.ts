/* eslint-disable import/no-extraneous-dependencies */
import { expect, test, describe, beforeEach } from '@jest/globals'
import request from 'supertest'
import { Chance } from 'chance'
import dotenv from 'dotenv'
import app from '../server/server'
import promController from '../server/controllers/promController'
import clusterController from '../server/controllers/clusterController'
import execController from '../server/controllers/crudController'
import k6Controller from '../server/controllers/k6Controller'
import mapController from '../server/controllers/mapController'
import lokiController from '../server/controllers/lokiController'

dotenv.config()

let server: any
beforeEach(() => {
  server = app.listen(1212)
})
afterEach(() => {
  server.close()
})
// Test for error handler
describe('404 error handler', () => {
  test('should respond with a 404 status code for unknown API route', async () => {
    const res = await request(app).get('/non-existent-request')
    expect(res.statusCode).toEqual(404)
  })
})

// ?-----------------------------------------Prom Controller------------------------------------->
describe('Prometheus Controller', () => {
  const chance = new Chance()
  const hourNumber = chance.integer({ min: 1, max: 24 }).toString()
  const properties = Object.keys(promController)
  const getMetricsTestData = [
    { type: 'cpu', hour: hourNumber },
    { type: 'mem', hour: hourNumber },
    { type: 'trans', hour: hourNumber },
    { type: 'rec', hour: hourNumber }
  ]
  const getMemOrCpuTestData = [
    { type: 'cpu' },
    { type: 'mem' }
  ]
  // const testGlobalHandleError = [
  //   {endpoint:`/api/prom/metrics?type=sas&hour=24&ep=${process.env.PROMETHEUS_EP}`},
  //   {endpoint:`/api/prom/metrics`},
  // ]
  getMetricsTestData.forEach((entry) => {
    test(`/GET ${entry.type} for Line Chart returns data`, async () => {
      const res = await request(app).get(`/api/prom/metrics?type=${entry.type}&hour=${entry.hour}&ep=${process.env.PROMETHEUS_EP ?? ''}`)
      expect(res.status).toEqual(200)
      expect(Array.isArray(res.body)).toEqual(true)
      // expect(res.body).toMatchSnapshot()
    })
  })
  getMemOrCpuTestData.forEach((entry) => {
    test(`/Get ${entry.type} for Guage Chart returns data`, async () => {
      const res = await request(app).get(`/api/prom/${entry.type}?type=${entry.type}&hour=24&notTime=true&ep=${process.env.PROMETHEUS_EP ?? ''}`)
      expect(res.status).toEqual(200)
      expect(typeof res.body === 'object').toEqual(true)
      // expect(res.body).toMatchSnapshot()
    })
  })
  //   testGlobalHandleError.forEach((entry)=>{
  //   test('should handle global middleware errors', async()=>{
  //     const defaultErr = {
  //       log: 'Error caught in global handler',
  //       status: 400,
  //       message:{error: 'Error getting Data'}
  //     };
  //     const response = await request(app)
  //     .get(entry.endpoint)
  //     .expect(400)
  //     expect(response.body).toEqual(defaultErr.message);
  //   })
  // })
  test(`should have ${Object.keys(promController) as unknown as string}`, () => {
    properties.forEach((prop) => { expect(promController).toHaveProperty(prop) })
  })
  test('All Properties should be a function', () => {
    properties.forEach((prop) => {
      expect(typeof (promController as any)[prop]).toBe('function')
    })
  })
})
// ?----------------------------------ClusterController------------------------------------------>
describe('Cluster Controller', () => {
  const properties = Object.keys(clusterController)
  const ClusterEndPoint = [
    { type: 'namespaces' },
    { type: 'pods' },
    { type: 'nodes' },
    { type: 'services' },
    { type: 'deployments' },
    { type: 'ingresses' }
  ]
  ClusterEndPoint.forEach((endpoint) => {
    test(`/Get ${endpoint.type} returns data`, async () => {
      const res = await request(app).get(`/api/cluster/${endpoint.type}`)
      expect(res.status).toEqual(200)
    })
  })
  test(`should have ${Object.keys(clusterController) as unknown as string}`, () => {
    properties.forEach((prop) => { expect(clusterController).toHaveProperty(`${prop}`) })
  })

  test('All Properties should be a function', () => {
    properties.forEach((prop) => {
      expect(typeof (clusterController as any)[prop]).toBe('function')
      /* expect(prop.constructor.name).toBe('function'); */
    })
  })
})
// ?-------------------------------Exec Controller------------------------------------------------>
describe('Exec Controller', () => {
  const properties = Object.keys(execController)
  // const ExecEndPoint = [
  //   { type: 'ns' },
  //   { type: 'dep' },
  // ]
  // ExecEndPoint.forEach((endpoint) => {
  //   test(`/Get ${endpoint.type} returns data`, async () => {
  //     const res = await request(app).get(`/api/exec/${endpoint.type}`)
  //     expect(res.status).toEqual(400)
  //   })
  // })
  test(`should have ${Object.keys(execController) as unknown as string}`, () => {
    properties.forEach((prop) => { expect(execController).toHaveProperty(`${prop}`) })
  })

  test('All Properties should be a function', () => {
    properties.forEach((prop) => {
      expect(typeof (execController as any)[prop]).toBe('function')
    })
  })
})
// ?---------------------------------K6 Controller------------------------------------------------>
describe('k6Controller Controller', () => {
  const properties = Object.keys(k6Controller)
  test('/Get elements returns data', async () => {
    const res = await request(app).get('/api/k6/test')
    expect(res.status).toEqual(200)
  })
  test(`should have ${Object.keys(k6Controller) as unknown as string}`, () => {
    properties.forEach((prop) => { expect(k6Controller).toHaveProperty(prop) })
  })
})
// ?-----------------------------------------Map Controller---------------------------------------->
describe('mapController Controller', () => {
  const properties = Object.keys(mapController)
  test('/Get elements returns data', async () => {
    const res = await request(app).get('/api/map/elements')
    expect(res.status).toEqual(200)
  })
  test(`should have ${Object.keys(mapController) as unknown as string}`, () => {
    properties.forEach((prop) => { expect(mapController).toHaveProperty(prop) })
  })

  test('All Properties should be a function', () => {
    properties.forEach((prop) => {
      expect(typeof (mapController as any)[prop]).toBe('function')
    })
  })
})
// ?-------------------------------------Loki Controller----------------------------------------->
describe('Loki Controller', () => {
  const properties = Object.keys(lokiController)

  test('/Get logs returns data', async () => {
    const res = await request(app).get('/api/loki/logs?namespace=gmp-system')
    expect(res.status).toEqual(200)
  })
  test(`should have ${Object.keys(lokiController) as unknown as string}`, () => {
    properties.forEach((prop) => { expect(lokiController).toHaveProperty(prop) })
  })
  test('All Properties should be a function', () => {
    properties.forEach((prop) => {
      expect(typeof (lokiController as any)[prop]).toBe('function')
    })
  })
})
