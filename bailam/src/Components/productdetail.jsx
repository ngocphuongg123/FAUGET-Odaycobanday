import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductDetail = () => {
  const { id } = useParams();

  const [prod, setProd] = useState([]);
  useEffect(() => {
    const fetchProddetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();
        setProd(data);
      } catch (error) {
        console.error("Error fetch Product detail");
      }
    };

    fetchProddetail();
  }, [id]);

  return (
    <div className="detail-wrap">
      <div className="detail-box">
        <div className="detail-content">
          <div className="detail-content-1">
            <img
              className="imgDetailP"
              src={`/public/${prod.image}`}
              alt={prod.name}
            />
          </div>
          <div className="detail-content-2">
            <h2 className="detail-title">{prod.name}</h2>
            <p className="detail-price">Giá: {prod.price}</p>
            <div className="detail-description">
              <p>
                Mô tả chi tiết: <br />
                {prod.description}
              </p>
            </div>
            <div className="btn-buy">Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
  );
};
