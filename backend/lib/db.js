import mongoose from "mongoose"
import { ENV } from "./Env.js"

const { MONGODB } = ENV;

export const connectDB = async () => {
  try {
    if (!MONGODB) {
      throw new Error("Missing Mongodb uri");
    }
    await mongoose.connect(MONGODB);
    console.log(`MongoDB Connection Established Successfully...: ${MONGODB}`)
  } catch (error) {
    console.error(`mongodb connection error: ${error}`);
  }
}
