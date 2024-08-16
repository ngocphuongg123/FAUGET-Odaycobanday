import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../features/cart/cartSlice.jsx";
// import { selectCartItemsCount } from "../features/cart/cartslice";

export const Header = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);
  return (
    <div className="header-wrap">
      <div className="header-box">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/logo4-remove.png" alt="Logo" />
          </Link>
        </div>

        <div className="header-right">
          <Link to="/products">SẢN PHẨM</Link>
          {/* <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input className="searchInput" placeholder="Tìm.." />
          </div> */}
          <Link to="/about">VỀ CHÚNG TÔI</Link>

          <Link to="/cart" className="icon-cart">
            {cartItemsCount >= 0 && (
              <span className="cart-count">
                {cartItemsCount}
                <i className="fa-solid fa-cart-plus" />
              </span>
            )}
          </Link>

          <Link to="/contact">LIÊN HỆ</Link>
          <div className="account-menu">
            <a href="#">TÀI KHOẢN</a>
            <ul className="dropdown">
              <li>
                <a href="/register">ĐĂNG KÝ</a>
              </li>
              <li>
                <a href="/login">ĐĂNG NHẬP</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
