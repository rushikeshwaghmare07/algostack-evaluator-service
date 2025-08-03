import express from "express";

import logger from "./config/logger.config";
import serverConfig from "./config/server.config";
import apiRouter from "./routes";

const app = express();

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on PORT: ${serverConfig.PORT}`);
});
