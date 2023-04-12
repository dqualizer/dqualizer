import http from 'k6/http';
import {URLSearchParams} from 'https://jslib.k6.io/url/1.0.0/index.js';
import {check, sleep} from 'k6';
import {Counter} from 'k6/metrics';

export const epDataSent = new Counter('data_sent_endpoint');
export const epDataRecv = new Counter('data_received_endpoint');

function sizeOfHeaders(headers) {
    return Object.keys(headers).reduce((sum, key) => sum + key.length + headers[key].length, 0);
}

function trackDataMetricsPerURL(res) {
    epDataSent.add(sizeOfHeaders(res.request.headers) + res.request.body.length, { url: res.url });
    epDataRecv.add(sizeOfHeaders(res.headers) + res.body.length, { url: res.url });
}


let baseURL = 'http://ddd-autohaus:9000';

export let options = {"scenarios":{"scenario":{"executor":"ramping-vus","executor":"ramping-vus","startVUs":0,"stages":[{"duration":"5s","target":10},{"duration":"5s","target":40},{"duration":"5s","target":90},{"duration":"5s","target":0}]}}};


const params = {
  "headers": {
    "content-type": "application/json"
  }
}
const payloadData = {
  "payloads": [
    {
      "typ": "KUNDE_PRIVAT",
      "id": 10,
      "name": "Donnie"
    },
    {
      "typ": "KUNDE_PRIVAT",
      "id": 11,
      "name": "Heiko"
    }
  ]
}
const payloads = payloadData['payloads'];


export default function() {

let payload = payloads[Math.floor(Math.random() * payloads.length)];

let response = http.post(baseURL + `/auftrag/new`, JSON.stringify(payload), params);
trackDataMetricsPerURL(response);
check(response, {
	'Duration < 1200': x => x.timings && x.timings.duration < 1200,
	'POST status was expected': x => x.status && (x.status == 201 || false),
});
sleep(2);
}