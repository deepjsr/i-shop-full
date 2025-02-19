import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductDetails from "./product-details";
import { getCookie } from "cookies-next";

function Login() {
  const { id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios.get("http://localhost:8080/customers").then((response) => {
        console.log(response.data);

        const user = response.data.find(
          (item) => item.UserId === values.username
        );
        if (user) {
          if (user.Password === values.password) {
            // showLoading();
            const storedIds = JSON.parse(getCookie("id") || "[]");
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 15);
            setCookie("username", values.username, { expires });
            // MySwal.hideLoading();
            navigate(`/productdetails/${storedIds[storedIds.length - 1]}`);
            // navigate(`/productdetails/{id}`);
          } else {
            alert("Invalid password");
            // MySwal.fire("Invalid password");
          }
        } else {
          //   MySwal.fire("Invalid username");
          alert("Invalid username");
        }
      });
    },
  });
  return (
    <div className="">
      <div className="container  my-4">
        <div className="row">
          <div className="col-md-5 offset-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <div className="text-center">
                  <h3 className="text-start mb-3 fw-bold card-title">
                    User Login
                  </h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <fieldset class="border p-3">
                    <div className="mb-3">
                      <label
                        htmlFor="username"
                        name="usename"
                        className="form-label"
                      >
                        Username
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        name="password"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </fieldset>
                </form>
                <div
                  className="
                d-flex"
                >
                  <legend className="border-left fs-6 mt-2 text-secondary w-50">
                    Login with social media
                  </legend>
                  <div className="text-end mt-2 w-50">
                    <Link to="/user-register">Register New User</Link>
                  </div>
                </div>
                <div className="d-flex row gap-1 align-item-center justify-content-center">
                  <button
                    className=" bg-dark text-white rounded rounded-circle "
                    style={{ height: "50px", width: "50px" }}
                  >
                    <span className="bi bi-facebook"></span>{" "}
                  </button>
                  <button
                    className=" bg-dark text-white rounded rounded-circle "
                    style={{ height: "50px", width: "50px" }}
                  >
                    <span className="bi bi-google"></span>
                  </button>
                  <button
                    className=" bg-dark text-white rounded rounded-circle "
                    style={{ height: "50px", width: "50px" }}
                  >
                    <span className="bi bi-microsoft"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center">&copy; All rights reserved</p>
    </div>
  );
}

export default Login;
