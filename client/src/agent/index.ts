import superagent from "superagent";
import authStore from "../store/authStore";
import commonStore from "../store/commonStore";

import appHandler from "./app";
import authHandler from "./auth";

import config from "../client-config";
import { Body } from "../types";

const API_ROOT = `http://${config.api.url}:${config.api.port}`;

const handleErrors = (err: { response: superagent.Response }) => {
  if (err.response.status === 401) {
    authStore.logout();
  }
};

const getBody = (res: superagent.Response): Body => res.body;

const insertToken = (req: superagent.SuperAgentRequest) => {
  if (commonStore.token) {
    req.set("Authorization", `Bearer ${commonStore.token}`);
  }
};

export type ApiRequest = (url: string, data?: any) => Promise<Body>;
export interface ApiRequestBundle {
  get: ApiRequest;
  delete: ApiRequest;
  post: ApiRequest;
  put: ApiRequest;
}

const requests: ApiRequestBundle = {
  get: (url: string) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(insertToken)
      .on("error", handleErrors)
      .then(getBody),
  delete: (url: string) =>
    superagent
      .delete(`${API_ROOT}${url}`)
      .use(insertToken)
      .on("error", handleErrors)
      .then(getBody),
  post: (url: string, data: any) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .use(insertToken)
      .send(data)
      .set("Accept", "application/json")
      .on("error", handleErrors)
      .then(getBody),
  put: (url: string, data: any) =>
    superagent
      .put(`${API_ROOT}${url}`)
      .use(insertToken)
      .send(data)
      .set("Accept", "application/json")
      .on("error", handleErrors)
      .then(getBody),
};

const Auth = authHandler(requests);
const App = appHandler(requests);

export default {
  Auth,
  App,
};
