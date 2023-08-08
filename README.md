# README

# Implemented Technologies:

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

# Kubernautical

**Introducing Kubernautical: Empowering Comprehensive Kubernetes Cluster Health Visualization**

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

# Kubernautical - Prometheus Setup Guide

Welcome to the Kubernautical open source project's guide on setting up Prometheus for monitoring Kubernetes clusters. Prometheus is a powerful monitoring and alerting tool that helps you gain insights into your cluster's performance metrics. This guide will walk you through the process of setting up Prometheus using various resources and links.

## Table of Contents

- [README](#readme)
- [Implemented Technologies:](#implemented-technologies)
- [Kubernautical](#kubernautical)
- [Kubernautical - Prometheus Setup Guide](#kubernautical---prometheus-setup-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup Steps](#setup-steps)
    - [GKE Basic Prometheus Test](#gke-basic-prometheus-test)
    - [AWS Prometheus](#aws-prometheus)
    - [Helm Charts Prometheus](#helm-charts-prometheus)
    - [Custom YAML Configuration](#custom-yaml-configuration)
  - [Port Forwarding](#port-forwarding)

## Prerequisites

Before you begin, ensure that you have the following prerequisites in place:

- A Kubernetes cluster is set up and accessible. If you don't have a cluster, you can use tools like Docker Desktop or Minikube to create a local cluster.
- Helm is installed. You can install it using Homebrew on macOS: `brew install helm`.

## Setup Steps

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
