import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import { useState } from "react";

const EditCoupon = ({ coupon, onUpdate }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();
  const [couponCode, setCouponCode] = useState("");
  const [couponAmount, setCouponAmount] = useState("");

  // get coupon from local storage
  const couponFromLocalStorage = JSON.parse(localStorage.getItem("coupon"));
  const couponName = couponFromLocalStorage.coupon_name;
  const couponDiscount = couponFromLocalStorage.discount;
  const couponId = couponFromLocalStorage._id;

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

      if (response && response.status === 200) {
        // The request was successful
        // You can access the response data if needed
        const responseData = response.data;
        console.log("Coupon edited successfully:", responseData);

        // Perform any additional actions based on the response
        // For example, show a success message or update the state with the response data.
      } else {
        // The server returned an error status
        console.error("Failed to edit coupon. Server response:", response);
        // Handle the error appropriately, such as displaying an error message.
      }
      setCouponCode("");
      setCouponAmount("");
      // clear local storage
      localStorage.removeItem("coupon");
      window.location.href = "../";
    } catch (error) {
      console.error("Error editing coupon:", error);
    }
  };

  return (
    <>
      <Link to="/admin">&lt; Back</Link>
      <h3>Edit Coupon</h3>
      {error && <p>{error}</p>}
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
            required
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
            placeholder={couponDiscount}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit Coupon
        </button>
      </form>
    </>
  );
};

export default EditCoupon;
