import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["poultry", "pink salt"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Please enter product Stock"],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    tags: [],
    images: [
      // {
      //   public_id: {
      //     type: String,
      //     required: true,
      //     default: "",
      //   },
      //   url: {
      //     type: String,
      //     required: true,
      //     default: "",
      //   },
      // },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.model("Product", schema);
