import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <Container>
            <Image
                src="https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"
                alt="Instagram logo"
            />
            <Title>Sorry, this page isn't available.</Title>
            <Text>
                The link you followed may be broken, or the page may have been
                removed.
            </Text>
            <StyledLink to="/">Go back to Instagram</StyledLink>
        </Container>
    );
};

export default NotFound;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Image = styled.img`
    width: 100px;
    margin-bottom: 16px;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 16px;
`;

const Text = styled.p`
    font-size: 18px;
    margin-bottom: 32px;
`;

const StyledLink = styled(Link)`
    font-size: 16px;
    color: inherit;
    text-decoration: none;
    font-weight: bold;
`;
