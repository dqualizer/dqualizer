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

export let options = {"scenarios":{"scenario":{"executor":"constant-vus","executor":"constant-vus","vus":20,"duration":6000}}};


const params = {
  "headers": {
    "content-type": "application/json"
  }
}
const payloadData = {
  "payloads": [
    {
      "status": "GESCHLOSSEN"
    },
    {
      "status": "STORNIERT"
    }
  ]
}
const payloads = payloadData['payloads'];


const path_variables = {
  "auftragsnummer": [
    1,
    3
  ]
}
const auftragsnummer_array = path_variables['auftragsnummer'];
export default function() {

let auftragsnummer = auftragsnummer_array[Math.floor(Math.random() * auftragsnummer_array.length)];

let payload = payloads[Math.floor(Math.random() * payloads.length)];

let response = http.put(baseURL + `/auftrag/${auftragsnummer}`, JSON.stringify(payload), params);
trackDataMetricsPerURL(response);
check(response, {
	'Duration < 2400': x => x.timings && x.timings.duration < 2400,
	'PUT status was expected': x => x.status && (x.status == 200 || false),
});
sleep(3);
}