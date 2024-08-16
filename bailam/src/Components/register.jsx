import { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, phone, password }), 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        // Có thể điều hướng đến trang đăng nhập hoặc trang chính
        window.location.href = '/login';
      } else {
        setMessage(data.message || "Đăng ký không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký người dùng:", error);
      setMessage("Lỗi khi đăng ký người dùng");
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
        <form className="form" onSubmit={handleRegister}>
          <h2>TẠO TÀI KHOẢN</h2>
          <div>
            <label htmlFor="fullname">Nhập tên đầy đủ</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Nhập email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Nhập số điện thoại</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Nhập mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p>
              Bạn đã có tài khoản. Vui lòng
              <Link to="/login"> Đăng nhập</Link>
            </p>
          </div>
          <button type="submit">Đăng ký</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
