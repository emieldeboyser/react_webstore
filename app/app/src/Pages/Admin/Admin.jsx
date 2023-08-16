import React from "react";
import CouponCard from "../../components/Global/Coupon/couponCard";
import ProductCardAdmin from "../../components/Global/Card/ProductCardAdmin";
import UserCard from "../../components/Global/Card/UserCard";
import Loading from "../../components/Global/Loading/Loading";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Button from "../../components/Global/Button/Button";
import "./Admin.css";

const Admin = () => {
  const {
    isLoading: isLoadingCoupons,
    error: errorCoupons,
    data: coupon,
  } = useFetch("/coupons");
  const {
    isLoading: isLoadingProducts,
    error: errorProducts,
    data: products,
  } = useFetch("/catalogus");
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: user,
  } = useFetch("/users");

  if (errorCoupons || errorProducts || errorUser) {
    return <p>{errorCoupons || errorProducts || errorUser}</p>;
  }

  if (isLoadingCoupons || isLoadingProducts || isLoadingUser) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Admin page</h1>
      <p>Welkom op de Admin page</p>

      <div className="users">
        <h2>Users</h2>
        <div className="row">
          {user &&
            user.map((user) => (
              <div className="col-md-4" key={user._id}>
                <UserCard user={user} />
              </div>
            ))}
        </div>
      </div>

      <div className="products">
        <h2>Producten</h2>
        <Link to={"addProduct"}>
          <Button className="addProductBtn"> Add product</Button>
        </Link>
        <div className="row">
          {products &&
            products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCardAdmin product={product} />
              </div>
            ))}
        </div>
      </div>
      <div className="couponcodes">
        <h2>Coupon codes</h2>
        <Link to={"addCoupon"}>
          <Button> Add coupon code</Button>
        </Link>
        <div className="row">
          {coupon &&
            coupon.map((coupon) => (
              <div className="col-md-4" key={coupon._id}>
                <CouponCard coupon={coupon} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
