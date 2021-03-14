import React from "react";
import styled from "styled-components";
import theme from "styled-theming";

export interface BodyProps {
  children: React.ReactNode[];
}
const Body: React.FC<BodyProps> = ({ children }) => {
  const backgroundColor = theme("mode", {
    light: "var(--light-gray)",
    dark: "var(--primary-color)",
  });

  const Wrapper = styled.div`
    background-color: ${backgroundColor};
  `;

  return <Wrapper id="body">{children}</Wrapper>;
};

export default Body;
