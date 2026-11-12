import User from "../model/User.js"
import val from "validator"
import { isValidPhoneNumber } from "libphonenumber-js"
import bcrypt from "bcryptjs"

export const login = async (req, res) => {
  const { email, telephone, password } = req.body;
  if ((!email && !telephone) || !password) {
    return res.status(400).json({ message: "All fields required!" });
  }
  const accountExists = await findOne({ $or: [{ email }, { telephone }]}).select("+ password");
  if (!accountExists) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isPasswordCorrect = await bcrypt.compare(accountExists.password, password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(accountExists._id, res);
  const userdata = Object(accountExists);
  delete (userdata.password);
  return res.status(200).json({
    message: "User logged in successful",
    token: token,
    userdata
  });
}

export const register = async (req, res) => {
  const { email, telephone, password } = req.body;
  if (!email || !telephone || !password) {
    return res.status(400).json({ message: "All fields required" });
  }   
  if (!val.isEmail(email)) {
    return res.status(400).json({ message: "Invalid Email Address" });
  }
  if (!isValidPhoneNumber(telephone)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }
  if (!val.isStrongPassword(password)) {
    return res.status(400).json({ message: "Weak password" });
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({ message: "Email address unavailable" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    email,
    telephone,
    password: hashedPassword
  });
  const token = await generateToken(newUser._id, res);
  return res.status(201).json({
    message: "User created successful",
    userdata: newUser,
    token: token
  })
}

export const logout = async (req, res) => {
    return res.send("Logout")    
}

export const update = async (req, res) => {
    return res.send("Login")    
}

export const check = async (req, res) => {
    return res.send("Checking user")    
}