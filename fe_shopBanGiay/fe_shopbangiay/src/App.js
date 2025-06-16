import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/HomePage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShopPage from "./Components/Shop/ShopPage";
import ProductDetail from "./Components/Shop/ProductDetail";
import AuthPage from './Components/Login & Register/AuthPage';

import CartPage from "./Components/CartPage/CartPage";
// import {CartProvider} from "./contexts/CartContext";
import CheckoutPage from "./CheckoutPage/CheckoutPage";
import ResetPassword from './Components/Login & Register/ResetPassword';
import ForgotPassword from './Components/Login & Register/ForgotPassword';
import Admin from './Components/Admin/Admin';

import UserProfile from './Components/User/UserProfile';
import OrderHistory from './Components/User/OrderHistory';

import {CartProvider} from "./contexts/CartContext";
import { useEffect } from 'react';
import i18n from './i18n';

import PrivateRoute from './Components/User/PrivateRoute';
import Unauthorized from './Components/User/Unauthorized';
import CouponPage from './Components/User/CouponPage';


function App() {
    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng') || 'vi';
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        localStorage.removeItem('language');
    }, []);



    return (

        <CartProvider>
             <BrowserRouter>
                 <Routes>
                     <Route path="/" element={<HomePage />} />
                     <Route path="/home" element={<HomePage />} />
                     <Route path="/shop" element={<ShopPage />} />
                     <Route path="/cart" element={<CartPage />} />
                     <Route path="/checkout" element={<CheckoutPage/>} />
                     <Route path="/productDetail" element={<ProductDetail />} />
                     <Route path="/login" element={<AuthPage />} />
                     <Route path="/register" element={<AuthPage />} />
                     <Route path="/shop/:categoryId" element={<ShopPage />} />
                     <Route path="/productDetail/:productId" element={<ProductDetail />} />
                     <Route path="/reset-password" element={<ResetPassword />} />
                     <Route path="/forgot-password" element={<ForgotPassword />} />

                     {/*<Route path="/admin" element={<Admin />} />*/}
                     <Route path="/admin" element={
                         <PrivateRoute allowedRole="ADMIN">
                             <Admin />
                         </PrivateRoute>
                     } />

                    

                     <Route path="/profile" element={<UserProfile />} />
                     <Route path="/orders" element={<OrderHistory />} />
                     <Route path="/coupons" element={<CouponPage />} />

                     <Route path="/unauthorized" element={<Unauthorized />} />

                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}
export default App;
