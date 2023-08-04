import type { V1Container, V1ContainerImage, V1PodIP } from '@kubernetes/client-node';
import type { Request, Response, NextFunction, RequestHandler } from 'express';
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
}

export interface prometheusController {
  // getMetrics: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getMetrics: RequestHandler

  getCores: RequestHandler

  getMem: RequestHandler
}

export interface mapController {
  // getMetrics: (req: Request, res: Response, next: NextFunction) => Promise<void>
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
export type Props = {
  type?: string;
  title?: string;
  header?: string;
  yAxisTitle?: string;
  color?: string;
  hour?: string;
}


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