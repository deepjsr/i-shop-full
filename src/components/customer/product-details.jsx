import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { addToCart, updateQuantity } from "../../slicer/product-slicer";
import { addToCart } from "../../slicer/slicer";
import Skeleton from "react-loading-skeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cartProducts = useSelector((state) => state.productCart.products) || [];
  console.log(cartProducts, "cartProducts");

  // const [product, setProduct] = useState([
  //   {
  //     Id: 0,
  //     title: "",
  //     image: "",
  //     price: 0,
  //     description: "",
  //     rating: { rate: 0, count: 0 },
  //     category: "",
  //     quantity: 0,
  //   },
  // ]);
  // const [product, setProduct] = useState(null);

  function handleAddToCart(product) {
    console.log(product, "product");
    dispatch(addToCart({ product, quantity }));
  }

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/products/${parseInt(id)}`).then((resp) => {
  //     setProduct(Array.isArray(resp.data) ? resp.data[0] : resp.data);
  //     console.log(typeof resp.data, "resp");
  //   });
  // }, [id]);

  // if (!product) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div className="">
  //     <div className="container my-5">
  //       <div className="row">
  //         <div className="col-md-6">
  //           {product.map((item) => (
  //             <img
  //               key={item.Id}
  //               src={item.image}
  //               className="img-fluid"
  //               alt="Product"
  //               style={{ height: 500, objectFit: "cover" }}
  //             />
  //           ))}
  //           <img
  //             src={product.image}
  //             className=""
  //             alt=""
  //             style={{ height: 300, objectFit: "cover" }}
  //           />
  //         </div>
  //         {product && (
  //           <div className="col-md-6">
  //             <img
  //               src={product.image}
  //               className="img-fluid"
  //               alt="Product"
  //               style={{ height: 500, objectFit: "cover" }}
  //             />
  //             <h2>{product.title || <Skeleton />}</h2>
  //             <p>Rating: ★★★★☆ ({product.rating?.count} Reviews)</p>
  //             <p>
  //               <span className="fs-4 text-danger">
  //                 ${product.price || <Skeleton />}
  //               </span>
  //             </p>
  //             <button
  //               onClick={() => handleAddToCart(product)}
  //               className="btn btn-outline-dark"
  //             >
  //               Add To Cart
  //             </button>
  //             <h5 className="mt-4">Details</h5>
  //             <p>{product.description}</p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     <Link to="/">
  //       <button className="btn btn-dark rounded rounded-circle mx-3 my-2">
  //         <span className="bi bi-arrow-left-short"></span>
  //       </button>
  //     </Link>
  //   </div>
  // );

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${parseInt(id)}`)
      .then((resp) => {
        console.log("API Response:", resp.data);
        setProduct(Array.isArray(resp.data) ? resp.data[0] : resp.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            className="img-fluid"
            alt="Product"
            style={{ height: 500, objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title || <Skeleton />}</h2>
          <p>Rating: ★★★★☆ ({product.rating?.count} Reviews)</p>
          <p>
            <span className="fs-4 text-danger">
              ${product.price || <Skeleton />}
            </span>
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-outline-dark"
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
