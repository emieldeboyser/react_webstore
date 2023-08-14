import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import style from "./LoginScreen.module.css";
import Login from "../../components/Global/Auth/Login";
import Register from "../../components/Global/Auth/Register";

const LoginScreen = ({ onLogin, initialError }) => {
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

  const handleRegister = (e) => {
    e.preventDefault();
    mutate(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      data,
      onSuccess: (data) => {
        onLogin(data);
        navigate("/");
      },
    });
  };

  return (
    <div>
      <div className={style.loginContainer}>
        <div className={style.left_side}>
          <img src="/images/hero.jpeg" alt="log" className={style.loginImg} />
        </div>
        {window.location.pathname === "/login" ? (
          <Login initialError={initialError} onLogin={onLogin} />
        ) : (
          <Register initialError={initialError} onLogin={onLogin} />
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
