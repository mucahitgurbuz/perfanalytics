import { Router } from "express";

import {
  postAnalytics as postAnalyticsController,
  getAnalytics as getAnalyticsController,
} from "../controller/analytics";
import { authenticate } from "../utils/jwt";

import { postAnalytics as postAnalyticsValidator } from "../validator/analytics";

export const analytics = Router();

analytics.route("/").post(postAnalyticsValidator, postAnalyticsController);
analytics.route("/").get(authenticate, getAnalyticsController);
