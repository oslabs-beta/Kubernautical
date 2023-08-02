import type { V1Container, V1ContainerImage, V1PodIP } from '@kubernetes/client-node';
import type { Request, Response, NextFunction, RequestHandler } from 'express';

export interface ServerError {
    err: '400'
}
export interface clusterController {
    // getNodesByNamespace: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getNodesByNamespace: RequestHandler
    // getPodsByNode: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getPodsByNode: RequestHandler
}
export interface prometheusController {
    // getMetrics: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getMetrics: RequestHandler
}