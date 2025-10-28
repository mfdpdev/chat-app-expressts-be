import connectToDB from "./config/mongoose.config";
import { server } from "./socket/socket";
import logger from "./utils/logger";

const port: number = parseInt(process.env.APP_PORT!) ?? 8000;
const hostname: string = process.env.HOSTNAME ?? "localhost";

connectToDB();
server.listen(port, hostname, () => {
  logger.info(`Listening on port: ${port}`);
});
