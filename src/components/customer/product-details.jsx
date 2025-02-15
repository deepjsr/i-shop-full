import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, updateQuantity } from "../../slicer/product-slicer";
// import { addToCart } from "../../slicer/slicer";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cartProducts = useSelector((state) => state.productCart.products) || [];
  console.log(cartProducts, "cartProducts");

  const [product, setProduct] = useState([
    {
      Id: 0,
      title: "",
      image: "",
      price: 0,
      description: "",
      rating: { rate: 0, count: 0 },
      category: "",
      quantity: 0,
    },
  ]);

  function handleAddToCart(product) {
    console.log(product, "product");
    dispatch(addToCart({ product, quantity }));
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${parseInt(id)}`).then((resp) => {
      setProduct(resp.data);
      console.log(resp.data, "resp");
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            {product.map((item) => (
              <img
                key={item.Id}
                src={item.image}
                className="img-fluid"
                alt="Product"
                style={{ height: 500, objectFit: "cover" }}
              />
            ))}
            <img
              src={product.image}
              className="img-fluid"
              alt="Product"
              style={{ height: 500, objectFit: "cover" }}
            />
          </div>
          {product.map((item) => {
            return (
              <div key={item.Id} className="col-md-6">
                <Link
                  to="/"
                  className=" d-flex flex-column text-decoration-none"
                >
                  <button className="btn btn-outline-dark rounded rounded-5 align-self-end">
                    Shope More
                  </button>
                </Link>
                <h2>{item.title}</h2>
                <p className="text-warning"></p>
                ★★★★☆ ({item.rating.count} Reviews)
                <p>
                  <span className="fs-4 text-danger">${item.price}</span>
                </p>
                <div className="d-grid gap-2">
                  <button className="btn btn-dark">Checkout Now</button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn btn-outline-dark"
                  >
                    Add To Cart
                  </button>
                </div>
                <h5 className="mt-4">Details</h5>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/">
        <button className="btn btn-dark rounded rounded-circle mx-3 my-2">
          <span className="bi bi-arrow-left-short"></span>
        </button>
      </Link>
    </div>
  );
};
export default ProductDetails;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { addToCart } from "../../slicer/slicer";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const cartProducts = useSelector((state) => state.productCart.products) || [];
//   console.log(cartProducts, "cartProducts");

//   const [product, setProduct] = useState({
//     Id: 0,
//     title: "",
//     image: "",
//     price: 0,
//     description: "",
//     rating: { rate: 0, count: 0 },
//     category: "",
//     quantity: 0,
//   });

//   function handleAddToCart(product) {
//     console.log(product, "product");
//     dispatch(addToCart({ product: product, quantity: quantity }));
//   }

//   useEffect(() => {
//     axios.get(`http://localhost:8080/products/${parseInt(id)}`).then((resp) => {
//       setProduct(resp.data);
//       console.log(resp.data, "resp");
//     });
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="">
//       <div className="container my-5">
//         <div className="row">
//           <div className="col-md-6">
//             <img
//               src={product.image}
//               className="img-fluid"
//               alt="Product"
//               style={{ height: 500, objectFit: "cover" }}
//             />
//           </div>
//           <div className="col-md-6">
//             <Link to="/" className=" d-flex flex-column text-decoration-none">
//               <button className="btn btn-outline-dark rounded rounded-5 align-self-end">
//                 Shope More
//               </button>
//             </Link>
//             <h2>{product.title}</h2>
//             <p className="text-warning">
//               {/* ★★★★☆ ({product.rating.count} Reviews) */}
//             </p>
//             <p>
//               <span className="fs-4 text-danger">${product.price}</span>
//             </p>
//             <div className="d-grid gap-2">
//               <button className="btn btn-dark">Checkout Now</button>
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="btn btn-outline-dark"
//               >
//                 Add To Cart
//               </button>
//             </div>
//             <h5 className="mt-4">Details</h5>
//             <p>{product.description}</p>
//           </div>
//         </div>
//       </div>
//       <Link to="/">
//         <button className="btn btn-dark rounded rounded-circle mx-3 my-2">
//           <span className="bi bi-arrow-left-short"></span>
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default ProductDetails;
