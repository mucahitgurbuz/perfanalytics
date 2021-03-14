import React from "react";

export interface BodyProps {
  children: React.ReactNode[];
}
const Body: React.FC<BodyProps> = ({ children }) => {
  return <div id="body">{children}</div>;
};

export default Body;
