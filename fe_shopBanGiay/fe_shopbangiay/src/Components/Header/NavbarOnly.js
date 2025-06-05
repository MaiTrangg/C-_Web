import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const NavbarOnly = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    const syncUser = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUsername(parsedUser.username);
                setRole(parsedUser.role || '');
            } catch {
                setUsername('');
                setRole('');
            }
        } else {
            setUsername('');
            setRole('');
        }
    };

    useEffect(() => {
        syncUser();
        const handleStorage = () => syncUser();
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isGoogleLogin');
        setUsername('');
        navigate('/login');
    };

    return (
        <div className="container-fluid bg-light">
            <nav className="navbar navbar-expand-lg navbar-light py-3">
                <Link to="/" className="navbar-brand text-decoration-none">
                    <h1 className="m-0 font-weight-semi-bold">
                        <span className="text-primary font-weight-bold border px-3 mr-1">E</span>
                        Shopper
                    </h1>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div className="navbar-nav mr-auto py-0">
                        <Link to="/home" className="nav-item nav-link">Home</Link>
                        <Link to="/shop" className="nav-item nav-link">Shop</Link>
                        <a href="/detail" className="nav-item nav-link">Shop Detail</a>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <a href="/cart" className="dropdown-item">Shopping Cart</a>
                                <a href="/checkout" className="dropdown-item">Checkout</a>
                                {username && role.toUpperCase() === 'ADMIN' && (
                                    <Link to="/admin" className="nav-item nav-link">Dashboard</Link>
                                )}
                            </div>
                        </div>
                        <a href="/contact" className="nav-item nav-link">Contact</a>
                    </div>

                    <div className="navbar-nav ml-auto py-0">
                        {username ? (
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    👋 Chào, <strong>{username}</strong>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right rounded-0 shadow">
                                    <Link to="/profile" className="dropdown-item">Thông tin người dùng</Link>
                                    <Link to="/orders" className="dropdown-item">Lịch sử đơn hàng</Link>
                                    <div className="dropdown-divider"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="dropdown-item text-danger"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="nav-item nav-link">Login</Link>
                                <Link to="/register" className="nav-item nav-link">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarOnly;
