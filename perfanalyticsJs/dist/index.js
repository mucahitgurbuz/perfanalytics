parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
window.perfAnalytic=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"http://localhost:8080";window.performance||console.log("Performance API is not supported on this browser."),window.analytics={appCode:n,file:[],fcp:0,ttfb:0,domLoad:0,windowLoad:0};var t=function(n){return n/1e3};"undefined"!=typeof PerformanceObserver?new PerformanceObserver(function(n){n.getEntries().forEach(function(n){!function(n){"paint"===n.entryType&&"first-contentful-paint"===n.name&&(window.analytics.fcp=t(n.startTime)),"resource"===n.entryType&&"xmlhttprequest"!==n.initiatorType&&"fetch"!==n.initiatorType&&window.analytics.file.push({name:n.name.replace(window.location.href,""),type:n.initiatorType,value:t(n.responseEnd)})}(n)})}).observe({entryTypes:["paint","resource"]}):console.log("This browser does not support PerformanceObserver"),window.onload=function(){var n=window.performance,e=window.analytics;e.ttfb=t(n.timing.responseStart-n.timing.navigationStart),e.domLoad=t(n.timing.domComplete-n.timing.navigationStart),e.windowLoad=t((new Date).getTime()-n.timing.navigationStart),e.file.push({name:"document",type:"document",value:t(n.timing.responseEnd-n.timing.navigationStart)})},document.addEventListener("visibilitychange",function(){"hidden"===document.visibilityState&&(console.log(window.analytics),fetch("".concat(e,"/analytic"),{method:"POST",headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json; charset=utf-8"},keepalive:!0,body:JSON.stringify(window.analytics)}).then(function(n){return n.json()}).then(function(n){return console.log(n)}))})};
},{}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map