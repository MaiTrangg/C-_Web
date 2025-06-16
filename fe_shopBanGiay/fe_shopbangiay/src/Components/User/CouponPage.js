import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOnly from '../Header/NavbarOnly';
import Footer from '../Footer/Footer';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import './CouponPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const CouponItem = ({ coupon, t }) => {
    const navigate = useNavigate();

    const handleApply = () => {
        navigate('/cart', { state: { code: coupon.code } });
    };

    return (
        <div className="voucher-card">
            <div className="voucher-left">
                <div className="voucher-store">
                    <img src="/img/coupon.png" alt="store" className="store-logo" />
                    <span>ESHOPPER | Official Store</span>
                </div>
                <div className="voucher-info">
                    <h4>{coupon.code} - {coupon.discountPercent}%</h4>
                    <p>{t('coupon.minimumOrder')}: {coupon.minOrderAmount || 0}đ</p>
                    <p>{t('coupon.expiry')}: {coupon.expiryDate}</p>

                </div>
            </div>
            <div className="voucher-right">
            <button className="apply-btn" onClick={handleApply}>{t('coupon.apply')}</button>
            </div>
        </div>
    );
};

const CouponPage = () => {
    const { t } = useTranslation();
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng') || 'vi';
        localStorage.setItem('i18nextLng', lang);
        localStorage.removeItem('language');
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang);
        }
    }, []);

    useEffect(() => {
        axios.get('/api/voucher/list')
            .then(res => {
                setCoupons(res.data);
            })
            .catch(err => {
                console.error("Lỗi khi tải danh sách voucher:", err);
            });
    }, []);

    return (
        <>
            <NavbarOnly/>
            <div className="coupon-container">
                <h2 className="page-title">{t('coupon.title')}</h2>
                {coupons.length === 0 ? (
                    <p>{t('coupon.noAvailable')}</p>
                ) : (
                    <div className="voucher-grid">
                        {coupons.map((coupon, index) => (
                            <CouponItem key={index} coupon={coupon} t={t}/>
                        ))}
                    </div>
                )}
            </div>

            <Footer/>
        </>
    );
};

export default CouponPage;
