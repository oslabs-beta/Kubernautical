import * as k8s from '@kubernetes/client-node';
import os from 'os';

// declare kube file path
const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`;

// create new kubeconfig class
const kc = new k8s.KubeConfig();

// load from kube config file
kc.loadFromFile(KUBE_FILE_PATH);

// make api client
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
console.log('PATH');
console.log(KUBE_FILE_PATH);
console.log(kc);

const promURL = 'http://localhost:9090/api/v1/query?query=container_cpu_usage_seconds_total';
const promURL2 = 'http://localhost:9090/api/v1/query?query=container_memory_usage_bytes';
// const promURL2 = 'http://localhost:9090/api/v1/query?query=staticPromQueries';

// const CPU = 'container_cpu_usage_seconds_total';
// const MEM = 'container_memory_usage_bytes';


