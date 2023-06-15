import {
  addMultipleProducts,
  addSingleProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
} from "../services/Product.js";

export const getAllProductsController = async (req, res) => {
  try {
    console.log('1')
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(id);

    if (!product) {
      res.status(404).send("there is no product with the id providen");
    }
    res.status(200).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const getProductByCategoryController = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await getProductByCategory(category);
    if (products.length === 0) {
      res.status(404).send("there are no products with the category providen");
    }
    res.status(200).send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const addMultipleProductsController = async (req, res) => {
  try {
    const products = [...req.body];
    if (products.length === 0) {
      res.status(400).send("bad request");
    }
    const insertedProducts = await addMultipleProducts(products);
    res.send(insertedProducts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const addSingleProductController = async (req, res) => {
  try {
    const newProduct = { ...req.body };
    if (Object.keys(newProduct).length === 0) {
      res.status(400).send("bad request");
    }
    const product = await addSingleProduct(newProduct);
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const updateProductController =  async (req, res) => {
    const userAllowedUpdates = ["price", "description", "rating", "image"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      userAllowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      res.status(400).send({ message: "Invalid updates" });
    }
  
    try {
      const id = req.params.id;
      const product = await getProductById(id);
      if (!product) {
        res.status(404).send({ message: "product does not exist" });
      }
      updates.forEach((update) => (product[update] = req.body[update]));
      await product.save();
      res.status(200).send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }

  export const deleteProductController =  async (req, res) => {
    try {
      const id = req.params.id;
      const deletedProduct = await deleteProduct(id);
  
      if (!deletedProduct) {
        res.status(404).send({ message: "product does not exist" });
      }
  
      res.status(200).send(deletedProduct);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }