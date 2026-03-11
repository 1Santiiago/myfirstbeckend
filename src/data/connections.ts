import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB conectado!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1); // encerra o processo se não conectar
  }
};