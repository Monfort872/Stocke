import mongoose from "mongoose"
import { ENV } from "./Env.js"

const { MONGODB } = ENV;

export const connectDB = async () => {
  try {
    if (!MONGODB) {
      throw new Error("Missing Mongodb uri");
    }
    const conn = await mongoose.connect(MONGODB);
    if (conn) {
      console.log("Mongodb connection successfull");
    } else {
      console.log("...waiting connection")
    }
  } catch (error) {
    console.error(`mongodb connection error: ${error}`);
  }
}
