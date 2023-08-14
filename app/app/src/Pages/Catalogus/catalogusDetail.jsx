import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Global/Loading/Loading";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Global/Button/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    invalidate,
    data: product,
  } = useFetch(`/catalogus/${id}`);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    setCart([...cart, product]);
    showSuccessAlert(); // Show the success alert when adding to cart
  };

  const showSuccessAlert = () => {
    alert(`${product.name} has been added to your cart.`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <Link to="/catalogus" className="text-muted">
            &lt; Back
          </Link>
          <h2 className="mt-3">{product.name}</h2>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 position-relative">
          <img
            src={`../images/${product.photo}`}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h4>Description:</h4>
          <p>{product.description}</p>
          <h4>Price:</h4>
          <p>€{product.price}</p>
          <Button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
