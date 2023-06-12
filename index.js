import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('client/build'))

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
});

const Product = mongoose.model("Product", productSchema);

app.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      res.status(404).send("there is no product with the id providen");
    }
    res.status(200).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});
app.get("/products/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    if (products.length === 0) {
      res.status(404).send("there are no products with the category providen");
    }
    res.status(200).send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
}); 
app.post("/products", async (req, res) => {
  try {
    const products = [...req.body] ;
    if (products.length === 0) {
      res.status(400).send("bad request");
    }
    const insertedProducts = await Product.insertMany(products);
    res.send(insertedProducts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.post("/", async (req, res) => {
    try {
      const newProduct = { ...req.body };
      if (Object.keys(newProduct).length === 0) {
        res.status(400).send("bad request");
      }
      const product = new Product(newProduct);
      await product.save();
      res.send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  });
  
app.put("/product/:id", async (req, res) => {
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
    const product = await Product.findOne({ _id: id });
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
});
 
app.delete("/product/:id/", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      res.status(404).send({ message: "product does not exist" });
    }

    res.status(200).send(deletedProduct);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.get("*", (req,res) => {
  res.sendFile(__dirname+"/client/build/index.html")
})

async function main() {
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`);
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Example app listening on port "+ PORT);
});
