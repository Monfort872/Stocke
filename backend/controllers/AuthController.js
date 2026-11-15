import User from "../model/User.js"
import val from "validator"
import { isValidPhoneNumber } from "libphonenumber-js"
import bcrypt from "bcryptjs"
import { generateToken, clearToken } from "../lib/Token.js"

export const login = async (req, res) => {
  try {
    const { email, telephone, password } = req.body;
    if ((!email && !telephone) || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }
    const accountExists = await User.findOne({ $or: [{ email }, { telephone }]}).select("+ password");
    if (!accountExists) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, accountExists.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(accountExists._id, res);
    const userdata = accountExists.toObject();
    delete (userdata.password);
    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
      userdata
    });
  } catch (err) {
    console.log(`Error occurred at login controller: ${err}`)
  }
}

export const register = async (req, res) => {
  try {
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
    const newUser = new User({
      email,
      telephone,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(500).json({ message: "Error occurred while creating user" });
    }
    const userdata = savedUser.toObject();
    delete (userdata.password);
    const token = generateToken(savedUser._id, res);
    return res.status(201).json({
      message: "User created successful",
      userdata,
      token
    })
  } catch (err) {
    console.log(`Error occurred at register controller: ${err}`);
  }
}

export const logout = async (req, res) => {
  try {
    await clearToken(res);
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log(`Error occurred at logout controller: ${err}`);
  }
}

export const update = async (req, res) => {
  try {
    return res.send("developing updating controller later");
  } catch (err) {
    console.log(`Error occurred at update controller: ${err}`);
  }
}

export const check = async (req, res) => {
  try {
    res.status(200).json({
      message: "User is authenticated",
      userdata: req.user
    });
  } catch (err) {
    console.log(`Error occurred at check controller: ${err}`);
  }
}
