import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import { Link } from "react-router-dom";

const AddCouponCode = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const { isLoading, error, mutate } = useMutation();

  const handleProductChange = (event) => {
    const { id, value } = event.target;
    if (id === "productName") {
      setProductName(value);
    } else if (id === "productDescription") {
      setProductDescription(value); // Corrected typo here
    } else if (id === "productPrice") {
      setProductPrice(value);
    } else if (id === "productPhoto") {
      setProductPhoto(event.target.files[0]);
    } else if (id === "productCategory") {
      setProductCategory(value);
    } else {
      console.log("error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        // Construct your data object here based on your API requirements
        name: productName,
        price: productPrice,
        description: productDescription,
        photo: productPhoto,
        category: productCategory,
      };

      console.log("data", data);
      const response = await mutate(
        `${process.env.REACT_APP_API_URL}/product`,
        {
          method: "POST",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);

      // Reset the form
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductPhoto("");
      setProductCategory("");
      window.location.href = "../admin";
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error adding coupon:", error);
    }
  };

  return (
    <div>
      <Link to="/admin">&lt; Back</Link>
      <h3>Add Product</h3>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={handleProductChange}
            placeholder="Name of product"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            value={productPrice}
            onChange={handleProductChange}
            placeholder="Price of product"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            value={productDescription}
            onChange={handleProductChange}
            placeholder="Description of product"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCategory">Product category:</label>
          <input
            type="text"
            className="form-control"
            id="productCategory" // Change the id to productCategory
            value={productCategory}
            onChange={handleProductChange}
            placeholder="Category of product"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPhoto">Product Photo:</label>
          <input
            type="file"
            className="form-control"
            id="productPhoto"
            onChange={handleProductChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddCouponCode;
