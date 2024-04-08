import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    contactType: {
      type: String,
      enum: ["email", "phone"],
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Footer", schema);