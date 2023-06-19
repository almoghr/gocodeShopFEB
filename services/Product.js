import { Product } from "../models/Product.js";

export const getAllProducts = () => {
    console.log(2)
    return Product.find({}).populate("owner", "-__v");
    // return Product.find({})
}

export const getProductById = (id) => {
    return Product.findOne({_id:id})
}

export const getProductByCategory = (category) => {
    return Product.find({category})
}

export const addMultipleProducts = (products) => {
    return Product.insertMany(products)
}

export const addSingleProduct = async (newProduct) => {
    const product = new Product(newProduct)
    await product.save()
    return product
}

export const deleteProduct = (id) => {
    return Product.findOneAndDelete({_id:id})
}
