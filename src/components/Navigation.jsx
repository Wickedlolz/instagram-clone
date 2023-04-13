import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineUserCircle, HiHome } from 'react-icons/hi2';
import { RiSendPlaneFill } from 'react-icons/ri';
import { HiOutlinePlusCircle } from 'react-icons/hi';

const Navigation = ({ handleNewPostClick }) => {
    return (
        <Header>
            <HeaderLink to="/">
                <Logo
                    src="https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg"
                    alt="Instagram"
                />
            </HeaderLink>
            <InputWrapper>
                <SearchIcon
                    src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-5.png"
                    alt="Search"
                />
                <SearchInput type="text" placeholder="Search" />
            </InputWrapper>
            <HeaderButtons>
                <HeaderLink to="/messages">
                    <RiSendPlaneFill fontSize={24} />
                </HeaderLink>
                <HeaderLink to="/">
                    <HiHome fontSize={24} />
                </HeaderLink>
                <HiOutlinePlusCircle
                    cursor="pointer"
                    onClick={handleNewPostClick}
                    fontSize={24}
                />
                <HeaderLink to="/profile">
                    <HiOutlineUserCircle cursor="pointer" fontSize={24} />
                </HeaderLink>
            </HeaderButtons>
        </Header>
    );
};

export default Navigation;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    height: 54px;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 16px;
`;

const Logo = styled.img`
    height: 29px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #fafafa;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    height: 28px;
    width: 215px;
`;

const SearchIcon = styled.img`
    height: 12px;
    margin: 0 8px;
`;

const SearchInput = styled.input`
    background-color: transparent;
    border: none;
    color: #262626;
    font-size: 14px;
    height: 100%;
    outline: none;
    width: 100%;
`;

const HeaderButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const HeaderLink = styled(Link)`
    color: #000;
    height: 23px;
`;

const HeaderIcon = styled.img`
    height: 24px;
    margin-right: 16px;
    cursor: pointer;
`;
