import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import { useState } from "react";

const EditProduct = ({ product, onUpdate }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);

  const productFromLocalStorage = JSON.parse(localStorage.getItem("product"));

  const productId = productFromLocalStorage._id;
  const initialProductName = productFromLocalStorage.name;
  const initialProductPrice = productFromLocalStorage.price;
  const initialProductDescription = productFromLocalStorage.description;
  const initialProductPhoto = productFromLocalStorage.photo;

  // Validation state for input fields
  const [validationErrors, setValidationErrors] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productPhoto: "",
  });

  const handleProductChange = (event) => {
    const { id, value, files } = event.target;
    if (id === "productName") {
      setProductName(value);
    } else if (id === "productPrice") {
      setProductPrice(value);
    } else if (id === "productDescription") {
      setProductDescription(value);
    } else if (id === "productPhoto") {
      setProductPhoto(files[0]);
    }

    // Clear validation error when user starts typing or selects a file
    setValidationErrors({
      ...validationErrors,
      [id]: "",
    });
  };

  // Validation functions
  const validateForm = () => {
    let isValid = true;

    if (!productName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        productName: "Product name is required",
      }));
      isValid = false;
    }

    if (!productPrice) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        productPrice: "Product price is required",
      }));
      isValid = false;
    }

    if (!productDescription) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        productDescription: "Product description is required",
      }));
      isValid = false;
    }

    if (!productPhoto) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        productPhoto: "Product photo is required",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("price", productPrice);
        formData.append("description", productDescription);
        formData.append("photo", productPhoto);

        const response = await mutate(
          `${process.env.REACT_APP_API_URL}/product/${productId}`,
          {
            method: "PATCH",
            data: formData,
            onSuccess: () => {
              onUpdate();
              navigate(`/admin`);
            },
          }
        );

        if (response && response.status === 200) {
          const responseData = response.data;
          console.log("Product edited successfully:", responseData);
        } else {
          console.error("Failed to edit product. Server response:", response);
        }

        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductPhoto(null);

        window.location.href = "../";
      } catch (error) {
        console.error("Error editing product:", error);
      }
    }
  };

  return (
    <div>
      <Link to="/admin">&lt; Back</Link>
      <h3>Edit Product</h3>

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
            placeholder={initialProductName}
          />
          {validationErrors.productName && (
            <p className="error">{validationErrors.productName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            value={productPrice}
            onChange={handleProductChange}
            placeholder={initialProductPrice}
          />
          {validationErrors.productPrice && (
            <p className="error">{validationErrors.productPrice}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            className="form-control"
            id="productDescription"
            value={productDescription}
            onChange={handleProductChange}
            placeholder={initialProductDescription}
          />
          {validationErrors.productDescription && (
            <p className="error">{validationErrors.productDescription}</p>
          )}
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
          {validationErrors.productPhoto && (
            <p className="error">{validationErrors.productPhoto}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
