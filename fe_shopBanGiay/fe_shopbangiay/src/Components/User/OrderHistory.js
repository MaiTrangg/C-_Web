import React from 'react';
import NavbarOnly from '../Header/NavbarOnly';
import Footer from '../Footer/Footer';

const OrderHistory = () => {
    const dummyOrders = [
        { id: 1001, date: '2025-05-15', total: '320.000₫', status: 'Đã giao' },
        { id: 1002, date: '2025-06-01', total: '145.000₫', status: 'Đang xử lý' },
    ];

    return (
        <>
            <NavbarOnly />
            <div className="container mt-5 mb-5">
                <h2 className="mb-4">🧾 Lịch sử đơn hàng</h2>
                {dummyOrders.length > 0 ? (
                    <table className="table table-striped table-bordered shadow-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th>Mã đơn</th>
                            <th>Ngày mua</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dummyOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.total}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="alert alert-info">Bạn chưa có đơn hàng nào.</div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;
