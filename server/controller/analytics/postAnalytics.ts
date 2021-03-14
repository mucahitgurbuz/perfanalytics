import { Request, Response } from "express";

import App from "./../../models/app";
import Fcp from "./../../models/fcp";
import DomLoad from "./../../models/domLoad";
import Ttfb from "./../../models/ttfb";
import WindowLoad from "./../../models/windowLoad";
import File from "./../../models/file";

export default async (req: Request, res: Response) => {
  const { body } = req;

  App.findOne({
    where: {
      appCode: body.appCode,
    },
  })
    .then((app) => {
      if (!app) {
        throw new Error("NoAppFoundWithAppCode");
      }
      Fcp.create({
        ofId: app?.id,
        value: body.fcp,
      }).then(() => {
        DomLoad.create({
          ofId: app?.id,
          value: body.domLoad,
        }).then(() => {
          Ttfb.create({
            ofId: app?.id,
            value: body.ttfb,
          }).then(() => {
            WindowLoad.create({
              ofId: app?.id,
              value: body.windowLoad,
            }).then(() => {
              File.bulkCreate(
                body.file.map((document: any) => ({
                  ofId: app?.id,
                  name: document.name,
                  type: document.type,
                  value: document.value,
                }))
              ).then(() => {
                res.status(200).json({ status: true, content: 1 });
              });
            });
          });
        });
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({ status: false, content: e.message });
      return;
    });
};
