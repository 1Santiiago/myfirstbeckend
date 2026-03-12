import mongoose, { Schema } from "mongoose";
export interface IProduct extends Document {
    name:string,
    price: number,
    createdAt: Date
}


const ProductSchema = new Schema<IProduct>(
    {
        name:{
            type: String,
            required: [true, 'Nome Obrigatório'],
            trim: true,
        },
        price:{
            type: Number,
            required: true,
            min:[0, "Preço não pode ser negativo"]
        }
    },
    {
        timestamps:true,
    }
)
export const Product = mongoose.model<IProduct>("Product", ProductSchema)