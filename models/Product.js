import mongoose, { model, Schema, models } from "mongoose";

const ScentSchema = new Schema({
  name: { type: String, required: true },
  description: String,
});

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  priceNew: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: { type: Object },
  scente: [ScentSchema], // corrected the field name to "scents"
  duration: { type: Number, required: false }, // updated the duration field to be required
  weight: { type: Number, required: false },
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);
