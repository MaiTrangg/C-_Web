import React, { useEffect, useState } from 'react';
import NavbarOnly from '../Header/NavbarOnly';
import Footer from '../Footer/Footer';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editUser, setEditUser] = useState({ username: '', email: '', telephone: '', role: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('https://localhost:8443/api/user/infoUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setEditUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi khi tải thông tin người dùng:", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('https://localhost:8443/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: editUser.email,
                    telephone: editUser.telephone
                })
            });

            if (res.ok) {
                alert("Cập nhật thành công!");
                setUser({ ...user, ...editUser });
            } else {
                const err = await res.text();
                alert("Cập nhật thất bại: " + err);
            }
        } catch (err) {
            alert("Lỗi khi gửi yêu cầu cập nhật.");
            console.error(err);
        }
    };

    return (
        <>
            <NavbarOnly />
            <div className="container user-profile-container">
                {loading ? (
                    <p>Đang tải thông tin...</p>
                ) : user ? (
                    <div className="user-card">
                        <h2>👤 Thông tin người dùng</h2>

                        <div className="form-group mb-3">
                            <label>Tên đăng nhập:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editUser.username}
                                disabled
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={editUser.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Số điện thoại:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telephone"
                                value={editUser.telephone || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label>Vai trò:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={user.role?.name || ''}
                                disabled
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleSave}>
                            💾 Lưu thay đổi
                        </button>
                    </div>
                ) : (
                    <div className="alert alert-warning">Không tìm thấy thông tin người dùng.</div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;

