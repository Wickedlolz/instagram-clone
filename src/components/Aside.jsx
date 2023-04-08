import React from 'react';
import styled from 'styled-components';

import Footer from './Footer';

const Aside = () => {
    return (
        <RightSide>
            <Suggestions>
                <SuggestionsTitle>Suggestions for you</SuggestionsTitle>
                <UserSuggestion>
                    <UserAvatar src="https://www.w3schools.com/w3images/avatar2.png" />
                    <UserName>username</UserName>
                    <SuggestionsButton>Follow</SuggestionsButton>
                </UserSuggestion>
                <UserSuggestion>
                    <UserAvatar src="https://www.w3schools.com/w3images/avatar2.png" />
                    <UserName>username</UserName>
                    <SuggestionsButton>Follow</SuggestionsButton>
                </UserSuggestion>
                <UserSuggestion>
                    <UserAvatar src="https://www.w3schools.com/w3images/avatar2.png" />
                    <UserName>username</UserName>
                    <SuggestionsButton>Follow</SuggestionsButton>
                </UserSuggestion>
            </Suggestions>
            <div>Advertisement</div>
            <Footer />
        </RightSide>
    );
};

export default Aside;

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    margin-left: 30px;
`;

const Suggestions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    background-color: #fff;
    margin-bottom: 30px;
`;

const SuggestionsTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin: 16px;
`;

const UserSuggestion = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 16px;
`;

const UserAvatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 16px;
`;

const UserName = styled.p`
    font-size: 14px;
    font-weight: 600;
    margin: 0;
`;

const SuggestionsButton = styled.button`
    font-size: 14px;
    font-weight: 600;
    color: #3897f0;
    border: none;
    background-color: transparent;
    margin-top: 8px;
    cursor: pointer;
`;
