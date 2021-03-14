Repository for Perfanalytic app which includes PerfanalyticsJs, PerfanalyticsAPI and Perfanalytics Dashboard.  

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
  
Demo purposed login  
username: demo  
password: demo  

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
