import React, { useState } from 'react';
import styled from 'styled-components';

import Navigation from './Navigation';
import NewPost from './NewPost';

const Layout = ({ children }) => {
    const [showNewPost, setShowNewPost] = useState(false);

    const handleNewPostClick = () => {
        setShowNewPost(true);
    };

    const handleNewPostClose = () => {
        setShowNewPost(false);
    };

    return (
        <main>
            <Navigation handleNewPostClick={handleNewPostClick} />
            <PageWrapper>
                <Main>{children}</Main>
            </PageWrapper>
            {showNewPost && <NewPost closeModal={handleNewPostClose} />}
        </main>
    );
};

export default Layout;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 935px;
    margin: 0 auto;
`;

const Main = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;
