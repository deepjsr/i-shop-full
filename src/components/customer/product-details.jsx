import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { addToCart, updateQuantity } from "../../slicer/product-slicer";
import { addToCart } from "../../slicer/slicer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useFirebase } from "../../context/firebase";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add useNavigate hook
  const [quantity, setQuantity] = useState(1);
  const cartProducts = useSelector((state) => state.productCart.products) || [];

  const firebase = useFirebase();

  const [product, setProduct] = useState(null);

  function handleAddToCart(product) {
    dispatch(addToCart({ product, quantity }));
  }

  useEffect(() => {
    firebase.getData(`i-shop-products`).then((snapshot) => {
      const productArray = Object.values(snapshot.val());
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productArray = Object.values(data); // Convert object to array
        const productById = productArray.find(
          (item) => item.Id === parseInt(id)
        ); // Ensure both are numbers
        console.log(productById);
        setProduct(productById);
      } else {
        console.log("No data available");
      }
    });
  }, [id]);

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
            onClick={() => handleAddToCart(product)}
            className="btn btn-outline-primary"
          >
            Add To Cart
          </button>
          <h5 className="mt-4">Details</h5>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
