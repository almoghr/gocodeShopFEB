import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import { MyContext } from "./MyContext";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CartPage from "./pages/CartPage/CartPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { GET_ALL_PRODUCTS_PATH } from "./constants/api";

const Routing = () => {
  console.log(process.env)
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false)

  const incrementProduct = (setFunc) => {
    setFunc((prev) => prev + 1);
  };

  const decrementProduct = (setFunc) => {
    setFunc((prev) => (prev === 0 ? prev : prev - 1));
  };

  const addToCart = (id, amount, setFunc) => {
    if (amount === 0) {
      return;
    }
    const foundProduct = currentProducts.find((p) => p.id === id);
    const isProductExistInCart = cart.find((p) => p.id === foundProduct.id);

    if (isProductExistInCart) {
      const productInCartIndex = cart.findIndex(
        (p) => p.id === foundProduct.id
      );
      const cartCopy = [...cart];
      cartCopy[productInCartIndex].amount += amount;
      setCart(cartCopy);
    } else {
      const productToCart = { ...foundProduct };
      productToCart.amount = amount;
      setCart([...cart, productToCart]);
    }
    setFunc(0);
  };
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8001");
    const data = await response.json();
    setAllProducts(data);
    setCurrentProducts(data);
  };

  const handleFilterProducts = (category) => {
    if (category !== "All") {
      const filteredProducts = allProducts.filter(
        (p) => p.category === category
      );
      setCurrentProducts(filteredProducts);
    } else {
      if (currentProducts.length === allProducts.length) {
        return;
      } else {
        setCurrentProducts(allProducts);
      }
    }
  };
  useEffect(() => {
    setCategories(
      allProducts
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index)
    );
  }, [allProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
            cart,
          currentProducts,
          categories,
          handleFilterProducts,
          incrementProduct,
          decrementProduct,
          addToCart,
          setIsCartOpen,
          isCartOpen
        }}
      >
        <Link to="/">HomePage</Link>
        <Link to="about">About</Link>
        <Link to="cart">Cart</Link>
        <Link to="admin">Admin</Link>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="product/:id" element={<SingleProductPage />}/>
            <Route path="about" element={<AboutPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="admin" element={<AdminPage />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default Routing;
