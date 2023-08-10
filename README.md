
# Kubernautical README:

## Implemented Technologies:

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
  ![kubernetes](https://img.shields.io/badge/Kubernetes-100000?style=for-the-badge&logo=Kubernetes&logoColor=white&labelColor=000000&color=black)
  ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
  ![K6](https://img.shields.io/badge/-K6-white?style=for-the-badge&logo=k6)
  ![Javascript](https://img.shields.io/badge/javascript-yellow?style=for-the-badge&logo=javascript)
  ![node](https://img.shields.io/badge/nodejs-forestgreen?style=for-the-badge&logo=nodedotjs&logoColor=black)

## Meet the Team
 ![Jeremiah Hogue](client/assets/images/kitten.png) | ![Anthony Vuong](client/assets/images/kitten.png) | ![Stephen Acosta](client/assets/images/kitten.png) |  ![Michael Van](client/assets/images/kitten.png) |
| ------------- | ------------- |------------- | ------------- |
| Jeremiah Hogue [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/NotHogue)  [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/jeremiah-hogue/)| Anthony Vuong [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/AnthonyKTVuong) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/anthony-v-9772351b7/) | Stephen Acosta  [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/STAC98) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/sacosta756/)  | Michael Van [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/michaelvan996) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/michael-van-901533222/) |



## Introducing Kubernautical: Empowering Comprehensive Kubernetes Cluster Health Visualization

Hey there,

Today, we are delighted to present to you an innovative open source solution that revolutionizes the way users interact with and monitor their local Kubernetes clusters – **Kubernautical**.

**Introduction:**

Kubernautical is a cutting-edge open source product meticulously designed to provide users with an unparalleled visualization of the health status of their local Kubernetes clusters. Leveraging the power of Prometheus and Chart.js, our application offers an immersive experience by meticulously scraping and displaying critical metrics from Kubernetes clusters. This enables users to effortlessly comprehend the intricate health dynamics of their clusters, ensuring optimal performance and system stability.

**Key Features:**

1. **Holistic Visualization:** Kubernautical offers a holistic visual representation of key metrics, ensuring that users gain deep insights into their cluster health. The application meticulously captures and presents data related to pod and container health, Prometheus health, as well as performance and resource utilization, all in real time.

2. **Seamless Metrics Integration:** By seamlessly integrating Prometheus and Chart.js, Kubernautical guarantees the provision of accurate and up-to-date metrics. This integration empowers users with a clear understanding of their cluster's vital signs, enabling timely decision-making and troubleshooting.

3. **Real-Time Monitoring:** Our application's real-time monitoring capabilities set it apart. Users can monitor the health and performance of their clusters as events unfold, empowering them to take swift and informed actions to maintain peak efficiency.

4. **Intuitive User Interface:** Kubernautical boasts an intuitive user interface that encapsulates the complexity of Kubernetes cluster metrics into easily interpretable visuals. This user-centric design approach ensures that both novice and experienced users can effortlessly navigate and comprehend the health status of their clusters.

5. **Cluster Management Simplicity:** With the ability to seamlessly switch between different clusters at the mere click of a button, Kubernautical streamlines cluster management. This invaluable feature empowers users to efficiently monitor multiple clusters from a single, centralized location, enhancing productivity and reducing operational complexity.

**Conclusion:**

In conclusion, Kubernautical represents a significant advancement in the realm of Kubernetes cluster health visualization. By offering a comprehensive and real-time overview of critical metrics, it equips users with the insights they need to maintain robust and stable clusters. With its intuitive interface and seamless cluster switching capabilities, Kubernautical transcends the limitations of traditional monitoring solutions, ensuring a user-friendly and highly effective experience.

Thank you for your time and attention. We invite you to explore Kubernautical and embark on a journey towards enhanced Kubernetes cluster health management.

## Terminal Commands
1. Fork this repository and clone it onto your local machine:
    `git clone https://github.com/oslabs-beta/Kubernautical`
1. Run `npm install` to install all package dependencies
## Contributing
Contributions play a vital role in the open-source community. Any contributions are greatly appreciated!

- Fork the project.
- Create and work off of your feature branch.
- Create a pull request with detailed description of your changes from your feature branch to dev branch.
- Inform us upon PR submission. Once the changes are reviewed and approved, we will merge your code into the main repository.

# Kubernautical - Setup Guide

Welcome to the Kubernautical open source project's guide on setting up Prometheus for monitoring Kubernetes clusters. Prometheus is a powerful monitoring and alerting tool that helps you gain insights into your cluster's performance metrics. This guide will walk you through the process of setting up Prometheus using various resources and links.

## Table of Contents

- [Kubernautical README:](#kubernautical-readme)
  - [Implemented Technologies:](#implemented-technologies)
  - [Meet the Team](#meet-the-team)
  - [Introducing Kubernautical: Empowering Comprehensive Kubernetes Cluster Health Visualization](#introducing-kubernautical-empowering-comprehensive-kubernetes-cluster-health-visualization)
  - [Terminal Commands](#terminal-commands)
  - [Contributing](#contributing)
- [Kubernautical - Setup Guide](#kubernautical---setup-guide)
  - [Table of Contents](#table-of-contents)
  - [Prometheus Setup Steps](#prometheus-setup-steps)
    - [Prerequisites](#prerequisites)
    - [GKE Basic Prometheus Test](#gke-basic-prometheus-test)
    - [AWS Prometheus](#aws-prometheus)
    - [Helm Charts Prometheus](#helm-charts-prometheus)
    - [Custom YAML Configuration](#custom-yaml-configuration)
  - [Port Forwarding](#port-forwarding)
- [Setting Up Google Kubernetes Engine (GKE)](#setting-up-google-kubernetes-engine-gke)
  - [Prerequisites](#prerequisites-1)
  - [GKE Setup](#gke-setup)
- [General Kubernetes Setup Guide](#general-kubernetes-setup-guide)
  - [Managing Kubernetes Clusters](#managing-kubernetes-clusters)
    - [Deleting Clusters from Kube Config](#deleting-clusters-from-kube-config)
    - [Exporting Kube Config](#exporting-kube-config)
  - [Exposing Applications as Services](#exposing-applications-as-services)
  - [Load Testing with K6](#load-testing-with-k6)
  - [Removing Deployments](#removing-deployments)
- [Helpful Resources](#helpful-resources)
  - [TypeScript - Why Use TypeScript?](#typescript---why-use-typescript)
  - [Design Assets - Canva Folder](#design-assets---canva-folder)
  - [SeeQR - GitHub Repository](#seeqr---github-repository)
  - [ClusterWatch Data Fetch - Example Code](#clusterwatch-data-fetch---example-code)
  - [Kubernetes Icon Assets](#kubernetes-icon-assets)
  - [VIS Physics Docs - Visualizations](#vis-physics-docs---visualizations)
  - [Easing Algorithms Explained](#easing-algorithms-explained)
  - [k6 Load Testing Script](#k6-load-testing-script)
- [Kubernetes Command Instruction Guide](#kubernetes-command-instruction-guide)
  - [Exposing Deployments](#exposing-deployments)
    - [ClusterIP](#clusterip)
    - [NodePort](#nodeport)
    - [LoadBalancer](#loadbalancer)
  - [Scaling Deployments](#scaling-deployments)
  - [Creating Deployments](#creating-deployments)
  - [Autoscaling Deployments](#autoscaling-deployments)
  - [Setting Default Namespace](#setting-default-namespace)
  - [Managing Contexts](#managing-contexts)
  - [Describing Resources](#describing-resources)
  - [Listing Resources](#listing-resources)
  - [Exporting YAML Configuration](#exporting-yaml-configuration)

## Prometheus Setup Steps
### Prerequisites

Before you begin, ensure that you have the following prerequisites in place:

- A Kubernetes cluster is set up and accessible. If you don't have a cluster, you can use tools like Docker Desktop or Minikube to create a local cluster.
- Helm is installed. You can install it using Homebrew on macOS: `brew install helm`.

### GKE Basic Prometheus Test

Follow the steps provided in the [GKE Basic Prometheus Test tutorial](https://cloud.google.com/kubernetes-engine/docs/tutorials/observability-with-prometheus) to set up Prometheus on Google Kubernetes Engine (GKE). This tutorial will give you a basic understanding of Prometheus setup.

### AWS Prometheus

If you are having trouble setup, refer to the [AWS Prometheus documentation](https://docs.aws.amazon.com/eks/latest/userguide/prometheus.html) for guidance on setting up Prometheus.

### Helm Charts Prometheus

For a more comprehensive setup using Helm charts, follow the steps outlined in the [How to Set Up Prometheus on Kubernetes with Helm Charts](https://devapo.io/blog/technology/how-to-set-up-prometheus-on-kubernetes-with-helm-charts/) guide. This guide will walk you through deploying Prometheus and Grafana using Helm charts.

### Custom YAML Configuration

If you prefer a more fine-tuned configuration, you can use the raw YAML configuration for Prometheus. Access the [Raw YAML File](https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/prometheus/values.yaml) to get started. Modify the values as needed and apply the configuration to your cluster.

## Port Forwarding

After setting up Prometheus, you'll likely want to access its user interface for monitoring. To do this, you can use the port forwarding command:

```shell
kubectl --namespace=prometheus port-forward deploy/prometheus-server 9090
```
# Setting Up Google Kubernetes Engine (GKE)

This section outlines the steps required to set up Google Kubernetes Engine (GKE) for the open source project. GKE is a powerful platform that simplifies the management and orchestration of containerized applications.

## Prerequisites

Before setting up GKE for our open source project, ensure you have the following:

- A Google Cloud account. If you don't have one, you can sign up [here](https://cloud.google.com/).
- The Google Cloud SDK installed. Follow the installation instructions [here](https://cloud.google.com/sdk/docs/install).

## GKE Setup

Follow these steps to set up Google Kubernetes Engine (GKE) for our open source project:

1. **Deploying Containerized Application:**

   The following tutorial demonstrates how to deploy a containerized application on GKE. It provides step-by-step guidance on creating a GKE cluster, deploying a sample application, and exposing it to the internet.

   [Deploying a Containerized Application on GKE Tutorial](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app)

2. **Pushing Docker Image to Artifact Registry:**

   After deploying the application, you may need to store Docker container images. This guide explains how to push Docker images to Google Cloud's Artifact Registry, enabling you to manage your application's container images effectively.

   [Pushing Docker Images to Google Artifact Registry](https://cloud.google.com/artifact-registry/docs/docker/store-docker-container-images)

Make sure to complete these steps to ensure a seamless setup of GKE for our project.

# General Kubernetes Setup Guide

Welcome to the Kubernautical open source project! This guide will help you set up and manage a Kubernetes environment for using Kubernautical effectively. Below are essential steps and resources to assist you in various aspects of Kubernetes management.

## Managing Kubernetes Clusters

### Deleting Clusters from Kube Config

If you need to remove clusters and contexts from your `kubectl` configuration, follow the steps provided in this Stack Overflow post:
- [Delete Clusters and Contexts from Kube Config](https://stackoverflow.com/questions/37016546/kubernetes-how-do-i-delete-clusters-and-contexts-from-kubectl-config)

### Exporting Kube Config

To export a `kubeconfig` file from an existing cluster, you can use the instructions outlined in this Stack Overflow post:
- [Export Kubeconfig File from Existing Cluster](https://stackoverflow.com/questions/61829214/how-to-export-kubeconfig-file-from-existing-cluster)

## Exposing Applications as Services

Kubernautical often requires exposing applications as services within your Kubernetes cluster. Learn how to do this with the following documentation:
- [Exposing Applications as Services on Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/how-to/exposing-apps)

## Load Testing with K6

For load testing your applications within the Kubernetes environment, you can use K6. Get started with running K6 by following the steps here:
- [Getting Started with Running K6](https://k6.io/docs/get-started/running-k6/)

## Removing Deployments

When it's necessary to remove deployments from your Kubernetes cluster, refer to the following documentation for guidance:
- [Removing Deployments from Kubernetes](https://www.ibm.com/docs/en/control-desk/7.6.1.x?topic=containers-stop-existing-deployments)

# Helpful Resources

Welcome to the Kubernautical open source project! This README is designed to provide you with an array of helpful links and code snippets to streamline your journey in understanding and contributing to our project.

## TypeScript - Why Use TypeScript?

Learn why TypeScript is a valuable addition to our project development by reading this insightful article: [Why Use TypeScript?](https://tsh.io/blog/why-use-typescript/)

## Design Assets - Canva Folder

Access our design assets and visuals on our [Canva Folder](https://www.canva.com).

## SeeQR - GitHub Repository

Explore the [SeeQR GitHub Repository](https://github.com/open-source-labs/SeeQR) for inspiration and insights on effective open source project management.

## ClusterWatch Data Fetch - Example Code

For data fetching in the ClusterWatch project, refer to the `clusterController.ts` file in the repository: [ClusterWatch clusterController.ts](https://github.com/oslabs-beta/ClusterWatch/blob/main/server/controllers/clusterController.ts).

## Kubernetes Icon Assets

Enhance the visual representation of your project with official Kubernetes icons. Find them in the [Kubernetes Icon Assets](https://github.com/kubernetes/community/tree/master/icons) repository.

[Kubernetes Logo](https://github.com/kubernetes/kubernetes/blob/master/logo/logo.png)

## VIS Physics Docs - Visualizations

For interactive visualizations, consult the [VIS Physics Documentation](https://almende.github.io/vis/docs/network/#methodPhysics).

## Easing Algorithms Explained

Understand easing algorithms and their applications for smooth animations. Explore [Easing Algorithms Explained](https://easings.net/) for detailed explanations.

## k6 Load Testing Script

Utilize the following command to execute a k6 load testing script:

```shell
k6 run --vus 30 --duration 30s scripts/loadtest.js
```

# Kubernetes Command Instruction Guide

This guide provides essential Kubernetes command instructions to effectively manage your deployments, services, and namespaces. These commands can be directly used within your project's README.md file to facilitate collaboration and understanding among your project contributors.

## Exposing Deployments

Expose a deployment to make it accessible within and outside the cluster using different service types.

### ClusterIP

ClusterIP provides an internal IP for accessing pods within the cluster.

```shell
kubectl expose deployment <deployment-name> --port=<port> --target-port=<target-port> --type=ClusterIP
```


### NodePort

NodePort exposes pods on a specific port on each node, allowing external access via that port.
```shell
kubectl expose deployment <deployment-name> --port=<port> --target-port=<target-port> --type=NodePort
```

### LoadBalancer

LoadBalancer creates an external load balancer (if supported) to distribute traffic to the pods, enabling external access.
```shell
kubectl expose deployment <deployment-name> --port=<port> --target-port=<target-port> --type=LoadBalancer
```

Think of an IP address as your house address (unique identifier for a location).
Think of the port as the door number (specific entrance) of your house where someone knocks to enter.
Think of the targetPort as the room (inside your house) where you want your visitors to go after they've entered.

## Scaling Deployments

Scale the number of replicas for a deployment.

```shell
kubectl scale deployment <deployment-name> --replicas=<desired-replica-count>
```


## Creating Deployments

Create a deployment with a specific container image.

```shell
kubectl create deployment <deployment-name> --image=<image-name>
```


## Autoscaling Deployments

Automatically scale a deployment based on CPU utilization.

```shell
kubectl autoscale deployment <deployment-name> --cpu-percent=<target-cpu-percent> --min=<min-replicas> --max=<max-replicas>
```


## Setting Default Namespace

Set the default namespace for commands to avoid repetition.

```shell
kubectl config set-context --current --namespace=<namespace>
```

## Managing Contexts

Get and manage contexts to switch between different clusters and namespaces.
```shell
kubectl config get-contexts # List available contexts
```
```shell
kubectl config use-context <context> # Switch to a specific context
```


## Describing Resources

Describe pods and deployments to get detailed information about their current status.
```shell
kubectl describe pods -n <namespace>
```
```shell
kubectl describe deployment <deployment-name>
```

## Listing Resources

List pods, services, and deployments within a specific namespace.
```shell
kubectl get all -n <namespace>
```
```shell
kubectl get service -n <namespace>
```
```shell
kubectl get deployment -n <namespace>
```

## Exporting YAML Configuration

Retrieve and export resource configurations in YAML format for further documentation or version control.
```shell
kubectl get <resource-type> -n <namespace> <resource-name> -o yaml > <new-file-name>.yaml
```
