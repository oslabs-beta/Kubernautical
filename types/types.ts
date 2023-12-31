// import type { V1Container, V1ContainerImage, V1PodIP } from '@kubernetes/client-node';
import { type IncomingMessage } from 'http'
import type { RequestHandler } from 'express'
import { type Dispatch, type SetStateAction } from 'react'

export interface ServerError {
  err: '400'
}

export interface ClusterController {
  getAllPods: RequestHandler
  getAllNodes: RequestHandler
  getAllNamespaces: RequestHandler
  getAllServices: RequestHandler
  getAllDeployments: RequestHandler
  getAllIngresses: RequestHandler
  // getAllContexts: RequestHandler
  // setContext: RequestHandler
  // getAllPodLogs: RequestHandler
  setContext: RequestHandler
}

export interface prometheusController {
  getMetrics: RequestHandler
  getCores: RequestHandler
  getMem: RequestHandler
  getCpu: RequestHandler
}

export interface K6Controller {
  testing: RequestHandler
}

export interface LokiController {
  testing: RequestHandler
}

export interface CrudController {
  namespace: RequestHandler
  deployment: RequestHandler
  service: RequestHandler
}

export interface MapController {
  getElements: RequestHandler
}
export interface ClusterNode {
  // kind: string;
  id: string
  title?: string
  label?: string | undefined
  // font: {
  //   color: string;
  //   size?: number;
  // };
  // labels?: any;
  // matchLabels?: any;
  size?: number
  image?: any
  shape?: string
}
export interface ClusterEdge {
  from: string
  to: string
  length?: number
}
export interface clusterGraphData {
  nodes: ClusterNode[]
  edges: ClusterEdge[]
}
export interface Props {
  type?: string
  // graphType?: string
  // title?: string
  header?: string
  // yAxisTitle?: string
  // color?: string | string[]
  // graphTextColor?: string
  // backgroundColor?: string | string[]
  // borderColor?: string | string[]
  hour?: string
  style?: number
  clusterData?: ClusterData
  namespace?: string
  ep?: string
  // logType?: string
  // pod?: string
}
export interface InvisibleNavbarModalProps {
  style: number
  setShowModal: Dispatch<SetStateAction<boolean>>
}
export interface GaugeGraphProps {
  type: string
  title: string
  graphTextColor: string
  backgroundColor: string | string[]
  borderColor: string | string[]
}
export interface LineGraphProps {
  type: string
  title: string
  yAxisTitle: string
  color: string | string[]
  graphTextColor: string
}
export interface LogProps {
  namespace: string
  logType: string
  pod: string
}
export interface MiniProps {
  style: number
  modalType: string
  setShowModal: Dispatch<SetStateAction<boolean>>
  crudSelection: string
  ns: string
  service: string
  deployment: string
}
export interface SelectorProps {
  type: string
  state: any
  stateSetter: Dispatch<SetStateAction<any>>
  modalPos: number
  setModalPos: Dispatch<SetStateAction<number>>
  modalType: string
  setModalType: Dispatch<SetStateAction<string>>
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  crudSelection?: string
  setCrudSelection: Dispatch<SetStateAction<string>>
  ns?: string
}
export interface CLusterObj {
  // [key: string]: number | string | CLusterObj | undefined
  [key: string]: any
  name: string
  namespace?: string
  uid: string
  containerNames?: string[] // array of strings (for now)
  nodeName?: string
  serviceAccount?: string
  subdomain?: string
  phase?: string
  ipFamilies?: string[]
  ports?: portObj[] // array of obj (portObj)
  type?: string
  // strategy?: strategyObj  //object with type as string
  availableReplicas?: number
  // conditions?: string
}
export interface ClusterData {
  [key: string]: any
  pods?: CLusterObj
  namespaces?: CLusterObj
  deployments?: CLusterObj
  services?: CLusterObj
  contexts?: ContextObj
}
export interface ContextObj {
  [key: string]: any
  cluster: string
  name?: string
  user?: string
  namespace?: string
}
export interface portObj {
  [key: string]: any
  name: string
  port: number
  protocol: string
  targetPort: number
}
export type nestedObj = Record<string | number, any>
export interface Pod {
  name: string
  namespace: string
  uid: string
  // labels: any;
  containerNames: string[]
  nodeName: string
  serviceAccount: string
  phase: string
  subdomain: string
}
export interface log {
  response: IncomingMessage
  body: string
}
export interface globalServiceObj {
  name: string
  ip: string
  ports?: portObj[]
}
export interface ClientObj {
  metadata: CLusterObj
  spec: CLusterObj
  status: CLusterObj
}
export interface container {
  name: string
}

export interface LogEntry {
  timestamp: string
  message: string
  namespace: string
  container: string
  pod: string
  job: string
  // values?: [string, string][];
}
