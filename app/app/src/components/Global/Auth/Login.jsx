import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import style from "./LoginScreen.module.css";
import useMutation from "../../../hooks/useMutation";
import { useState } from "react";

const Login = ({ initialError, onLogin }) => {
  const { isLoading, error, mutate } = useMutation();

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    mutate(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      data,
      onSuccess: (data) => {
        onLogin(data);
        navigate("/");
      },
    });
  };

  return (
    <div className={style.form}>
      <h1>Inloggen</h1>
      <form
        onSubmit={handleSubmit}
        className={style.form_items}
        autoComplete="off"
      >
        <label htmlFor="username">Username</label>
        <Input name="username" value={data.username} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input
          name="password"
          value={data.password}
          onChange={handleChange}
          type="password"
        />
        <Button type="submit" color="primary" disabled={isLoading}>
          Login
        </Button>
        {error || initialError ? (
          <p className={style.errorMessage}>{initialError ?? error}</p>
        ) : (
          ""
        )}
        <Link to="/register">No account yet</Link>
      </form>
    </div>
  );
};

export default Login;
