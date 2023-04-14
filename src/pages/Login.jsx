import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';

import Loader from '../components/Loader';
import Footer from '../components/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn, signInWithGoogle } = useFirebaseContext();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorText('');

        if (email.length === 0 || password.length === 0) {
            setErrorText('All fields are required.');
            return;
        }

        signIn(email, password)
            .then(() => {
                setIsLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setIsLoading(false);
                // Remove from error message (Firebase:) and show it
                const errorString = error.message.substring(9).trim();
                setErrorText(errorString);
            });
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
        <>
            <Container>
                {isLoading && <Loader />}
                <ImageContainer>
                    <ImageWrapper>
                        <Image
                            src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"
                            alt="Instagram phones"
                        />
                        <InstagramImages>
                            <InstagramImage
                                src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg"
                                alt="Instagram screenshot 1"
                            />
                        </InstagramImages>
                    </ImageWrapper>
                </ImageContainer>
                <FormContainer>
                    <Logo src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email"
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Password"
                            required
                        />
                        <Button>Log In</Button>
                    </Form>
                    <SeparatorContainer>
                        <SeparatorLine />
                        <OrText>OR</OrText>
                        <SeparatorLine />
                    </SeparatorContainer>
                    <ProviderButton onClick={handleSignInWithGoogle}>
                        <FaGoogle />
                        Log in with Google
                    </ProviderButton>
                    {errorText.length > 0 && (
                        <ErrorField>{errorText}</ErrorField>
                    )}
                    <ForgotPassword>Forgot password?</ForgotPassword>
                    <RegisterContainer>
                        <RegisterText>Not registered?</RegisterText>
                        <RegisterButton to="/accounts/register">
                            Register
                        </RegisterButton>
                    </RegisterContainer>
                </FormContainer>
            </Container>
            <Footer />
        </>
    );
};

export default Login;

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

export const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ImageWrapper = styled.div`
    position: relative;
    width: 70%;
`;

export const Image = styled.img`
    width: 100%;
`;

export const InstagramImages = styled.div`
    position: absolute;
    top: 15%;
    left: 32.5%;
    /* display: grid; */
    /* grid-template-columns: repeat(2, 1fr); */
    grid-gap: 10px;
    width: 54.2%;
`;

export const InstagramImage = styled.img`
    width: 100%;
`;

export const FormContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.img`
    width: 200px;
    margin-bottom: 30px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #0095f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgb(24, 119, 242);
    }
`;

export const ErrorField = styled.p`
    color: red;
    padding-top: 20px;
    width: 300px;
    word-wrap: break-word;
    text-align: center;
    font-size: 14px;
`;

export const ForgotPassword = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #003569;
    cursor: pointer;
`;

export const SeparatorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

export const SeparatorLine = styled.div`
    width: 130px;
    height: 1px;
    background-color: #dbdbdb;
`;

export const OrText = styled.span`
    margin: 0 10px;
    font-size: 14px;
    color: #8e8e8e;
`;

export const ProviderButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 30px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: #385185;
    color: #fff;
    font-size: 14px;
    border: none;
    outline: none;
    cursor: pointer;
`;

export const RegisterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

export const RegisterText = styled.span`
    margin-right: 5px;
    font-size: 14px;
    color: #8e8e8e;
`;

export const RegisterButton = styled(Link)`
    border: none;
    background-color: transparent;
    color: rgb(0, 149, 246);
    font-size: 14px;
    text-decoration: none;
`;
