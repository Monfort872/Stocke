import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import IndexRoute from "./routes/IndexRoute.js"
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/Env.js";

const app = express();
const { PORT } = ENV;

app.use("/api", IndexRoute)

connectDB

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
