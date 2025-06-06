import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already registered" });
    }
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.password) {
      console.error("User has no password in DB:", user.email);
      return res
        .status(500)
        .json({ message: "Internal server error: User password not set." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Password Salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      status: true,
      message: "Login Success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        access_token: token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
