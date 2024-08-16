import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export const Home = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const [prohot, setprohot] = useState([]);

  useEffect(() => {
    const fetchHot = async () => {
      try {
        const hotRes = await fetch("http://localhost:3000/products/hot");
        const data = await hotRes.json();
        setprohot(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHot();
  }, []);
  const [quantity, setQuantity] = useState(1);
  setQuantity

  // // add to cart
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    const productCart = {...product, quantity}
    dispatch(addToCart(productCart));
  };

  const sortedProducts = prohot
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const renderProductsHot = sortedProducts.map((sp, index) => (
    <div key={index} className="col-hot">
      <Link to={`/product-detail/${sp.id}`} className="">
        <img src={`/public/${sp.image}`} alt={sp.name} title={sp.name} />
        <div className="nameProductList">{sp.name}</div>
      </Link>
      <p>{formatPrice(sp.price)}</p>
      <button onClick={() => handleAddToCart(sp)}>Add to Cart</button>
    </div>
  ));

  return (
    <div className="main-wrap">
      <div className="banner"></div>
      <div className="main-box">
        <h2 className="label">- Sản phẩm HOT -</h2>
        <div className="row-hot">{renderProductsHot}</div>
      </div>
    </div>
  );
};
