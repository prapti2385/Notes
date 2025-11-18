import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Account created Successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in adding user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesnt exists" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    const token = jwt.sign(
      { id: user._id },
      "secretkeyofnoteapp123##$$$$$^^^&&",
      { expiresIn: "5h" }
    );

    if (!checkpassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Error in login" });
  }
});

export default router;
