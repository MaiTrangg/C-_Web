import React from 'react';
import * as Components from './Components';

const Register = ({ toggle }) => {
    return (
        <Components.SignUpContainer signinIn={false}>
            <Components.Form>
                <Components.Title>Create Account</Components.Title>
                <Components.Input type="text" placeholder="User name" />
                <Components.Input type="email" placeholder="Email" />
                <Components.Input type="text" placeholder="Telephone    " />
                <Components.Input type="password" placeholder="Password" />
                <Components.Button>Sign Up</Components.Button>
            </Components.Form>
        </Components.SignUpContainer>
    );
};

export default Register;

