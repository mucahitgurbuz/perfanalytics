import isSuperAdmin from "./../../utils/isSuperAdmin";
import { Request, Response } from "express";
import App from "./../../models/app";

export default async (req: Request & { app: App }, res: Response) => {
  try {
    const appIsPriviliged: boolean = await isSuperAdmin(req.app.appCode);
    if (!appIsPriviliged) {
      throw new Error("permissionDenied");
    }

    const apps: App[] = await App.findAll();

    res.status(200).json({ status: true, content: apps } || []);
  } catch (e) {
    if (e.message === "permissionDenied") {
      res.status(403).send({
        status: false,
        content: "permissionDenied",
      });

      return;
    }

    res.status(500).send({ status: false, content: e.message });
  }
};
