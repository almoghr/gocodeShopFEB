import { useContext, useState } from "react";
import Button from "../Button/Button";
import "./Product.css";
import { MyContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";

export const Product = ({ src, title, price, id }) => {
  const navigate = useNavigate()
  const { incrementProduct, decrementProduct, addToCart } =
    useContext(MyContext);
  const [count, setCount] = useState(0);

  // const onBuyMeNowClick = () => {
  //   alert(`thank you, i am ${price}$ reacher`);
  // };

  // const onEditProductClick = () => {
  //   console.log("moving to edit product page");
  // };

  return (
    <div className="product-card">
      <div className="product-image" onClick={() => navigate(`product/${id}`)}>
        <img src={src} alt="product" />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>${price}</h6>
        <div className="addToCartContainer">
          <Button onClick={() => decrementProduct(setCount)} text={"-"} />
          <p>{count}</p>
          <Button onClick={() => incrementProduct(setCount)} text={"+"} />
        </div>
        <Button style={{background:"black", color:"white"}} onClick={() => addToCart(id, count, setCount)} text={"ADD TO CART"} />
        {/* {!isVeteran ? (
          <button onClick={onBuyMeNowClick}>BUY ME NOW</button>
        ) : (
          <button onClick={onEditProductClick}>EDIT PRODUCT</button>
        )} */}
      </div>
    </div>
  );
};
