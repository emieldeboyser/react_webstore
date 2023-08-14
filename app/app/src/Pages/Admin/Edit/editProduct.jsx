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

  console.log(product);
  const productFromLocalStorage = JSON.parse(localStorage.getItem("product"));

  const productId = productFromLocalStorage._id;
  const initialProductName = productFromLocalStorage.name;
  const initialProductPrice = productFromLocalStorage.price;
  const initialProductDescription = productFromLocalStorage.description;
  const initialProductPhoto = productFromLocalStorage.photo;

  const handleProductChange = (event) => {
    const { id, value } = event.target;
    if (id === "productName") {
      setProductName(value);
    } else if (id === "productPrice") {
      setProductPrice(value);
    } else if (id === "productDescription") {
      setProductDescription(value);
    } else if (id === "productPhoto") {
      setProductPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: productName,
        price: productPrice,
        description: productDescription,
        photo: productPhoto,
      };

      const response = await mutate(
        `${process.env.REACT_APP_API_URL}/product/${productId}`,
        {
          method: "PATCH",
          data: data,
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
            placeholder={initialProductPrice}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            className="form-control"
            id="productDescription"
            value={productDescription}
            onChange={handleProductChange}
            placeholder={initialProductDescription}
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
          Edit Product
        </button>
      </form>
      <div>
        <img
          src={`../images/${initialProductPhoto}`}
          alt={initialProductPhoto}
        />
      </div>
    </div>
  );
};

export default EditProduct;
