import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, required: true },
    image: {
      type: String,
    },
    slug: {
      type: String,
    },
    review: {
      message: { type: String, required: true },
      link: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("HappyClients", schema);
