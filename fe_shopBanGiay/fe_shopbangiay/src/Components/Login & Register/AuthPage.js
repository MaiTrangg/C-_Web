// import React, { useState, useEffect } from 'react';
// import * as Components from './Components';
// import Login from './Login';
// import Register from './Register';
// import { useLocation, useNavigate } from 'react-router-dom';
// import NavbarOnly from '../Header/NavbarOnly';
// import { useTranslation } from 'react-i18next';
//
// const AuthPage = () => {
//     const { t } = useTranslation();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [signIn, setSignIn] = useState(location.pathname === '/login');
//
//     useEffect(() => {
//         setSignIn(location.pathname === '/login');
//     }, [location.pathname]);
//
//     const toggle = (isLogin) => {
//         setSignIn(isLogin);
//         navigate(isLogin ? '/login' : '/register');
//     };
//
//     return (
//         <>
//             <NavbarOnly />
//             <div
//                 style={{
//                     minHeight: 'calc(100vh - 80px)',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     padding: '40px 20px',
//                     backgroundColor: '#f9f9f9',
//                 }}
//             >
//                 <Components.Wrapper>
//                     <Components.Container>
//                         <Register toggle={toggle} />
//                         <Login toggle={toggle} />
//                         <Components.OverlayContainer signinIn={signIn}>
//                             <Components.Overlay signinIn={signIn}>
//                                 <Components.LeftOverlayPanel signinIn={signIn}>
//                                     <Components.Title>{t('auth.welcomeBackTitle')}</Components.Title>
//                                     <Components.Paragraph>
//                                         {t('auth.welcomeBackDesc')}
//                                     </Components.Paragraph>
//                                     <Components.GhostButton onClick={() => toggle(true)}>
//                                         {t('auth.signIn')}
//                                     </Components.GhostButton>
//                                 </Components.LeftOverlayPanel>
//
//                                 <Components.RightOverlayPanel signinIn={signIn}>
//                                     <Components.Title>{t('auth.helloFriendTitle')}</Components.Title>
//                                     <Components.Paragraph>
//                                         {t('auth.helloFriendDesc')}
//                                     </Components.Paragraph>
//                                     <Components.GhostButton onClick={() => toggle(false)}>
//                                         {t('auth.signUp')}
//                                     </Components.GhostButton>
//                                 </Components.RightOverlayPanel>
//                             </Components.Overlay>
//                         </Components.OverlayContainer>
//                     </Components.Container>
//                 </Components.Wrapper>
//             </div>
//         </>
//     );
// };
//
// export default AuthPage;

import React, { useState, useEffect } from 'react';
import * as Components from './Components';
import Login from './Login';
import Register from './Register';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarOnly from '../Header/NavbarOnly';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const AuthPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(location.pathname === '/login');

    // Đồng bộ ngôn ngữ
    useEffect(() => {
        const savedLang = localStorage.getItem('i18nextLng') || 'vi';
        localStorage.setItem('i18nextLng', savedLang);
        localStorage.removeItem('language'); // xoá key cũ nếu có
        if (savedLang !== i18n.language) {
            i18n.changeLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        setSignIn(location.pathname === '/login');
    }, [location.pathname]);

    const toggle = (isLogin) => {
        setSignIn(isLogin);
        navigate(isLogin ? '/login' : '/register');
    };

    return (
        <>
            <NavbarOnly />
            <div
                style={{
                    minHeight: 'calc(100vh - 80px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 20px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Components.Wrapper>
                    <Components.Container>
                        <Register toggle={toggle} />
                        <Login toggle={toggle} />
                        <Components.OverlayContainer signinIn={signIn}>
                            <Components.Overlay signinIn={signIn}>
                                <Components.LeftOverlayPanel signinIn={signIn}>
                                    <Components.Title>{t('auth.welcomeBackTitle')}</Components.Title>
                                    <Components.Paragraph>
                                        {t('auth.welcomeBackDesc')}
                                    </Components.Paragraph>
                                    <Components.GhostButton onClick={() => toggle(true)}>
                                        {t('auth.signIn')}
                                    </Components.GhostButton>
                                </Components.LeftOverlayPanel>

                                <Components.RightOverlayPanel signinIn={signIn}>
                                    <Components.Title>{t('auth.helloFriendTitle')}</Components.Title>
                                    <Components.Paragraph>
                                        {t('auth.helloFriendDesc')}
                                    </Components.Paragraph>
                                    <Components.GhostButton onClick={() => toggle(false)}>
                                        {t('auth.signUp')}
                                    </Components.GhostButton>
                                </Components.RightOverlayPanel>
                            </Components.Overlay>
                        </Components.OverlayContainer>
                    </Components.Container>
                </Components.Wrapper>
            </div>
        </>
    );
};

export default AuthPage;

