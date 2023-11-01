
import { model, models, Schema } from "mongoose"

const locationSchema = new Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

export const Location = models?.Location || model('Location', locationSchema);