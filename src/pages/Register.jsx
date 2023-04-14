import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import Loader from '../components/Loader';
import styled from 'styled-components';

const Register = () => {
    const { signUp, signInWithGoogle } = useFirebaseContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (email.length === 0 || password.length === 0) {
            return;
        }

        try {
            await signUp(email, password);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignInWithGoogle = (event) => {
        setIsLoading(true);
        setErrorText('');

        signInWithGoogle()
            .then(() => {
                setIsLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setIsLoading(false);
                const errorString = error.message.substring(9).trim();
                setErrorText(errorString);
            });
    };

    return (
        <Container>
            {isLoading && <Loader />}
            <Form onSubmit={handleSignUp}>
                <Logo src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
                <GoogleButton onClick={handleSignInWithGoogle}>
                    Login with Google
                </GoogleButton>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button>Sign Up</Button>
            </Form>
            <LoginText>
                Already have an account?{' '}
                <LoginLink to="/login">Log in</LoginLink>
            </LoginText>
        </Container>
    );
};

export default Register;

const Container = styled.div`
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Form = styled.form`
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 350px;
`;

const Input = styled.input`
    background-color: #fafafa;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 10px;
`;

const Button = styled.button`
    background-color: #3897f0;
    border: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    padding: 10px;
    text-transform: uppercase;
`;

const GoogleButton = styled(Button)`
    margin-bottom: 10px;

    &:hover {
        background-color: #3b5998;
    }
`;

const Logo = styled.img`
    height: 50px;
    margin-bottom: 20px;
    width: 100%;
    object-fit: contain;
`;

const LoginText = styled.p`
    margin-top: 20px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    width: 350px;
    padding: 20px;
`;

const LoginLink = styled(Link)`
    color: #3897f0;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
