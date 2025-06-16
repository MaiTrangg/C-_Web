import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
        localStorage.removeItem('language');
    };

    useEffect(() => {
        syncUser();

        const savedLang = localStorage.getItem('i18nextLng') || 'vi';
        if (savedLang !== i18n.language) {
            i18n.changeLanguage(savedLang);
        }

        const handleStorage = () => syncUser();
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isGoogleLogin');
        setUsername('');

        setRole('');
        navigate('/login');
    };

    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                       data-toggle="collapse" href="#navbar-vertical"
                       style={{height: '65px', marginTop: '-1px', padding: '0 30px'}}>
                        <h6 className="m-0">{t('Categories')}</h6>
                        <i className="fa fa-angle-down text-dark"></i>
                    </a>
                    <nav
                        className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                        id="navbar-vertical">
                        <div className="navbar-nav w-100 overflow-hidden" style={{height: '410px'}}>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link" data-toggle="dropdown">{t('Dresses')} <i
                                    className="fa fa-angle-down float-right mt-1"></i></a>
                                <div
                                    className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                    <a href="" className="dropdown-item">{t("Men's Dresses")}</a>
                                    <a href="" className="dropdown-item">{t("Women's Dresses")}</a>
                                    <a href="" className="dropdown-item">{t("Baby's Dresses")}</a>
                                </div>
                            </div>
                            <a href="" className="nav-item nav-link">{t('Shirts')}</a>
                            <a href="" className="nav-item nav-link">{t('Jeans')}</a>
                            <a href="" className="nav-item nav-link">{t('Swimwear')}</a>
                            <a href="" className="nav-item nav-link">{t('Sleepwear')}</a>
                            <a href="" className="nav-item nav-link">{t('Sportswear')}</a>
                            <a href="" className="nav-item nav-link">{t('Jumpsuits')}</a>
                            <a href="" className="nav-item nav-link">{t('Blazers')}</a>
                            <a href="" className="nav-item nav-link">{t('Jackets')}</a>
                            <a href="" className="nav-item nav-link">{t('Shoes')}</a>
                        </div>
                    </nav>
                </div>

                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <Link to="/" className="text-decoration-none d-block d-lg-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold">
                                <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
                            </h1>
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <Link to="/home" className="nav-item nav-link">{t('Home')}</Link>
                                <Link to="/shop" className="nav-item nav-link">{t('Shop')}</Link>
                                <a href="detail.html" className="nav-item nav-link">{t('Shop Detail')}</a>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle"
                                       data-toggle="dropdown">{t('Pages')}</a>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <a href="cart.html" className="dropdown-item">{t('Shopping Cart')}</a>
                                        <a href="checkout.html" className="dropdown-item">{t('Checkout')}</a>
                                    </div>
                                </div>
                                <a href="contact.html" className="nav-item nav-link">{t('Contact')}</a>
                                {username && role.toUpperCase() === 'ADMIN' && (
                                    <Link to="/admin" className="nav-item nav-link">{t('Dashboard')}</Link>
                                )}
                            </div>

                            <div className="navbar-nav ml-auto py-0">
                                <div className="nav-item dropdown mr-3">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        <img
                                            src={`/img/${i18n.language === 'vi' ? 'vi' : i18n.language === 'en' ? 'eng' : 'ja'}.jpg`}
                                            alt="lang"
                                            style={{width: 24}}
                                        />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right rounded-0 shadow">
                                        <a onClick={() => changeLanguage('vi')} className="dropdown-item"
                                           style={{cursor: 'pointer'}}>
                                            <img src="/img/vi.jpg" alt="vi" style={{width: 24, marginRight: 8}}/> Tiếng
                                            Việt
                                        </a>
                                        <a onClick={() => changeLanguage('en')} className="dropdown-item"
                                           style={{cursor: 'pointer'}}>
                                            <img src="/img/eng.jpg" alt="en"
                                                 style={{width: 24, marginRight: 8}}/> English
                                        </a>
                                        <a onClick={() => changeLanguage('ja')} className="dropdown-item"
                                           style={{cursor: 'pointer'}}>
                                            <img src="/img/ja.jpg" alt="ja" style={{width: 24, marginRight: 8}}/> 日本語
                                        </a>
                                    </div>
                                </div>

                                {username ? (
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                            👋 {t('Hello')}, <strong>{username}</strong>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right rounded-0 m-0">
                                            <Link to="/profile" className="dropdown-item">{t('User Profile')}</Link>
                                            <Link to="/orders" className="dropdown-item">{t('Order History')}</Link>
                                            <Link to="/coupons" className="dropdown-item">{t('Coupon')}</Link>
                                            <div className="dropdown-divider"></div>
                                            <button onClick={handleLogout} className="dropdown-item text-danger">
                                                {t('Logout')}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/login" className="nav-item nav-link">{t('Login')}</Link>
                                        <Link to="/register" className="nav-item nav-link">{t('Register')}</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>

                    <div id="header-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" style={{height: '410px'}}>
                                <img className="img-fluid" src="img/carousel-1.jpg" alt="Image"/>
                                <div
                                    className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{maxwidth: '700px'}}>
                                        <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off
                                            Your First Order</h4>
                                        <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable
                                            Dress</h3>
                                        <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item" style={{height: '410px'}}>
                                <img className="img-fluid" src="img/carousel-2.jpg" alt="Image"/>
                                <div
                                    className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{maxwidth: '700px'}}>
                                        <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off
                                            Your First Order</h4>
                                        <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable
                                            Price</h3>
                                        <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                            <div className="btn btn-dark" style={{width: '45px', height: '45px'}}>
                                <span className="carousel-control-prev-icon mb-n2"></span>
                            </div>
                        </a>
                        <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                            <div className="btn btn-dark" style={{width: '45px', height: '45px'}}>
                                <span className="carousel-control-next-icon mb-n2"></span>
                            </div>
                        </a>
                    </div>
            </div>
        </div>
</div>
)
    ;
};

export default Navbar;


