# Perfanalytics
Repository for Perfanalytic app which includes PerfanalyticsJs, PerfanalyticsAPI and Perfanalytics Dashboard.

## Usage
Go to perfanalytic dashboard (http://perfanalytic-monitor.herokuapp.com/) and register your app. Add to provided scripts to your app header and start measuring your app performance.
You can use demo login to see perfanalytic dashboard metrics.

**Demo purposed login**  
username: demo  
password: demo  


"client" folder handles frontend (Perfanalytics Dashboard), "server" folder handles backend (PerfanalyticsAPI) and "perfanalyticsJs" folder handles plug-and-play client library (PerfanalyticsJs).

Use Node version **9.0.0** for a smooth experience.

First run yarn in root/ folder.  
Then run yarn in client/ folder.

In the root folder run

```bash
node configure
```

To start backend and frontend, in the root folder run

```bash
yarn dev
```

### PerfanalyticsJs
NPM Link: https://www.npmjs.com/package/@mucahitgurbuz/perfanalytics.js
CDN Link: https://cdn.jsdelivr.net/npm/@mucahitgurbuz/perfanalytics.js@1.0.3/dist/index.js



## Load Test Results
During the load test max RPS (request per second) value obtained was *126*.
```
[Mon Mar 15 2021 23:03:18 GMT+0300 (+03)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Mon Mar 15 2021 23:03:23 GMT+0300 (+03)] INFO Requests: 488, requests per second: 98, mean latency: 304.5 ms
[Mon Mar 15 2021 23:03:28 GMT+0300 (+03)] INFO Requests: 1118, requests per second: 126, mean latency: 173.1 ms
[Mon Mar 15 2021 23:03:33 GMT+0300 (+03)] INFO Requests: 1705, requests per second: 117, mean latency: 146 ms
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO 
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Target URL:          http://localhost:8080/analytic
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Max time (s):        20
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Concurrency level:   10
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Agent:               none
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Requests per second: 120
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO 
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Completed requests:  2099
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Total errors:        0
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Total time:          20.00076435 s
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Requests per second: 105
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Mean latency:        284.7 ms
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO 
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO Percentage of the requests served within a certain time
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO   50%      178 ms
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO   90%      410 ms
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO   95%      1088 ms
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO   99%      1747 ms
[Mon Mar 15 2021 23:03:38 GMT+0300 (+03)] INFO  100%      1919 ms (longest request)
```

## Build up with Docker
Perfanalytic app is fully dockerized.
To start containers for backend and frontend copy mysql configuration from docker-compose.yml and apply to server/server-config.json. Then, run in the root:
```
docker-compose up -d  
```

vscode settins for eslint to work properly(install eslint extension first)

```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true,
  "editor.colorDecorators": true
}
```