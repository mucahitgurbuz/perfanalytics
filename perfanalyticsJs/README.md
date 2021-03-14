# Perfanalytics.js

Plug-and-play performance measuring client app.

## Usage

First register your app on the Perfanalytic Dashboard (https://perfanalytic-monitor.herokuapp.com/) and get an appCode. Use CDN service or import perfanalytic.js file to your local and *import* it in the `<head>`.

```html
<script src="https://cdn.jsdelivr.net/npm/@mucahitgurbuz/perfanalytics.js@1.0.3/dist/index.js"></script>
<script>
  perfAnalytic("demo", "http://perfanalytic-api.herokuapp.com");
</script>
```

Thats all!
