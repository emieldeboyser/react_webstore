import React, { useState } from "react";
import style from "./productCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(
    localStorage.getItem(product._id) === "true"
  );

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      localStorage.removeItem(product._id);
    } else {
      localStorage.setItem(product._id, "true");
    }
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className={`${style.productCard}`}>
      <div className="card">
        <div className="">
          <Link
            to={`/catalogus/${product._id}`}
            key={product._id}
            className="text-decoration-none"
          >
            <div className={style.image}>
              <img
                src={`/images/${product.photo}`}
                alt={product.name}
                className="img-fluid"
              />
            </div>
          </Link>
        </div>
        <div className={style.info}>
          <Link
            to={`/catalogus/${product._id}`}
            key={product._id}
            className="text-decoration-none"
          >
            <div>
              <h3 className="card-title">{product.name}</h3>
              <p className={style.price}>€{product.price}</p>
            </div>
          </Link>
          <button
            onClick={handleToggleWishlist}
            className={`btn btn-link ${
              isInWishlist ? style.wishlistActive : ""
            }`}
          >
            <i
              className={`fa-heart ${
                isInWishlist ? "fas" : "far"
              } text-danger ${style.wishlistIcon}`}
            ></i>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
