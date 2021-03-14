import { createServer } from "https";
import { app } from "./app";
import path from "path";
import fs from "fs";
import { sequelize } from "./db";

if (!fs.existsSync(path.join(__dirname, "server-config.json"))) {
  console.error(
    "Configuration files are missing. Please run `yarn configure` first."
  );
  process.exit();
}

import config from "./server-config.json";

const production = process.env.NODE_ENV === "production";
(async () => {
  await sequelize.sync({ force: !production });
  if (!production) {
    require(path.resolve(__dirname, "db", "fillDummyContent"))(
      sequelize,
      () => {
        createServer(app).listen(process.env.PORT || config.api.port, () =>
          console.info(
            `listening on port ${process.env.PORT || config.api.port}`
          )
        );
      }
    );
  } else {
    createServer(app).listen(process.env.PORT || config.api.port, () =>
      console.info(`listening on port ${process.env.PORT || config.api.port}`)
    );
  }
})();
