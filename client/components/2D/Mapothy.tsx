import React, { useEffect, useState, useRef } from 'react';
// import CytoscapeComponent from 'react-cytoscapejs';
import Graph from 'react-graph-vis';
import { ClusterNode, ClusterEdge, clusterGraphData } from '../../../types/types';
import nsImg from './assets/ns-icon';
import podImg from './assets/pod-icon.png';
import nodeImg from './assets/node-icon.png';

const options = {
    layout: {
        hierarchical: true
    },
    edges: {
        color: "#000000"
    },
    height: "500px"
};
export const Mapothy = () => {
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
            const { nodes, pods, namespaces } = clusterData;
            nodesArr.push({ id: '0', label: "Kussy", title: "idk yet" });
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

            namespaces.forEach((ns: any) => { //fix pls i beg
                const { name, uid } = ns;
                const nsObj = {
                    id: uid,
                    // label: name,
                    title: name,
                    image: nsImg
                }
                nodesArr.push(nsObj);
                edgesArr.push({ from: '0', to: uid });
                pods.forEach((pod: any) => { //not very effecient it hurts me
                    const { name, namespace, uid } = pod;
                    if (namespace === nsObj.title) {
                        const pObj = {
                            id: uid,
                            // label: name,
                            title: name,
                            image: podImg
                        }
                        nodesArr.push(pObj);
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
        <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
    );

}
