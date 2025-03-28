import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/common/home";
import ProductDetails from "./components/customer/product-details";
import NavBar from "./components/common/nav";
import Footer from "./components/common/footer";
import AdminDashboard from "./components/admin/admin-dashboard";
import PageNotFound from "./components/common/page-not-found";
import Login from "./components/customer/login";
import UserRegister from "./components/customer/register";
import PrivateRoute from "./components/common/private-route";
import Checkout from "./components/common/checkout";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/adminDash");
  const isLoginRoute = location.pathname.startsWith("/login");
  const isRegisterRoute = location.pathname.startsWith("/user-register");

  return (
    <div
      className={`${
        isAdminRoute || isLoginRoute || isRegisterRoute
          ? "bg-login"
          : "bg-body-color"
      }`}
    >
      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && <NavBar />}
      {(isLoginRoute || isRegisterRoute) && (
        <h1 className="fw-bold fs-2 text-light text-center p-3  mx-3">
          I-SHOPE
        </h1>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/productdetails/:id"
          element={<PrivateRoute element={<ProductDetails />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute element={<Checkout />} />}
        />
        <Route path="/adminDash" element={<AdminDashboard />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!isLoginRoute && !isRegisterRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
export default App;
