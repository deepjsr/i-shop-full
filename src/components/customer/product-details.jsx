import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { addToCart, updateQuantity } from "../../slicer/product-slicer";
import { addToCart } from "../../slicer/slicer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useFirebase } from "../../context/firebase";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add useNavigate hook
  const [quantity, setQuantity] = useState(1);
  const cartProducts = useSelector((state) => state.productCart.products) || [];
  const productCount =
    useSelector((state) => state.productCart.productCount) || 0;

  const firebase = useFirebase();

  const [product, setProduct] = useState(null);

  function handleAddToCart(product) {
    if (!product) {
      console.error("Product is null or undefined, cannot add to cart");
      return;
    }

    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Product added to cart", {
      duration: 8000,
      position: "top-center",
      theme: "colored",
      style: {
        background: "#333",
        color: "#fff",
        top: "80px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      },
      closeOnClick: true,
      hideProgressBar: true,
      pauseOnHover: true,
    });
  }

  useEffect(() => {
    firebase
      .getData(`i-shop-products`)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          console.log("No data available");
          return;
        }

        const data = snapshot.val();
        if (!data) {
          console.error("Snapshot data is null");
          return;
        }

        const productArray = Object.values(data); // Convert object to array
        const productById = productArray.find(
          (item) => Number(item.Id) === Number(id)
        );

        console.log("Fetched product:", productById);
        setProduct(productById);
      })
      .catch((error) => console.error("Firebase fetch error:", error));
  }, [id, firebase, productCount, cartProducts]);

  if (!product) {
    return (
      <div
        className=" my-5  d-flex align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => navigate("/")}
      >
        <span className="bi bi-arrow-left"></span> Back to Home
      </button>
      <div className="row">
        <div className="col-6">
          <img
            loading="lazy"
            src={product.image}
            className="img-fluid"
            alt="Product"
            style={{ height: 500, objectFit: "cover" }}
          />
        </div>
        <div className="col-6">
          <h2>{product.title || <Skeleton />}</h2>
          <p>Rating: ★★★★☆ ({product.rating?.count} Reviews)</p>
          <p>
            <span className="fs-4 text-danger">
              ${product.price || <Skeleton />}
            </span>
          </p>
          <button
            className="btn btn-outline-primary "
            onClick={() => handleAddToCart(product)}
            disabled={!product}
          >
            {product ? "Add to Cart" : "Loading..."}
          </button>
          <h5 className="mt-4">Details</h5>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
