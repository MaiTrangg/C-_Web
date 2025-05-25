import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://localhost:8443/api/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ email }),
                mode: 'cors'
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Check your email!',
                    text: 'Password reset link has been sent.'
                });
                setEmail('');
            } else {
                const text = await response.text();
                setError(text || 'Failed to send email.');
            }
        } catch (err) {
            console.error(err);
            setError('Unable to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                {error && <div className="text-danger mt-2">{error}</div>}
            </form>
        </div>
    );
};

export default ForgotPassword;