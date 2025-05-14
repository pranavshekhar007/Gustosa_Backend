const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const productSchema = mongoose.Schema({
  // step 1
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  productType: {
    type: String,
  },
  tax: {
    type: String,
  },
  categoryId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }],
  hsnCode: {
    type: Number,
  },
  GTIN: {
    type: Number,
  },

  shortDescription: {
    type: String,
  },

  




  // step 2 
  stockQuantity: {
    type: Number,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  price: { 
    type: Number 
  },

  discountedPrice: { 
    type: Number 
  },
  ingredients: {
    type: String,
  },
  packOf: {
    type: Number,
  },
  numberOfPieces: {
    type: Number,
  },
 
  currency: {
    type: String,
  },
  MRP: {
    type: Number,
    // required:true,
  },
  offerPrice: {
    type: Number,
    // required: true,
  },
  salePrice: {
    type: Number,
  },
  saleStartDate:{
    type: Date,
  },
  saleEndDate:{
    type: Date,
  },
  itemWeight: {
    type: Number,
  },
  packageWeight: {
    type: Number,
  },
  description: { 
    type: String 
  },
  

  // Nutrition Information
  packSize: {
    type: Number,
  },
  servingSize: {
    type: Number, 
  },
  energy: {
    type: Number, 
  },
  protein: {
    type: Number,
  },
  carbohydrate: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  saturatedFat: {
    type: Number,
  },
  transFat: {
    type: Number,
  },
  totalSugar: {
    type: Number,
  },
  addedSugar: {
    type: Number,
  },
  dietaryFiber: {
    type: Number,
  },
  calcium: {
    type: Number,
  },
  iron: {
    type: Number,
  },
  phosphorus: {
    type: Number,
  },
  potassium: {
    type: Number,
  },
  sodium: {
    type: Number,
  },

  

  // step 3
  productHeroImage: {
    type: String,
  },

  productGallery: {
    type: [String],
  },
  productVideo: {
    type: String,
  },





  // step 4 attributes
  productOtherDetails: [
    {
      key: { type: String },
      value: [{ type: String }],
    },
  ],
  productVariants: [
    {
      variantKey: { type: String },
      variantValue: { type: String },
      variantPrice: { type: Number },
      variantDiscountedPrice: { type: Number },
      variantImage: { type: String },
    },
  ],
});

productSchema.plugin(timestamps);
module.exports = mongoose.model("Product", productSchema);
