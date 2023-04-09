import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import styled from 'styled-components';

import Welcome from './Welcome';
import Navigation from './Navigation';
import NewPost from './NewPost';

const Layout = ({ children }) => {
    const { user } = useFirebaseContext();
    const [showNewPost, setShowNewPost] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         // return <Welcome />;
    //         // return <Navigate to="/login" replace />;
    //         navigate('/login', { replace: true });
    //         return;
    //     }
    // }, [user]);

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
    /* margin-top: 30px; */
`;
