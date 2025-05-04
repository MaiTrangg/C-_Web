import React from 'react';
import {Link, NavLink} from "react-router-dom";
import Categories from "./Categories";

const Navbar = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row border-top px-xl-5">
                    <Categories/>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold"><span
                                    className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse"
                                    data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to={"/home"} className="nav-item nav-link ">Home</Link>
                                    <NavLink to={"/shop"} className="nav-item nav-link ">Shop</NavLink>
                                    <a href="detail.html" className="nav-item nav-link">Shop Detail</a>
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle"
                                           data-toggle="dropdown">Pages</a>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <a href="cart.html" className="dropdown-item">Shopping Cart</a>
                                            <a href="checkout.html" className="dropdown-item">Checkout</a>
                                        </div>
                                    </div>
                                    <a href="contact.html" className="nav-item nav-link">Contact</a>
                                </div>
                                <div className="navbar-nav ml-auto py-0">
                                    <a href="" className="nav-item nav-link">Login</a>
                                    <a href="" className="nav-item nav-link">Register</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
             {/*Navbar End -->*/}
        </div>
    );
};

export default Navbar;