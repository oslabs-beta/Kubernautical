import React, { useEffect, useState, useContext, FC } from 'react';
import { GlobalContext } from './Contexts';
import Graph from 'react-graph-vis';
import { ClusterNode, ClusterEdge, clusterGraphData, Props, CLusterObj, ClusterData, globalServiceObj } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { makeModal, windowHelper } from './helperFunctions';
import EditModal from './EditModal';
import nsImg from '../assets/ns-icon.png';
import podImg from '../assets/pod-icon.png';
import svcImg from '../assets/svc-icon.png';
import depImg from '../assets/dep-icon.png';
import logoImg from '../assets/logo.png';

//?-----------------------------------------Physics Testing------------------------------------------------>
const options = {
    //TODO look into layout options
    layout: {
        // randomSeed: '0.07224874827053274:1691128352960',
        // randomSeed: '0.13999053405779072:1691128555260'
        // randomSeed: '0.26923438127640864:1691128645444'
        randomSeed: '0.00836184154624342:1691197042873' //current god seed
        // randomSeed: '0.19873095642451144:1691197919546' //current demi god seed
        // hierarchical: true,
        // improvedLayout: true
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
        // stabilization: {
        //     enabled: true,
        //     iterations: 99999999999
        // },
        // configure: {
        //     enabled: true,
        //     // filter: 'physics, layout',
        //     showButton: true
        // },
        barnesHut: {
            gravitationalConstant: -1000,
            centralGravity: 0,
            springLength: 150,
            springConstant: 0.003,
            damping: 0.09,
            avoidOverlap: 0.2,
        },
        // repulsion: {
        //     nodeDistance: 100,
        //     centralGravity: 0.2,
        //     springLength: 200,
        //     springConstant: 0.05,
        //     damping: 0.09
        // }
    }
};
const defaultObj: ClusterData = {};
const defaultservArr: globalServiceObj[] = [];
//?-----------------------------------------Map Component------------------------------------------------>
export const Mapothy: FC<Props> = ({ header }) => {
    const { setGlobalNamesapces, setGlobalServices, globalServices } = useContext(GlobalContext);
    const [graph, setGraph] = useState<clusterGraphData>({
        nodes: [],
        edges: [],
    });
    const [ns, setNs] = useState('Cluster');
    const [nsArr, setNsArr] = useState(['']);
    const [showEditModal, setShowEditModal] = useState(false);
    // const [serviceArr, setServiceArr] = useState(defaultservArr);
    const [clusterData, setclusterData] = useState(defaultObj);
    const events = {
        select: function (event: any) { //TODO fix typing 
            var { nodes, edges } = event;
        }
    };
    const getData = async () => {
        try {
            const nodesArr: ClusterNode[] = [];
            const edgesArr: ClusterEdge[] = [];
            const namespaceArr: string[] = [];
            const serviceArrTemp: globalServiceObj[] = [];
            let filteredNsArr: CLusterObj[] = [];
            let data;
            if (!clusterData.namespaces) {
                const result = await fetch('api/map/elements');
                data = await result.json();
                setclusterData(data);
            }
            else { data = clusterData }
            const { pods, namespaces, deployments, services } = data;
            nodesArr.push({ id: '0', title: "KuberNautical", size: 100, image: logoImg, shape: 'image' });
            //?----------------------------------Namespace Search------------------------------------->
            if (ns === 'Cluster') filteredNsArr = namespaces;
            else {
                filteredNsArr = [namespaces.find(({ name }: any) => name === ns)];
            }
            filteredNsArr.forEach((ns: CLusterObj) => {
                if (ns === null) return;
                namespaceArr.push(ns.name);
                const { name, uid } = ns;
                const nsObj = {
                    id: uid,
                    name: name,
                    title: makeModal(ns, 'Namespace'),
                    size: 70,
                    image: nsImg,
                    shape: 'image',
                }
                nodesArr.push(nsObj);
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
                //TODO------------------------------Ingress Search------------------------------------------>
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
            if (nsArr.length === 1) { setNsArr(namespaceArr); setGlobalNamesapces ? setGlobalNamesapces(namespaceArr) : null }
            if (globalServices?.length === 0) setGlobalServices ? setGlobalServices(serviceArrTemp) : null;
            setGraph({
                nodes: nodesArr,
                edges: edgesArr
            });
        } catch (error) {
            throw (error);
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [ns]);
    //TODO fix error so we dont have to ignore it // error is benign
    useEffect(() => {
        windowHelper();
    }, [])
    return (
        <>
            <div className='mainHeader'>{header}</div>
            {showEditModal ? <EditModal pods={clusterData.pods} namespaces={clusterData.namespaces} deployments={clusterData.deployments} services={clusterData.services} /> : <div></div>}
            <div className='miniContainerMap'>
                <div style={{ position: 'absolute', zIndex: 3 }}>
                    <select className='containerButton mapButton' value={ns} onChange={(e) => setNs(e.target.value)}>
                        <option value='Cluster'>Cluster</option>
                        {nsArr ? nsArr.map((el) => {
                            return (
                                <option key={uuidv4()} value={el}>{el}</option>
                            )
                        }) : <div></div>}
                    </select>
                    <button className='containerButton mapButton2' value={ns} onClick={() => showEditModal ? setShowEditModal(false) : setShowEditModal(true)}>Make Cluster Changes</button>
                </div>
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
