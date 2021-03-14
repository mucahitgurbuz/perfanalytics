import { inject, observer } from "mobx-react";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import { App, AppStore } from "../store/appStore";
import { AuthStore } from "../store/authStore";
import { CommonStore } from "../store/commonStore";

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
          <div className="header__profile">
            <div className="header__profile-badge flex--aligned flex--centered">
              <span>{self.appName}</span>
            </div>
            <div>
              <button onClick={onLogout}>Logout</button>
            </div>
          </div>
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
          <HeaderProfile self={appStore.self} />
        </div>
      );
    }
  )
);

export default Header;
