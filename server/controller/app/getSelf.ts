import { Request, Response } from "express";
import App from "./../../models/app";

export default async (req: Request & { app: App }, res: Response) => {
  res.status(200).json({
    status: true,
    content: req.app,
  });
};
