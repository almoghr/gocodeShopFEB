import mongoose from "mongoose";
console.log(3)
const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    owner:{
       type: mongoose.Schema.Types.ObjectId, ref: 'User',
       required:true
    }
  });
  
  export const Product = mongoose.model("Product", productSchema);
  