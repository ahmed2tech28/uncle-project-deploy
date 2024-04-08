import HappyClients from "../models/HappyClients.js";

import catchAsyncErrors from "../utils/catchAsyncErrors.js";
import ErrorHandler from "../utils/Errorhandler.js";
import CreateSlug from "../helper/CreateSlug.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import rimraf from "rimraf";

// Create HappyClients
export const createHappyClients = catchAsyncErrors(async (req, res, next) => {
  let { name, image, video, message } = req.body;

  const slugForm = CreateSlug(name);
  const userId = req.user._id;
  console.log(req.body);
  image = req.files["image[]"];
  video = req.files["video[]"];
  // video.url = req.files["video"];
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);
  const pathOfFolder = path.join(__dirname, `../happyclinets/${slugForm}`);
  if (!fs.existsSync(pathOfFolder)) {
    fs.mkdirSync(pathOfFolder);
    // console.log("Crating", pathOfFolder)
  }

  image.mv(
    path.join(
      pathOfFolder,
      "client-image" +
        "." +
        image.name.split(".")[image.name.split(".").length - 1]
    ),
    (err) => {
      if (err) {
        res.json(err);
      }
    }
  );
  if (video) {
    video.mv(
      path.join(
        pathOfFolder,
        "client-video" +
          "." +
          video.name.split(".")[video.name.split(".").length - 1]
      ),
      (err) => {
        if (err) {
          res.json(err);
        }
      }
    );
  }
  console.log("END");

  image = path.join(
    slugForm,
    "client-image" +
      "." +
      image.name.split(".")[image.name.split(".").length - 1]
  );
  if (video) {
    video = path.join(
      slugForm,
      "client-video" +
        "." +
        video.name.split(".")[video.name.split(".").length - 1]
    );
  }

  // Check if the user already exists
  const newClient = await HappyClients.create({
    name,
    image,
    review: { link: video, message },
    userId,
    slug: slugForm,
    message,
  });
  return res.status(201).json(newClient);
});

// Show HappyClients
export const getHappyClients = catchAsyncErrors(async (req, res, next) => {
  const happyClients = await HappyClients.find({});
  res.status(200).json({ happyClients });
});

// Show Single HappyClients
export const getSingleHappyClients = catchAsyncErrors(
  async (req, res, next) => {
    const singleHappyClients = await HappyClients.findById(req.params.id);
    if (!singleHappyClients) {
      throw new ErrorHandler("Not Found", 400);
    }
    return res.status(200).json(singleHappyClients);
  }
);

// Delete HappyClients
export const deleteHappyClients = catchAsyncErrors(async (req, res, next) => {
  const { slug } = await HappyClients.findById(req.params.id);
  const happyClient = await HappyClients.findByIdAndRemove(req.params.id);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathOfFolder = path.join(__dirname, `../public/${slug}`);
  if (fs.existsSync(pathOfFolder)) {
    rimraf(pathOfFolder, (err) => {
      if (err) {
        res.json(err);
      }
    });
    fs.rmdirSync(pathOfFolder);
  }
  if (!happyClient) {
    return next(new ErrorHandler("HappyClients Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "HappyClients Deleted Successfully",
  });
});

// Update HappyClients --ADMIN
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { image, video } = req.body;

  let happyClient = await HappyClients.findById(req.params.id);

  if (image) {
  }

  if (video) {
  }

  if (!happyClient) {
    return next(new ErrorHandler("happyClient Not Found", 404));
  }
  happyClient = await HappyClients.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    happyClient,
  });
});
