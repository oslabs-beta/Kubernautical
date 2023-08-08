import React, { useEffect, useState, useContext, FC } from 'react';
import { ClusterNode, ClusterEdge, clusterGraphData, Props, CLusterObj, ClusterData, globalServiceObj } from '../../types/types';
// import { v4 as uuidv4 } from 'uuid';

const EditModal: FC<ClusterData> = ({ pods, namespaces, deployments, services }) => {

  return (
    <div className='mainContainer'>
      TESTING
    </div>
  )
}

// {showEditModal ? <EditModal pods={clusterData.pods} namespaces={clusterData.namespaces} deployments={clusterData.deployments} services={clusterData.services} /> : <div></div>}
// <button className='containerButton mapButton2' value={ns} onClick={() => showEditModal ? setShowEditModal(false) : setShowEditModal(true)}>Make Cluster Changes</button>
//    const [showEditModal, setShowEditModal] = useState(false);

export default EditModal;