import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { login } from "./routes/login";
import { apps } from "./routes/apps";
import { analytics } from "./routes/analytics";

export const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Max-Age", "0");
  res.header(
    "Cache-Control",
    "max-age=0,no-cache,no-store,post-check=0,pre-check=0,must-revalidate"
  );
  res.header("Expires", "-1");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

  next();
});

app.use("/login", login);
app.use("/app", apps);
app.use("/analytic", analytics);

type CustomError = Error & {
  isJoi?: boolean;
  details: { message: string; path: string }[];
};

app.use(
  (
    err: CustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err.message === "noToken") {
      res.status(401).json({
        status: false,
        content: "tokenIsRequired",
      });
      next();
      return;
    }
    if (err.message === "invalidToken") {
      res.status(401).json({
        status: false,
        content: "invalidToken",
        details: "Authorization failed due to an invalid/modified token.",
      });
      next();
      return;
    }
    if (err.isJoi) {
      res.status(400).json({
        status: false,
        content: "validationError",
        details: err.details.map((d) => ({
          message: d.message,
          path: d.path,
        })),
      });
      next();
      return;
    }
    next();
  }
);
