import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductDetails from "./product-details";
import { getCookie } from "cookies-next";
import { useFirebase } from "../../context/firebase";
function Login() {
  const { id } = useParams();
  const firebase = useFirebase();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_HOST_URL}/customers`)
        .then((response) => {
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

  async function handleGoogleLogin() {
    try {
      const response = await firebase.signInWithGoogle();
      if (response) {
        console.log(response.user.isSignedIn, "Google login successful");
        setCookie("username", response.user.displayName);
        navigate(`/`);
      } else {
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  }
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-4">
              <div className="card-body">
                <div className="text-center">
                  <h3 className="text-start mb-3 fw-bold card-title">
                    User Login
                  </h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <fieldset className="border p-3">
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
                      <hr className="divider" />

                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={handleGoogleLogin}
                      >
                        <span className="bi bi-google me-2"></span>
                        Continue With Google
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-3 text-success">
        &copy; All rights reserved
      </p>
    </div>
  );
}

export default Login;
