import React, { useState } from "react";
import style from "./productCard.module.css";
import { Link } from "react-router-dom";
import DeleteUserButton from "../../../Pages/Admin/Delete/deleteUser";

const ProductCard = ({ user }) => {
  const handleEdit = () => {
    // Implement the edit logic here
    console.log("Edit button clicked for user:", user);
    // set user to local storage
    localStorage.setItem("user", JSON.stringify(user));
  };
  const handleDeleteSuccess = () => {
    console.log("Delete button clicked for coupon:", user);
    console.log(user._id);
  };

  return (
    <div className={`card ${style.productCard}`}>
      <div className="card-body d-flex">
        <div className="col-md-8">
          <div>
            <h3 className="card-title">{user.username}</h3>
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.role}</p>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="d-flex justify-content-end">
          <Link to={`/admin/users/${user._id}`}>
            <button
              className={`btn btn-primary ${style.editButton}`}
              onClick={handleEdit}
            >
              edit
            </button>
          </Link>

          <DeleteUserButton id={user._id} onSuccess={handleDeleteSuccess} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
