import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../../slicer/slicer";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function NavBar() {
  const productCount = useSelector((state) => state.productCart.productCount);
  const products = useSelector((state) => state.productCart.products) || [];
  const totalPrice = useSelector((state) => state.productCart.TotalPrice);
  const [open, setOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const productArray = Array.isArray(products) ? products : [products];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    {
      CategoryId: 0,
      CategoryName: "",
    },
  ]);

  async function handleSearchResult() {
    console.log("search result");
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

  useEffect(() => {
    //loading categories
    axios.get(`http://localhost:8080/categories`).then((resp) => {
      resp.data.unshift({
        CategoryId: 0,
        CategoryName: "All",
      });
      setCategories(resp.data);
    });
  }, []); // Add an empty dependency array to avoid infinite re-renders

  return (
    <div className="">
      <div className="bg-danger w-100 p-2 d-flex justify-content-between">
        <h2 className="fs-1 fw-bold">I-Shope</h2>
        <div className="">
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
          <ul className="list-unstyled d-flex  mb-0">
            <li className="px-3">
              <a href="/" className="text-decoration-none text-dark">
                Home <span className="bi bi-caret-down-fill"></span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="text-decoration-none text-dark">
                Blog <span className="bi bi-caret-down-fill"></span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="text-decoration-none text-dark">
                About <span className="bi bi-caret-down-fill"></span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="text-decoration-none text-dark">
                Shope <span className="bi bi-caret-down-fill"></span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="text-decoration-none text-dark">
                Help <span className="bi bi-caret-down-fill"></span>
              </a>
            </li>
          </ul>
        </div>
        <div className=" d-flex justify-content-space-between">
          <button
            className=" btn rounded rounded-circle bi bi-bag-fill fs-4 bg-warning p-2 me-2 text-center"
            style={{ height: "50px", width: "50px" }}
            data-bs-toggle="modal"
            data-bs-target="#cartModal"
          ></button>
          <span
            className="badge bg-dark rounded rounded-circle position-absolute"
            style={{ marginLeft: "2.1rem" }}
          >
            {productCount}
          </span>
          <button
            className="btn  rounded rounded-circle text-center"
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
              {cookies.username.charAt(0).toUpperCase()}
            </span>
          </button>
          {open && (
            <div
              className="position-absolute bg-white shadow rounded p-2 mt-2"
              style={{ top: 58, width: "100px" }}
            >
              <ul className="list-unstyled mb-0">
                <li>
                  <button
                    className="btn btn-light w-100 text-start"
                    onClick={() => (
                      alert("Logging out..."), navigate("/login")
                    )}
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
                        className=" border-bottom border-2 p-2"
                        key={product._id}
                      >
                        <div className="row d-flex justify-content-between">
                          <div className="col-md-1">
                            <img
                              src={product.image}
                              alt="product"
                              style={{ height: 60 }}
                              className="rounded rounded-4 shadow-md"
                            />
                          </div>
                          <div className=" ms-4 my-3 col-md-4">
                            <span>{product.title || <Skeleton />}</span>
                          </div>
                          <div className="col-md-2 my-3 text-center">
                            <span className="text-secondary fw-bold">
                              {product.price * product.quantity || <Skeleton />}
                            </span>
                          </div>
                          <div className="col-md-4 my-3">
                            <button
                              className="btn btn-dark btn-sm rounded rounded-circle bi bi-plus"
                              onClick={() => handelAddOne(product)}
                            ></button>
                            <span className="mx-2 my-2 text-secondary">
                              {product.quantity || <Skeleton />}
                            </span>
                            <button
                              className="btn btn-dark btn-sm rounded rounded-circle bi bi-dash"
                              onClick={() => handelRemoveOne(product)}
                            ></button>
                            <button
                              className="btn btn-danger btn-sm rounded rounded-2 mx-4 bi bi-trash"
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
