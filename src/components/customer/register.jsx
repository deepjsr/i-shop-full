import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function UserRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/adminDash");
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      UserId: "",
      FirstName: "",
      LastName: "",
      Password: "",
      Gender: "",
      Email: "",
      Mobile: "",
      Address: "",
      DOB: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const registerUser = (retryCount = 0) => {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_HOST_URL}/customerregiste`,
            values
          )
          .then((response) => {
            console.log(response.data);
            alert("Data saved...");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error registering user:", error);
            if (retryCount < 2) {
              console.log(`Retrying... (${retryCount + 1})`);
              registerUser(retryCount + 1);
            } else {
              alert("Failed to register. Please try again later.");
            }
          });
      };
      registerUser();
    },
  });
  return (
    <div>
      <div className="container" style={{ height: "100vh" }}>
        <div className="row">
          <div className="col-md-9 offset-md-2">
            <div className="card bg-light">
              <div
                className="card-body overflow-auto"
                style={{ height: "500px" }}
              >
                <div className="">
                  {isAdminRoute ? (
                    <h3 className="fw-bold fs-3 ms-0">Register Admin </h3>
                  ) : (
                    <h3 className="fw-bold fs-3 ms-0">Register User </h3>
                  )}
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <fieldset class="border p-3">
                    <div className="mb-3">
                      <label
                        htmlFor="FirstName"
                        name="FirstName"
                        className="form-label"
                      >
                        First Name
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="FirstName"
                        name="FirstName"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="LastName"
                        name="LastName"
                        className="form-label"
                      >
                        Last Name
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="LastName"
                        name="LastName"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="UserId"
                        name="UserId"
                        className="form-label"
                      >
                        User Name
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="UserId"
                        name="UserId"
                        required
                      />
                      {/* {message} */}
                      <div className="text-danger">{message}</div>
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
                        type="Password"
                        className="form-control"
                        id="Password"
                        name="Password"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="Email"
                        name="Email"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="email"
                        className="form-control"
                        id="Email"
                        name="Email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="Mobile"
                        name="Mobile"
                        className="form-label"
                      >
                        Mobile
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        className="form-control"
                        id="Mobile"
                        name="Mobile"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="DOB" name="DOB" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        onChange={formik.handleChange}
                        type="date"
                        className="form-control"
                        id="DOB"
                        name="DOB"
                        required
                      />
                    </div>

                    <div className="mb-3 d-flex">
                      <label
                        htmlFor="Gender"
                        name="Gender"
                        className="form-label"
                      >
                        Gender
                      </label>
                      <div className="form-check mx-2 mt-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Gender"
                          id="Gender"
                          value="M"
                          checked={formik.values.Gender === "M"}
                          onChange={formik.handleChange}
                        />
                        <label className="form-check-label" for="Gender">
                          Male
                        </label>
                      </div>
                      <div class="form-check mt-1">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="Gender"
                          id="Gender"
                          value="F" // Assign "F" for Female
                          checked={formik.values.Gender === "F"}
                          onChange={formik.handleChange}
                        />
                        <label class="form-check-label" for="Gender">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="Address"
                        name="Address"
                        className="form-label"
                      >
                        Address
                      </label>
                      <textarea
                        onChange={formik.handleChange}
                        className="form-control"
                        id="Address"
                        name="Address"
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </fieldset>
                </form>
                <div className=" mt-2">
                  <Link to="/login" className="text-style-none">
                    {" "}
                    Already have a account Login...
                  </Link>
                </div>
                <div class="text-center">
                  <span>or</span>
                </div>
                <legend className="fs-6 mt-2 text-secondary">
                  Login with social media
                </legend>
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
    </div>
  );
}

export default UserRegister;
