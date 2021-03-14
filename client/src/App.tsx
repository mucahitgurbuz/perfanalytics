import { Provider } from "mobx-react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// stores
import appStore from "./store/appStore";
import authStore from "./store/authStore";
import commonStore from "./store/commonStore";

import Routes from "./Routes";

const stores = {
  authStore,
  appStore,
  commonStore,
};

const App: React.FC<{}> = () => (
  <Provider {...stores}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
