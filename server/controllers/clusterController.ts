import * as k8s from '@kubernetes/client-node';
import os from 'os';
import type { Request, Response, NextFunction } from 'express';
import type { clusterController, Pod, log } from '../../types/types';
import { exec, execFile, execSync } from 'child_process';

// declare kube file path
const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`;
// create new kubeconfig class
const kc = new k8s.KubeConfig();
// load from kube config file
kc.loadFromFile(KUBE_FILE_PATH);
console.log(kc.getContexts());
// make apis needed to intereact with client
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);  //used for nodes, pods, namespaces
const k8sApi2 = kc.makeApiClient(k8s.AppsV1Api); //used for deployments and services
const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);  //used for ingress

const clusterController: clusterController = {
    setContext: async (req: Request, res: Response, next: NextFunction) => {
        const { context } = req.query;
        try {
            console.log('CONTEXT:', context)
            if (context) {
                const command = `kubectl config use-context ${context}`;
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        console.log('Error executing command:', err);
                        throw new Error();
                    }
                    console.log(`stdout:`, stdout);
                    return next();
                });
            }
            else return next();
        } catch (error) {
            return next(error)
        }
    },
    getAllContexts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = kc.getContexts();
            res.locals.contexts = result;
            return next();
        } catch (error) {
            return next(error)
        }
    },
    getAllPods: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await k8sApi.listPodForAllNamespaces();
            //TODO send ns from front end to speed up query times
            const pods = result.body.items.map((pod) => {
                const { name, namespace, uid } = pod.metadata || {};
                const { nodeName, serviceAccount, subdomain } = pod.spec || {};
                const { containerStatuses, phase } = pod.status || {};
                //TODO read, started, restartCount, state all available as well
                const containerNames = containerStatuses ? containerStatuses.map((container) => (container.name)) : {};
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
                log: 'Error happened at clusterController.getAllPods' + error,
                status: 400,
                message: { error: 'Error getting data' },
              });
        }
    },
    getAllNodes: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await k8sApi.listNode();
            // console.log(result);
            const nodes = result.body.items.map((node) => {
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
                log: 'Error happened at clusterController.getAllNodes' + error,
                status: 400,
                message: { error: 'Error getting data' },
              });
        }
    },
    getAllNamespaces: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log('in namesapce controller')
            const result = await k8sApi.listNamespace();
            const namespaces = result.body.items
                .filter((namespace) => {
                    const name = namespace.metadata?.name;
                    //!very readable ternary operator here
                    return name?.slice(0, 4) !== 'kube' ? name?.slice(0, 7) !== 'default' ? name?.slice(0, 10) !== 'gmp-public' ? true : false : false : false;
                })
                .map((namespace) => {
                    const { metadata } = namespace;
                    return {
                        name: metadata?.name,
                        uid: metadata?.uid,
                    }
                })
            res.locals.namespaces = namespaces;
            // console.log('out of namesapce controller')
            return next();
        } catch (error) {
            return next({
                log: 'Error happened at clusterController.getAllNameSpaces' + error,
                status: 400,
                message: { error: 'Error getting data' },
              });
        }
    },
    getAllServices: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log('in services controller')
            const result = await k8sApi.listServiceForAllNamespaces();
            const services = result.body.items
                .map((service) => {
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
            // console.log('out of services controller')
            return next();
        } catch (error) {
            return next({
                log: 'Error happened at clusterController.getAllServices' + error,
                status: 400,
                message: { error: 'Error getting data' },
              });
        }
    },
    getAllDeployments: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log('in deployments controller')
            const result = await k8sApi2.listDeploymentForAllNamespaces();
            const deployments = result.body.items
                .map((deployment) => {
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
            // console.log('out of deployments controller')
            return next();
        } catch (error) {
            return next({
                log: 'Error happened at clusterController.getAllDeployments' + error,
                status: 400,
                message: { error: 'Error getting data' },
              });
        }
    },
    //! We dont have any ingresses yet
    getAllIngresses: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await k8sApi3.listIngressForAllNamespaces();
            res.locals.ingresses = result;
            return next();
        } catch (error) {
            return next({
                log: 'Error happened at clusterController.getAllIngresses' + error,
                status: 400,
                message: { error: 'Error getting data' },
              })
        }
    }
}

export default clusterController;