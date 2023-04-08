import React from 'react';
import { usePostContext } from '../contexts/PostContext';
import styled from 'styled-components';

import Aside from '../components/Aside';
import PostItem from '../components/PostItem';
import UserStories from '../components/UserStories';
import Loader from '../components/Loader';

const Home = () => {
    const { posts, isLoading } = usePostContext();

    return (
        <>
            <LeftSide>
                <UserStories />
                {isLoading && <Loader />}
                {!isLoading &&
                    posts &&
                    posts.map((post) => <PostItem key={post.id} post={post} />)}
            </LeftSide>
            <Aside />
        </>
    );
};

export default Home;

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 614px;
    margin-right: 30px;
`;

const NewPostButton = styled.button`
    background-color: #0095f6;
    color: #fff;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
`;
