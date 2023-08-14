import React, { useState, useEffect } from "react";
import Loading from "../../components/Global/Loading/Loading";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import "./wishlist.css";

const WishlistItem = (itemId) => {
  const item = itemId.itemId;

  // Fetch product data from api
  const { isLoading, error, data: product } = useFetch("/catalogus/" + item);
  console.log(product);

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Link to={"/catalogus/" + item}>
        <div className="img">
          <img src={`/images/${product.photo}`} alt={product.name} />
        </div>
        <div className="rest">
          <h3>{product.name}</h3>
          <p>€{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default WishlistItem;
