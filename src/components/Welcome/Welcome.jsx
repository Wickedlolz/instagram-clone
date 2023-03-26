import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';

import Footer from '../Footer/Footer';

const Welcome = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const { signIn, signInWithGoogle } = useFirebaseContext();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorText('');

        if (email.length === 0 || password.length === 0) {
            setErrorText('All fields are required.');
            return;
        }

        signIn(email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                // Remove from error message (Firebase:) and show it
                const errorString = error.message.substring(9).trim();
                setErrorText(errorString);
            });
    };

    const handleSignInWithGoogle = (event) => {
        setErrorText('');

        signInWithGoogle()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                const errorString = error.message.substring(9).trim();
                setErrorText(errorString);
            });
    };

    return (
        <>
            <Container>
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
                            {/* <InstagramImage
                            src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg"
                            alt="Instagram screenshot 2"
                        />
                        <InstagramImage
                            src="https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg"
                            alt="Instagram screenshot 3"
                        />
                        <InstagramImage
                            src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg"
                            alt="Instagram screenshot 4"
                        /> */}
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

export default Welcome;

const Container = styled.main`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 70%;
`;

const Image = styled.img`
    width: 100%;
`;

const InstagramImages = styled.div`
    position: absolute;
    top: 15%;
    left: 32.5%;
    /* display: grid; */
    /* grid-template-columns: repeat(2, 1fr); */
    grid-gap: 10px;
    width: 54.2%;
`;

const InstagramImage = styled.img`
    width: 100%;
`;

const FormContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 200px;
    margin-bottom: 30px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
`;

const Button = styled.button`
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

const ErrorField = styled.p`
    color: red;
    padding-top: 20px;
    width: 300px;
    word-wrap: break-word;
    text-align: center;
    font-size: 14px;
`;

const ForgotPassword = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #003569;
    cursor: pointer;
`;

const SeparatorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

const SeparatorLine = styled.div`
    width: 130px;
    height: 1px;
    background-color: #dbdbdb;
`;

const OrText = styled.span`
    margin: 0 10px;
    font-size: 14px;
    color: #8e8e8e;
`;

const ProviderButton = styled.button`
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

const RegisterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

const RegisterText = styled.span`
    margin-right: 5px;
    font-size: 14px;
    color: #8e8e8e;
`;

const RegisterButton = styled(Link)`
    border: none;
    background-color: transparent;
    color: rgb(0, 149, 246);
    font-size: 14px;
    text-decoration: none;
`;
