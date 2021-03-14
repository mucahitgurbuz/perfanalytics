import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// pages
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import RegisterScreen from "./screens/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

const withLayout = (Child) => {
  const WrappedComponent = (props) => (
    <Layout>
      <Child {...props} />
    </Layout>
  );

  return WrappedComponent;
};

@inject("appStore", "commonStore")
@withRouter
@observer
class Routes extends Component {
  static propTypes = {
    commonStore: PropTypes.object.isRequired,
    appStore: PropTypes.object.isRequired,
  };
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.appStore
        .updateSelf()
        .catch(() => this.props.commonStore.setToken(undefined))
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }
  render() {
    console.log(this.props.commonStore);
    if (this.props.commonStore.isAppLoaded) {
      // token is present but app is not loaded yet
      return (
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route exact path="/" component={withLayout(HomeScreen)} />
        </Switch>
      );
    }
    return <span> Loading ... </span>;
  }
}

export default Routes;
