import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }), // Đảm bảo gửi đúng trường
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        // Xử lý đăng nhập thành công (ví dụ: lưu token, điều hướng)
        window.location.href = '/products';
      } else {
        setMessage(data.message || "Đăng nhập không thành công.");
      }
    } catch (error) {
      setMessage("Lỗi khi đăng nhập");
    }
  };
  
  return (
    <div className="container-account">
      <div className="left-side">
        <video autoPlay loop muted>
          <source src="/video1.mp4" type="video/mp4" /> {/* Điều chỉnh đường dẫn video nếu cần */}
        </video>
      </div>
      <div className="right-side">
        <form className="form" onSubmit={handleLogin}>
          <h2>ĐĂNG NHẬP</h2>
          <div>
            <label htmlFor="phone">Nhập số điện thoại</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel" // Thêm thuộc tính autocomplete
            />
          </div>
          <div>
            <label htmlFor="password">Nhập mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password" // Thêm thuộc tính autocomplete
            />
          </div>
          <div>
            <p>
              Bạn chưa có tài khoản. Vui lòng
              <Link to="/register"> Đăng ký</Link>
            </p>
          </div>
          <button type="submit">Đăng nhập</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
