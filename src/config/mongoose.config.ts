import { set, connect } from "mongoose"
import logger from "../utils/logger";

const connectToDB = async () => {
  try {
    set("strictQuery", false);
    const db = await connect(process.env.DATABASE_URL!);
    logger.info(`MongoDB connected to ${db.connection.name}`);
  } catch (error) {
    logger.error(error);
  }
}

export default connectToDB;
