import http from 'k6/http';
import { sleep } from 'k6';



//? child process

//?can we dynamically pull the endpoint from yaml

//?how to alter options
//~through cli concatenation or through options object manipulation


export default function () {
    //pull ip dynamically
    //? IN TERMINAL : export CLUSTER_ENDPOINT= 'your endpoint here'
    const response = http.get(`${__ENV.CLUSTER_ENDPOINT}`);

    if (response.status === 200) {
        console.log('Request successful!');
    } else {
        console.log(`Request failed with status code: ${response.status}`);
    }
    sleep(1);
}
