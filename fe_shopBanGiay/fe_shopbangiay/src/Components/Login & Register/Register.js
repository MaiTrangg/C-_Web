import React, { useState } from 'react';
import Swal from 'sweetalert2';
import * as Components from './Components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const API_URL = 'https://localhost:8443/api/user';

const Register = ({ toggle }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateUsername = (value) => {
        const regex = /^[a-zA-Z0-9]{2,20}$/;
        setUsernameError(regex.test(value) ? '' : 'Username phải có ít nhất 2 ký tự, không chứa ký tự đặc biệt');
    };

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(regex.test(value) ? '' : 'Email theo định dạng @gmail.com');
    };

    const validatePhone = (value) => {
        const regex = /^[0-9]{10}$/;
        setPhoneError(regex.test(value) ? '' : 'Số điện thoại phải có 10 chữ số');
    };

    const validatePassword = (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const containsStar = value.includes('*');
        const containsSlash = value.includes('/');
        const hasOneSpecial = containsStar ^ containsSlash; // XOR

        if (value.length < 8) {
            setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
        } else if (!(hasUpperCase || hasOneSpecial)) {
            setPasswordError('Mật khẩu yếu: cần ít nhất 1 chữ cái viết hoa hoặc 1 trong 2 ký tự đặc biệt: * hoặc /');
        } else {
            setPasswordError('');
        }
    };


    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');

        // Gọi kiểm tra lại khi submit
        validateUsername(username);
        validateEmail(email);
        validatePhone(telephone);
        validatePassword(password);

        if (usernameError || emailError || phoneError || passwordError) return;

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
                credentials: 'include'
            });

            const responseBodyText = await response.text();

            if (response.ok) {
                console.log('API Success:', responseBodyText);

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

                {error &&
                    <Components.Paragraph style={{color: 'red', marginBottom: '10px'}}>{error}</Components.Paragraph>}

                <Components.Input
                    type="text"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        validateUsername(e.target.value);
                    }}
                    required
                />
                {usernameError && <Components.Paragraph style={{color: 'red'}}>{usernameError}</Components.Paragraph>}

                <Components.Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    required
                />
                {emailError && <Components.Paragraph style={{color: 'red'}}>{emailError}</Components.Paragraph>}

                <Components.Input
                    type="text"
                    placeholder="Telephone"
                    value={telephone}
                    onChange={(e) => {
                        setTelephone(e.target.value);
                        validatePhone(e.target.value);
                    }}
                />
                {phoneError && <Components.Paragraph style={{color: 'red'}}>{phoneError}</Components.Paragraph>}

                <div style={{position: 'relative'}}>
                    <Components.Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        required
                        style={{paddingRight: '40px'}}
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
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </span>
                </div>
                {passwordError && <Components.Paragraph style={{color: 'red'}}>{passwordError}</Components.Paragraph>}

                <Components.Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Components.Button>
            </Components.Form>
        </Components.SignUpContainer>
    );
};

export default Register;

