import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <Container>
            <LinksContainer>
                <LinkItem to="#">About</LinkItem>
                <LinkItem to="#">Blog</LinkItem>
                <LinkItem to="#">Jobs</LinkItem>
                <LinkItem to="#">Help</LinkItem>
                <LinkItem to="#">API</LinkItem>
                <LinkItem to="#">Privacy</LinkItem>
                <LinkItem to="#">Terms</LinkItem>
                <LinkItem to="#">Top Accounts</LinkItem>
                <LinkItem to="#">Hashtags</LinkItem>
                <LinkItem to="#">Locations</LinkItem>
            </LinksContainer>
            <SocialContainer>
                <FaInstagram fontSize={20} />
                <FaFacebook fontSize={20} />
                <FaTwitter fontSize={20} />
            </SocialContainer>
            <TextContainer>
                <Text>© 2023 Instagram Clone from Viktor Dimitrov</Text>
            </TextContainer>
        </Container>
    );
};

export default Footer;

const Container = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    padding: 20px;
`;

const LinksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const LinkItem = styled(Link)`
    color: #00376b;
    font-size: 12px;
    margin: 0 10px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const SocialContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.p`
    color: #999;
    font-size: 12px;
`;
