import React, { useEffect, useState } from 'react';
import { FaClock, FaCheckCircle, FaTruck, FaCheckDouble, FaTimesCircle, FaEye, FaFilter } from 'react-icons/fa';
import './OrdersPage.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = 'https://localhost:8443/api/admin';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [orderStats, setOrderStats] = useState([]);

    const fetchFilteredOrders = async () => {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams();

        if (year) queryParams.append('year', year);
        if (month) queryParams.append('month', month);
        if (day) queryParams.append('day', day);

        try {
            const response = await fetch(`${API_URL}/orders/filter?${queryParams}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error('Lỗi khi lọc đơn hàng:', err);
        }
    };

    const fetchOrderStats = async () => {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams();

        if (year) queryParams.append('year', year);
        if (month) queryParams.append('month', month);
        if (day) queryParams.append('day', day);

        try {
            const response = await fetch(`${API_URL}/orders/statistics?${queryParams}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setOrderStats(data);
        } catch (err) {
            console.error('Lỗi thống kê đơn hàng:', err);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchFilteredOrders();
        fetchOrderStats();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/orders`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const handleViewDetails = async (orderId) => {
        setSelectedOrderId(orderId);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}/items`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setOrderItems(data);
            setIsModalOpen(true);

            fetchOrderStats();
        } catch (err) {
            console.error('Error fetching order items:', err);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setOrderItems([]);
        setSelectedOrderId(null);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                setOrders(prev =>
                    prev.map(order =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            }
        } catch (err) {
            console.error('Update status failed:', err);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Chờ xác nhận': return 'status-pending';
            case 'Đã xác nhận': return 'status-confirmed';
            case 'Đang giao': return 'status-shipping';
            case 'Hoàn tất': return 'status-success';
            case 'Đã huỷ': return 'status-cancelled';
            default: return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Chờ xác nhận': return <FaClock />;
            case 'Đã xác nhận': return <FaCheckCircle />;
            case 'Đang giao': return <FaTruck />;
            case 'Hoàn tất': return <FaCheckDouble />;
            case 'Đã huỷ': return <FaTimesCircle />;
            default: return null;
        }
    };


    const getNextAvailableStatuses = (currentStatus) => {
        switch (currentStatus) {
            case 'Chờ xác nhận':
                return ['Đã xác nhận', 'Đã huỷ'];
            case 'Đã xác nhận':
                return ['Đang giao', 'Đã huỷ'];
            case 'Đang giao':
                return ['Hoàn tất'];
            default:
                return []; // 'Hoàn tất' và 'Đã huỷ' không thể chuyển tiếp
        }
    };


    const getPaymentClass = (method) => {
        switch (method.toUpperCase()) {
            case 'COD': return 'payment-cod';
            case 'VNPAY': return 'payment-vnpay';
            default: return 'payment-default';
        }
    };

    return (
        <div className="orders-page">
            <div className="breadcrumbs">Page 1 › Orders</div>
            <h1>Orders</h1>

            <div className="table-container">
                <div className="filter-form">
                    <label>
                        <b>Year:</b>
                            <input type="number" value={year} onChange={e => setYear(e.target.value)}
                                   placeholder="2024"/>
                    </label>
                    <label>
                        <b>Month:</b>
                        <input type="number" value={month} onChange={e => setMonth(e.target.value)} placeholder="6"/>
                    </label>
                    <label>
                        <b>Day:</b>
                        <input type="number" value={day} onChange={e => setDay(e.target.value)} placeholder="14"/>
                    </label>
                    <button
                        onClick={() => {
                            fetchFilteredOrders();
                            fetchOrderStats();
                        }}
                        className="filter-button"
                    >
                        <FaFilter style={{marginRight: '8px'}}/> Filter
                    </button>


                </div>

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Receiver</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{order.receiverName}</td>
                            <td>{order.phone}</td>
                            <td>{order.shippingAddress}</td>
                            <td>
                                <div className={`status-dropdown-wrapper ${getStatusClass(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    <select
                                        value={order.status}
                                        onChange={e => handleStatusChange(order.id, e.target.value)}
                                        disabled={getNextAvailableStatuses(order.status).length === 0}
                                    >
                                        <option value={order.status} disabled>{order.status}</option>
                                        {getNextAvailableStatuses(order.status).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </td>

                            <td>
                                    <span className={`payment-label ${getPaymentClass(order.paymentMethod)}`}>
                                        {order.paymentMethod}
                                    </span>
                            </td>
                            <td>{order.totalAmount}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>{new Date(order.updatedAt).toLocaleString()}</td>
                            <td>
                                <button
                                    className="icon-btn"
                                    onClick={() => handleViewDetails(order.id)}
                                    title="Xem chi tiết"
                                >
                                    <FaEye/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Popup/modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <h2>Order Details #{selectedOrderId}</h2>
                        <table className="order-items-table">
                            <thead>
                            <tr>
                            <th>ID</th>
                                <th>Product Name</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.color}</td>
                                    <td>{item.size}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price.toLocaleString()} đ</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {orderStats.length > 0 && (
                <div className="chart-container">
                    <h2>Order Statistics</h2>
                    {(year || month || day) && (
                        <p>
                            Lọc theo: {day && `ngày ${day}`} {month && `tháng ${month}`} {year && `năm ${year}`}
                        </p>
                    )}
                    <Bar
                        data={{
                            labels: orderStats.map(stat => stat.status),
                            datasets: [{
                                label: 'Số lượng đơn',
                                data: orderStats.map(stat => stat.count),
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Thống kê đơn hàng theo trạng thái' }
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default OrdersPage;

