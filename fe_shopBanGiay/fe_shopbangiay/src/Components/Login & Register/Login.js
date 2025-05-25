// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { jwtDecode } from 'jwt-decode';
// import Swal from 'sweetalert2';
// import * as Components from './Components';
//
// const API_URL = 'https://localhost:8443/api/user';
//
// const Login = ({ toggle }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [isGoogleLogin, setIsGoogleLogin] = useState(false);
//     const navigate = useNavigate();
//
//     // ✅ Xử lý Google OAuth2 login
//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const token = urlParams.get('token');
//
//         if (token) {
//             localStorage.setItem('token', token);
//             localStorage.setItem('isGoogleLogin', 'true');
//             const decoded = jwtDecode(token);
//             const oauthUsername = decoded.username || decoded.sub || 'User';
//
//             // ✅ Lưu thông tin user để Navbar hiển thị tên
//             localStorage.setItem(
//                 'user',
//                 JSON.stringify({
//                     username: oauthUsername,
//                     email: decoded.email || ''
//                 })
//             );
//
//             console.log('✅ Decoded from Google login:', decoded);
//             setIsGoogleLogin(true);
//
//             // Xoá token khỏi URL để tránh lặp lại
//             window.history.replaceState({}, document.title, window.location.pathname);
//
//             Swal.fire({
//                 icon: 'success',
//                 title: `Welcome, ${oauthUsername}!`,
//                 text: 'Google login successful!',
//                 confirmButtonText: 'Go to Home'
//             }).then(() => {
//                 navigate('/home');
//             });
//         }
//     }, [navigate]);
//
//     useEffect(() => {
//         const googleLogin = localStorage.getItem('isGoogleLogin') === 'true';
//         setIsGoogleLogin(googleLogin);
//     }, []);
//
//     const handleLogin = async (event) => {
//         event.preventDefault();
//         setError('');
//         setIsLoading(true);
//
//         const loginData = { username, password };
//
//         try {
//             const response = await fetch(`${API_URL}/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(loginData),
//                 credentials: 'include',
//             });
//
//             const responseBody = await response.json();
//
//             if (response.ok && !isGoogleLogin) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Login successful!',
//                     text: `Welcome back, ${username}!`,
//                     confirmButtonText: 'OK'
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         navigate('/home');
//                     }
//                 });
//
//                 localStorage.setItem('token', responseBody.token);
//                 localStorage.setItem('isGoogleLogin', 'false');
//
//                 const user = responseBody.user;
//                 const minimalUser = {
//                     username: user.username,
//                     email: user.email
//                 };
//
//                 localStorage.setItem('user', JSON.stringify(minimalUser));
//                 setUsername('');
//                 setPassword('');
//             } else {
//                 console.error('Login Error:', responseBody);
//                 setError(responseBody || `Error: ${response.status}`);
//             }
//         } catch (err) {
//             console.error('Fetch Error:', err);
//             setError('Unable to connect. Please check your network.');
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('isGoogleLogin');
//         setUsername('');
//         setPassword('');
//         setIsGoogleLogin(false);
//
//         Swal.fire({
//             icon: 'info',
//             title: 'Logged out',
//             text: isGoogleLogin
//                 ? 'You have been logged out from Google session.'
//                 : 'You have been logged out.',
//             confirmButtonText: 'OK'
//         }).then(() => {
//             navigate('/login');
//         });
//     };
//
//     return (
//         <Components.SignInContainer signinIn={true}>
//             <Components.Form onSubmit={handleLogin}>
//                 <Components.Title>Sign in</Components.Title>
//
//                 <Components.SocialContainer>
//                     <Components.SocialButton
//                         provider="google"
//                         onClick={() => {
//                             window.location.href = 'https://localhost:8443/oauth2/authorization/google';
//                         }}
//                     >
//                         <i className="fab fa-google"></i>
//                     </Components.SocialButton>
//                     <Components.SocialButton provider="facebook" onClick={() => alert('Login with Facebook')}>
//                         <i className="fab fa-facebook-f"></i>
//                     </Components.SocialButton>
//                 </Components.SocialContainer>
//
//                 <Components.Input
//                     type="text"
//                     placeholder="User name"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <div style={{ position: 'relative' }}>
//                     <Components.Input
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ paddingRight: '40px' }}
//                     />
//                     <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         style={{
//                             position: 'absolute',
//                             right: '10px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             cursor: 'pointer',
//                             color: '#999',
//                             fontSize: '18px',
//                         }}
//                     >
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </span>
//                 </div>
//
//                 <Components.Anchor href="#">Forgot your password?</Components.Anchor>
//                 <Components.Button disabled={isLoading}>
//                     {isLoading ? 'Signing in...' : 'Sign In'}
//                 </Components.Button>
//
//                 {error && <div style={{ color: 'red' }}>{error}</div>}
//
//                 {localStorage.getItem('token') && (
//                     <button
//                         onClick={handleLogout}
//                         style={{
//                             marginTop: '20px',
//                             backgroundColor: 'transparent',
//                             color: '#dc3545',
//                             border: 'none',
//                             textDecoration: 'underline',
//                             cursor: 'pointer'
//                         }}
//                     >
//                         🔓 Logout current user
//                     </button>
//                 )}
//             </Components.Form>
//         </Components.SignInContainer>
//     );
// };
//
// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import * as Components from './Components';
import FacebookLoginButton from "./FacebookLoginButton";

const API_URL = 'https://localhost:8443/api/user';

const Login = ({ toggle }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const navigate = useNavigate();


    //  Xử lý Google OAuth2

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
                email: decoded.email || ''
            }));

            console.log('✅ Decoded from Google login:', decoded);

            setIsGoogleLogin(true);

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

    useEffect(() => {
        const googleLogin = localStorage.getItem('isGoogleLogin') === 'true';
        setIsGoogleLogin(googleLogin);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        const loginData = { username, password };

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
                credentials: 'include',
            });

            const responseBody = await response.json();

            if (response.ok) {
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
                localStorage.setItem('isGoogleLogin', 'false');

                const user = responseBody.user;
                localStorage.setItem('user', JSON.stringify({
                    username: user.username,
                    email: user.email
                }));

                setUsername('');
                setPassword('');
            } else {
                console.error('Login Error:', responseBody);
                setError(responseBody || `Error: ${response.status}`);
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            if (!isGoogleLogin) {
                setError('Unable to connect. Please check your network.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    //Truyen prop cho login Facebook
    const handleFacebookLoginSuccess = (data) => {
        if (data.token) {
            Swal.fire({
                icon: 'success',
                title: 'Login with Facebook successful!',
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.setItem('token', data.token);
                navigate('/home');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Facebook login failed!',
                text: data.message || 'Unknown error',
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isGoogleLogin');
        setUsername('');
        setPassword('');
        setIsGoogleLogin(false);

        Swal.fire({
            icon: 'info',
            title: 'Logged out',
            text: isGoogleLogin
                ? 'You have been logged out from Google session.'
                : 'You have been logged out.',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate('/login');
        });
    };

    return (
        <Components.SignInContainer signinIn={true}>
            <Components.Form onSubmit={handleLogin}>
                <Components.Title>Sign in</Components.Title>

                <Components.SocialContainer>
                    <Components.SocialButton
                        provider="google"
                        type="button"
                        onClick={() => {

                            //  Gọi tới endpoint OAuth2 của backend

                            window.location.href = 'https://localhost:8443/oauth2/authorization/google';
                        }}
                    >
                        <i className="fab fa-google"></i>
                    </Components.SocialButton>

                    {/*<Components.SocialButton provider="facebook" onClick={() => alert('Login with Facebook')}>*/}
                    {/*    <i className="fab fa-facebook-f"></i>*/}
                    {/*</Components.SocialButton>*/}
                    <FacebookLoginButton
                        onFacebookLoginSuccess={handleFacebookLoginSuccess} />

                </Components.SocialContainer>

                {/* Chỉ dành cho đăng nhập thường */}
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

                <Components.Anchor href="/forgot-password">Forgot your password?</Components.Anchor>

                {/* Nút đăng nhập thường */}
                <Components.Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </Components.Button>

                {error && <div style={{ color: 'red' }}>{error}</div>}

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
                        🔓 Logout current user
                    </button>
                )}
            </Components.Form>
        </Components.SignInContainer>
    );
};

export default Login;

