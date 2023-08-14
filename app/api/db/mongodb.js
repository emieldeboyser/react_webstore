import express from "express";
import { initClient } from "./mongo.js"; // Adjust the path as needed

const router = express.Router();

router.get("/products", async (req, res) => {
  const client = await initClient();

  if (!client.isConnected()) {
    return res.status(500).json({ error: "Failed to connect to MongoDB" });
  }

  try {
    const db = client.db(process.env.MONGODB_DATABASE);
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching products" });
  } finally {
    await client.close();
  }
});

export default router;
