import SocialIconsModel from "../models/SocialIcons.js";

import catchAsyncErrors from "../utils/catchAsyncErrors.js";
import ErrorHandler from "../utils/Errorhandler.js";

// Create SocialIcons
export const createSocialIcons = catchAsyncErrors(async (req, res, next) => {
  const { socialLink } = req.body;

  const existingSocialIcons = await SocialIconsModel.findOne({ socialLink });
  if (existingSocialIcons) {
    throw new ErrorHandler(
      "This SocialIcons is already present with this link",
      404
    );
  }
  // Check if the user already exists
  const newType = await SocialIconsModel.create({ socialLink });
  res.status(201).json(newType);
});

// Show SocialIcons
export const getSocialIcons = catchAsyncErrors(async (req, res, next) => {
  const links = await SocialIconsModel.find({});
  res.json({ links });
});

// Show Single SocialIcons
export const getSingleSocialIcons = catchAsyncErrors(async (req, res, next) => {
  const singleSocialIcons = await SocialIconsModel.findById(req.params.id);
  if (!singleSocialIcons) {
    throw new ErrorHandler("Not Found", 400);
  }
  return res.status(200).json(singleSocialIcons);
});

// Update SocialIcons
export const updateSocialIcons = catchAsyncErrors(async (req, res, next) => {
  let singleSocialIcons = await SocialIconsModel.findById(req.params.id);
  if (!singleSocialIcons) {
    throw new ErrorHandler("Not Founded", 400);
  }

  singleSocialIcons = await SocialIconsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    singleSocialIcons,
  });
});

// Delete Contact
export const deleteSocialIcons = catchAsyncErrors(async (req, res, next) => {
  const SocialIcons = await SocialIconsModel.findByIdAndRemove(req.params.id);
  if (!SocialIcons) {
    return next(new ErrorHandler("SocialIcons Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "SocialIcons Deleted Successfully",
  });
});
