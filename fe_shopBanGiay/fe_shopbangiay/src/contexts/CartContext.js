
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    // Load giỏ hàng từ server
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn("Không có token => không gọi API giỏ hàng.");
                return;
            }

            const res = await axios.get('/api/cart/items', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setCart(res.data);
            const total = res.data.length
            setTotalQuantity(total);
        } catch (error) {
            console.error('Lỗi khi load giỏ hàng:', error);
        }
    };


    useEffect(() => {
        fetchCart();
    }, []);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (productVariantId, quantity = 1) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/api/cart/add',
                { productVariantId, quantity },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            await fetchCart(); // reload giỏ hàng sau khi thêm
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = async (cartItemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/cart/delete/${cartItemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCart();
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = async (cartItemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `/api/cart/update/${cartItemId}`,
                { quantity },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            await fetchCart();
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, totalQuantity, addToCart, removeFromCart, updateQuantity, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
