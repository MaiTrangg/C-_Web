import React, { useState } from 'react';
import Swal from 'sweetalert2';
import * as Components from './Components';

const API_URL = 'https://localhost:8080/api';

const Register = ({ toggle }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        const userData = {
            username,
            email,
            telephone,
            password,
            role: "USER"
        };

        try {
            const response = await fetch(`${API_URL}/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const responseBodyText = await response.text();

            if (response.ok) {
                console.log('API Success:', responseBodyText);

                // ✅ Hiển thị thông báo bằng SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'User registered successfully!',
                    text: responseBodyText || 'Tài khoản của bạn đã được tạo.',
                    confirmButtonText: 'OK'
                });

                setUsername('');
                setEmail('');
                setTelephone('');
                setPassword('');
            } else {
                console.error('API Error:', responseBodyText);
                setError(responseBodyText || `Lỗi: ${response.status}`);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError('Không thể kết nối. Vui lòng kiểm tra mạng.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Components.SignUpContainer signinIn={false}>
            <Components.Form onSubmit={handleRegister}>
                <Components.Title>Create Account</Components.Title>

                {error && <Components.Paragraph style={{ color: 'red', marginBottom: '10px' }}>{error}</Components.Paragraph>}

                <Components.Input
                    type="text"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Components.Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Components.Input
                    type="text"
                    placeholder="Telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
                <Components.Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Components.Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Components.Button>
            </Components.Form>
        </Components.SignUpContainer>
    );
};

export default Register;
