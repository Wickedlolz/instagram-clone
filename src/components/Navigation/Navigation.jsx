import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import styled from 'styled-components';
import { HiOutlineUserCircle, HiHome } from 'react-icons/hi2';
import { RiSendPlaneFill } from 'react-icons/ri';

const Navigation = () => {
    const navigate = useNavigate();
    const { logOut } = useFirebaseContext();

    const handleSignOut = (event) => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch((error) => console.error(error));
    };

    return (
        <Header>
            <Logo
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg"
                alt="Instagram"
            />
            <InputWrapper>
                <SearchIcon
                    src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-5.png"
                    alt="Search"
                />
                <SearchInput type="text" placeholder="Search" />
            </InputWrapper>
            <HeaderButtons>
                <RiSendPlaneFill fontSize={24} />
                <HiHome fontSize={24} />
                <HiOutlineUserCircle
                    onClick={handleSignOut}
                    cursor="pointer"
                    fontSize={24}
                />
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

const HeaderIcon = styled.img`
    height: 24px;
    margin-right: 16px;
    cursor: pointer;
`;
