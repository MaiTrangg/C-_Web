import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import * as Components from './Components';
import FacebookLoginButton from "./FacebookLoginButton";
import { CartContext } from '../../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const API_URL = 'https://localhost:8443/api/user';

const Login = ({ toggle }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const navigate = useNavigate();
    const { setCart, setTotalQuantity, fetchCart } = useContext(CartContext);
    const { t } = useTranslation();

    // Luôn dùng ngôn ngữ hiện tại nếu có
    const syncLanguage = () => {
        const lang = localStorage.getItem('i18nextLng') || 'vi';
        i18n.changeLanguage(lang);
        localStorage.removeItem('language');
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('isGoogleLogin', 'true');
            const decoded = jwtDecode(token);
            const oauthUsername = decoded.username || decoded.sub || 'User';

            localStorage.setItem('user', JSON.stringify({
                username: oauthUsername,
                email: decoded.email || '',
                role: decoded.role || 'user'
            }));

            syncLanguage(); // 🔄 đồng bộ ngôn ngữ

            setIsGoogleLogin(true);
            window.history.replaceState({}, document.title, window.location.pathname);

            Swal.fire({
                icon: 'success',
                title: `${t('login.welcome')}, ${oauthUsername}!`,
                text: t('login.googleSuccess'),
                confirmButtonText: t('login.goHome')
            }).then(() => navigate('/home'));
        }
    }, [navigate, t]);

    useEffect(() => {
        const googleLogin = localStorage.getItem('isGoogleLogin') === 'true';
        setIsGoogleLogin(googleLogin);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                syncLanguage(); // 🔄 đồng bộ ngôn ngữ

                Swal.fire({
                    icon: 'success',
                    title: t('login.success'),
                    text: `${t('login.welcomeBack')}, ${username}!`,
                    confirmButtonText: t('ok')
                }).then(() => navigate('/home'));

                localStorage.setItem('token', data.token);
                localStorage.setItem('isGoogleLogin', 'false');
                localStorage.setItem('user', JSON.stringify(data.user));
                fetchCart();
                setUsername('');
                setPassword('');
            } else {
                setError(data || `Error: ${response.status}`);
            }
        } catch (err) {
            console.error('Login error:', err);
            if (!isGoogleLogin) setError(t('login.networkError'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLoginSuccess = (data) => {
        if (data.token) {
            const decoded = jwtDecode(data.token);
            const fbUsername = decoded.username || decoded.sub || 'User';

            syncLanguage(); // 🔄 đồng bộ ngôn ngữ

            Swal.fire({
                icon: 'success',
                title: `${t('login.welcome')}, ${fbUsername}!`,
                text: t('login.facebookSuccess'),
                confirmButtonText: t('login.goHome'),
            }).then(() => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({
                    username: fbUsername,
                    email: decoded.email || '',
                    role: decoded.role || 'user',
                }));
                navigate('/home');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: t('login.facebookFail'),
                text: data.message || t('unknownError'),
            });
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setCart([]);
        setTotalQuantity(0);
        setUsername('');
        setPassword('');
        setIsGoogleLogin(false);

        Swal.fire({
            icon: 'info',
            title: t('logout.title'),
            text: isGoogleLogin ? t('logout.google') : t('logout.normal'),
            confirmButtonText: t('ok')
        }).then(() => navigate('/login'));
    };

    return (
        <Components.SignInContainer signinIn={true}>
            <Components.Form onSubmit={handleLogin}>
                <Components.Title>{t('login.title')}</Components.Title>

                <Components.SocialContainer>
                    <Components.SocialButton
                        provider="google"
                        type="button"
                        onClick={() => window.location.href = 'https://localhost:8443/oauth2/authorization/google'}
                    >
                        <i className="fab fa-google"></i>
                    </Components.SocialButton>
                    <FacebookLoginButton onFacebookLoginSuccess={handleFacebookLoginSuccess} />
                </Components.SocialContainer>

                <Components.Input
                    type="text"
                    placeholder={t('login.username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                    <Components.Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('login.password')}
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

                <Components.Anchor href="/forgot-password">
                    {t('login.forgotPassword')}
                </Components.Anchor>

                <Components.Button type="submit" disabled={isLoading}>
                    {isLoading ? t('login.signingIn') : t('login.signIn')}
                </Components.Button>

                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                {localStorage.getItem('token') && (
                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: '20px',
                            backgroundColor: 'transparent',
                            color: '#dc3545',
                            border: 'none',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                    >
                        {t('logout.button')}
                    </button>
                )}
            </Components.Form>
        </Components.SignInContainer>
    );
};

export default Login;
