import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    socialLink: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);

export default mongoose.model("SocialLink", schema);
