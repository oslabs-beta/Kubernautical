import type { Request, Response, NextFunction, RequestHandler } from 'express'
import type { prometheusController } from '../../types/types'

// start and end total time period, step is how often to grab data point
// [time in minutes] averages to smoothe the graph
// sum
// summation
// rate
// per second usage
// 100 does (changed for 2.82 (940*3/1000) cores)
// number of cores used * 100/2.82 (cores used * 35.46)
// how to find available cores dynamically ---- Steves next task

const promController: prometheusController = {
  // TODO refactor controllers

  getMetrics: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { type, hour, scope, name, notTime, ep } = req.query // pods--->scope, podname---->name
    console.log(ep)
    // ? default start, stop, step, query string
    let start = new Date(Date.now() - 1440 * 60000).toISOString() // 24 hours
    const end = new Date(Date.now()).toISOString()
    let step = 10
    let query = `http://${ep as string}/api/v1/${notTime !== undefined ? 'query' : 'query_range'}?query=`

    // api/prom/metrics?type=cpu&hour=24&name=gmp-system
    // ^hour is required
    const userCores = 100 / res.locals.available
    start = new Date(Date.now() - Number(hour) * 3600000).toISOString()
    step = Math.ceil((step / (24 / Number(hour))))

    //! <----------------------------QUERIES (NOW MODULARIZED)------------------------------------->
    if (type === 'cpu') {
      query += `sum(rate(container_cpu_usage_seconds_total{container!="",
      ${scope !== undefined ? `${scope as string}="${name as string}"` : ''}}[10m]))
      ${notTime === undefined ? `*${userCores}` : ''}`
    }
    if (type === 'mem') {
      query += `sum(container_memory_usage_bytes{container!="",
      ${scope !== undefined ? `${scope as string}="${name as string}"` : ''}})`
    }
    if (type === 'trans') {
      query += `sum(rate(container_network_transmit_bytes_total
        ${scope !== undefined ? `{${scope as string}="${name as string}"}` : ''}[10m]))`
    }
    if (type === 'rec') {
      query += `sum(rate(container_network_receive_bytes_total
        ${scope !== undefined ? `{${scope as string}="${name as string}"}` : ''}[10m]))`
    }
    if (notTime === undefined) query += `&start=${start}&end=${end}&step=${step}m`
    try {
      const response = await fetch(query)
      const result = await response.json()
      if (notTime !== undefined && type === 'cpu') {
        const usedCpu = result.data.result[0].value[1]
        res.locals.usedCpu = usedCpu
      } else if (notTime !== undefined && type === 'mem') {
        const usedMem = result.data.result[0].value[1]
        res.locals.usedMem = usedMem
      } else res.locals.data = result.data.result
      next()
    } catch (error) {
      next({
        log: `Error in promController.getMetrics${error as string}`,
        status: 400,
        message: { error: 'Error getting Data' }
      })
    }
  }) as RequestHandler,
  getCores: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ep } = req.query
    try {
      const response = await fetch(`http://${ep as string}/api/v1/query?query=sum(kube_node_status_allocatable{resource="cpu"})`)
      const result = await response.json()
      const availableCores = result.data.result[0].value[1]
      res.locals.available = availableCores
      next()
    } catch (error) {
      next({
        log: `Error in promController.getCores${error as string}`,
        status: 400,
        message: { error: 'Error getting Data' }
      })
    }
  }) as RequestHandler,
  getCpu: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ep } = req.query
    const requestedQuery = `http://${ep as string}/api/v1/query?query=sum(kube_pod_container_resource_requests{resource="cpu"})`
    try {
      const { usedCpu, available } = res.locals
      const response = await fetch(requestedQuery)
      const requested = Number((await response.json()).data.result[0].value[1])
      const remaining = available - (requested + Number(usedCpu))
      const cpuArr = [usedCpu, requested, remaining]
      const cpuPercents = cpuArr.map((value) => (value / available) * 100)
      res.locals.cpuPercents = [
        { usedCpu: cpuPercents[0] },
        { requestedCpu: cpuPercents[1] },
        { availableCpu: cpuPercents[2] }
      ]
      next()
    } catch (error) {
      next({
        log: `Error in promController.getCpu${error as string}`,
        status: 400,
        message: { error: 'Error getting Data' }
      })
    }
  }) as RequestHandler,
  getMem: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ep } = req.query
    const query = `http://${ep as string}/api/v1/query?query=`
    const totalMemory = `${query}sum(node_memory_MemTotal_bytes)`
    const reqMemory = `${query}sum(kube_pod_container_resource_requests{resource="memory"})`

    try {
      const { usedMem } = res.locals
      const response = await fetch(totalMemory)
      const totalMem = Number((await response.json()).data.result[0].value[1])
      const response2 = await fetch(reqMemory)
      const reqMem = Number((await response2.json()).data.result[0].value[1])
      const remaining = totalMem - (reqMem + Number(usedMem))
      const memArr = [usedMem, reqMem, remaining]
      const memoryPercents = memArr.map((value) => (value / totalMem) * 100)
      res.locals.memoryPercents = [
        { usedMemory: memoryPercents[0] },
        { requestedMemory: memoryPercents[1] },
        { availableMemory: memoryPercents[2] }
      ]
      next()
    } catch (error) {
      next({
        log: `Error in promController.getMem${error as string}`,
        status: 400,
        message: { error: 'Error getting Data' }
      })
    }
  }) as RequestHandler
}

export default promController
