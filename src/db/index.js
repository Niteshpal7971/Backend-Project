import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectMongoDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDB connected !! DB HOST ${connectionInstance.connection.host}`) // do console log assignment
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED", error);
    process.exit(1)
  }
};

export default connectMongoDB
