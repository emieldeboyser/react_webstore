import React, { useState } from "react";
import style from "./cartCard.module.css";
import { Link } from "react-router-dom";

const CartCard = ({ product }) => {
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
        </div>
      </div>
    </div>
  );
};

export default CartCard;
