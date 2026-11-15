import jwt from "jsonwebtoken"
import { ENV } from "../lib/Env.js"
import User from "../model/User.js"

const { JWT_SECRET } = ENV;

export const protectRoute = async (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("Environment variables not set for JWT");
    }
    const token = req.cookies?.jwt_token;
    if (!token) {
      return res.status(401).json({ message: "Invalid - Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid - Unauthorized" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid - Unauthorized" });
    }
    req.user = user
    next()
  } catch (error) {
    console.log(`Error occurred at protectRoute middleware: ${error}`);
    //handling invalid or expired jwt errors specially
    if (error.name == "JsonWebTokenError" || error.name == "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
