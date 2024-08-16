// import React from 'react';
import { useSelector } from "react-redux";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div>
      <h2
        style={{
          margin: "20px 0",
          fontWeight: "bold",
          color: "black",
        }}
      >
        GIỎ HÀNG CỦA BẠN
      </h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h1>Giỏ hàng của bạn trống trơn</h1>
          <img src="/public/empty_cart.jpeg" alt="Giỏ hàng trống" />
        </div>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="img-cart"
                      src={item.image}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-amount">Tổng tiền: ${totalAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
