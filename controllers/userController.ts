import { Request, Response } from "express";
import User from "../models/userModal";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send(newUser);
    return;
  } catch (error) {
    res.status(500).send({ error: error.message || "Error creating user" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const data = { id: user._id, username: user.email };
    const token = jwt.sign(data, process.env.JWT_SECRET || "secret_key", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({ msg: "Login successful", data, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: error.message || "Error logging in user" });
  }
};

export { addUser, login };
