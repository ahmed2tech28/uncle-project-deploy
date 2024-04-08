import mongoose from "mongoose";

export default () =>
  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("DB Connected!"))
    .catch((err) => err);
