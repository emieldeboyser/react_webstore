import React, { useState } from "react";
import style from "./couponCard.module.css";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../Global/Loading/Loading";
import DeleteCouponButton from "../../../Pages/Admin/Delete/deleteCoupon";

const CouponCard = ({ coupon }) => {
  const handleEdit = () => {
    // Implement the edit logic here
    console.log("Edit button clicked for coupon:", coupon);
    // set coupon to local storage
    localStorage.setItem("coupon", JSON.stringify(coupon));
  };

  const handleDeleteSuccess = () => {
    console.log("Delete button clicked for coupon:", coupon);
    console.log(coupon._id);
  };

  return (
    <div className={`card ${style.productCard}`}>
      <div className="card-body d-flex">
        <div className="col-md-8">
          <h3>{coupon.coupon_name}</h3>
          <p>{coupon.discount}%</p>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-end">
            <Link to={`/admin/editCoupon/${coupon._id}`}>
              <button
                className={`btn btn-primary ${style.editButton}`}
                onClick={handleEdit}
              >
                edit
              </button>
            </Link>

            <DeleteCouponButton
              id={coupon._id}
              onSuccess={handleDeleteSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
