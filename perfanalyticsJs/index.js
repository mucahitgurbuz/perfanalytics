window.perfAnalytic = (appCode, apiUrl = "http://localhost:8080") => {
  if (!window.performance) {
    console.log("Performance API is not supported on this browser.");
  }
  window.analytics = {
    appCode: appCode,
    file: [],
    fcp: 0,
    ttfb: 0,
    domLoad: 0,
    windowLoad: 0,
  };

  const msToSeconds = (ms) => ms / 1000;

  const startObserver = () => {
    if (typeof PerformanceObserver === "undefined") {
      console.log("This browser does not support PerformanceObserver");
      return;
    }

    const handleObserverResource = (resource) => {
      if (
        resource.entryType === "paint" &&
        resource.name === "first-contentful-paint"
      ) {
        window.analytics.fcp = msToSeconds(resource.startTime);
      }
      if (
        resource.entryType === "resource" &&
        resource.initiatorType !== "xmlhttprequest" &&
        resource.initiatorType !== "fetch"
      ) {
        window.analytics.file.push({
          name: resource.name.replace(window.location.href, ""),
          type: resource.initiatorType,
          value: msToSeconds(resource.responseEnd),
        });
      }
    };

    const observer = new PerformanceObserver((resourceList) => {
      resourceList.getEntries().forEach((resource) => {
        handleObserverResource(resource);
      });
    });
    observer.observe({ entryTypes: ["paint", "resource"] });
  };

  startObserver();

  window.onload = () => {
    const performance = window.performance;
    const analytics = window.analytics;
    analytics.ttfb = msToSeconds(
      performance.timing.responseStart - performance.timing.navigationStart
    );
    analytics.domLoad = msToSeconds(
      performance.timing.domComplete - performance.timing.navigationStart
    );
    analytics.windowLoad = msToSeconds(
      new Date().getTime() - performance.timing.navigationStart
    );
    analytics.file.push({
      name: "document",
      type: "document",
      value: msToSeconds(
        performance.timing.responseEnd - performance.timing.navigationStart
      ),
    });
  };

  document.addEventListener("visibilitychange", function logData() {
    if (document.visibilityState === "hidden") {
      console.log(window.analytics);
      fetch(`${apiUrl}/analytic`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json; charset=utf-8",
        },
        keepalive: true,
        body: JSON.stringify(window.analytics),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  });
};
