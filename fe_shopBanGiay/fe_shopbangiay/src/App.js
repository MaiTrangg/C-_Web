import logo from './logo.svg';
import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/HomePage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShopPage from "./Components/Shop/ShopPage";
import ProductDetail from "./Components/Shop/ProductDetail";
import AuthPage from './Components/Login & Register/AuthPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/productDetail" element={<ProductDetail />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/shop/:categoryId" element={<ShopPage />} />
                <Route path="/productDetail/:productId" element={<ProductDetail />} />
                {/*<Route path="/productDetail/:id" element={<ProductDetail />} />*/}


            </Routes>
        </BrowserRouter>
    );
}
export default App;
