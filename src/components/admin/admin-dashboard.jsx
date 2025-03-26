import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNav from "./admin-nav";
import Skeleton from "react-loading-skeleton";

function AdminDashboard() {
  const [item, setItem] = useState({ id: 0 });
  const [admin, setAdmin] = useState([
    {
      UserId: "",
      FirstName: "",
      LastName: "",
      Password: "",
    },
  ]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST_URL}/admin`)
      .then((resp) => resp.json())
      .then((data) => setAdmin(data));
  }, []);
  return (
    <div className="container">
      <AdminNav />
      <div className="mt-3 text-end">
        <Link to="#" className=" btn btn-lg btn-outline-success text-center">
          Add Item
        </Link>
      </div>
      <div className="container bg-info">
        <Skeleton height={20} count={3} />
      </div>
      <div
        className="d-flex align-item-center justify-content-center table-responsive"
        style={{ height: "500px" }}
      >
        {" "}
        <table
          className="table table-striped table-hover"
          style={{ maxWidth: "900px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">Title</th>
              <th scope="col">Preview</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((item) => (
              <tr key={item.FirstName}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td
                  className="text-wrap text-truncate"
                  style={{ maxWidth: "150px" }}
                >
                  {item.FirstName}
                </td>
                <td
                  className="text-wrap text-truncate"
                  style={{ maxWidth: "150px" }}
                >
                  {item.LastName}
                </td>
                <td>
                  <Link
                    to={`/edit-item/${item.itemId}`}
                    className="btn btn-primary  me-2"
                  >
                    <span className="bi bi-pen-fill me-2"></span>
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    // onClick={() => handelDelClick(item.itemId)}
                  >
                    <span className="bi bi-trash-fill"></span> Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ms-3 mb-3">
        <Link to="/" className=" btn btn-outline-light">
          <span className=" me-2 bi bi-arrow-left-square-fill fs-2"></span>
          {/* Back */}
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
