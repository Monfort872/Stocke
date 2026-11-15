import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import IndexRoute from "./routes/IndexRoute.js"
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/Env.js";

const app = express();
const { PORT } = ENV;

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api", IndexRoute)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
  connectDB();
})
