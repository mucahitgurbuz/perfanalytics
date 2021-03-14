import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import { MyThemeProvider } from "./ThemeContext";

ReactDOM.render(
  <MyThemeProvider>
    <App />
  </MyThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
