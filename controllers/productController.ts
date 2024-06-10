import { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/Category";

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductData = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProducts = await Product.find().sort({ categoryId: -1 });
    const specialProducts = await Product.find({ special: true });
    const newProducts = await Product.find({ new: true });
    const randomProducts = await Product.aggregate([{ $sample: { size: 5 } }]);

    const response = {
      msg: "hello",
      myData: allProducts,
      special: specialProducts,
      allProduct: randomProducts,
      newProduct: newProducts,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res.status(400).json({ error: "Product ID is required" });
      return;
    }

    const product = await Product.find({ id: productId });

    if (!product) {
      res.status(404).json({ msg: "Product not found" });
    } else {
      const response = {
        msg: "hello",
        myData: product,
      };
      res.json(response);
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductsByCategoryId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Category ID is required" });
      return;
    }

    const products = await Product.find({ categoryId: id });
    const [category] = await Category.find({ id });

    if (!category) {
      res.status(404).json({ msg: "Category not found" });
      return;
    }

    const data = {
      msg: "hello",
      myData: products,
      title: category.categoryName,
    };

    res.json({ data });
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.body;
    if (!search) {
      res.status(400).json({ error: "Search term is required" });
      return;
    }

    const products = await Product.find({
      productName: { $regex: search, $options: "i" },
    });

    const response = {
      msg: "hello",
      myData: products,
    };

    res.json(response);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      categoryId,
      productName,
      productDescription,
      productPrice,
      productImage,
      displayOrder,
      status,
      productQuantity,
      special,
    } = req.body;

    // Find the highest ID value in the database
    const highestIdProduct = await Product.findOne(
      {},
      {},
      { sort: { id: -1 } }
    );

    let lastProductId = highestIdProduct ? highestIdProduct.id + 1 : 1; // If there are no existing products, start with ID 1

    const newProduct = new Product({
      categoryId,
      productName,
      productDescription,
      productPrice,
      productImage,
      displayOrder,
      status,
      productQuantity,
      special,
      id: lastProductId,
    });

    await newProduct.save();

    res.json({ msg: "Product added successfully", data: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getProducts,
  getProductData,
  getProductById,
  getProductsByCategoryId,
  searchProducts,
  addProduct,
};
