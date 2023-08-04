import React, { useEffect, useState, useRef, FC } from 'react';
import Graph from 'react-graph-vis';
import { ClusterNode, ClusterEdge, clusterGraphData, Props } from '../../../types/types';
import nsImg from '../../assets/ns-icon.png';
import podImg from '../../assets/pod-icon.png';
import svcImg from '../../assets/svc-icon.png';
import depImg from '../../assets/dep-icon.png';
import logoImg from '../../assets/logo.png'

const options = {
    //TODO look into layout options
    layout: {
        // hierarchical: true,
        improvedLayout: true
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

export const Mapothy: FC<Props> = ({ header }) => {
    const [graph, setGraph] = useState<clusterGraphData>({
        nodes: [],
        edges: [],
    });
    const [ns, setNs] = useState('Cluster');
    const [nsArr, setNsArr] = useState(['']);
    const events = {
        select: function (event: any) {
            var { nodes, edges } = event;
        }
    };
    const getData = async () => {
        try {
            const nodesArr: ClusterNode[] = [];
            const edgesArr: ClusterEdge[] = [];
            const namespaceArr: string[] = [];
            let filteredNsArr: Object[] = [];
            const result = await fetch('api/map/elements');
            const clusterData = await result.json();
            const { nodes, pods, namespaces, deployments, services } = clusterData;
            nodesArr.push({ id: '0', title: "KuberNautical", size: 100, image: logoImg, shape: 'image' });
            //?----------------------------------Function for Modals---------------------------------->
            const makeModal = (obj: any, type: string) => { //fix typing
                const div = document.createElement('div');
                div.className = 'modal';
                const ul = document.createElement('ul');
                const header = document.createElement('div');
                header.className = 'modalHeader';
                header.innerText = `${type} Details`;
                div.appendChild(header);
                div.appendChild(ul);
                for (const key in obj) {
                    const li = document.createElement('li');
                    li.innerText = `${key}: ${obj[key]}`;
                    ul.appendChild(li);
                }
                return div as unknown as string;
            };
            //?----------------------------------Namespace Search------------------------------------->
            if (ns === 'Cluster') filteredNsArr = namespaces;
            else {
                filteredNsArr = [namespaces.find(({ name }: any) => name === ns)]
            }
            filteredNsArr.forEach((ns: any) => { //fix types pls i beg
                if (ns === null) return;
                namespaceArr.push(ns.name);
                const { name, uid } = ns;
                const nsObj = {
                    id: uid,
                    name: name,
                    // title: makeModal(ns),
                    title: makeModal(ns, 'Namespace'),
                    size: 70,
                    image: nsImg,
                    shape: 'image',
                }
                nodesArr.push(nsObj);
                edgesArr.push({ from: '0', to: uid, length: 400 });
                //?------------------------------Pod Search------------------------------------------>
                pods.forEach((pod: any) => { //not very effecient it hurts me
                    const { name, namespace, uid } = pod;
                    if (namespace === nsObj.name) {
                        const pObj = {
                            id: uid,
                            // label: name,
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
                services.forEach((service: any) => { //not very effecient it hurts me
                    const { name, namespace, uid } = service;
                    if (namespace === nsObj.name) {
                        const sObj = {
                            id: uid,
                            // label: name,
                            title: makeModal(service, 'Service'),
                            size: 45,
                            image: svcImg,
                            shape: 'image',
                        }
                        nodesArr.push(sObj);
                        edgesArr.push({ from: nsObj.id, to: uid, length: 300 });
                    }
                })
                //?------------------------------Deployments Search------------------------------------------>
                deployments.forEach((deployment: any) => { //not very effecient it hurts me
                    const { name, namespace, uid } = deployment;
                    if (namespace === nsObj.name) {
                        const dObj = {
                            id: uid,
                            // label: name,
                            title: makeModal(deployment, 'Deployment'),
                            image: depImg,
                            size: 45,
                            shape: 'image',
                        }
                        nodesArr.push(dObj);
                        edgesArr.push({ from: nsObj.id, to: uid, length: 150 });
                    }
                })
            })
            if (nsArr.length === 1) setNsArr(namespaceArr);
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
    }, [ns])

    //name of entire cluster id = 0
    return (
        <>
            <div className='mainHeader'>{header}</div>
            <div className='miniContainerMap'>
                {/* <div>
                    <select value={ns} onChange={(e) => setNs(e.target.value)}>
                        <option value='Cluster'>Cluster</option>
                        {nsArr ? nsArr.map((el) => {
                            return (
                                <option value={el}>{el}</option>
                            )
                        }) : <div></div>}
                    </select>
                </div> */}
                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                    getNetwork={(network) => {
                        setTimeout(
                            () =>
                                network.fit({
                                    animation: {
                                        duration: 1000,
                                        easingFunction: 'easeOutQuad',
                                    },
                                }),
                            2000
                        );
                    }} />
            </div>
        </>
    );

}
