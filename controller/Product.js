import Product from "../models/Product.js";
import ErrorHandler from "../utils/Errorhandler.js";
import catchAsyncErrors from "../utils/catchAsyncErrors.js";
import CreateSlug from "../helper/CreateSlug.js";

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import slugify from "slugify";
import rimraf from "rimraf";
import { type } from "os";

// Create Product --ADMIN
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  let { title, description, price, catigory, stock, tags, images } = req.body;
  // console.log(req.body)
  // console.log(req.files);
  tags = tags.split(",");
  images = req.files["images[]"];
  const slugForm = CreateSlug(title);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let imagesName = [];
  if (!Array.isArray(images)) {
    images = [images];
  }
  const pathOfFolder = path.join(__dirname, `../public/${slugForm}`);
  if (!fs.existsSync(pathOfFolder)) {
    fs.mkdirSync(pathOfFolder);
    // console.log("Crating", pathOfFolder)
  }
  images.forEach((item, i) => {
    let ext = item.name.split(".")[item.name.split(".").length - 1];
    item.mv(path.join(pathOfFolder, `${i}.${ext}`), (err) => {
      if (err) {
        res.json(err);
      }
    });
    imagesName.push(path.join(slugForm, `${i}.${ext}`));
  });
  let createdBy = req.user._id;
  // console.log(catigory)
  const product = await Product.create({
    title,
    slug: slugForm,
    description,
    price,
    createdBy,
    category: catigory,
    stock,
    tags,
    images: imagesName,
  });
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Product
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({
    products,
    success: true,
  });
});

// Get Product Details
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product --ADMIN
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Deleting the Product
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { slug } = await Product.findById(req.params.id);
  const product = await Product.findByIdAndRemove(req.params.id);
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
    console.log("deleting", pathOfFolder);
  }
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  // console.log(product);
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Create new Review and Update the review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { userRating, comment, productId } = req.body;
  // console.log(req.body);
  // console.log(req.user);
  const review = {
    user: req.user._id,
    name: req.user.firstName + " " + req.user.lastName,
    rating: Number(userRating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = userRating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.ratings = product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
  // const { userRating, comment, productId } = req.body;
  // const review = {
  //   user: req.user._id,
  //   name: req.user.name,
  //   rating: Number(userRating),
  //   comment,
  // };
  // const product = await Product.findById(productId);
  // const isReviewd = product.reviews.find(
  //   (rev) => rev.user.toString() === req.user._id.toString()
  // );
  // if (isReviewd) {
  //   product.reviews.forEach((rev) => {
  //     if (rev.user.toString() === req.user._id.toString()) {
  //       (rev.rating = userRating), (rev.comment = comment);
  //     }
  //   });
  // } else {
  //   product.reviews.push(review);
  //   product.numOfReviews = product.reviews.length;
  // }
  // let avg = 0;
  // product.ratings = product.reviews.forEach((rev) => {
  //   avg += rev.rating;
  // });
  // product.ratings = avg / product.reviews.length;
  // await product.save({ validateBeforeSave: false });
  // res.status(200).json({
  //   success: true,
  // });
});

// Get All Reviews of a product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find(req.body);
  res.json({
    success: true,
    data: products,
  });
});

// Related Products
export const relatedProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  const { tags: tagsData } = product;
  const products = await Product.find();
  const relatedProd = [];
  console.log(tagsData, "SHOWING THE DATA HERE!");
  products.forEach((productItem) => {
    const tagCount = productItem.tags.reduce((count, tag) => {
      if (tagsData.includes(tag)) {
        return count + 1;
      }
      return count;
    }, 0);
    if (
      (tagCount >= 1 ||
        (tagCount === 1 && tagsData.length === 1) ||
        (tagCount === 2 && tagsData.length === 2)) &&
      productItem._id.toString() !== product._id.toString()
    ) {
      relatedProd.push(productItem);
    }
  });

  console.log(relatedProd);
  res.json({
    success: true,
    data: relatedProd,
  });
});

// Latest Products
export const latestProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find(req.body)
    .sort({ createdAt: -1 })
    .limit(6);

  // Respond with the sorted products
  res.json({
    success: true,
    data: products,
  });
});

export const toprated = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ ratings: { $gt: 3.0 } }).limit(6);
  return res.json({ success: true, products });
});
