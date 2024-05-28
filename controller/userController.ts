import { Request, Response } from "express";
import User from "../modal/userModal";

const addUser = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;

  try {
    const newUser = await User.create({ fullName, email, password });
    res.status(200).json({ message: "User added successfully", data: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "Login successful", data: user });
    } else {
      return res.status(404).json({ error: "No user found with this email" });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { addUser, login };
