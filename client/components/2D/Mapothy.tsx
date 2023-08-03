import React, { useEffect, useState, useRef, FC } from 'react';
import Graph from 'react-graph-vis';
import { ClusterNode, ClusterEdge, clusterGraphData, Props } from '../../../types/types';
import nsImg from './assets/ns-icon.png';
import podImg from './assets/pod-icon.png';
import svcImg from './assets/svc-icon.png';
import depImg from './assets/dep-icon.png';

const options = {
    //TODO look into layout options
    layout: {
        // hierarchical: true
    },
    edges: {
        color: "#000000"
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
        },
    }
};

export const Mapothy: FC<Props> = ({ header }) => {
    const [graph, setGraph] = useState<clusterGraphData>({
        nodes: [],
        edges: [],
    });
    const [fetched, setFetched] = useState(false);
    const events = {
        select: function (event: any) {
            var { nodes, edges } = event;
        }
    };
    //nodes, namespaces, pod, services, deployments
    const getData = async () => {
        try {
            const nodesArr: ClusterNode[] = [];
            const edgesArr: ClusterEdge[] = [];
            const result = await fetch('api/map/elements');
            const clusterData = await result.json();
            const { nodes, pods, namespaces, deployments, services } = clusterData;
            nodesArr.push({ id: '0', label: "Kussy", title: "im so confused" });

            //!-----------------------Node Search (Depracated)----------------------------------------->
            // controlPlaneId = `${node.name}-node`;
            // nodes.forEach((node: any) => { //fix typing this is lazy
            //     const { name, uid } = node;
            //     const obj = {
            //         id: uid,
            //         label: name,
            //         title: name
            //     }
            //     nodesArr.push(obj);
            //     edgesArr.push({ from: '0', to: uid });
            // })
            //!-----------------------Node Search (Depracated)----------------------------------------->
            //?----------------------------------Helper Function for Modals---------------------------->
            // const makeModal = (obj: any) => { //some more lazy typing you suck
            //     return (
            //         <div>
            //             {Object.keys(obj).map((el) => {
            //                 return (
            //                     <div>
            //                         {el} : {obj[el]}
            //                     </div>
            //                 )
            //             })}
            //         </div>
            //     ) as unknown as string;
            // }
            //?----------------------------------Helper Function for Modals---------------------------->

            namespaces.forEach((ns: any) => { //fix types pls i beg
                if (ns === null) return;
                const { name, uid } = ns;
                const nsObj = {
                    id: uid,
                    name: name,
                    // title: makeModal(ns),
                    title: name,
                    image: nsImg,
                    shape: 'image',
                }
                nodesArr.push(nsObj);
                edgesArr.push({ from: '0', to: uid });
                //?------------------------------Pod Search------------------------------------------>
                pods.forEach((pod: any) => { //not very effecient it hurts me
                    const { name, namespace, uid } = pod;
                    if (namespace === nsObj.name) {
                        const pObj = {
                            id: uid,
                            // label: name,
                            title: name,
                            image: podImg,
                            shape: 'image',
                        }
                        nodesArr.push(pObj);
                        edgesArr.push({ from: nsObj.id, to: uid });
                    }
                })
                //?------------------------------Services Search------------------------------------------>
                services.forEach((service: any) => { //not very effecient it hurts me
                    const { name, namespace, uid } = service;
                    if (namespace === nsObj.name) {
                        const sObj = {
                            id: uid,
                            // label: name,
                            title: name,
                            image: svcImg,
                            shape: 'image',
                        }
                        nodesArr.push(sObj);
                        edgesArr.push({ from: nsObj.id, to: uid });
                    }
                })
                //?------------------------------Deployments Search------------------------------------------>
                deployments.forEach((deployment: any) => { //not very effecient it hurts me
                    const { name, namespace, uid } = deployment;
                    if (namespace === nsObj.name) {
                        const dObj = {
                            id: uid,
                            // label: name,
                            title: name,
                            image: depImg,
                            shape: 'image',
                        }
                        nodesArr.push(dObj);
                        edgesArr.push({ from: nsObj.id, to: uid });
                    }
                })
            })
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
        if (!fetched) {
            getData();
            setFetched(true);
        }
    }, [])
    //name of entire cluster id = 0

    return (
        <>
            <div className='mainHeader'>{header}</div>
            <div className='miniContainer'>
                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                    getNetwork={network => {
                        //  if you want access to vis.js network api you can set the state in a parent component using this property
                    }} />
            </div>
        </>
    );

}
