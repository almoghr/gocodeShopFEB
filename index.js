import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  addMultipleProductsController,
  addSingleProductController,
  deleteProductController,
  getAllProductsController,
  getProductByCategoryController,
  getProductByIdController,
  updateProductController,
} from "./controllers/Product.js";
import {
  addSingleUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "./controllers/User.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("client/build"));

//product routes
app.get("/api/products", getAllProductsController);
app.get("/api/product/:id", getProductByIdController);
app.get("/api/products/:category", getProductByCategoryController);
app.post("/api/products", addMultipleProductsController);
app.post("/api/", addSingleProductController);
app.put("/api/product/:id", updateProductController);
app.delete("/api/product/:id/", deleteProductController);

//user routes
app.get("/api/users", getAllUsersController);
app.get("/api/user/:id", getUserByIdController);
app.post("/api/user", addSingleUserController);
app.put("/api/user/:id", updateUserController);
app.delete("/api/user/:id/", deleteUserController);

app.get("*", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/client/build/index.html");
});

async function main() {
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  );
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
