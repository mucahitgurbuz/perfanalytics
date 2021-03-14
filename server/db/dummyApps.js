const sha256 = require("crypto-js/sha256");

module.exports = [
  {
    id: 1,
    appName: "Demo App",
    appCode: "demo",
    password: sha256("demo").toString(),
  },
  {
    id: 2,
    appName: "Demo App 2",
    appCode: "demo2",
    password: sha256("demo").toString(),
  },
];
