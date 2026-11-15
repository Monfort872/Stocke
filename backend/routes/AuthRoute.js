import { login, register, logout, update, check } from "../controllers/AuthController.js"
import { protectRoute } from "../middleware/AuthMiddleware.js"
import express from "express"

const Route = express.Router();

//public routes 
Route.post("/login", login);
Route.post("/register", register);
Route.post("/logout", logout);

//private routes
Route.get("/check-user", protectRoute, check);
Route.put("/update", protectRoute, update);

export default Route