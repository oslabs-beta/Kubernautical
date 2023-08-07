import http from 'k6/http';
import { sleep } from 'k6';

export default function () {

    const response = http.get('http://34.70.71.143:8080/');

    if (response.status === 200) {
        console.log('Request successful!');
    } else {
        console.log(`Request failed with status code: ${response.status}`);
    }

    sleep(1);
}