import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Global/Loading/Loading";
import ProductCard from "../../components/Global/Card/productCard";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cart items from local storage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
    setLoading(false);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseInt(item.price), 0);
  };

  const removeFromCart = (itemIndex) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(itemIndex, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="row cart-item">
                <div className="col-1">
                  <button className="btn" onClick={() => removeFromCart(index)}>
                    <span role="img" aria-label="Remove">
                      ❌
                    </span>
                  </button>
                </div>
                <div className="col-11">
                  <ProductCard product={item} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="total-price">
        <div className="total-price-inner">
          <p>Total Price: €{calculateTotalPrice()}</p>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
