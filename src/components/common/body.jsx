import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { addAll } from "../../slicer/product-slicer";
import Skeleton from "react-loading-skeleton";

const ProductGrid = () => {
  const [products, setProducts] = useState([
    {
      Id: 0,
      category: "",
      description: "",
      image: "",
      price: 0,
      rating: { rate: 0, count: 0 },
      title: "",
    },
  ]);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();

  const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/products`).then((resp) => {
      // dispatch(addAll(resp.data));
      setProducts(resp.data);
      console.log(resp.data, "resp");
    });
  }, []);

  function handleShopeNowClick(productId) {
    const existingIds = JSON.parse(getCookie("id") || "[]");

    if (!existingIds.includes(productId)) {
      existingIds.push(productId);
    }
    setCookie("id", JSON.stringify(existingIds));

    navigate(`/productdetails/${existingIds[existingIds.length - 1]}`);
    // navigate(`/productdetails/{id}`);
  }

  return (
    <div className="container my-5">
      <h2 className="text-center ">New Arrivals</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 col-sm-6 mb-4" key={product.Id}>
            <div className="card">
              <img
                src={product.image}
                className="card-img-top wrap"
                alt={product.name}
                style={{ height: 200, objectFit: "cover" }}
              />
              <div className="card-body text-center">
                {product.sale && <span className="badge bg-danger">SALE</span>}
                <h5 className="card-title mt-2">{product.name}</h5>
                <p
                  className="card-text text-truncate"
                  style={{
                    minHeight: "40px",
                    maxHeight: "80px",
                    maxWidth: "100%",
                    overflow: "auto",
                  }}
                >
                  {product.description}
                </p>
                <p className="fw-bold">
                  {product.discountedPrice ? (
                    <>
                      <del className="text-muted">$ {product.price}</del>
                      <span className="ms-2 text-danger fw-bold me-0">
                        $ {product.discountedPrice}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <p>Price:&nbsp;</p>
                        </div>
                        <div className="col-md-6 me-0">
                          <span className="text-danger">
                            $&nbsp;{product.price}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <p>
                            Rateings:&nbsp;
                            <span className="bi bi-star-fill text-warning"></span>
                          </p>
                        </div>
                        <div className="col-md-6 me-0">
                          <span className="text-secondary ms-3">
                            {product.rating.count || <Skeleton />}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <p>Rate:&nbsp;</p>
                        </div>
                        <div className="col-md-6 me-0">
                          <span className="text-secondary ms-4 fw-bold">
                            {product.rating.rate || <Skeleton />}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </p>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-dark w-100 text-white"
                  onClick={() => handleShopeNowClick(product.Id)}
                >
                  SHOPE NOW
                  <span className="bi bi-caret-right-fill"></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
