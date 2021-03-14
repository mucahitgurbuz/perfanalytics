import React from "react";
import EventCharts from "src/components/EventCharts";
import NetworkTimings from "src/components/NetworkTimings";
import Notification from "src/components/Notification";

const Home: React.FC = () => (
  <div className="home__container">
    <Notification />
    <EventCharts />
    <NetworkTimings />
  </div>
);

export default Home;
