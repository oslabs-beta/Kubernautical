import * as k8s from '@kubernetes/client-node';
import os from 'os';
import type { Request, Response, NextFunction } from 'express';
import type { clusterController } from '../../types';

// declare kube file path
const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`;

// create new kubeconfig class
const kc = new k8s.KubeConfig();

// load from kube config file
kc.loadFromFile(KUBE_FILE_PATH);

// make api client
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// console.log('PATH');
// console.log(KUBE_FILE_PATH);
// console.log(k8sApi);

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
            const pods = result.body.items.map((data) => {
                const { name, namespace, uid, creationTimestamp, labels } = data.metadata || {};
                const { containers, nodeName, serviceAccount } = data.spec || {};
                const { containerStatuses, hostIP, podIP, startTime } = data.status || {};
                const containersInfo = containers ? containers.map((container) => ({
                    image: container.image,
                    name: container.name,
                })) : {};
                const response = {
                    name,
                    namespace,
                    uid,
                    creationTimestamp,
                    labels,
                    containersInfo,
                    nodeName,
                    serviceAccount,
                    containerStatuses,
                    hostIP,
                    podIP,
                    startTime,
                };
                return response;
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
            console.log(result);
            const nodes = result.body.items.map((el) => {
                const { name, namespace, uid, labels } = el.metadata || {};
                const creationTimeStamp: any = el.metadata ? el.metadata.creationTimestamp : {};
                const { configSource, providerID } = el.spec || {};
                const { status } = el;
                const response = {
                    name,
                    namespace,
                    uid,
                    creationTimeStamp,
                    labels,
                    configSource,
                    providerID,
                    status,
                };
                return response;
            });

            res.locals.nodes = nodes;
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getAllNameSpaces: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await k8sApi.listNamespace();
            const namespaces = result.body.items

        } catch (error) {
            return next(error);
        }
    }
}

export default clusterController;



//declare two empty arrays
//for each data[0].values = []
    //el ---> [0,1]
        //arr1.push(el[0])
        //arr2.push(el[1])