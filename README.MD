# Perfanalytics
Repository for Perfanalytic app which includes PerfanalyticsJs, PerfanalyticsAPI and Perfanalytics Dashboard.

## Usage
Go to perfanalytic dashboard (http://perfanalytic-monitor.herokuapp.com/) and register your app. Add to provided scripts to your app header and start measuring your app performance.
You can use demo login to see perfanalytic dashboard metrics.

Demo purposed login  
username: demo  
password: demo  


"client" folder handles frontend (Perfanalytics Dashboard), "server" folder handles backend (PerfanalyticsAPI) and "perfanalyticsJs" folder handles plug-and-play client library (PerfanalyticsJs).

Use Node version 9.0.0 for a smooth experience.

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
