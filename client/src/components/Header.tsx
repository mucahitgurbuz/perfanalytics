import { inject, observer } from "mobx-react";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import theme from "styled-theming";

import { App, AppStore } from "../store/appStore";
import { AuthStore } from "../store/authStore";
import { CommonStore } from "../store/commonStore";

import { ThemeToggleContext } from "./../ThemeContext";

export interface HeaderProfileProps {
  self: App | null;
}

const HeaderProfile = inject("authStore")(
  withRouter(
    observer(
      ({
        authStore,
        history,
        self,
      }: RouteComponentProps &
        HeaderProfileProps & { authStore?: AuthStore }) => {
        const color = theme("mode", {
          light: "rgba(0, 0, 0, 0.65)",
          dark: "rgba(0, 0, 0, 0.65)",
        });

        const Wrapper = styled.div`
          color: ${color};
        `;

        const onLogout = () => {
          authStore?.logout();
        };

        if (!self) {
          return (
            <div className="header__profile">
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          );
        }

        return (
          <Wrapper className="header__profile">
            <div className="header__profile-badge flex--aligned flex--centered">
              <span>{self.appName}</span>
            </div>
            <div>
              <button onClick={onLogout}>Logout</button>
            </div>
          </Wrapper>
        );
      }
    )
  )
);

const Header = inject(
  "commonStore",
  "appStore"
)(
  observer(
    ({
      commonStore,
      appStore,
      children,
    }: {
      commonStore?: CommonStore;
      appStore?: AppStore;
      children?: React.ReactNode[];
    }) => {
      if (!appStore || !commonStore) {
        return null;
      }

      return (
        <div id="header" className="flex-row flex--aligned">
          <Link to="/">
            <div className="app-header flex-row flex--aligned">
              <span className="app-header__title">PerfAnalytics Dashboard</span>
            </div>
          </Link>
          <div className="flex-spacer" />
          {children}
          <ThemeToggleContext.Consumer>
            {({ themeState, toggleTheme }) => (
              <>
                <span className="app-header__theme-text">
                  Enter the dark mode
                </span>
                <label onClick={toggleTheme} className="switch">
                  <input checked={themeState.mode === "dark"} type="checkbox" />
                  <span className="slider round" />
                </label>
              </>
            )}
          </ThemeToggleContext.Consumer>

          <HeaderProfile self={appStore.self} />
        </div>
      );
    }
  )
);

export default Header;
