// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import * as Components from './Components';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';
//
// const API_URL = 'https://localhost:8443/api/user';
//
// const Register = ({ toggle }) => {
//     const { t } = useTranslation();
//
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [telephone, setTelephone] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//
//     const [usernameError, setUsernameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [phoneError, setPhoneError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//
//     const validateUsername = (value) => {
//         const regex = /^[a-zA-Z0-9]{2,20}$/;
//         setUsernameError(regex.test(value) ? '' : t('register.usernameInvalid'));
//     };
//
//     const validateEmail = (value) => {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         setEmailError(regex.test(value) ? '' : t('register.emailInvalid'));
//     };
//
//     const validatePhone = (value) => {
//         const regex = /^[0-9]{10}$/;
//         setPhoneError(regex.test(value) ? '' : t('register.phoneInvalid'));
//     };
//
//     const validatePassword = (value) => {
//         const hasUpperCase = /[A-Z]/.test(value);
//         const containsStar = value.includes('*');
//         const containsSlash = value.includes('/');
//         const hasOneSpecial = containsStar ^ containsSlash;
//
//         if (value.length < 8) {
//             setPasswordError(t('register.passwordShort'));
//         } else if (!(hasUpperCase || hasOneSpecial)) {
//             setPasswordError(t('register.passwordWeak'));
//         } else {
//             setPasswordError('');
//         }
//     };
//
//     const handleRegister = async (event) => {
//         event.preventDefault();
//         setError('');
//
//         validateUsername(username);
//         validateEmail(email);
//         validatePhone(telephone);
//         validatePassword(password);
//
//         if (usernameError || emailError || phoneError || passwordError) return;
//
//         setIsLoading(true);
//
//         const userData = {
//             username,
//             email,
//             telephone,
//             password,
//             role: "USER"
//         };
//
//         try {
//             const response = await fetch(`${API_URL}/registration`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//                 credentials: 'include'
//             });
//
//             const responseBodyText = await response.text();
//
//             if (response.ok) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: t('register.successTitle'),
//                     text: t('register.successText'),
//                     confirmButtonText: t('ok')
//                 });
//
//                 setUsername('');
//                 setEmail('');
//                 setTelephone('');
//                 setPassword('');
//             } else {
//                 setError(responseBodyText || `${t('register.failText')}: ${response.status}`);
//             }
//         } catch (err) {
//             setError(t('register.networkError'));
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return (
//         <Components.SignUpContainer signinIn={false}>
//             <Components.Form onSubmit={handleRegister}>
//                 <Components.Title>{t('register.title')}</Components.Title>
//
//                 {error &&
//                     <Components.Paragraph style={{ color: 'red', marginBottom: '10px' }}>{error}</Components.Paragraph>}
//
//                 <Components.Input
//                     type="text"
//                     placeholder={t('register.username')}
//                     value={username}
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         validateUsername(e.target.value);
//                     }}
//                     required
//                 />
//                 {usernameError && <Components.Paragraph style={{ color: 'red' }}>{usernameError}</Components.Paragraph>}
//
//                 <Components.Input
//                     type="email"
//                     placeholder={t('register.email')}
//                     value={email}
//                     onChange={(e) => {
//                         setEmail(e.target.value);
//                         validateEmail(e.target.value);
//                     }}
//                     required
//                 />
//                 {emailError && <Components.Paragraph style={{ color: 'red' }}>{emailError}</Components.Paragraph>}
//
//                 <Components.Input
//                     type="text"
//                     placeholder={t('register.phone')}
//                     value={telephone}
//                     onChange={(e) => {
//                         setTelephone(e.target.value);
//                         validatePhone(e.target.value);
//                     }}
//                 />
//                 {phoneError && <Components.Paragraph style={{ color: 'red' }}>{phoneError}</Components.Paragraph>}
//
//                 <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
//                     <Components.Input
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder={t('register.password')}
//                         value={password}
//                         onChange={(e) => {
//                             setPassword(e.target.value);
//                             validatePassword(e.target.value);
//                         }}
//                         required
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
//                 {passwordError && <Components.Paragraph style={{ color: 'red' }}>{passwordError}</Components.Paragraph>}
//
//                 <Components.Button type="submit" disabled={isLoading}>
//                     {isLoading ? t('register.signingUp') : t('register.signUp')}
//                 </Components.Button>
//             </Components.Form>
//         </Components.SignUpContainer>
//     );
// };
//
// export default Register;

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import * as Components from './Components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const API_URL = 'https://localhost:8443/api/user';

const Register = ({ toggle }) => {
    const { t } = useTranslation();

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

    useEffect(() => {
        const savedLang = localStorage.getItem('i18nextLng') || 'vi';
        localStorage.setItem('i18nextLng', savedLang); // luôn ép lưu dạng chuẩn
        localStorage.removeItem('language'); // xoá key cũ
        if (savedLang !== i18n.language) {
            i18n.changeLanguage(savedLang);
        }
    }, []);

    const validateUsername = (value) => {
        const regex = /^[a-zA-Z0-9]{2,20}$/;
        setUsernameError(regex.test(value) ? '' : t('register.usernameInvalid'));
    };

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(regex.test(value) ? '' : t('register.emailInvalid'));
    };

    const validatePhone = (value) => {
        const regex = /^[0-9]{10}$/;
        setPhoneError(regex.test(value) ? '' : t('register.phoneInvalid'));
    };

    const validatePassword = (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const containsStar = value.includes('*');
        const containsSlash = value.includes('/');
        const hasOneSpecial = containsStar ^ containsSlash;

        if (value.length < 8) {
            setPasswordError(t('register.passwordShort'));
        } else if (!(hasUpperCase || hasOneSpecial)) {
            setPasswordError(t('register.passwordWeak'));
        } else {
            setPasswordError('');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');

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
                Swal.fire({
                    icon: 'success',
                    title: t('register.successTitle'),
                    text: t('register.successText'),
                    confirmButtonText: t('ok')
                });

                setUsername('');
                setEmail('');
                setTelephone('');
                setPassword('');
            } else {
                setError(responseBodyText || `${t('register.failText')}: ${response.status}`);
            }
        } catch (err) {
            setError(t('register.networkError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Components.SignUpContainer signinIn={false}>
            <Components.Form onSubmit={handleRegister}>
                <Components.Title>{t('register.title')}</Components.Title>

                {error && (
                    <Components.Paragraph style={{ color: 'red', marginBottom: '10px' }}>
                        {error}
                    </Components.Paragraph>
                )}

                <Components.Input
                    type="text"
                    placeholder={t('register.username')}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        validateUsername(e.target.value);
                    }}
                    required
                />
                {usernameError && <Components.Paragraph style={{ color: 'red' }}>{usernameError}</Components.Paragraph>}

                <Components.Input
                    type="email"
                    placeholder={t('register.email')}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    required
                />
                {emailError && <Components.Paragraph style={{ color: 'red' }}>{emailError}</Components.Paragraph>}

                <Components.Input
                    type="text"
                    placeholder={t('register.phone')}
                    value={telephone}
                    onChange={(e) => {
                        setTelephone(e.target.value);
                        validatePhone(e.target.value);
                    }}
                />
                {phoneError && <Components.Paragraph style={{ color: 'red' }}>{phoneError}</Components.Paragraph>}

                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                    <Components.Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('register.password')}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        required
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
                {passwordError && <Components.Paragraph style={{ color: 'red' }}>{passwordError}</Components.Paragraph>}

                <Components.Button type="submit" disabled={isLoading}>
                    {isLoading ? t('register.signingUp') : t('register.signUp')}
                </Components.Button>
            </Components.Form>
        </Components.SignUpContainer>
    );
};

export default Register;

