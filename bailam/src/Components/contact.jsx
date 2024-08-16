export const Contact = () => {
  return (
    <>
      <div className="container_cart">
        <div className="left-box-bill">
          <div className="contact-form">
            <form>
              <label htmlFor="name">Họ và Tên:</label>
              <input id="name" name="name" required type="text" />
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" required type="email" />
              <label htmlFor="message">Nội dung:</label>
              <textarea id="message" name="message" required rows="4" />
              <button type="submit">Gửi</button>
            </form>
          </div>
        </div>
        <div className="right-box-bill">
          <h3>Thông tin liên hệ</h3>
          <p>
            <span>Địa chỉ: </span>
            <span>QTSC9, Khu CVPM Quang Trung, Q.12, TPHCM</span>
          </p>
          <p>
            <span>Email: </span>
            <span>odaycobangiaygmail.com</span>
          </p>
          <p>
            <span>Số điện thoại:</span>
            <span>0123456789</span>
          </p>
          <p>
            <span>Website: </span>
            <span>odaycobangiay.com</span>
          </p>
          <p>
            <span>Facebook: </span>
            <span>FAUGET - Ở đây có bán giày</span>
          </p>
          <p>
            <span>Instagram: </span>
            <span>fauget.chaoxin</span>
          </p>
          <iframe
            allowFullScreen
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502276.82426047523!2d105.94629161112684!3d10.418581366954221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1721786091744!5m2!1svi!2s"
            style={{
              border: "0",
            }}
            width="100%"
          />
        </div>
      </div>
    </>
  );
};
