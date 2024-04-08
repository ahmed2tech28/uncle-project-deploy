import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: " ",
        },
        message: {
            type: String, required: true,
        },
        isActive : {
            type:Boolean,default:false
        }
    },
    { timestamps: true }
);

export default mongoose.model("Contact", schema);