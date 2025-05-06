import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Sử dụng useNavigate thay cho useHistory
import Swal from 'sweetalert2';
import * as Components from './Components';

const API_URL = 'https://localhost:8443/api/user';

const Login = ({ toggle }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        const loginData = {
            username,
            password
        };

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                credentials: 'include', // Đảm bảo backend gửi cookie JWT/session nếu cần thiết
            });

            const responseBody = await response.json();

            if (response.ok) {
                console.log('Login Success:', responseBody);

                // ✅ Hiển thị thông báo đăng nhập thành công bằng SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    text: `Welcome back, ${username}!`,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Sau khi người dùng bấm OK, chuyển hướng đến /home
                        navigate('/home');
                    }
                });

                // Lưu token vào localStorage hoặc state để dùng cho các API yêu cầu xác thực
                localStorage.setItem('token', responseBody.token);

                // Reset form
                setUsername('');
                setPassword('');
            } else {
                console.error('Login Error:', responseBody);
                setError(responseBody || `Error: ${response.status}`);
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('Unable to connect. Please check your network.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Components.SignInContainer signinIn={true}>
            <Components.Form onSubmit={handleLogin}>
                <Components.Title>Sign in</Components.Title>

                <Components.SocialContainer>
                    <Components.SocialButton provider="google" onClick={() => alert('Login with Google')}>
                        <i className="fab fa-google"></i>
                    </Components.SocialButton>
                    <Components.SocialButton provider="facebook" onClick={() => alert('Login with Facebook')}>
                        <i className="fab fa-facebook-f"></i>
                    </Components.SocialButton>
                </Components.SocialContainer>

                <Components.Input
                    type="text"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Components.Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                <Components.Button disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </Components.Button>

                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Components.Form>
        </Components.SignInContainer>
    );
};

export default Login;
