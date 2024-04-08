import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressfileupload from "express-fileupload";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import db from "./config/db.js";

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(expressfileupload());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(express.static("happyclinets"));

db();

import UserRoutes from "./routes/User.js";
import ProductRoutes from "./routes/Product.js";
import FooterRoutes from "./routes/Footer.js";
import FAQsRoutes from "./routes/FAQs.js";
import SocialIconsRoutes from "./routes/SocialIcons.js";
import ContactRoutes from "./routes/Contact.js";
import GeneralRoutes from "./routes/General.js";
import HappyClients from "./routes/HappyClients.js";

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/footer", FooterRoutes);
app.use("/api/v1/faqs", FAQsRoutes);
app.use("/api/v1/social", SocialIconsRoutes);
app.use("/api/v1/contact", ContactRoutes);
app.use("/api/v1/general", GeneralRoutes);
app.use("/api/v1/happyclients", HappyClients);

app.all("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`http://localhost:${process.env.PORT}`)
);
