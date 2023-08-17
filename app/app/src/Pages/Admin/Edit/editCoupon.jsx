import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import { useState } from "react";

const EditCoupon = ({ coupon, onUpdate }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();
  const [couponCode, setCouponCode] = useState("");
  const [couponAmount, setCouponAmount] = useState("");

  const couponFromLocalStorage = JSON.parse(localStorage.getItem("coupon"));
  const couponName = couponFromLocalStorage.coupon_name;
  const couponDiscount = couponFromLocalStorage.discount;
  const couponId = couponFromLocalStorage._id;

  // Validation state for input fields
  const [validationErrors, setValidationErrors] = useState({
    couponCode: "",
    couponAmount: "",
  });

  const handleCouponChange = (event) => {
    const { id, value } = event.target;
    if (id === "couponCode") {
      setCouponCode(value);
    } else if (id === "couponAmount") {
      setCouponAmount(value);
    }

    // Clear validation error when user starts typing
    setValidationErrors({
      ...validationErrors,
      [id]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!couponCode) {
      errors.couponCode = "Coupon code is required";
      isValid = false;
    }

    if (!couponAmount) {
      errors.couponAmount = "Coupon amount is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const data = {
          coupon_name: couponCode,
          discount: couponAmount,
        };

        const response = await mutate(
          `${process.env.REACT_APP_API_URL}/coupons/${couponId}`,
          {
            method: "PATCH",
            data: data,
            onSuccess: () => {
              onUpdate();
              navigate(`/coupons`);
            },
          }
        );
        console.log(response);

        if (response && response.status === 200) {
          const responseData = response.data;
          console.log("Coupon edited successfully:", responseData);
        } else {
          console.error("Failed to edit coupon. Server response:", response);
        }

        setCouponCode("");
        setCouponAmount("");
        localStorage.removeItem("coupon");
        window.location.href = "/admin";
      } catch (error) {
        console.error("Error editing coupon:", error);
      }
    }
  };

  return (
    <>
      <Link to="/admin">&lt; Back</Link>
      <h3>Edit Coupon</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="couponCode">Coupon Code:</label>
          <input
            type="text"
            className="form-control"
            id="couponCode"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder={couponName}
          />
          {validationErrors.couponCode && (
            <p className="error">{validationErrors.couponCode}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="couponAmount">Coupon Amount:</label>
          <input
            type="number"
            className="form-control"
            id="couponAmount"
            value={couponAmount}
            onChange={handleCouponChange}
            placeholder={couponDiscount}
          />
          {validationErrors.couponAmount && (
            <p className="error">{validationErrors.couponAmount}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Edit Coupon
        </button>
      </form>
    </>
  );
};

export default EditCoupon;
