import ContactModel from "../models/Contact.js";

import catchAsyncErrors from "../utils/catchAsyncErrors.js";
import ErrorHandler from "../utils/Errorhandler.js";
import { confirmationEmail } from "../helper/SendMail.js";

// Create Contact
export const createContact = catchAsyncErrors(async (req, res, next) => {
  const { email, phone, message } = req.body;

  // Check if the user already exists
  const newType = await ContactModel.create({ email, phone, message });
  await confirmationEmail({ email, phone, message });
  res.status(201).json(newType);
});

// Show Contact
export const getContacts = catchAsyncErrors(async (req, res, next) => {
  const contacts = await ContactModel.find();
  res.json(contacts);
});

// Show Single Contact
export const getSingleContact = catchAsyncErrors(async (req, res, next) => {
  const singleContact = await ContactModel.findById(req.params.id);
  if (!singleContact) {
    throw new ErrorHandler("Not Found", 400);
  }
  return res.status(200).json(singleContact);
});

// Update Contact
export const updateContact = catchAsyncErrors(async (req, res, next) => {
  let singleContact = await ContactModel.findById(req.params.id);
  // console.log(singleContact)
  if (!singleContact) {
    throw new ErrorHandler("Not Founded", 400);
  }
  if (singleContact.isActive) {
    return res.status(200).json(singleContact);
  }
  singleContact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    { isActive: req.body.isActive },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json(singleContact);
});

// Delete Contact
export const deleteContact = catchAsyncErrors(async (req, res, next) => {
  const Contact = await ContactModel.findByIdAndRemove(req.params.id);
  if (!Contact) {
    return next(new ErrorHandler("Contact Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Contact Deleted Successfully",
  });
});
