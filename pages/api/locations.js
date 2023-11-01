import { mongooseConnect } from "@/lib/mongoose";
import { Location } from "@/models/Location";

export default async function handler(req, res) {
    await mongooseConnect();
    res.json(await Location.find().sort({ createdAt: -1 }));
}