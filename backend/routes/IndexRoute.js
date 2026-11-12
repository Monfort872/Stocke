import express from "express"
import AuthRoute from "./AuthRoute.js"

const Route = express();

Route.use("/auth", AuthRoute);

export default Route