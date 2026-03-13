import mongoose, { Schema } from "mongoose";
export interface IProduct extends Document {
    name:string,
    price: number,
    createdAt: Date,
    description?: string
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
        },
        
        description:{
            type: String,
        }
        
    },
    {
        timestamps:true,
    }
)
export const Product = mongoose.model<IProduct>("Product", ProductSchema)