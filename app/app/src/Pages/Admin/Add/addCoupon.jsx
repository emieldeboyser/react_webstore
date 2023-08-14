import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";

const AddCouponCode = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponAmount, setCouponAmount] = useState("");
  const { isLoading, error, mutate } = useMutation();

  const handleCouponChange = (event) => {
    const { id, value } = event.target;
    if (id === "couponCode") {
      setCouponCode(value);
    } else if (id === "couponAmount") {
      setCouponAmount(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        // Construct your data object here based on your API requirements
        coupon_name: couponCode,
        discount: couponAmount,
      };

      console.log("data", data);
      const response = await mutate(
        `${process.env.REACT_APP_API_URL}/coupons`,
        {
          method: "POST",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Reset the form
      setCouponCode("");
      setCouponAmount("");
      // navigate to /coupons
      window.location.href = "../admin";
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error adding coupon:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Coupon Code</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="couponCode">Coupon Code:</label>
          <input
            type="text"
            className="form-control"
            id="couponCode"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder="Enter coupon code"
          />
        </div>
        <div className="form-group">
          <label htmlFor="couponAmount">Coupon Amount:</label>
          <input
            type="number"
            className="form-control"
            id="couponAmount"
            value={couponAmount}
            onChange={handleCouponChange}
            placeholder="Enter coupon amount"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCouponCode;
