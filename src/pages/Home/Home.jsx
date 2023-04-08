import React from 'react';
import { usePostContext } from '../../contexts/PostContext';
import styled from 'styled-components';
import Aside from '../../components/Aside/Aside';
import PostItem from '../../components/PostItem/PostItem';
import UserStories from '../../components/UserStories/UserStories';

const Home = () => {
    const { posts, isLoading } = usePostContext();

    return (
        <>
            <LeftSide>
                <UserStories />
                {isLoading && <p>Loading&hellip;</p>}
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
