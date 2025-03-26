import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function AdminNav() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function handleLogout() {
    alert();
  }
  return (
    <div className="d-flex  justify-content-between bg-light p-4 rounded">
      {/* Search Bar */}
      <div className="input-group d-flex w-25">
        <input
          type="text"
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" form-control border border-rounded  shadow-sm p-2"
        />
        <button className="btn btn-outline-info bi bi-search w-25  shadow-sm p-2"></button>
      </div>

      {/* Notification and Profile */}
      <div className="d-flex align-items-center justify-content-between">
        {/* Notification Icon */}
        <div className="position-relative me-2">
          <span className="bi bi-bell-fill me-2"></span>
        </div>

        {/* Profile */}
        <div className="d-flex align-items-center gap-2 border border-2 rounded rounded-5">
          <img
            loading="lazy"
            src="data:image/png;base64,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"
            alt="User Avatar"
            className=" rounded rounded-4"
            style={{ height: "30px" }}
          />
          <button
            className="btn btn-outline-ligth "
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <span className="bi bi-chevron-up"></span>
            ) : (
              <span className="bi bi-chevron-down"></span>
            )}
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
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
