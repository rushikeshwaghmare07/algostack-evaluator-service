import express from "express";

import logger from "./config/logger.config";
import serverConfig from "./config/server.config";

const app = express();

app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on PORT: ${serverConfig.PORT}`);
});
