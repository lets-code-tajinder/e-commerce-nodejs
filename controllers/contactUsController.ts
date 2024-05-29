import { Request, Response } from "express";
import ContactUs from "../models/contactUs";

export const addContactUsData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email, message } = req.body;
    if (!fullName || !email || !message) {
      res.status(400).json({ error: "Required fields are missing" });
      return;
    }

    const contactUsItem = new ContactUs({ fullName, email, message });
    await contactUsItem.save();
    res.json({ data: "Your data added successfully" });
  } catch (error) {
    console.error("Error adding contact data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
