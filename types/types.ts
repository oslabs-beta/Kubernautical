import type { V1Container, V1ContainerImage, V1PodIP } from '@kubernetes/client-node';
import type { Request, Response, NextFunction, RequestHandler } from 'express';


export interface ServerError {
  err: '400'
}
export interface clusterController {
  // getNodesByNamespace: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getAllPods: RequestHandler
  // getPodsByNode: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getAllNodes: RequestHandler

  getAllNamespaces: RequestHandler
}
export interface prometheusController {
  // getMetrics: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getMetrics: RequestHandler
}
export interface mapController {
  // getMetrics: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getElements: RequestHandler
}


export interface ClusterNode {
  // kind: string;
  id: string;
  title: string;
  label?: string | undefined;
  // size: number;
  // font: {
  //   color: string;
  //   size?: number;
  // };
  // labels?: any;
  // matchLabels?: any;
  image?: any;
  shape?: string;
}
export interface ClusterEdge {
  from: string;
  to: string;
  // length: number;
}
export interface clusterGraphData {
  nodes: ClusterNode[];
  edges: ClusterEdge[];
}
