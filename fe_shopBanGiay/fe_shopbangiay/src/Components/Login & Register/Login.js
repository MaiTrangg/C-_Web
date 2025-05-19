import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import * as Components from './Components';

const API_URL = 'https://localhost:8443/api/user';

const Login = ({ toggle }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const navigate = useNavigate();

    // ✅ Xử lý Google OAuth2
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            const oauthUsername = decoded.username || decoded.sub || 'User';

            console.log("✅ Decoded from Google login:", decoded);
            setIsGoogleLogin(true);

            // Xoá token khỏi URL
            window.history.replaceState({}, document.title, window.location.pathname);

            Swal.fire({
                icon: 'success',
                title: `Welcome, ${oauthUsername}!`,
                text: 'Google login successful!',
                confirmButtonText: 'Go to Home'
            }).then(() => {
                navigate('/home');
            });
        }
    }, [navigate]);



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
                credentials: 'include',
            });

            const responseBody = await response.json();

            if (response.ok && !isGoogleLogin) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    text: `Welcome back, ${username}!`,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/home');
                    }
                });

                localStorage.setItem('token', responseBody.token);
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
                    <Components.SocialButton
                        provider="google"
                        onClick={() => {
                            // ✅ Gọi tới endpoint OAuth2 của backend
                            window.location.href = 'https://localhost:8443/oauth2/authorization/google';
                        }}
                    >
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
                <div style={{ position: 'relative' }}>
                    <Components.Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ paddingRight: '40px' }}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#999',
                            fontSize: '18px',
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

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
