import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product";
import './SingleProductPage.css'
import { GET_PRODUCT_BY_ID } from "../../constants/api";

const SingleProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const fetchProduct = async () => {
    const response = await fetch(GET_PRODUCT_BY_ID+id);
    const data = await response.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  //show the product with all he has to have

  return (
    <div className="singleProductContainer">
      {product && (
        <Product
          src={product.image}
          title={product.title}
          price={product.price}
          id={product.id}
        />
      )}
    </div>
  );
};

export default SingleProductPage;
