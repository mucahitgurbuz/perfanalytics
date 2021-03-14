import App from "./../models/app";

const dummyApps = require("./dummyApps.js");

module.exports = function(db, callback) {
  Promise.all(dummyApps.map((dummyApp) => App.create(dummyApp))).then(() => {
    callback();
  });
};
