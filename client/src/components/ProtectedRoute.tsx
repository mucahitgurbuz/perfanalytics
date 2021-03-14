import { inject, observer } from "mobx-react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AppStore } from "../store/appStore";

export default inject("appStore")(
  observer(({ appStore, ...rest }: { appStore: AppStore }) => {
    if (appStore.self) {
      return <Route {...rest} />;
    }
    return <Redirect to="/login" />;
  })
);
