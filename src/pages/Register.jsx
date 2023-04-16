import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import Loader from '../components/Loader';
import styled from 'styled-components';

import { FaGoogle, FaFacebook } from 'react-icons/fa';
import MainLogo from '../assets/logo.png';

const Register = () => {
    const { signUp, signInWithGoogle, signInWithFacebook } =
        useFirebaseContext();
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

    const handleSignInWithFacebook = (event) => {
        setIsLoading(true);
        setErrorText('');

        signInWithFacebook()
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
                <Logo src={MainLogo} />
                <ProviderButton google onClick={handleSignInWithGoogle}>
                    <FaGoogle /> Login with Google
                </ProviderButton>
                <ProviderButton onClick={handleSignInWithFacebook}>
                    <FaFacebook /> Login with Facebook
                </ProviderButton>
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

const ProviderButton = styled(Button)`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: ${(props) => (props.google ? '#000' : '#fff')};
    background-color: ${(props) => (props.google ? '#fff' : '')};
    border: ${(props) => (props.google ? '1px solid black' : '')};

    &:hover {
        /* background-color: #3b5998; */
        background-color: ${(props) =>
            props.google ? 'rgba(0, 0, 0, 0.1)' : '#3b5998'};
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
