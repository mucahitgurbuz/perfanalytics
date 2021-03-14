import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { createToken } from "./../utils/jwt";
import App from "./../models/app";

export default async (req: Request, res: Response) => {
  try {
    const app = await App.findOne({
      where: { appCode: req.query.appCode },
      attributes: {
        include: ["password"],
      },
    });

    if (app === null) {
      throw new Error("noSuchApp");
    }

    const status = await bcrypt.compare(
      req.query.password,
      app.get("password")
    );
    if (!status) {
      throw new Error("wrongPassword");
    }

    res.status(200).json({
      status: true,
      content: createToken({
        appCode: req.query.appCode,
      }),
    });
  } catch (e) {
    if (e.message === "wrongPassword") {
      res.status(400).json({
        status: false,
        content: "wrongPassword",
      });
      return;
    }

    if (e.message === "noSuchApp") {
      res.status(400).json({
        status: false,
        content: "noSuchApp",
      });
      return;
    }

    console.error(e);
    res.status(500).json({
      status: false,
      content: "somethingWentWrong",
      details: e.message,
    });
  }
};
