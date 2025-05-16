import Logger from "./utils/logger";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

export const start = async () => {
  try {
    app
      .listen(port, () => {
        Logger.info(
          `Server running on port: ${port} in ${process.env.NODE_ENV} environment`
        );
      })
      .on("error", (e) => Logger.error(e));
  } catch (e: any) {
    Logger.error(e.message);
  }
};

start();
