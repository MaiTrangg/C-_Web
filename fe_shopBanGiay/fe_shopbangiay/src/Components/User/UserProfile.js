import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarOnly from '../Header/NavbarOnly';
import Footer from '../Footer/Footer';
import './UserProfile.css';
import i18n from '../../i18n';

const UserProfile = () => {
    const { t } = useTranslation();

    const [user, setUser] = useState(null);
    const [editUser, setEditUser] = useState({ username: '', email: '', telephone: '', role: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng') || 'vi';
        localStorage.setItem('i18nextLng', lang);
        localStorage.removeItem('language'); // dọn sạch nếu có key cũ
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang);
        }
    }, []);

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
                alert(t('userProfile.updateSuccess'));
                setUser({ ...user, ...editUser });
            } else {
                const err = await res.text();
                alert(t('userProfile.updateFail') + ': ' + err);
            }
        } catch (err) {
            alert(t('userProfile.updateError'));
            console.error(err);
        }
    };

    return (
        <>
            <NavbarOnly />
            <div className="container user-profile-container">
                {loading ? (
                    <p>{t('userProfile.loading')}</p>
                ) : user ? (
                    <div className="user-card">
                        <h2>👤 {t('userProfile.title')}</h2>

                        <div className="form-group mb-3">
                            <label>{t('userProfile.username')}:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editUser.username}
                                disabled
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>{t('userProfile.email')}:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={editUser.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>{t('userProfile.telephone')}:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telephone"
                                value={editUser.telephone || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label>{t('userProfile.role')}:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={user.role?.name || ''}
                                disabled
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleSave}>
                            💾 {t('userProfile.save')}
                        </button>
                    </div>
                ) : (
                    <div className="alert alert-warning">{t('userProfile.notFound')}</div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;
