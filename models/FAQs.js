import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      default: " ",
    },
    category: {
      type: String,
      required: true,
      enum: ["poultry", "pink salt"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("FAQ", schema);
