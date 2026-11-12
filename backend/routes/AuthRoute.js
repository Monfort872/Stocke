import { login, register, logout, update, check } from "../controllers/AuthController.js"
import express from "express"

const Route = express.Router()

//public routes 
Route.post("/login", login)
Route.post("/register", register)
Route.post("/logout", logout)

//private routes
Route.get("/check-user", check)
Route.put("/update", update)

export default Route