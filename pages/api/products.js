import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  else if (req.method === 'POST') {
    console.log("POST Product:", req.body);
    try {
      const product = await Product.create(req.body);
      console.log("Product Created:", product);
      res.json(product);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to create the product" });
    }
  } else if (req.method === 'PUT') {
    const { _id, scente, ...productData } = req.body; // Extract scente separately
    console.log("PUT Product:", _id, productData, scente);

    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id },
        { ...productData, scente },
        { new: true } // Return the updated product
      );
      console.log("Product Updated:", updatedProduct);
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to update the product" });
    }
  } else if (req.method === 'DELETE') {
    if (req.query?.id) {
      console.log("DELETE Product by ID:", req.query.id);
      try {
        await Product.deleteOne({ _id: req.query.id });
        console.log("Product Deleted");
        res.json(true);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete the product" });
      }
    }
  }
}