import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../../slicer/slicer";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFirebase } from "../../context/firebase";
import { set } from "firebase/database";

function NavBar() {
  const productCount = useSelector((state) => state.productCart.productCount);
  const products = useSelector((state) => state.productCart.products) || [];
  const totalPrice = useSelector((state) => state.productCart.TotalPrice);
  const [open, setOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [toggleNight, setToggleNight] = useState(false);

  const productArray = Array.isArray(products) ? products : [products];
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light"); // State to manage theme

  const usernameInitial = cookies.username
    ? cookies.username.charAt(0).toUpperCase()
    : "";

  const [categories, setCategories] = useState([
    {
      CategoryId: 0,
      CategoryName: "",
    },
  ]);

  async function handleSearchResult() {
    console.log("search result");
  }
  function handelLogout() {
    firebase.logOut();
    removeCookie("username");
    removeCookie("email");
    removeCookie("token");
    removeCookie("userId");
    setOpen(false);
    navigate("/");
  }

  function handelAddOne(product) {
    dispatch(changeQuantity({ product, quantity: product.quantity + 1 }));
  }
  function handelRemoveOne(product) {
    dispatch(changeQuantity({ product, quantity: product.quantity - 1 }));
  }

  function handelRemoveAll(product) {
    dispatch(changeQuantity({ product, quantity: 0 }));
  }

  function handleCheckout() {
    navigate("/checkout");
  }

  const toggleTheme = (e) => {
    setTheme(e.target.value);
    setToggleNight(false);
  };
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);

    // Loading categories
    firebase
      .getData("i-shop-categories")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          data.unshift({
            CategoryId: 0,
            CategoryName: "All  Categories",
          });
          setCategories(Object.values(data));

          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [theme]);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <h2 className="fs-1 fw-bold">I-Shope</h2>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className={`bi ${collapsed ? "bi-list" : "bi-x"}`}></span>
          </button>
          <div
            className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
            id="navbarToggler"
          >
            {/* LINKS */}
            <ul className="navbar-nav ms-3 mb-2 mb-lg-0 positon-absolute top-2">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  Home
                </a>
                <ul className="dropdown-menu w-75">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-2"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blog
                </a>
                <ul className="dropdown-menu w-75">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-2"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About
                </a>
                <ul className="dropdown-menu w-75">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link"
                  href="/"
                  role="button"
                  aria-expanded="false"
                >
                  Contact us
                </a>
              </li>
            </ul>

            {/* search bar */}
            <div className="ms-auto mb-2">
              <div className="input-group">
                <select name="CategoryId" className="form-control">
                  {categories.map((category) => (
                    <option
                      key={category.CategoryId}
                      value={category.CategoryId}
                      name={category.CategoryId}
                    >
                      {category.CategoryName}
                    </option>
                  ))}
                </select>
                <input
                  //   onChange={handelSearch}
                  type="text"
                  className=" form-control"
                  placeholder="Search"
                />
                <button
                  //   onClick={handleSearchResult}
                  className="bi bi-search btn btn-warning"
                ></button>
              </div>
            </div>
            <div className="ms-2 mb-2">
              <button
                className="btn btn-sm btn-success shadow shadow-md rounded rounded-5 p-2"
                onClick={() => navigate("/login")}
              >
                <span className="bi bi-person mx-1"></span>
                Login / Register
              </button>
            </div>

            {/* Cart & AVATAR */}
            <div className="ms-0 position-relative">
              <button
                className="btn rounded rounded-circle bi bi-bag-fill fs-4 bg-warning p-2 mx-1 text-center"
                style={{ height: "50px", width: "50px" }}
                data-bs-toggle="modal"
                data-bs-target="#cartModal"
              ></button>
              <span
                className="badge bg-dark rounded rounded-circle position-absolute"
                style={{ left: "2.5rem" }}
              >
                {productCount}
              </span>
              <button
                className="btn mx-3  rounded rounded-circle text-center"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundImage: `url(${process.env.PUBLIC_URL}/dp-back.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => setOpen(!open)}
              >
                <span className="fw-bold fs-4">
                  {usernameInitial}
                  {/* {cookies["username"].displayName.split(" ")[0]} */}

                  {/* {cookies["username"].charAt(0).toUpperCase()} */}
                </span>
              </button>
              <button
                className="btn  btn-outline-dark ms-2 rounded rounded-circle text-center"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => setToggleNight(!toggleNight)}
              >
                <span className="fw-bold fs-4">
                  <i className="bi bi-moon-stars-fill"></i>
                </span>
              </button>
              {toggleNight && (
                <div
                  className="position-absolute bg-white shadow rounded p-2 mt-2"
                  style={{ top: "3.2rem", width: "100px", left: "6.5rem" }}
                >
                  <ul className="list-unstyled mb-0">
                    <li>
                      <button
                        className="btn btn-light text-start"
                        value={"light"}
                        onClick={(e) => toggleTheme(e)}
                      >
                        <i className="bi bi-brightness-high-fill me-1"></i>
                        Light
                      </button>
                    </li>
                    <li className="mt-2 mb-2">
                      <button
                        className="btn btn-outline-dark text-start"
                        value={"dark"}
                        onClick={(e) => toggleTheme(e)}
                      >
                        <i className="bi bi-moon-stars-fill me-1"></i>
                        Dark
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-light text-start">
                        <i className="bi bi-circle-half me-1"></i>
                        Auto
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              {/* Avator */}
              {open && (
                <div
                  className="position-absolute bg-white shadow rounded p-2 mt-2"
                  style={{ top: 58, width: "100px", left: "3rem" }}
                >
                  <ul className="list-unstyled mb-0">
                    <li>
                      <button
                        className="btn btn-light w-100 text-start"
                        onClick={handelLogout} // Add navigate to home page
                      >
                        Log Out
                      </button>
                    </li>
                    <li>
                      <button className=" dropdown-menu btn btn-light w-100 text-start">
                        Lorem1
                      </button>
                      <button className="btn btn-light w-100 text-start">
                        Lorem1
                      </button>
                      <button className="btn btn-light w-100 text-start">
                        Lorem1
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MODALS */}
      <div className="modal fade modal-lg" id="cartModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cart Items</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {products.length > 0 ? (
                <>
                  <div className="">
                    {productArray.map((product) => (
                      <div
                        className="border-bottom border-2 py-2"
                        key={product._id}
                      >
                        <div className="row">
                          <div className="col-2 m-auto col-md-auto">
                            <img
                              src={product.image || null}
                              alt="product"
                              style={{ height: 40 }}
                              className="rounded rounded-4 shadow-md"
                            />
                          </div>
                          <div className="col-5 col-md-auto d-flex justify-content-center align-items-center">
                            <span
                              className="py-2 mx-4"
                              style={{
                                minHeight: "40px",
                                maxHeight: "80px",
                                minWidth: "50%",
                                overflow: "auto",
                              }}
                            >
                              {product.title || <Skeleton />}
                            </span>
                            <span className="text-secondary fw-bold">
                              {product.price * product.quantity || <Skeleton />}
                            </span>
                          </div>
                          <div className="col-5  m-auto text-center">
                            <button
                              className="btn btn-dark btn-sm rounded rounded-circle bi bi-plus"
                              onClick={() => handelAddOne(product)}
                            ></button>
                            <span className="mx-2 my-2 text-secondary">
                              {product.quantity}
                            </span>
                            <button
                              className="btn btn-dark btn-sm rounded rounded-circle bi bi-dash"
                              onClick={() => handelRemoveOne(product)}
                            ></button>
                            <button
                              className="btn btn-danger btn-sm rounded rounded-2 ms-1 bi bi-x"
                              onClick={() => handelRemoveAll(product)}
                            ></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-danger">{totalPrice}</div>
                  </div>
                </>
              ) : (
                <p>No items in the cart.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={handleCheckout}
                data-bs-dismiss="modal"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
