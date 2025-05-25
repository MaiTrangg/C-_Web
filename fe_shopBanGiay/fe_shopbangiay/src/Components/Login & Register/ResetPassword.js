import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://localhost:8443/api/user/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
                mode: 'cors'
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Successful',
                    text: 'You can now log in with your new password.'
                }).then(() => {
                    navigate('/login');
                });
            } else {
                const text = await response.text();
                setError(text || 'Failed to reset password.');
            }
        } catch (err) {
            console.error(err);
            setError('Unable to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (!token) {
    //         setError('Invalid reset link.');
    //     }
    // }, [token]);

    useEffect(() => {
        if (token) {
            window.history.replaceState({}, document.title, "/reset-password");
        } else {
            setError('Invalid reset link.');
        }
    }, [token]);


    return (
        <div className="container mt-5">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                <div className="form-group">
                    <label>New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success mt-3" disabled={loading || !token}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                {error && <div className="text-danger mt-2">{error}</div>}
            </form>
        </div>
    );
};

export default ResetPassword;