import './App.css'
import { Header } from './Components/header'
import { Footer } from './Components/footer'
import { Home } from './Components/home';
import { Product } from './Components/products';
import { ProductDetail } from './Components/productdetail';
import { Cart } from './Components/cart';
import { Contact } from './Components/contact';
import { Register } from './Components/register';
import { Login } from './Components/login';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {

  return (
    <Router>
      <Header />

      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/products" element={<Product/>}></Route>
      <Route path="/products/:categoryID" element={<Product/>}></Route>
      <Route path="/product-detail/:id" element={<ProductDetail/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      
      </Routes>
      
      <Footer />
    </Router>
  )
}

export default App
