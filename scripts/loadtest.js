import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    //pull ip dynamically
    //? IN TERMINAL : export CLUSTER_ENDPOINT= 'your endpoint here'
    const response = http.get(`${__ENV.INGRESS_EP}`);
    if (response.status === 200) {
        console.log('Request successful!');
    } else {
        console.log(`Request failed with status code: ${response.status}`);
    }
    sleep(1);
}
