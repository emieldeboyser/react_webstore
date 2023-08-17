import React from "react";
import { useAuthContext } from "../../contexts/AuthContainer";
import "./profile.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const Gegevens = () => {
  const { user } = useAuthContext();
  const [addressVisible, setAddressVisible] = useState(false);

  const toggleAddressVisibility = () => {
    setAddressVisible(!addressVisible);
  };

  const { data: orders } = useFetch(`/profile/orders/${user._id}`);
  console.log(orders);

  function parseOrderDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

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
            orders.map((order) => (
              <div className="order__item">
                <h4>We've received your order!</h4>
                <div className="containerOrder">
                  <div className="topPart">
                    <div className="order__status">
                      <p>Order status:</p>
                      <p>Confirmed</p>
                    </div>
                    <div>
                      <p>OrderNumber:</p>
                      <p>#{order._id}</p>
                    </div>
                    <div>
                      <p>Order date:</p>
                      <p key={order._id}>
                        {parseOrderDate(order.order_created)}
                      </p>
                    </div>
                    <div className="totalPrice">
                      <p>Order price:</p>
                      <p key={order._id}>€{order.total_price}</p>
                    </div>
                  </div>

                  <div className="products">
                    <div className="product">
                      <div className="order-items">
                        {order.order.map((product) => (
                          <div className="order-item">
                            <img
                              src={`images/${product.photo}`}
                              alt={product.name}
                            />

                            <p key={product._id}>{product.name}</p>
                            <p>€{product.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="address">
                      <p onClick={toggleAddressVisibility}>
                        Delivery address ⌄
                      </p>
                      {addressVisible && (
                        <>
                          <p>
                            Name: {order.firstName} {order.lastName}
                          </p>
                          <p>
                            Address: {order.street} {order.houseNumber}
                          </p>
                          <p>
                            City: {order.postalCode} {order.city}
                          </p>
                          <p>Country: {order.country}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No orders</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gegevens;
