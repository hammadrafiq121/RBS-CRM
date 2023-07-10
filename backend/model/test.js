import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     label: String,
//     value: String,
//   },
//   { _id: false }
// );

const testSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyPhone: {
      type: String,
      required: true,
    },
    companyFax: String,
    companyAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    personName: {
      type: String,
      required: true,
    },
    personPhone: {
      type: String,
      required: true,
    },
    personEmail: {
      type: String,
      required: true,
    },
    comments: String,
    status: {
      type: String,
      required: true,
    },
    products: [String],

    //referencing customer added by which particular user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // products: [productSchema],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

export default Test;
