import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatorio"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatoria"],
      minLength: [6, "Senha deve ter no minimo 6 caracteres"],
      select: false,
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (this: IUser) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);