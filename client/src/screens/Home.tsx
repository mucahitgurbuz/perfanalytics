import React from "react";
import EventCharts from "src/components/EventCharts";
import NetworkTimings from "src/components/NetworkTimings";

const Home: React.FC = () => (
  <div className="home__container">
    <EventCharts />
    <NetworkTimings />
  </div>
);

export default Home;
