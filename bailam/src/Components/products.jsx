import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Product = () => {
    const { categoryID } = useParams();
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    const [cates, setCates] = useState([]);
    const [prods, setProds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState(''); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories');
                const data = await response.json();
                setCates(data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        }

        const fetchProducts = async () => {
            try {
                let url;
                if (categoryID) {
                    url = `http://localhost:3000/products/category/${categoryID}?sort=${sortOrder}`;
                } else {
                    url = `http://localhost:3000/allproduct?sort=${sortOrder}`;
                }
        
                const response = await fetch(url);
                const data = await response.json();
                setProds(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products', error);
                setLoading(false);
            }
        }
        

        fetchCategories();
        fetchProducts();
    }, [categoryID, sortOrder]); 

    let titlePage = 'Tất cả sản phẩm';
    if (categoryID) {
        const category = cates.find(item => item.id === parseInt(categoryID));
        if (category) {
            titlePage = category.name;
        }
    }

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handleAddToCart = (sp) => {
        console.log('Adding to cart:', sp);
        // Thêm logic để thêm sản phẩm vào giỏ hàng tại đây
    };

    const renderProducts = prods.map((sp, index) => (
        <div key={index} className="col-hot">
            <Link to={`/product-detail/${sp.id}`} className="">
                <img src={`/${sp.image}`} alt={sp.name} title={sp.name} />
                <div className="nameProductList">{sp.name}</div>
            </Link>
            <p>{formatPrice(sp.price)}</p>
            <button onClick={() => handleAddToCart(sp)}>Add to Cart</button>
        </div>
    ));

    const renderCategories = cates.map((cate, index) => (
        <Link key={index} className="linkflow" to={`/products/${cate.id}`}>{cate.name}</Link>
    ));

    return (
        <>
            <div className="main-wrap">
                <div className="main-box">
                    <div className="categoryList">
                        <Link className="linkflow" to="/products">Tất cả sản phẩm</Link>
                        {renderCategories}
                    </div>
                    <h2 className="label">- {titlePage} -</h2>
                    <div className="sort-buttons">
                        <button onClick={() => handleSort('priceAsc')}>Sắp xếp giá tăng dần</button>
                        <button onClick={() => handleSort('priceDesc')}>Sắp xếp giá giảm dần</button>
                    </div>
                    <div className="row-hot">
                        {loading ? <p>Loading...</p> : renderProducts}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;
