import { Request, Response, NextFunction } from "express";
import App from "./../models/app";

const jwt = require("jsonwebtoken");

const topSecret = "noOneNeedsToKnow";

export const createToken = (payload: object) => jwt.sign(payload, topSecret);
export const authenticate = async (
  req: Request & { app: App },
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new Error("noToken");
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const payload = await jwt.verify(token, topSecret);
    if (!payload.appCode) {
      throw new Error("invalidToken");
    }

    const app = await App.findOne({ where: { appCode: payload.appCode } });

    if (!app) {
      res.status(404).json({
        status: false,
        content: "noSuchApp",
      });
      return;
    }

    req.app = app as any;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError" || e.name === "JsonWebTokenError") {
      next(new Error("invalidToken"));
      return;
    }
    next(e);
  }
};
