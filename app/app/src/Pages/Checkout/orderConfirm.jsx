import React, { useEffect, useState } from "react";
import style from "./checkout.module.css";
import useFetch from "../../hooks/useFetch";

const Checkout = () => {
  return (
    <div className={style.confirmationContainer}>
      <h2>Confirmation</h2>
      <p>Thanks for ordering!</p>
    </div>
  );
};

export default Checkout;
