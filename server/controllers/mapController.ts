import * as k8s from '@kubernetes/client-node';
import os from 'os';
import type { Request, Response, NextFunction } from 'express';
import type { mapController } from '../../types';


//modularize later perhaps 
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


// const promURL = 'http://localhost:9090/api/v1/query?query=';
//nodes, namespaces, pod
// const getNodes = async () => {
//   const data = await k8sApi.listNode();

// };

// const getNamespaces = async () => {
//   const data = await k8sApi.listNamespace();

// };

// const getPods = async () => {
//   const data = await k8sApi.listPodForAllNamespaces();

// };


//Nodes saved under res.locals.nodes
//Pods saved under res.locals.pods

const mapController: mapController = {
  

    getElements: async (req: Request, res: Response, next: NextFunction) => {
      try {
        // console.log('in mappy')
        // console.log('nodes', res.locals.nodes)
        // console.log('pods', res.locals.pods)
        // console.log('namespaces', res.locals.namespaces)
        const elements = {
          nodes: res.locals.nodes,
          pods: res.locals.pods,
          namespaces: res.locals.namespaces,
      };
      res.locals.elements = elements;
      console.log('els', res.locals.elements)
      console.log('out of mappy')
        
        return next();
      } catch (err) {
        
      }
    }

};

export default mapController;
