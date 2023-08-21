// pages/api/images.js
import { connectToDatabase } from "@/lib/mongoose";
import Image from "@/models/Image";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).end("Method Not Allowed");
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Image ID is missing." });
    }

    try {
        await connectToDatabase(); // Make sure this function connects to your MongoDB database

        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ error: "Image not found." });
        }

        return res.json(image);
    } catch (error) {
        console.error("Error fetching image:", error);
        return res.status(500).json({ error: "Failed to fetch the image." });
    }
}