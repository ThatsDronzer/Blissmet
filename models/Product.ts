import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    vendor: mongoose.Types.ObjectId; 
    image: string;
}

const ProductSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    image: { type: String, default: 'https://via.placeholder.com/300' }
}, { timestamps: true });

// Check if the model already exists before creating a new one
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
