import React from "react";
import { useSelector } from "react-redux";
import store from "../../store/store";

function NavBar() {
  const productCount = useSelector((state) => state.productCart.productCount);
  const products = useSelector((state) => state.productCart.products) || [];
  const totalPrice = useSelector((state) => state.productCart.TotalPrice);
  const productArray = Array.isArray(products) ? products : [products];
  console.log(productArray, "productArray");

  return (
    <div className="">
      <div className="bg-danger w-100 p-2 d-flex justify-content-between">
        <h2 className="fs-1 fw-bold">I-Shope</h2>
        <div className="">
          <div className="input-group">
            <select name="" id="" className="form-control">
              <option value="">All</option>
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
            className="btn  bg-light rounded rounded-circle d-flex justify-content-center align-items-center"
            style={{ height: "50px", width: "50px" }}
          >
            p
          </button>
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
                      <div className=" border-bottom border-2 p-2">
                        <div className="row d-flex justify-content-between">
                          <div className="col-md-1">
                            <img
                              src={product.image}
                              alt="product"
                              style={{ height: 60 }}
                              className="rounded rounded-4 shadow-md"
                            />
                          </div>
                          <div className=" ms-4 col-md-4">
                            <span>{product.title}</span>
                          </div>
                          <div className="col-md-2 text-center">
                            <span className=" my-3 text-secondary fw-bold">
                              {product.price * product.quantity}
                            </span>
                          </div>
                          <div className="col-md-4">
                            <span className="btn btn-dark btn-sm rounded rounded-circle bi bi-plus"></span>
                            <span className="mx-2 my-2 text-secondary">
                              {product.quantity}
                            </span>
                            <span className=" btn btn-dark btn-sm rounded rounded-circle bi bi-dash"></span>
                            <span className="btn btn-danger btn-sm rounded rounded-2 mx-4 bi bi-trash"></span>
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
              <button type="button" className="btn btn-warning btn-sm">
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
