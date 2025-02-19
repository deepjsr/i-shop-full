import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity } from "../../slicer/slicer";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.productCart.products) || [];
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(20);

  useEffect(() => {
    if (cartProducts.length > 0) {
      setLoading(false);
    }
  }, [cartProducts]);

  const totalAmount = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/order`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Deep",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(
            `${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handelAddOne = (product) => {
    dispatch(changeQuantity({ product, quantity: product.quantity + 1 }));
  };
  const handelRemoveOne = (product) => {
    dispatch(changeQuantity({ product, quantity: product.quantity - 1 }));
  };

  return (
    <div className="container my-5">
      <div className="alert alert-danger">
        Don't ask for Discounts{" "}
        <span className="bi bi-emoji-smile-upside-down"></span>
      </div>
      <h2>Checkout</h2>
      {cartProducts.length > 0 ? (
        <div>
          <ul className="list-group mb-3">
            {cartProducts.map((product) => (
              <li
                key={product._id}
                className="list-group-item d-flex justify-content-between lh-condensed row"
              >
                <img
                  className="col-md-3 rounded rounded-3 shadow-sm img-fluid"
                  src={product.image}
                  alt=""
                  style={{ height: 100, width: 100, objectFit: "cover" }}
                />
                <div className="col-md-4">
                  <h6 className="my-0">{product.title}</h6>
                  <small className="text-muted mt-3 d-flex">
                    {product.description}
                  </small>
                </div>
                <div className="col-md-1 d-flex justify-content-center align-items-center">
                  <span className="text-muted">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-end">
                  <button
                    className="btn btn-dark btn-sm rounded rounded-circle bi bi-dash"
                    onClick={() => handelRemoveOne(product)}
                  ></button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    className="btn btn-dark btn-sm rounded rounded-circle bi bi-plus"
                    onClick={() => handelAddOne(product)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <h4>
              Total Amount:{" "}
              {totalAmount ? (
                `$${totalAmount.toFixed(2)}`
              ) : (
                <Skeleton width={100} />
              )}
            </h4>
            <button onClick={handlePayment} className="btn btn-primary">
              Proceed to Payment
            </button>
            <Toaster />
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Link to="/">
        <button className="btn btn-dark mt-3">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default Checkout;
