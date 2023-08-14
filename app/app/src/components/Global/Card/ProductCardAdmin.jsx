import React, { useState } from "react";
import style from "./productCard.module.css";
import { Link } from "react-router-dom";
import DeleteProductButton from "../../../Pages/Admin/Delete/deleteProduct";

const ProductCardAdmin = ({ product }) => {
  const handleEdit = () => {
    // Implement the edit logic here
    console.log("Edit button clicked for product:", product);
    // set coupon to local storage
    localStorage.setItem("product", JSON.stringify(product));
  };

  const handleDeleteSuccess = () => {
    console.log("Delete button clicked for coupon:", product);
    console.log(product._id);
  };
  return (
    <div className={`card ${style.productCard}`}>
      <div className="card-body d-flex">
        <div className="col-md-4">
          <div className={style.image}>
            <img
              src={`/images/${product.photo}`}
              alt={product.name}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-md-8">
          <div>
            <h3 className="card-title">{product.name}</h3>
            <p className="card-text">€{product.price}</p>
          </div>
          <div className="d-flex justify-content-end">
            <Link to={`/admin/product/${product._id}`} product={product}>
              <button
                className={`btn btn-primary ${style.editButton}`}
                onClick={handleEdit}
              >
                edit
              </button>
            </Link>
            <DeleteProductButton
              id={product._id}
              onSuccess={handleDeleteSuccess}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
