import React, { useEffect, useState } from "react";
import style from "./checkout.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Checkout = () => {
  const { id } = useParams();
  const { data: order } = useFetch(`/order-confirmation/${id}`);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (order) {
      setIsLoading(false);
    }
  }, [order]);

  function parseOrderDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // get original price
  const originalPrice = order.order.reduce((acc, product) => {
    return acc + parseFloat(product.price);
  }, 0);

  let discountAmount = 0;
  if (order.discount && order.discount.amount) {
    const discountPercentage = order.discount.amount;
    discountAmount = (originalPrice / 100) * discountPercentage;
  }

  return (
    <div className={style.confirmationContainer}>
      <div className="invoice">
        <div className="container mt-6 mb-7">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-xl-7">
              <div className="card">
                <div className="card-body p-5">
                  <h2>Hey {order.firstName},</h2>
                  <p className="fs-sm">
                    This is the receipt for a payment of{" "}
                    <strong>€{order.total_price}</strong>.
                  </p>

                  <div className="border-top border-gray-200 pt-4 mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-muted mb-2">Payment No.</div>
                        <strong>#{order._id}</strong>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="text-muted mb-2">Order Date</div>
                        <strong>{parseOrderDate(order.order_created)}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="border-top border-gray-200 mt-4 py-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-muted mb-2">Client</div>
                        <strong>
                          {order.firstName} {order.lastName}
                        </strong>
                        <p className="fs-sm">
                          {order.street} {order.houseNumber}
                          <br />
                          {order.postalCode} {order.city}
                          <br />
                          <a href="#!" className="text-purple">
                            {order.email}
                          </a>
                        </p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="text-muted mb-2">Payment To</div>
                        <strong>KLJ Keerbergen</strong>
                        <p className="fs-sm">
                          Putsebaan 115
                          <br />
                          3140 Keerbergen
                          <br />
                          <a href="#!" className="text-purple">
                            klj.keerbergen@hotmail.be
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <table className="table border-bottom border-gray-200 mt-3">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="fs-sm text-dark text-uppercase-bold-sm px-0"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="fs-sm text-dark text-uppercase-bold-sm text-end px-0"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.order.map((product, index) => (
                        <tr key={index}>
                          <td className="px-0">{product.name}</td>
                          <td className="text-end px-0">€{product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-5">
                    <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Subtotal:</p>
                      <span>€{originalPrice}</span>
                    </div>
                    <div className="d-flex justify-content-end">
                      {discountAmount > 0 ? (
                        <>
                          <p className="text-muted me-3">Discount:</p>
                          <span>-€{discountAmount}</span>
                        </>
                      ) : null}
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                      <h5 class="me-3">Total:</h5>
                      <h5 class="text-success">€{order.total_price}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* thanks to https://www.bootdey.com/snippets/view/invoice-with-client-info-description-amount-and-pay-now-button */}
      </div>
    </div>
  );
};

export default Checkout;
