import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { backgroundColor, textColor } from "./theme";

export const ThemeToggleContext = React.createContext({
  themeState: { mode: "light" },
  toggleTheme: () => {
    MyThemeProvider.toggle();
  }
});

export const MyThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = React.useState({
    mode: "light"
  });

  const Wrapper = styled.div`
    background-color: ${backgroundColor};
    color: ${textColor};
  `;

  const toggle = () => {
    const mode = themeState.mode === "light" ? `dark` : `light`;
    setThemeState({ mode: mode });
  };

  return (
    <ThemeToggleContext.Provider value={{ themeState, toggleTheme: toggle }}>
      <ThemeProvider
        theme={{
          mode: themeState.mode
        }}
      >
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
