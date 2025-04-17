import React from 'react';
import * as Components from './Components';

const Login = ({ toggle }) => {
    return (
        <Components.SignInContainer signinIn={true}>
            <Components.Form>
                <Components.Title>Sign in</Components.Title>

                <Components.SocialContainer>
                    <Components.SocialButton provider="google" onClick={() => alert('Login with Google')}>
                        <i className="fab fa-google"></i>
                    </Components.SocialButton>
                    <Components.SocialButton provider="facebook"onClick={() => alert('Login with Facebook')}>
                        <i className="fab fa-facebook-f"></i>
                    </Components.SocialButton>
                </Components.SocialContainer>

                <Components.Input type="text" placeholder="User name" />
                <Components.Input type="password" placeholder="Password" />
                <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                <Components.Button>Sign In</Components.Button>
            </Components.Form>
        </Components.SignInContainer>
    );
};

export default Login;
