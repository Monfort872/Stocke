import jwt from "jsonwebtoken"
import { ENV } from "./Env.js"

const { JWT_EXPIRES, JWT_SECRET, NODE_ENV } = ENV;

export const generateToken = (userId, res) => {
    if (!JWT_EXPIRES || !JWT_SECRET || !NODE_ENV) {
        throw new Error("generateToken: Missing env variables")
    }
    const token = jwt.sign(userId, JWT_SECRET, {
        "expiresIn": JWT_EXPIRES,
    });
    return res.cookie("jwt_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 60 * 24 * 7
    })
}

export const clearToken = (res) => {
    return res.clearCookie("jwt_token", {
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV === "production",
        maxAge: 0
    })
}