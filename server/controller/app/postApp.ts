import { Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";

import App from "./../../models/app";

export default async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const app = await App.findOne({
      where: {
        [Sequelize.Op.or]: [
          {
            appCode: body.appCode,
          },
        ],
      },
    });

    if (app) {
      res.status(400).send({
        status: false,
        content: `appAlreadyExists`,
      });
      return;
    }

    await App.create({
      ...body,
    });

    res.status(200).json({ status: true, content: 1 });
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: false, content: e.message });
    return;
  }
};
