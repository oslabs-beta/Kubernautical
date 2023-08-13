import React, { useEffect, useState, useContext, FC } from 'react';
import { GlobalContext } from './Contexts';
import Graph from 'react-graph-vis';
import { ClusterNode, ClusterEdge, clusterGraphData, Props, CLusterObj, ContextObj, globalServiceObj } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { makeModal, windowHelper } from './helperFunctions';
import nsImg from '../assets/ns-icon.png';
import podImg from '../assets/pod-icon.png';
import svcImg from '../assets/svc-icon.png';
import depImg from '../assets/dep-icon.png';
import logoImg from '../assets/images/ourlogo.png';

//?-----------------------------------------Physics Testing------------------------------------------------>
const options = {
    //TODO look into layout options
    layout: {
        // randomSeed: '0.07224874827053274:1691128352960',
        // randomSeed: '0.13999053405779072:1691128555260'
        // randomSeed: '0.26923438127640864:1691128645444'
        randomSeed: '0.00836184154624342:1691197042873' //current god seed
        // randomSeed: '0.19873095642451144:1691197919546' //current demi god seed
    },
    edges: {
        color: "#00FFFF"
    },
    interaction: {
        hover: true,
    },
    autoResize: true,
    //TODO look into physics optinos
    physics: {
        barnesHut: {
            gravitationalConstant: -1000,
            centralGravity: 0,
            springLength: 150,
            springConstant: 0.003,
            damping: 0.09,
            avoidOverlap: 0.2,
        }
    }
};
const defaultservArr: globalServiceObj[] = [];
//?-----------------------------------------Map Component------------------------------------------------>
export const Mapothy: FC<Props> = ({ header }) => {
    const { setGlobalNamesapces, globalNamespaces,
        setGlobalServices, globalServices,
        setGlobalClusterData, globalClusterData,
        setGlobalCrudChange, globalCrudChange,
        globalClusterContext, setGlobalClusterContext
    } = useContext(GlobalContext);
    const [graph, setGraph] = useState<clusterGraphData>({
        nodes: [],
        edges: [],
    });
    const [ns, setNs] = useState('Cluster');
    const [clusterContext, setClusterContext] = useState(globalClusterContext);
    const events = {
        select: function (event: any) { //TODO fix typing 
            var { nodes, edges } = event;
        }
    };
    const getData = async () => {
        try {
            //arrays used to store nodes and edges for use in react-graph-vis
            const nodesArr: ClusterNode[] = [];
            const edgesArr: ClusterEdge[] = [];
            //storage of temporary arrays to be used for global arrays (soon to be deprecated)
            const namespaceArr: string[] = [];
            const serviceArrTemp: globalServiceObj[] = [];
            //temporary arrray used for filtering cluster view by namespace
            let filteredNsArr: CLusterObj[] = [];
            //check to see if namespace array needs to be updated
            let newContext = false;
            let data;
            //conditionals to prevent an unnecessary fetching
            if (!globalClusterData?.namespaces || globalCrudChange || globalClusterContext !== clusterContext) {
                //fetch made using the current context, checks used for base case and persistent context
                const result = await fetch(`api/map/elements?context=${globalClusterContext ? clusterContext ? clusterContext : globalClusterContext : ''}`);
                data = await result.json();
                //swithces flipped and state assigned
                if (setGlobalCrudChange) setGlobalCrudChange(false);
                if (setGlobalClusterData) setGlobalClusterData(data);
                if (setGlobalClusterContext && clusterContext) setGlobalClusterContext(clusterContext);
                newContext = true; //TODO please god delete the global namespace array and fix this
            }
            else { data = globalClusterData }
            const { pods, namespaces, deployments, services, contexts, currentContext } = data;
            //base case for context
            if (!globalClusterContext && setGlobalClusterContext) setGlobalClusterContext(currentContext)
            if (!clusterContext) setClusterContext(currentContext)
            //center node assigned to current context, all namespaces will be connected to this node
            nodesArr.push({ id: '0', title: `${currentContext}`, size: 100, image: logoImg, shape: 'image' });
            //checks to filter cluste view if a namespace has been selected
            if (ns === 'Cluster') filteredNsArr = namespaces;
            else { filteredNsArr = [namespaces.find(({ name }: any) => name === ns)] }
            //?----------------------------------Namespace Search------------------------------------->
            //namespace array iterated over, with all other resources being attached accordingly
            filteredNsArr.forEach((ns: CLusterObj) => {
                if (ns === null) return;
                namespaceArr.push(ns.name);
                const { name, uid } = ns;
                const nsObj = {
                    id: uid,
                    name: name,
                    title: makeModal(ns, 'Namespace'), //modals created using helper function
                    size: 70,
                    image: nsImg,
                    shape: 'image',
                }
                //each node object is pushed to nodes array
                nodesArr.push(nsObj);
                //edges drawn from namespace to center (context) node
                edgesArr.push({ from: '0', to: uid, length: 400 });
                //?------------------------------Pod Search------------------------------------------>
                pods.forEach((pod: CLusterObj) => {
                    const { name, namespace, uid } = pod;
                    if (namespace === nsObj.name) {
                        const pObj = {
                            id: uid,
                            title: makeModal(pod, 'Pod'),
                            size: 45,
                            image: podImg,
                            shape: 'image',
                        }
                        //same as above but edges are drawn from current node to corresponding namespace node
                        nodesArr.push(pObj);
                        edgesArr.push({ from: nsObj.id, to: uid, length: 200 });
                    }
                })
                //?------------------------------Services Search------------------------------------------>
                services.forEach((service: CLusterObj) => {
                    const { name, namespace, uid, ingressIP, ports } = service;
                    if (namespace === nsObj.name) {
                        const sObj = {
                            id: uid,
                            title: makeModal(service, 'Service'),
                            size: 45,
                            image: svcImg,
                            shape: 'image',
                        }
                        //pertinent data regarding exposed ingress ports is extracted and later assigned to global state
                        if (ingressIP) serviceArrTemp.push({ name: name, ip: `${ingressIP}:${ports ? ports[0].port : ''}` });
                        nodesArr.push(sObj);
                        edgesArr.push({ from: nsObj.id, to: uid, length: 300 });
                    }
                })
                //?------------------------------Deployments Search------------------------------------------>
                deployments.forEach((deployment: CLusterObj) => {
                    const { name, namespace, uid } = deployment;
                    if (namespace === nsObj.name) {
                        const dObj = {
                            id: uid,
                            title: makeModal(deployment, 'Deployment'),
                            image: depImg,
                            size: 45,
                            shape: 'image',
                        }
                        nodesArr.push(dObj);
                        edgesArr.push({ from: nsObj.id, to: uid, length: 150 });
                    }
                })
                //?------------------------------Ingress Search------------------------------------------>
                //!currently no ingresses
                //     ingresses.forEach((ingress: ClusterObj) => { 
                //         const { name, namespace, uid } = ingress;
                //         if (namespace === nsObj.name) {
                //             const iObj = {
                //                 id: uid,
                //                 title: makeModal(ingress, 'Deployment'),
                //                 image: depImg,
                //                 size: 45,
                //                 shape: 'image',
                //             }
                //             nodesArr.push(iObj);
                //             edgesArr.push({ from: nsObj.id, to: uid, length: 150 });
                //         }
                //     })
            })
            //TODO need to delete global namespaces this sucks
            if (newContext || globalNamespaces?.length === 1 || globalCrudChange) { setGlobalNamesapces ? setGlobalNamesapces(namespaceArr) : null }
            if (globalServices?.length === 0 || newContext) setGlobalServices ? setGlobalServices(serviceArrTemp) : null;
            //graph created using node and edges array created above
            setGraph({
                nodes: nodesArr,
                edges: edgesArr
            });
        } catch (error) {
            throw (error);
        }
    }
    //use effect controlling data fetch and map creation set to watch pertinent data changes
    useEffect(() => {
        getData();
    }, [ns, clusterContext, globalCrudChange]);
    //TODO fix error so we dont have to ignore it // error is benign
    useEffect(() => {
        windowHelper();
    }, [])
    return (
        <>
            <div className='mainHeader'>
                {header}
            </div>
            <div style={{ position: 'relative', zIndex: 3, right: '28.5%' }}>
                <select className='containerButton mapButton' value={ns} onChange={(e) => setNs(e.target.value)}>
                    <option value='Cluster'>Cluster</option>
                    {globalNamespaces ? globalNamespaces.map((el) => {
                        return (
                            <option key={uuidv4()} value={el}>{el}</option>
                        )
                    }) : <div></div>}
                </select>
                <select className='containerButton mapButton' value={clusterContext} onChange={(e) => { setClusterContext(e.target.value) }}>
                    {globalClusterData ? globalClusterData.contexts?.map((context: ContextObj) => {
                        const { name } = context
                        return (
                            <option key={uuidv4()} value={name}>{name}</option>
                        )
                    }) : <div></div>}
                </select>
            </div>
            <div className='miniContainerMap'>
                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                    getNetwork={(network) => {
                        console.log(network.getSeed());
                        setTimeout(
                            () =>
                                network.fit({
                                    animation: {
                                        duration: 1000,
                                        easingFunction: 'easeOutQuad',
                                    },
                                }),
                            3000
                        );
                    }} />
            </div>
        </>
    );

}
