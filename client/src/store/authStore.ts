import { action, observable } from "mobx";

import agent from "../agent";
import { Body, CustomError } from "../types";
import appStore from "./appStore";
import commonStore from "./commonStore";

export class AuthStore {
  @observable public inProgress: boolean = false;
  @observable public error: CustomError | null = null;

  @action
  public login(appCode: string, password: string): Promise<any> {
    this.inProgress = true;
    this.error = null;

    return agent.Auth.login(appCode, password)
      .then((body: Body) => commonStore.setToken(body.content))
      .then(() => appStore.updateSelf())
      .catch(
        action((err: { response: { body: Body } }) => {
          const responseBody: Body = err.response.body;
          this.error = {
            type: responseBody.content,
            details: responseBody.details,
          };
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action
  public register({
    appName,
    appCode,
    password,
  }: {
    appName: string;
    appCode: string;
    password: string;
  }) {
    this.inProgress = true;
    this.error = null;
    return agent.Auth.register(appName, appCode, password)
      .catch(
        action((err: { response: { body: Body } }) => {
          const responseBody = err.response.body;
          this.error = {
            type: responseBody.content,
            details: responseBody.details,
          };
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action
  public reset() {
    this.inProgress = false;
    this.error = null;
  }

  @action
  public logout() {
    this.error = null;
    this.inProgress = false;
    commonStore.setToken(null);
    appStore.forgetApp();
  }
}

export default new AuthStore();
