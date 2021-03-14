import { action, observable } from "mobx";
import agent from "../agent";
import {
  Body,
  CustomError,
  DomLoad,
  Fcp,
  File,
  Ttfb,
  WindowLoad,
} from "../types";
import commonStore from "./commonStore";

export interface App {
  appCode: string;
  id: number;
  appName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  domLoads: DomLoad[];
  fcps: Fcp[];
  files: File[];
  ttfbs: Ttfb[];
  windowLoads: WindowLoad[];
}

export class AppStore {
  @observable
  public profileError: CustomError | null = null;
  @observable
  public self: App | null;
  @observable
  public analytics: Analytics | null;
  @observable
  public loadingSelf: boolean;
  @observable
  public loadingAnalytics: boolean;
  @observable
  public loadingApp: boolean;
  @observable
  public loadingAppList: boolean;
  @observable
  public appList = [];
  @observable
  public currentApp: object;

  constructor() {
    if (commonStore.token) {
      this.updateSelf().catch((err: any) => {
        console.error(err);
        console.log("AN INVALID TOKEN HAS BEEN SENT, TAKING EVASIVE ACTIONS.");
        // TODO show modal saying the token is wrong.
      });
    }
  }

  @action
  public updateSelf() {
    this.loadingSelf = true;
    return agent.Auth.current()
      .then(
        action((appResponse: Body) => {
          this.self = appResponse.status && appResponse.content;
        })
      )
      .finally(
        action(() => {
          this.loadingSelf = false;
        })
      );
  }

  @action
  public getAnalytics(appCode: string, start: string, end: string) {
    this.loadingAnalytics = true;
    return agent.App.analytics(appCode, start, end)
      .then(
        action((appResponse: Body) => {
          this.analytics = appResponse.status && appResponse.content;
        })
      )
      .finally(
        action(() => {
          this.loadingAnalytics = false;
        })
      );
  }

  @action
  public getApp(appCode: string) {
    this.loadingApp = true;
    return agent.App.single(appCode)
      .then(
        action((response: Body) => {
          this.currentApp = response.status && response.content;
        })
      )
      .finally(
        action(() => {
          this.loadingApp = false;
        })
      );
  }

  @action
  public forgetApp() {
    this.self = null;
  }
}

export default new AppStore();
