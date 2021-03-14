import { inject, observer } from "mobx-react";
import React from "react";
import { RouteComponentProps } from "react-router";
import EventCharts from "src/components/EventCharts";
import NetworkTimings from "src/components/NetworkTimings";
import Notification from "src/components/Notification";
import { AppStore } from "src/store/appStore";

const Home = inject("appStore")(
  observer(
    ({ history, appStore }: RouteComponentProps & { appStore?: AppStore }) => {
      if (!appStore?.self) {
        history.push("/login");
      }
      return (
        <div className="home__container">
          <Notification />
          <EventCharts />
          <NetworkTimings />
        </div>
      );
    }
  )
);

export default Home;
