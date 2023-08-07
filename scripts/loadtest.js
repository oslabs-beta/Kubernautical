import http from 'k6/http';
import { sleep } from 'k6';

// export let options = {
//     vus: 30,
//     duration: '10s',
// }
//? child process

//?can we dynamically pull the endpoint from yaml

//?how to alter options
//~through cli concatenation or through options object manipulation


export default function () {
    //pull ip dynamically
    //? IN TERMINAL : export CLUSTER_ENDPOINT= 'your endpoint here'
    const response = http.get(`${__ENV.INGRESS_EP}`);
    // const response = http.get(`http://34.70.71.143:8080/`);
    if (response.status === 200) {
        console.log('Request successful!');
    } else {
        console.log(`Request failed with status code: ${response.status}`);
    }
    sleep(1);
}
