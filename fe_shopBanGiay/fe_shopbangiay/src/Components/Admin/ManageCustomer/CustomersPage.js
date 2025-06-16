    // CustomersPage.jsx page ne
    import React, { useEffect, useState } from 'react';
    import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
    import Swal from 'sweetalert2';
    import './CustomersPage.css';

    const API_URL = 'https://localhost:8443/api/admin';

    const CustomersPage = () => {
        const [customers, setCustomers] = useState([]);
        const [selectedRows, setSelectedRows] = useState(new Set());
        const [selectAll, setSelectAll] = useState(false);
        const [editRoleId, setEditRoleId] = useState(null);
        const [newRole, setNewRole] = useState('');

        useEffect(() => {
            fetchCustomers();
        }, []);

        const fetchCustomers = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCustomers(data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        const handleSelectAll = (event) => {
            const isChecked = event.target.checked;
            setSelectAll(isChecked);
            if (isChecked) {
                setSelectedRows(new Set(customers.map((c) => c.userID)));
            } else {
                setSelectedRows(new Set());
            }
        };

        const handleSelectRow = (id, event) => {
            const newSelectedRows = new Set(selectedRows);
            if (event.target.checked) {
                newSelectedRows.add(id);
            } else {
                newSelectedRows.delete(id);
            }
            setSelectedRows(newSelectedRows);
            setSelectAll(newSelectedRows.size === customers.length && customers.length > 0);
        };

        const handleEditClick = (userID, currentRole) => {
            setEditRoleId(userID);
            setNewRole(currentRole);
        };

        const handleRoleInputChange = (e) => {
            setNewRole(e.target.value);
        };

        const handleSaveRole = async (userID) => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/user-role/${userID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ role: newRole })
                });
                if (response.ok) {
                    const updated = customers.map(c =>
                        c.userID === userID ? { ...c, role: newRole } : c
                    );
                    setCustomers(updated);
                    setEditRoleId(null);
                }
            } catch (err) {
                console.error('Error updating role:', err);
            }
        };

        const handleDelete = async (userID) => {
            const confirmDelete = await Swal.fire({
                title: 'Xác nhận xoá',
                text: 'Bạn có chắc muốn xoá người dùng này không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Xoá',
                cancelButtonText: 'Huỷ'
            });

            if (confirmDelete.isConfirmed) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(`${API_URL}/user/${userID}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    if (response.ok) {
                        fetchCustomers();
                        Swal.fire('Đã xoá!', 'Người dùng đã được xoá.', 'success');
                    }
                } catch (err) {
                    console.error('Error deleting user:', err);
                }
            }
        };

        return (
            <div className="customers-page">
                <div className="breadcrumbs">Page 1 › Customers</div>
                <h1>Customers</h1>

                <div className="actions-bar">
                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input type="text" placeholder="Search customers" />
                    </div>
                    <div className="spacer"></div>
                    <button className="action-button add-customer-button">+ Add customer</button>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                            </th>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.userID}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.has(customer.userID)}
                                        onChange={(e) => handleSelectRow(customer.userID, e)}
                                    />
                                </td>
                                <td>{customer.userID}</td>
                                <td>{customer.username}</td>
                                <td>{customer.email}</td>
                                <td>{customer.telephone}</td>
                                <td>
                                    {editRoleId === customer.userID ? (
                                        <input
                                            type="text"
                                            value={newRole}
                                            onChange={handleRoleInputChange}
                                            onBlur={() => handleSaveRole(customer.userID)}
                                            autoFocus
                                        />
                                    ) : (
                                        customer.role
                                    )}
                                </td>
                                <td>
                                    <div className="actions-cell">
                                        {editRoleId === customer.userID ? (
                                            <button onClick={() => handleSaveRole(customer.userID)} className="icon-btn" title="Save">
                                                <FaSave />
                                            </button>
                                        ) : (
                                            <button onClick={() => handleEditClick(customer.userID, customer.role)} className="icon-btn" title="Edit">
                                                <FaEdit />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(customer.userID)} className="icon-btn delete" title="Delete">
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    export default CustomersPage;
