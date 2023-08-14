import React from "react";
import { useAuthContext } from "../../contexts/AuthContainer";
import Button from "../../components/Global/Button/Button";
import "./profile.css";
import useFetch from "../../hooks/useFetch";

const Gegevens = () => {
  const { user } = useAuthContext();

  const { data: orders } = useFetch(`/profile/orders/${user._id}`);

  return (
    <div>
      <section className="gegevens">
        <div className="info">
          <div className="info_all">
            <h2 className="info__title">Accountoverzicht</h2>

            <p>name: {user.username}</p>
            <p>email: {user.email}</p>
            <p>phonenumber: {user.phone}</p>
            <p>
              street: {user.address_street} {user.address_number}
            </p>
            <p>
              city: {user.address_postalcode} {user.address_city}
            </p>
            <p>date of birth: {user.birthdate}</p>
            <button>
              <a href="/profile/edit">Edit</a>
            </button>
          </div>
        </div>
      </section>
      <section className="orders">
        <h2>Recent orders with us</h2>
        <div className="order">
          {orders && orders.length > 0 ? (
            orders.map((order) => <p key={order._id}>{order._id}</p>)
          ) : (
            <p>No orders</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gegevens;
