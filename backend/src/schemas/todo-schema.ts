import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TodoSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: Boolean,
      required: [true, "Status is required"],
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
