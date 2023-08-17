import * as k8s from '@kubernetes/client-node';
import os from 'os';
import type { Request, Response, NextFunction } from 'express';
import type { clusterController, ClientObj, container } from '../../types/types';


const clusterController: clusterController = {
    // setContext called before every route to obtain the correct cluster information based on user selected cluster
    setContext: async (req: Request, res: Response, next: NextFunction) => {
        //TODO fix typing
        const context = req.query.context as string;
        const promPort = req.query.port;
        console.log('context:', context)
        try {
            //pull kube config from secret dir
            const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`;
            //create kubernetes client using kube config
            const kc = new k8s.KubeConfig();
            kc.loadFromFile(KUBE_FILE_PATH);
            //expose all necessary apis for further use in middleware using given context
            if (context) kc.setCurrentContext(context);
            res.locals.currentContext = kc.getCurrentContext();
            res.locals.contexts = kc.getContexts();
            res.locals.k8sApi = kc.makeApiClient(k8s.CoreV1Api);  //used for nodes, pods, namespaces
            res.locals.k8sApi2 = kc.makeApiClient(k8s.AppsV1Api); //used for deployments and services
            res.locals.k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);  //used for ingress
            return next();
        } catch (error) {
            return next(error)
        }
    },
    getAllPods: async (req: Request, res: Response, next: NextFunction) => {
        const { k8sApi } = res.locals;
        try {
            const result = await k8sApi.listPodForAllNamespaces();
            const pods = result.body.items.map((pod: ClientObj) => {
                const { name, namespace, uid } = pod.metadata || {};
                const { nodeName, serviceAccount, subdomain } = pod.spec || {};
                const { containerStatuses, phase } = pod.status || {};
                //TODO read, started, restartCount, state all available as well
                const containerNames = containerStatuses ? containerStatuses.map((container: container) => (container.name)) : {};
                return {
                    name,
                    namespace,
                    uid,
                    containerNames,
                    nodeName,
                    serviceAccount,
                    subdomain,
                    phase,
                };
            });
            res.locals.pods = pods;
            return next();
        } catch (error) {
            return next({
                log: 'Error in clusterController.getAllPods' + error,
                status: 400,
                message: { error: 'Error getting data' },
            });
        }
    },
    getAllNodes: async (req: Request, res: Response, next: NextFunction) => {
        const { k8sApi } = res.locals;
        try {
            const result = await k8sApi.listNode();
            const nodes = result.body.items.map((node: ClientObj) => {
                const { name, uid, labels } = node.metadata || {};
                const { allocatable, capacity, conditions, nodeInfo } = node.status || {};
                return {
                    name,
                    labels,
                    uid,
                    allocatable,
                    capacity,
                    conditions,
                    nodeInfo
                };
            });
            res.locals.nodes = nodes;
            return next();
        } catch (error) {
            return next({
                log: 'Error in clusterController.getAllNodes' + error,
                status: 400,
                message: { error: 'Error getting data' },
            });
        }
    },
    getAllNamespaces: async (req: Request, res: Response, next: NextFunction) => {
        const { k8sApi } = res.locals;
        const { all } = req.query;
        try {
            const result = await k8sApi.listNamespace();
            const filtered = all === 'true' ? result.body.items :
                result.body.items.filter((namespace: ClientObj) => {
                    const name = namespace.metadata?.name;
                    //!very readable ternary operator here
                    return name?.slice(0, 4) !== 'kube' && name?.slice(0, 4) !== 'loki' && name?.slice(0, 7) !== 'default' && name?.slice(0, 10) !== 'gmp-public' ? true : false;
                })
            const namespaces = filtered.map((namespace: ClientObj) => {
                const { metadata } = namespace;
                return {
                    name: metadata?.name,
                    uid: metadata?.uid,
                }
            })
            res.locals.namespaces = namespaces;
            return next();
        } catch (error) {
            return next({
                log: 'Error in clusterController.getAllNameSpaces' + error,
                status: 400,
                message: { error: 'Error getting data' },
            });
        }
    },
    getAllServices: async (req: Request, res: Response, next: NextFunction) => {
        const { k8sApi } = res.locals;
        try {
            const result = await k8sApi.listServiceForAllNamespaces();
            const services = result.body.items
                .map((service: ClientObj) => {
                    const { name, uid, namespace } = service.metadata || {};
                    const { ipFamilies, ports, type } = service.spec || {};
                    const ips = service.status?.loadBalancer?.ingress || [];
                    const ingressIP = ips[0]?.ip;
                    //TODO pull more data as needed here
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
            res.locals.services = services;
            return next();
        } catch (error) {
            return next({
                log: 'Error in clusterController.getAllServices' + error,
                status: 400,
                message: { error: 'Error getting data' },
            });
        }
    },
    getAllDeployments: async (req: Request, res: Response, next: NextFunction) => {
        const { k8sApi2 } = res.locals;
        try {
            const result = await k8sApi2.listDeploymentForAllNamespaces();
            const deployments = result.body.items
                .map((deployment: ClientObj) => {
                    const { name, uid, namespace } = deployment.metadata || {};
                    const { strategy } = deployment.spec || {};
                    const { type } = strategy || {};
                    const { availableReplicas } = deployment.status || {};
                    //TODO pull more data as needed here
                    return {
                        name,
                        uid,
                        namespace,
                        type,
                        availableReplicas,
                    }
                })
            res.locals.deployments = deployments;
            return next();
        } catch (error) {
            return next({
                log: 'Error in clusterController.getAllDeployments' + error,
                status: 400,
                message: { error: 'Error getting data' },
            });
        }
    },
    //! We dont have any ingresses yet
    getAllIngresses: async (req: Request, res: Response, next: NextFunction) => {
        const { k8sApi3 } = res.locals;
        try {
            const result = await k8sApi3.listIngressForAllNamespaces();
            res.locals.ingresses = result;
            return next();
        } catch (error) {
            return next({
                log: 'Error in clusterController.getAllIngresses' + error,
                status: 400,
                message: { error: 'Error getting data' },
            })
        }
    }
}

export default clusterController;