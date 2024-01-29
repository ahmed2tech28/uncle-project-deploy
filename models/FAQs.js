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
  },
  { timestamps: true }
);

export default mongoose.model("FAQ", schema);