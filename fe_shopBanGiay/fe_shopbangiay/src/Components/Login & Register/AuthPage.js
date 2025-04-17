// Components/Login & Register/AuthPage.js
import React, { useState, useEffect } from 'react';
import * as Components from './Components'; // nơi bạn định nghĩa Container, Overlay, Title, GhostButton, v.v.
import Login from './Login';
import Register from './Register';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(location.pathname === '/login');

    useEffect(() => {
        // Nếu user gõ /login hoặc /register trực tiếp
        setSignIn(location.pathname === '/login');
    }, [location.pathname]);

    const toggle = (isLogin) => {
        setSignIn(isLogin);
        navigate(isLogin ? '/login' : '/register');
    };

    return (
        <Components.Container>
            <Register toggle={toggle} />
            <Login toggle={toggle} />
            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
};

export default AuthPage;
