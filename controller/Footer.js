import FooterModel from "../models/Footer.js";

import catchAsyncErrors from "../utils/catchAsyncErrors.js";
import ErrorHandler from "../utils/Errorhandler.js";

// Create Contact
export const createContact = catchAsyncErrors(async (req, res, next) => {
  const { contactType, value } = req.body;
  const existingContact = await FooterModel.findOne({ value, contactType });

  if (existingContact) {
    throw new ErrorHandler(
      "This contact is already registered with some one",
      404
    );
  }
  // Check if the user already exists
  const newType = await FooterModel.create({ value, contactType });
  res.status(201).json(newType);
});

// Show Contacts
export const getContacts = catchAsyncErrors(async (req, res, next) => {
  const contacts = await FooterModel.find({});
  res.json(contacts);
});

// Show Single Contact
export const getSingleContact = catchAsyncErrors(async (req, res, next) => {
  const singleContact = await FooterModel.findById(req.params.id);
  if (!singleContact) {
    throw new ErrorHandler("Not Found", 400);
  }
  return res.status(200).json(singleContact);
});

// Update Contact
export const updateContact = catchAsyncErrors(async (req, res, next) => {
  const singleContact = await FooterModel.findById(req.params.id);

  if (!singleContact) {
    throw new ErrorHandler(
      "This contact is already registered with some one",
      400
    );
  }

  await FooterModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    singleContact,
  });
});

// Delte Contact
export const deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await FooterModel.findByIdAndRemove(req.params.id);
  if (!contact) {
    return next(new ErrorHandler("Contact Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Contact Deleted Successfully",
  });
});