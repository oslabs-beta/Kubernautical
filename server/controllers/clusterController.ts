import os from 'os'
import * as k8s from '@kubernetes/client-node'
import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { type ClusterController, type ClientObj, type container } from '../../types/types'

const clusterController: ClusterController = {
  // setContext called before every route to obtain the correct cluster information
  setContext: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO fix typing
    const context = req.query.context as string
    console.log('context:', context)
    try {
      // pull kube config from secret dir
      const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`
      // create kubernetes client using kube config
      const kc = new k8s.KubeConfig()
      kc.loadFromFile(KUBE_FILE_PATH)
      // expose all necessary apis for further use in middleware using given context
      if (context !== undefined && context !== '') kc.setCurrentContext(context)
      res.locals.currentContext = kc.getCurrentContext()
      res.locals.contexts = kc.getContexts()
      res.locals.k8sApi = kc.makeApiClient(k8s.CoreV1Api) // used for nodes, pods, namespaces
      res.locals.k8sApi2 = kc.makeApiClient(k8s.AppsV1Api) // used for deployments and services
      res.locals.k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api) // used for ingress
      next()
    } catch (error) {
      next(error)
    }
  }) as RequestHandler,
  getAllPods: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { k8sApi } = res.locals
    try {
      const result = await k8sApi.listPodForAllNamespaces()
      const pods = result.body.items.map((pod: ClientObj) => {
        const { name, namespace, uid } = pod.metadata
        const { nodeName, serviceAccount, subdomain } = pod.spec
        const { containerStatuses, phase } = pod.status
        const containerNames = containerStatuses?.map((container: container) => (container.name))
        return {
          name,
          namespace,
          uid,
          containerNames,
          nodeName,
          serviceAccount,
          subdomain,
          phase
        }
      })
      res.locals.pods = pods
      next()
    } catch (error) {
      next({
        log: `Error in clusterController.getAllPods${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler,
  getAllNodes: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { k8sApi } = res.locals
    try {
      const result = await k8sApi.listNode()
      const nodes = result.body.items.map((node: ClientObj) => {
        const { name, uid, labels } = node.metadata
        const { allocatable, capacity, conditions, nodeInfo } = node.status
        return {
          name,
          labels,
          uid,
          allocatable,
          capacity,
          conditions,
          nodeInfo
        }
      })
      res.locals.nodes = nodes
      next()
    } catch (error) {
      next({
        log: `Error in clusterController.getAllNodes${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler,
  getAllNamespaces: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { k8sApi } = res.locals
    const { all } = req.query
    try {
      const result = await k8sApi.listNamespace()
      const filtered = all === 'true'
        ? result.body.items
        : result.body.items.filter((namespace: ClientObj) => {
          const name = namespace.metadata?.name
          return !!(name?.slice(0, 4) !== 'kube' && name?.slice(0, 7) !== 'default' && name?.slice(0, 10) !== 'gmp-public')
          // && name?.slice(0, 4) !== 'loki'
        })
      const namespaces = filtered.map((namespace: ClientObj) => {
        const { metadata } = namespace
        return {
          name: metadata?.name,
          uid: metadata?.uid
        }
      })
      res.locals.namespaces = namespaces
      next()
    } catch (error) {
      next({
        log: `Error in clusterController.getAllNameSpaces${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler,
  getAllServices: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { k8sApi } = res.locals
    try {
      const result = await k8sApi.listServiceForAllNamespaces()
      const services = result.body.items
        .map((service: ClientObj) => {
          const { name, uid, namespace } = service.metadata
          const { ipFamilies, ports, type } = service.spec
          const ips = service.status?.loadBalancer?.ingress
          let ingressIP
          if (ips !== undefined) ingressIP = ips[0]?.ip ?? ips[0]?.hostname
          // TODO pull more data as needed here
          return {
            name,
            uid,
            namespace,
            ipFamilies,
            ports,
            ingressIP,
            type
          }
        })
      res.locals.services = services
      next()
    } catch (error) {
      next({
        log: `Error in clusterController.getAllServices${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler,
  getAllDeployments: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { k8sApi2 } = res.locals
    try {
      const result = await k8sApi2.listDeploymentForAllNamespaces()
      const deployments = result.body.items
        .map((deployment: ClientObj) => {
          const { name, uid, namespace } = deployment.metadata
          const { strategy } = deployment.spec
          const { type } = strategy
          const { availableReplicas } = deployment.status
          // TODO pull more data as needed here
          return {
            name,
            uid,
            namespace,
            type,
            availableReplicas
          }
        })
      res.locals.deployments = deployments
      next()
    } catch (error) {
      next({
        log: `Error in clusterController.getAllDeployments${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler,
  //! We dont have any ingresses yet
  getAllIngresses: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { k8sApi3 } = res.locals
    try {
      const result = await k8sApi3.listIngressForAllNamespaces()
      res.locals.ingresses = result
      next()
    } catch (error) {
      next({
        log: `Error in clusterController.getAllIngresses${error as string}`,
        status: 400,
        message: { error: 'Error getting data' }
      })
    }
  }) as RequestHandler
}

export default clusterController
