import React, { useEffect, useState } from "react";
import style from "./checkout.module.css";
import useFetch from "../../hooks/useFetch";

const Checkout = () => {
  const userInfo = JSON.parse(localStorage.getItem("SVS_USER")) || {};
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponValidity, setCouponValidity] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [discountInfo, setDiscountInfo] = useState(null);

  const initialUserName = userInfo.username;
  const initialStreet = userInfo.address_street;
  const initialHouseNumber = userInfo.address_number;
  const initialPostalCode = userInfo.address_postalcode;
  const initialCity = userInfo.address_city;
  const initialPhone = userInfo.phone;
  const initialEmail = userInfo.email;

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(order);
  }, []);

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleCheckoutChange = (event) => {
    const { id, value } = event.target;

    const idToSetterMap = {
      firstName: setFirstName,
      lastName: setLastName,
      street: setStreet,
      houseNumber: setHouseNumber,
      postalCode: setPostalCode,
      city: setCity,
      country: setCountry,
      email: setEmail,
      phoneNumber: setPhone,
    };

    const setStateFunction = idToSetterMap[id];

    if (setStateFunction) {
      setStateFunction(value);
    } else {
      console.log("No id found");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!firstName) {
      errors.firstName = "First Name is required";
      isValid = false;
    }

    if (!lastName) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!street) {
      errors.street = "Street is required";
      isValid = false;
    }

    if (!houseNumber) {
      errors.houseNumber = "House Number is required";
      isValid = false;
    }

    if (!postalCode) {
      errors.postalCode = "Postal Code is required";
      isValid = false;
    }

    if (!city) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!country) {
      errors.country = "Country is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!phone) {
      errors.phone = "Phone Number is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleCouponCheck = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/check-coupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ couponCode }),
        }
      );

      if (response && response.status === 200) {
        console.log("Coupon code is valid");
        const responseData = await response.json();
        if (responseData.valid) {
          setCouponDiscount(responseData.discount); // Set the coupon discount
          setCouponValidity(true);

          // Set the discount information
          setDiscountInfo({
            code: couponCode,
            amount: responseData.discount,
          });
        } else {
          setCouponValidity(false);
          setDiscountInfo(null); // Clear the discount information
        }
      } else {
        setCouponValidity(false);
        setDiscountInfo(null); // Clear the discount information
      }
    } catch (error) {
      console.error("Failed to check coupon code:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const data = {
          user_id: userInfo._id,
          username: initialUserName,
          firstName: firstName,
          lastName: lastName,
          street: street,
          houseNumber: houseNumber,
          postalCode: postalCode,
          city: city,
          country: country,
          email: email,
          phone: phone,
          order: JSON.parse(localStorage.getItem("cart")),
          order_created: new Date(),
          total_price: total,
        };

        if (discountInfo) {
          data.discount = discountInfo;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/checkout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let order_id = "";

        if (response && response.status === 200) {
          const responseData = await response.json();
          console.log("Order created successfully:", responseData._id);
          order_id = responseData._id;
        } else {
          console.error("Failed to create order. Server response:", response);
        }
        console.log("Order id:", order_id);
        setFirstName("");
        setLastName("");
        setStreet("");
        setHouseNumber("");
        setPostalCode("");
        setCity("");
        setCountry("");
        setEmail("");
        setPhone("");
        localStorage.removeItem("cart");
        window.location.href = `/order-confirmation/${order_id}`;
      } catch (error) {
        console.error("Failed to create order:", error);
      }
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );

  const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));

  const discount = couponDiscount
    ? (roundedTotalPrice * couponDiscount) / 100
    : 0;
  const total = (roundedTotalPrice - discount).toFixed(2);

  console.log(total); // This will log the calculated total price after applying the discount

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className={style.checkout_container}>
        <div className="order">
          <h3>Order items</h3>
          <div className={style.order_items}>
            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cartItems.map((item) => (
                <div className={style.checkout_item} key={item._id}>
                  <img src={`images/${item.photo}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>€{item.price}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={style.form}>
          <p>Checkout for: {initialUserName}</p>
          <div className="checkout-form">
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  onChange={handleCheckoutChange}
                  value={firstName}
                />
                {validationErrors.firstName && (
                  <p className="error">{validationErrors.firstName}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={handleCheckoutChange}
                  value={lastName}
                />
                {validationErrors.lastName && (
                  <p className="error">{validationErrors.lastName}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  value={street}
                  placeholder={initialStreet}
                  onChange={handleCheckoutChange}
                />
                {validationErrors.street && (
                  <p className="error">{validationErrors.street}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="houseNumber">House Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="houseNumber"
                  value={houseNumber}
                  placeholder={initialHouseNumber}
                  onChange={handleCheckoutChange}
                />
                {validationErrors.houseNumber && (
                  <p className="error">{validationErrors.houseNumber}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  placeholder={initialPostalCode}
                  value={postalCode}
                  onChange={handleCheckoutChange}
                />
                {validationErrors.postalCode && (
                  <p className="error">{validationErrors.postalCode}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder={initialCity}
                  value={city}
                  onChange={handleCheckoutChange}
                />
                {validationErrors.city && (
                  <p className="error">{validationErrors.city}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Country"
                  onChange={handleCheckoutChange}
                  value={country}
                />
                {validationErrors.country && (
                  <p className="error">{validationErrors.country}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  value={phone}
                  placeholder={initialPhone}
                  onChange={handleCheckoutChange}
                />
                {validationErrors.phone && (
                  <p className="error">{validationErrors.phone}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder={initialEmail}
                  value={email}
                  onChange={handleCheckoutChange}
                />
                {validationErrors.email && (
                  <p className="error">{validationErrors.email}</p>
                )}
              </div>
              {/* Coupon code */}
              <div className="form-group">
                <label htmlFor="coupon">Coupon Code</label>
                <div className={style.coupon}>
                  <input
                    type="text"
                    className="form-control"
                    id="coupon"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={handleCouponCodeChange}
                  />
                  {/* check coupon code button */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCouponCheck}
                  >
                    Check
                  </button>
                </div>
                {couponValidity !== null && (
                  <p
                    className={
                      couponValidity ? style.validCoupon : style.invalidCoupon
                    }
                  >
                    {couponValidity
                      ? `Valid coupon code! Discount: ${couponDiscount}%`
                      : "Invalid coupon code."}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Pay Now (€{total})
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
