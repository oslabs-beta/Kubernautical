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
console.log('PATH');
console.log(KUBE_FILE_PATH);
console.log(k8sApi);

const clusterController: clusterController = {

    getPodsByNode: async (req : Request, res : Response, next : NextFunction) => {
        try {
            const testName = 'gke-kubertest-default-pool-dde0ca96-0w9t';
            const result = await k8sApi.listPodForAllNamespaces(undefined, undefined, `spec.nodeName=${testName}`);
            res.locals.list = result;
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getNodesByNamespace: async (req : Request, res : Response, next : NextFunction) => {
        try {
            //result.body.items[i].spec
            //nodeName, containers
            //result.body.items[i].metadata
            //name (podname), uid (pod uid)
            //result.body.items[i].status
            //hostIP, phase, podIP

            const testName = 'gke-kubertest-default-pool-dde0ca96-0w9t';
            const result = await k8sApi.listPodForAllNamespaces(undefined, undefined, `spec.nodeName=${testName}`);
            res.locals.list = result.body.items;
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export default clusterController;