import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useFirebase } from "../../context/firebase";

const Body = () => {
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
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  const firebase = useFirebase();

  const navigate = useNavigate();

  // const PrivateRoute = ({ isAuthenticated }) => {
  //   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  // };

  useEffect(() => {
    firebase
      .getData(`i-shop-products`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProducts(snapshot.val());
          setLoading(false); // Set loading to false when data is fetched
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle mb-3"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter
          <i class="bi bi-funnel"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <a class="dropdown-item active" href="#">
              Brand
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Category
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Price
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </li>
        </ul>
      </div>
      <div className="row">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div className="col-md-3 col-sm-6 mb-4" key={index}>
                <Skeleton height={400} />
              </div>
            ))
          : products.map((product) => (
              <div className="col-md-3  mb-4" key={product.Id}>
                <div className="card">
                  <img
                    loading="lazy"
                    src={product.image}
                    className="card-img-top wrap"
                    alt={product.name}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    {product.sale && (
                      <span className="badge bg-danger">SALE</span>
                    )}
                    <h5 className="card-title  mt-2">{product.name}</h5>
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
                    <div className="fw-bold">
                      {product.discountedPrice ? (
                        <>
                          <del className="text-muted">$ {product.price}</del>
                          <span className="ms-2 text-danger fw-bold me-0">
                            $ {product.discountedPrice}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="row no-gutters">
                            <div className="col-6 d-flex">
                              <p>Price:&nbsp;</p>
                            </div>
                            <div className="col-6 col-md-auto">
                              <span className="text-danger">
                                $&nbsp;{product.price}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 d-flex">
                              <p>
                                Rateings:&nbsp;
                                <span className="bi bi-star-fill text-warning"></span>
                              </p>
                            </div>
                            <div className="col-6 col-md-auto">
                              <span className="text-secondary ms-3">
                                {product.rating.count || <Skeleton />}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 d-flex">
                              <p>Rate:&nbsp;</p>
                            </div>
                            <div className="col-6 col-md-auto">
                              <span className="text-secondary ms-3 fw-bold">
                                {product.rating.rate || <Skeleton />}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-success w-100 text-white"
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

export default Body;
