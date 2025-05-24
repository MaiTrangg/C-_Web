
import React, { useEffect } from 'react';

const FacebookLoginButton = ({ onFacebookLoginSuccess }) => {
    useEffect(() => {
        // Load SDK nếu chưa có
        if (!window.FB) {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: '1062399375781932',
                    cookie: true,
                    xfbml: false,
                    version: 'v15.0',
                });
            };

            const script = document.createElement('script');
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }
    }, []);

    const handleFacebookLogin = () => {
        if (!window.FB) {
            console.error("Facebook SDK not loaded yet.");
            return;
        }
        window.FB.login(
            (response) => {
                if (response.authResponse) {
                    const accessToken = response.authResponse.accessToken;

                    // Gửi accessToken lên backend
                    fetch('/api/auth/facebook', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ accessToken }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            onFacebookLoginSuccess(data);
                        })
                        .catch((err) => console.error('Login error', err));
                } else {
                    onFacebookLoginSuccess({ message: 'Login cancelled' });
                }
            },
            { scope: 'public_profile,email' }
        );
    };

    return (
        <button onClick={handleFacebookLogin} style={{
            backgroundColor: '#fff',         // hoặc '#1877f2' nếu muốn nền xanh Facebook
            border: '1px solid #ccc',
            borderRadius: '50%',             // bo tròn
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <i className="fab fa-facebook-f" style={{ fontSize: '20px', color: '#1877f2' }}></i>
        </button>
    );
};

export default FacebookLoginButton;
