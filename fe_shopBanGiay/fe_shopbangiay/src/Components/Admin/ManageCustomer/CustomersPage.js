import React, { useEffect, useState } from 'react';
import './ManageCustomer.css';

const ManageCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch dữ liệu từ backend (sau này bạn chỉnh URL lại)
    useEffect(() => {
        fetch('http://localhost:8080/api/customers')
            .then(res => res.json())
            .then(data => {
                setCustomers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching customers:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="manage-customer-container">
            <h2>Customer Management</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="customer-table">
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>Password</th>
                        <th>Role ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((user) => (
                        <tr key={user.userID}>
                            <td>{user.userID}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.telephone}</td>
                            <td>{user.password}</td>
                            <td>{user.role_id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageCustomer;
