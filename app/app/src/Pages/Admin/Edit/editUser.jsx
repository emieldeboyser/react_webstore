import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import { useState } from "react";
import "./editUser.css";

const EditUser = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userStreet, setUserStreet] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userPostalCode, setUserPostalCode] = useState("");
  const [userStreetNumber, setUserStreetNumber] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");

  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const userId = userFromLocalStorage._id;
  const initialUserName = userFromLocalStorage.username;
  const initialUserEmail = userFromLocalStorage.email;
  const initialUserStreet = userFromLocalStorage.address_street;
  const initialUserCity = userFromLocalStorage.address_city;
  const initialUserPostalCode = userFromLocalStorage.address_postalcode;
  const initialUserStreetNumber = userFromLocalStorage.address_number;
  const initialUserRole = userFromLocalStorage.role;

  // Validation state for input fields
  const [validationErrors, setValidationErrors] = useState({
    userName: "",
    userEmail: "",
    userStreet: "",
    userCity: "",
    userPostalCode: "",
    userStreetNumber: "",
    userRole: "",
  });

  const handleUserChange = (event) => {
    const { id, value } = event.target;
    if (id === "userName") {
      setUserName(value);
    } else if (id === "userEmail") {
      setUserEmail(value);
    } else if (id === "userStreet") {
      setUserStreet(value);
    } else if (id === "userCity") {
      setUserCity(value);
    } else if (id === "userPostalCode") {
      setUserPostalCode(value);
    } else if (id === "userStreetNumber") {
      setUserStreetNumber(value);
    } else if (id === "userRole") {
      setSelectedUserRole(value);
    }

    // Clear validation error when user starts typing
    setValidationErrors({
      ...validationErrors,
      [id]: "",
    });
  };

  // Validation functions
  const validateForm = () => {
    let isValid = true;

    if (!userName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userName: "Username is required",
      }));
      isValid = false;
    }

    if (!userEmail) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userEmail: "Email is required",
      }));
      isValid = false;
    }

    if (!userStreet) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userStreet: "Street is required",
      }));
      isValid = false;
    }

    if (!userCity) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userCity: "City is required",
      }));
      isValid = false;
    }

    if (!userPostalCode) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userPostalCode: "Postal code is required",
      }));
      isValid = false;
    }

    if (!userStreetNumber) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userStreetNumber: "Street number is required",
      }));
      isValid = false;
    }

    if (!selectedUserRole) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userRole: "Role is required",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const data = {
          username: userName,
          email: userEmail,
          address_street: userStreet,
          address_city: userCity,
          address_postalcode: userPostalCode,
          address_number: userStreetNumber,
          role: selectedUserRole,
        };

        const response = await mutate(
          `${process.env.REACT_APP_API_URL}/users/${userId}`,
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
          console.log("User edited successfully:", responseData);
        } else {
          console.error("Failed to edit user. Server response:", response);
        }
        setUserName("");
        setUserEmail("");
        setUserStreet("");
        setUserCity("");
        setUserPostalCode("");
        setUserStreetNumber("");
        setSelectedUserRole("");
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }
  };

  return (
    <div>
      <Link to="/admin">&lt; Back</Link>
      <h3>Edit User</h3>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User name:</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            value={userName}
            onChange={handleUserChange}
            placeholder={initialUserName}
          />
          {validationErrors.userName && (
            <p className="error">{validationErrors.userName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="userEmail">User Email:</label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            value={userEmail}
            onChange={handleUserChange}
            placeholder={initialUserEmail}
          />
          {validationErrors.userEmail && (
            <p className="error">{validationErrors.userEmail}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userStreet">Street:</label>
          <input
            type="text"
            className="form-control"
            id="userStreet"
            value={userStreet}
            onChange={handleUserChange}
            placeholder={initialUserStreet}
          />
          {validationErrors.userStreet && (
            <p className="error">{validationErrors.userStreet}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userStreetNumber">Street Number:</label>
          <input
            type="text"
            className="form-control"
            id="userStreetNumber"
            value={userStreetNumber}
            onChange={handleUserChange}
            placeholder={initialUserStreetNumber}
          />
          {validationErrors.userStreetNumber && (
            <p className="error">{validationErrors.userStreetNumber}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userCity">City:</label>
          <input
            type="text"
            className="form-control"
            id="userCity"
            value={userCity}
            onChange={handleUserChange}
            placeholder={initialUserCity}
          />
          {validationErrors.userCity && (
            <p className="error">{validationErrors.userCity}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userPostalCode">Postal Code:</label>
          <input
            type="text"
            className="form-control"
            id="userPostalCode"
            value={userPostalCode}
            onChange={handleUserChange}
            placeholder={initialUserPostalCode}
          />
          {validationErrors.userPostalCode && (
            <p className="error">{validationErrors.userPostalCode}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="userRole">Role:</label>
          <p>Your current role is: {initialUserRole}</p>
          <div>
            <label>
              <input
                type="radio"
                id="adminRole"
                name="userRole"
                value="admin"
                checked={selectedUserRole === "admin"}
                onChange={() => setSelectedUserRole("admin")}
              />
              admin
            </label>
            <label>
              <input
                type="radio"
                id="userRole"
                name="userRole"
                value="user"
                checked={selectedUserRole === "user"}
                onChange={() => setSelectedUserRole("user")}
              />
              user
            </label>
          </div>
          {validationErrors.userRole && (
            <p className="error">{validationErrors.userRole}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Edit User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
