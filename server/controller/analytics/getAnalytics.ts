import { Request, Response } from "express";
import App from "./../../models/app";
import DomLoad from "../../models/domLoad";
import Fcp from "../../models/fcp";
import { Op } from "sequelize";
import File from "../../models/file";
import Ttfb from "../../models/ttfb";
import WindowLoad from "../../models/windowLoad";

export default async (req: Request & { app: App }, res: Response) => {
  const response: any = {};

  DomLoad.findAll({
    where: {
      ofId: req.app.dataValues.id,
      createdAt: {
        [Op.between]: [req.query.start, req.query.end],
      },
    },
  }).then((domLoads) => {
    response.domLoads = domLoads;

    Fcp.findAll({
      where: {
        ofId: req.app.dataValues.id,
        createdAt: {
          [Op.between]: [req.query.start, req.query.end],
        },
      },
    }).then((fcps) => {
      response.fcps = fcps;

      File.findAll({
        where: {
          ofId: req.app.dataValues.id,
          createdAt: {
            [Op.between]: [req.query.start, req.query.end],
          },
        },
      }).then((files) => {
        response.files = files;

        Ttfb.findAll({
          where: {
            ofId: req.app.dataValues.id,
            createdAt: {
              [Op.between]: [req.query.start, req.query.end],
            },
          },
        }).then((ttfbs) => {
          response.ttfbs = ttfbs;

          WindowLoad.findAll({
            where: {
              ofId: req.app.dataValues.id,
              createdAt: {
                [Op.between]: [req.query.start, req.query.end],
              },
            },
          }).then((windowLoads) => {
            response.windowLoads = windowLoads;

            res.status(200).json({
              status: true,
              content: response,
            });
          });
        });
      });
    });
  });
};
