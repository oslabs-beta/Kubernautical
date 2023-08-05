import type { V1Container, V1ContainerImage, V1PodIP } from '@kubernetes/client-node';
import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { type } from 'os';
import { ReactElement } from 'react';
import { JsxElement } from 'typescript';


export interface ServerError {
  err: '400'
}
export interface clusterController {
  getAllPods: RequestHandler
  getAllNodes: RequestHandler
  getAllNamespaces: RequestHandler
  getAllServices: RequestHandler
  getAllDeployments: RequestHandler
  getAllIngresses: RequestHandler
}

export interface prometheusController {
  getMetrics: RequestHandler
  getCores: RequestHandler
  getMem: RequestHandler
}

export interface mapController {
  getElements: RequestHandler
}
export interface ClusterNode {
  // kind: string;
  id: string;
  title?: string;
  label?: string | undefined;
  // font: {
  //   color: string;
  //   size?: number;
  // };
  // labels?: any;
  // matchLabels?: any;
  size?: number
  image?: any;
  shape?: string;
}
export interface ClusterEdge {
  from: string;
  to: string;
  length?: number;
}
export interface clusterGraphData {
  nodes: ClusterNode[];
  edges: ClusterEdge[];
}
export interface Props {
  type?: string;
  title?: string;
  header?: string;
  yAxisTitle?: string;
  color?: string;
  hour?: string;
}
export interface CLusterObj {
  // [key: string]: number | string | CLusterObj | undefined
  [key: string]: any
  name: string
  namespace?: string
  uid: string
  containerNames?: string[] //array of strings (for now)
  nodeName?: string
  serviceAccount?: string
  subdomain?: string
  phase?: string
  ipFamilies?: string[]
  ports?: portObj[]  //array of obj (portObj)
  type?: string
  // strategy?: strategyObj  //object with type as string 
  availableReplicas?: number
  // conditions?: string
}
export interface ClusterData {
  pods?: CLusterObj
  namespaces?: CLusterObj
  deployments?: CLusterObj
  services?: CLusterObj
}
// export interface strategyObj {
//   [key: string]: any
//   type: string
// }
export interface portObj {
  [key: string]: any
  name: string
  port: number
  protocol: string
  targetPort: number
}
export interface nestedObj {
  [key: string | number]: any
}
// export interface CLusterObj {
//   [key: string]: number | string | CLusterObj | undefined
//   // [key: string]: any
//   name: string
//   namespace?: string
//   uid: string
//   containersInfo: string
//   nodeName: string
//   serviceAccount: string
//   subdomain: string
//   containersStatuses: string
//   phase: string
// }

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