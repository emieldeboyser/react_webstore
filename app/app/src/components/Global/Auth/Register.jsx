import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import useMutation from "../../../hooks/useMutation";
import { useState } from "react";
import style from "./Register.module.css";

const Register = ({ initialError, onLogin }) => {
  const { isLoading, error, mutate } = useMutation();

  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    birthdate: "",
    phone: "",
    address_street: "",
    address_number: "",
    address_postalcode: "",
    address_city: "",
    role: "user",
  });

  // Validation state for input fields
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
    email: "",
    birthdate: "",
    address_street: "",
    address_number: "",
    address_postalcode: "",
    address_city: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    // Clear validation error when user starts typing
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: "",
    });
  };

  // Validation functions
  const validateForm = () => {
    let isValid = true;

    if (!data.username) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      isValid = false;
    }

    if (!data.password) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    }

    if (!data.email) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    }

    if (!data.birthdate) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        birthdate: "Birthdate is required",
      }));
      isValid = false;
    }

    if (!data.address_street) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        address_street: "Street address is required",
      }));
      isValid = false;
    }

    if (!data.address_number) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        address_number: "Address number is required",
      }));
      isValid = false;
    }

    if (!data.address_postalcode) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        address_postalcode: "Postal code is required",
      }));
      isValid = false;
    }

    if (!data.address_city) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        address_city: "City is required",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (validateForm()) {
      mutate(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        data,
        onSuccess: (data) => {
          onLogin(data);
          navigate("/");
        },
      });
    }
  };

  return (
    <div className={style.register_form}>
      <div className={style.left_side}>
        <img src="/images/hero.jpeg" alt="log" className={style.loginImg} />
      </div>
      <div className={style.rightSide}>
        <h1 className={style.title}>Make an account</h1>

        <form onSubmit={handleRegister} className={style.registerForm}>
          {error || initialError ? (
            <p className={style.error}>{initialError ?? error}</p>
          ) : (
            ""
          )}
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          {validationErrors.username && (
            <p className={style.errorMessage}>{validationErrors.username}</p>
          )}
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className={style.errorMessage}>{validationErrors.password}</p>
          )}
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            value={data.email}
            onChange={handleChange}
            type="email"
            required
          />
          {validationErrors.email && (
            <p className={style.errorMessage}>{validationErrors.email}</p>
          )}
          <label htmlFor="birthdate">Birthdate</label>
          <Input
            name="birthdate"
            value={data.birthdate}
            onChange={handleChange}
            type="date"
            required
          />
          {validationErrors.birthdate && (
            <p className={style.errorMessage}>{validationErrors.birthdate}</p>
          )}
          <label htmlFor="phone">Phone</label>
          <Input name="phone" value={data.phone} onChange={handleChange} />
          <label htmlFor="address_street">Address Street</label>
          <Input
            name="address_street"
            value={data.address_street}
            onChange={handleChange}
            required
          />
          {validationErrors.address_street && (
            <p className={style.errorMessage}>
              {validationErrors.address_street}
            </p>
          )}
          <label htmlFor="address_number">Address Number</label>
          <Input
            name="address_number"
            value={data.address_number}
            onChange={handleChange}
            required
          />
          {validationErrors.address_number && (
            <p className={style.errorMessage}>
              {validationErrors.address_number}
            </p>
          )}
          <label htmlFor="address_postalcode">Address Postalcode</label>
          <Input
            name="address_postalcode"
            value={data.address_postalcode}
            onChange={handleChange}
            required
          />
          {validationErrors.address_postalcode && (
            <p className={style.errorMessage}>
              {validationErrors.address_postalcode}
            </p>
          )}
          <label htmlFor="address_city">Address City</label>
          <Input
            name="address_city"
            value={data.address_city}
            onChange={handleChange}
            required
          />
          {validationErrors.address_city && (
            <p className={style.errorMessage}>
              {validationErrors.address_city}
            </p>
          )}

          <Button type="submit" disabled={isLoading} onClick={handleRegister}>
            {" "}
            Register{" "}
          </Button>
          <Link to="/login">I have an account</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
