import React, { useEffect, useState } from 'react';
import NavbarOnly from '../Header/NavbarOnly';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const OrderHistory = () => {
    const { t } = useTranslation();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng') || 'vi';
        localStorage.setItem('i18nextLng', lang);
        localStorage.removeItem('language');
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang);
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('https://localhost:8443/api/user/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(t('orderHistory.error'));
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [t]);

    const handleViewDetails = async (orderId) => {
        if (selectedOrderId === orderId) {
            setSelectedOrderId(null); // toggle off
            return;
        }

        try {
            setDetailLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(`https://localhost:8443/api/user/ordersDetail?orderId=${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrderDetails(response.data);
            setSelectedOrderId(orderId);
        } catch (err) {
            console.error("Error fetching order details:", err);
            setOrderDetails([]);
        } finally {
            setDetailLoading(false);
        }
    };

    return (
        <>
            <NavbarOnly />
            <div className="container mt-5 mb-5">
                <h2 className="mb-4">🧾 {t('orderHistory.title')}</h2>

                {loading ? (
                    <div>{t('orderHistory.loading')}</div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : orders.length > 0 ? (
                    <table className="table table-striped table-bordered shadow-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th>{t('orderHistory.orderId')}</th>
                            <th>{t('orderHistory.date')}</th>
                            <th>{t('orderHistory.total')}</th>
                            <th>{t('orderHistory.status')}</th>
                            <th>{t('orderHistory.action')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <React.Fragment key={order.id}>
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>{order.totalAmount.toLocaleString()}₫</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleViewDetails(order.id)}
                                        >
                                            {selectedOrderId === order.id
                                                ? t('orderHistory.hideDetails')
                                                : t('orderHistory.viewDetails')}
                                        </button>
                                    </td>
                                </tr>
                                {selectedOrderId === order.id && (
                                    <tr>
                                        <td colSpan="5">
                                            {detailLoading ? (
                                                <div>{t('orderHistory.loadingDetails')}</div>
                                            ) : orderDetails.length > 0 ? (
                                                <table className="table table-bordered mt-2">
                                                    <thead>
                                                    <tr>
                                                        <th>{t('orderHistory.product')}</th>
                                                        <th>{t('orderHistory.color')}</th>
                                                        <th>{t('orderHistory.size')}</th>
                                                        <th>{t('orderHistory.quantity')}</th>
                                                        <th>{t('orderHistory.price')}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {orderDetails.map(item => (
                                                        <tr key={item.id}>
                                                            <td>{item.productName}</td>
                                                            <td>{item.color}</td>
                                                            <td>{item.size}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{Number(item.price).toLocaleString()}₫</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="text-muted">{t('orderHistory.noItems')}</div>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="alert alert-info">{t('orderHistory.noOrders')}</div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;
