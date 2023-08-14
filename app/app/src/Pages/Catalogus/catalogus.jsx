import React from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Global/Loading/Loading";
import ProductCard from "../../components/Global/Card/productCard";
import { Link } from "react-router-dom";
import style from "./catalogus.module.css";

const Catalogus = () => {
  const { isLoading, error, data: catalogus } = useFetch("/catalogus");

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className={style.nextToEach}>
        <h2>Catalogus</h2>
        <div className="cart">
          <Link to="/cart">
            <button>View cart</button>
          </Link>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {catalogus.map((product) => (
          <div className="col" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogus;
