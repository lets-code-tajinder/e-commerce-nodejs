import { Request, Response } from "express";
import Cart from "../models/cart";

const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, qty } = req.body;
    if (!userId || !productId || !qty) {
      res.status(400).json({ error: "Required fields are missing" });
      return;
    }

    const cartItem = new Cart({ userId, productId, qty });

    await cartItem.save();
    res.json({ data: "Your data added successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCartData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const data = await Cart.aggregate([
      {
        $match: { userId },
      },
      {
        $addFields: {
          userObjId: { $toObjectId: "$userId" }, // Convert userId to ObjectId
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjId",
          foreignField: "_id",
          as: "lg",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "id",
          as: "p",
        },
      },
      {
        $lookup: {
          from: "carts",
          localField: "userId",
          foreignField: "userId",
          as: "c",
        },
      },
      {
        $unwind: "$lg",
      },
      {
        $unwind: "$c",
      },
      {
        $unwind: "$p",
      },
      {
        $project: {
          _id: 0,
          id: "$c.productId",
          productName: "$p.productName",
          fullName: "$lg.fullName",
          qty: "$c.qty",
        },
      },
    ]);

    if (data.length > 0) {
      res.json({ myData: data });
    } else {
      res.status(404).json({ error: "No Results Found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { addToCart, getCartData };
