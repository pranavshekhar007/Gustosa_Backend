const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const productSchema = mongoose.Schema({
  // step 1
  name: {
    type: String,
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
  hsnCode: {
    type: String,
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
  description: { 
    type: String 
  },
  isSpecialAppearance: {
    type: Boolean,
    default: false,
  },
  // step 3

  productHeroImage: {
    type: String,
  },

  productGallery: {
    type: [String],
  },
  // step 4 attributes

  productOtherDetails: [
    {
      key: { type: String },
      value: [{ type: String }],
    },
  ],
});

productSchema.plugin(timestamps);
module.exports = mongoose.model("Product", productSchema);
