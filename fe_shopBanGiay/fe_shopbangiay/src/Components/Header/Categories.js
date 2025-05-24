import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/categories')
            .then((response) => {
                const flatData = response.data;
                const parents = flatData.filter(cat => cat.parentCategory === null);
                const children = flatData.filter(cat => cat.parentCategory !== null);

                const nestedCategories = parents.map(parent => ({
                    ...parent,
                    subcategories: children.filter(child => child.parentCategory.id === parent.id)
                }));

                setCategories(nestedCategories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdown(prev => prev === id ? null : id);
    };

    return (
        <div className="col-lg-3 d-none d-lg-block">
            <a
                className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                data-toggle="collapse" href="#navbar-vertical"
                style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
            >
                <h6 className="m-0">Categories</h6>
                <i className="fa fa-angle-down text-dark"></i>
            </a>

            <nav
                className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
                id="navbar-vertical"
                style={{ width: "calc(100% - 30px)", zIndex: "1" }}
            >
                <div className="navbar-nav w-100 " style={{ height: "auto", maxHeight: "400px" }}>

                    {categories.map(category => (
                        <div key={category.id} className="nav-item dropdown">
                            <div className="nav-link d-flex justify-content-between align-items-center">
                                {/* Click vào tên để navigate */}
                                <Link
                                    to={`/shop/${category.id}`}
                                    className="text-dark"
                                    style={{ textDecoration: "none", flex: 1 }}
                                >
                                    {category.name}
                                </Link>

                                {/* Click vào icon để toggle dropdown */}
                                <i
                                    className={`fa fa-angle-${openDropdown === category.id ? 'up' : 'down'} ml-2`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleDropdown(category.id);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>

                            {/* ✅ CẬP NHẬT: subcategories giữ nguyên */}
                            {openDropdown === category.id && category.subcategories?.length > 0 && (
                                <div className="dropdown-menu  position-absolute border-0 rounded-0 w-100 m-0 show">
                                    {category.subcategories.map(sub => (
                                        <Link
                                            key={sub.id}
                                            to={`/shop/${sub.id}`}
                                            className="dropdown-item"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            </nav>

            <style>
                {`
                    .dropdown-menu .dropdown-item {
                        border-bottom: 1px solid #fff;
                    }

                    .dropdown-menu .dropdown-item:last-child {
                        border-bottom: none;
                    }
                `}
            </style>
        </div>
    );
};

export default Categories;
