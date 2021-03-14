import { Router } from "express";
import { authenticate } from "../utils/jwt";

import {
  getApps as getAppsController,
  getSelf as getSelfController,
  postApp as postAppController,
} from "../controller/app";

import { postApp as postAppValidator } from "../validator/app";

export const apps = Router();

apps.route("/").get(authenticate, getAppsController);
apps.route("/").post(postAppValidator, postAppController);
apps.route("/self").get(authenticate, getSelfController);
