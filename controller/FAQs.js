import FAQsModel from "../models/FAQs.js";

import catchAsyncErrors from "../utils/catchAsyncErrors.js";
import ErrorHandler from "../utils/Errorhandler.js";

// Create FAQs
export const createFaqs = catchAsyncErrors(async (req, res, next) => {
  const { question, answer, category } = req.body;

  const existingFAQs = await FAQsModel.findOne({ question, category });
  if (existingFAQs) {
    throw new ErrorHandler(
      "This FAQs is already registered with some one",
      404
    );
  }
  // Check if the user already exists
  const newType = await FAQsModel.create({ question, answer, category });
  res.status(201).json(newType);
});

// Show Poultry FAQs
export const getPoultryFaqs = catchAsyncErrors(async (req, res, next) => {
  const contacts = await FAQsModel.find({ category: "poultry" });
  res.json(contacts);
});

// Show FAQs
export const getFaqs = catchAsyncErrors(async (req, res, next) => {
  const contacts = await FAQsModel.find();
  // console.log(contacts)
  res.json(contacts);
});

// Show Pink Salt FAQs
export const getPinkSaltFaqs = catchAsyncErrors(async (req, res, next) => {
  const contacts = await FAQsModel.find({ category: "pink salt" });
  res.json(contacts);
});

// Show Single FAQs
export const getSingleFaqs = catchAsyncErrors(async (req, res, next) => {
  const singleFAQs = await FAQsModel.findById(req.params.id);
  if (!singleFAQs) {
    throw new ErrorHandler("Not Found", 400);
  }
  return res.status(200).json(singleFAQs);
});

// Update FAQs
export const updateFaqs = catchAsyncErrors(async (req, res, next) => {
  let singleFAQs = await FAQsModel.findById(req.params.id);
  // console.log(singleFAQs)
  if (!singleFAQs) {
    throw new ErrorHandler("Not Founded", 400);
  }

  singleFAQs = await FAQsModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    singleFAQs,
  });
});

// Delete Contact
export const deleteFaqs = catchAsyncErrors(async (req, res, next) => {
  const FAQs = await FAQsModel.findByIdAndRemove(req.params.id);
  if (!FAQs) {
    return next(new ErrorHandler("FAQs Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "FAQs Deleted Successfully",
  });
});
