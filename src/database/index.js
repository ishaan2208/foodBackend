import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Connected to ${connection.connection.name} database`);
    console.log(connection.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
