import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Welcome = () => {
    return (
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
                <Form>
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button>Log In</Button>
                </Form>
                <ForgotPassword>Forgot password?</ForgotPassword>
            </FormContainer>
        </Container>
    );
};

export default Welcome;

const Container = styled.div`
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
`;

const ForgotPassword = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #003569;
    cursor: pointer;
`;
