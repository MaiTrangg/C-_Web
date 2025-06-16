import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './CategoriesPage.css'; // dùng lại CSS cũ, bạn có thể đổi tên nếu muốn

const API_URL = '/api/admin';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState({ name: '', parentId: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState('');



    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/admin/categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            );
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleEditClick = (id, currentName) => {
        setEditId(id);
        setNewName(currentName);
        console.log("newName: "+currentName)
    };

    const handleSave = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/admin/categories/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: newName })
            });
            if (res.ok) {
                // const updated = categories.map(c =>
                //     c.id === id ? { ...c, name: newName } : c
                // );
                await fetchCategories(); // cập nhật toàn bộ danh sách một lần
                // setCategories(updated);
                setEditId(null);
            }
        } catch (err) {
            console.error('Error updating category:', err);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Xác nhận xoá',
            text: 'Bạn có chắc muốn xoá danh mục này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Huỷ',
            confirmButtonColor: '#d33'
        });
        if (confirm.isConfirmed) {
            const token = localStorage.getItem('token');
            console.log(token)
            try {
                const res = await fetch(`/api/admin/categories/delete/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }

                });
                if (res.ok) {
                    setCategories(categories.filter(c => c.id !== id));
                    Swal.fire({
                        title: 'Đã xoá',
                        text: 'Danh mục đã được xoá thành công.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (err) {
                console.error('Error deleting category:', err);
            }
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.name.trim()) {
            setError('Vui lòng nhập tên danh mục.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/admin/categories/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newCategory.name,
                    parentCategory: newCategory.parentId ? { id: newCategory.parentId } : null
                })
            });

            if (res.ok) {
                setNewCategory({ name: '', parentId: '' });
                setShowAddForm(false);
                await fetchCategories(); // Cập nhật lại danh sách
            } else {
                const err = await res.text();
                console.error(err);
            }
        } catch (err) {
            console.error('Error adding category:', err);
        }
    };



    return (
        <div className="customers-page">
            <div className="breadcrumbs">Page 1 › Customers</div>
            <h1>Customers</h1>

            <div className="actions-bar">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search customers"/>
                </div>
                <div className="spacer"></div>
                <button
                    className="action-button add-customer-button"
                    onClick={() => {
                        setShowAddForm(true);       // mở form
                        setNewCategory({name: '', parentId: ''}); // reset dữ liệu form nếu muốn
                        setError('');               // xóa lỗi nếu có
                    }}
                >
                    + Add category
                </button>

            </div>
            {showAddForm && (
                <div className="modal-overlay">
                    <div className="add-category-form">
                        <input
                            type="text"
                            placeholder="Tên danh mục"
                            value={newCategory.name}
                            onChange={(e) => {
                                setNewCategory({...newCategory, name: e.target.value});
                                setError(''); // Xóa lỗi nếu đang có
                            }}
                        />
                        {error && <div className="error-message">{error}</div>}

                        <select
                            value={newCategory.parentId}
                            onChange={(e) => setNewCategory({...newCategory, parentId: e.target.value})}
                        >
                            <option value="">--- Danh mục cha ---</option>
                            {categories
                                .filter(cat => !cat.parentCategory) // chỉ danh mục cha
                                .map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                        </select>

                        <div className="form-buttons">
                            <button type="button" onClick={handleAddCategory} className="save-button">Lưu</button>
                            <button type="button" onClick={() => setShowAddForm(false)} className="cancel-button">Huỷ
                            </button>
                        </div>

                    </div>
                </div>
            )}


            <div className="breadcrumbs">Page 1 › Categories</div>
            <h1>Categories</h1>

            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Parent</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>
                                {editId === cat.id ? (
                                    <input
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        onBlur={() => handleSave(cat.id)}
                                        autoFocus
                                    />
                                ) : (
                                    cat.name
                                )}
                            </td>
                            <td>{cat.parentCategory?.name ?? '---'}</td>
                            <td>
                                <div className="actions-cell">
                                    {editId === cat.id ? (
                                        <button onClick={() => handleSave(cat.id)} className="icon-btn">
                                            <FaSave/>
                                        </button>
                                    ) : (
                                        <button onClick={() => handleEditClick(cat.id, cat.name)} className="icon-btn">
                                            <FaEdit/>
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(cat.id)} className="icon-btn delete">
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

export default CategoriesPage;
