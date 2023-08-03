import * as k8s from '@kubernetes/client-node';
import os from 'os';
import type { Request, Response, NextFunction } from 'express';
import type { clusterController } from '../../types/types';
// import  { Namespace } from '../../types';

// declare kube file path
const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`;
// create new kubeconfig class
const kc = new k8s.KubeConfig();

// load from kube config file
kc.loadFromFile(KUBE_FILE_PATH);

// make apis needed to intereact with client
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);  //used for nodes, pods, namespaces
const k8sApi2 = kc.makeApiClient(k8s.AppsV1Api); //used for deployments and services
// const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);  //used for ingress

// interface Node  {
//     name: string;
//     namespace: string;
//     uid: string;
//     creationTimeStamp?: any;
//     labels: any;
//     configSource: any;
//     providerID: string;
//     status: any;
//   };
// interface Pod {
//     name: string;
//     namespace: string;
//     uid: string;
//     creationTimestamp: any;
//     labels: any;
//     containersInfo: any;
//     nodeName: string;
//     serviceAccount: any;
//     containerStatuses: any;
//     hostIP: string;
//     podIP: string;
//     startTime: any;
// }
const clusterController: clusterController = {

    getAllPods: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await k8sApi.listPodForAllNamespaces();
            const pods = result.body.items.map((el) => {
                const { name, namespace, uid, labels } = el.metadata || {};
                const { containers, nodeName, serviceAccount } = el.spec || {};
                const { containerStatuses, hostIP, podIP, startTime } = el.status || {};
                const containersInfo = containers ? containers.map((container) => ({
                    image: container.image,
                    name: container.name,
                })) : {};
                return {
                    name,
                    namespace,
                    uid,
                    labels,
                    containersInfo,
                    nodeName,
                    serviceAccount,
                    containerStatuses,
                    hostIP,
                    podIP,
                    startTime,
                };
            });
            res.locals.pods = pods;
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getAllNodes: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await k8sApi.listNode();
            // console.log(result);
            const nodes = result.body.items.map((el) => {
                const { name, uid, labels } = el.metadata || {};
                const { allocatable, capacity, conditions, nodeInfo } = el.status || {};
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
            return next(error);
        }
    },
    getAllNamespaces: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log('in namesapce controller')
            const result = await k8sApi.listNamespace();
            const namespaces = result.body.items
                .map((namespace) => {
                    const name = namespace.metadata?.name;
                    if (name?.slice(0, 4) === 'kube' || name?.slice(0, 7) === 'default') return; //this will return null if kube or default ns is found
                    return {
                        name: name,
                        uid: namespace.metadata?.uid
                    }
                })
            res.locals.namespaces = namespaces;
            // console.log('namespaces', res.locals.namespaces)
            // console.log('out of namesapce controller')
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getAllServices: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log('in services controller')
            const result = await k8sApi.listServiceForAllNamespaces();
            const services = result.body.items
                .map((service) => {
                    const { name, uid, namespace } = service.metadata || {};
                    //TODO pull more data as needed here
                    return {
                        name,
                        uid,
                        namespace
                    }
                })
            res.locals.services = services;
            // console.log('out of services controller')
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getAllDeployments: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log('in deployments controller')
            const result = await k8sApi2.listDeploymentForAllNamespaces();
            const deployments = result.body.items
                .map((deployment) => {
                    const { name, uid, namespace } = deployment.metadata || {};
                    //TODO pull more data as needed here
                    return {
                        name,
                        uid,
                        namespace
                    }
                })
            res.locals.deployments = deployments;
            // console.log('out of deployments controller')
            return next();
        } catch (error) {
            return next(error);
        }
    },

}

export default clusterController;