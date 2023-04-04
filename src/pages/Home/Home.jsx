import React from 'react';
import { usePostContext } from '../../contexts/PostContext';
import styled from 'styled-components';
import Aside from '../../components/Aside/Aside';
import PostItem from '../../components/PostItem/PostItem';
import UserStories from '../../components/UserStories/UserStories';

const Home = () => {
    const { posts, isLoading } = usePostContext();

    return (
        <PageWrapper>
            <Main>
                <LeftSide>
                    <UserStories />
                    {isLoading && <p>Loading&hellip;</p>}
                    {!isLoading &&
                        posts &&
                        posts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                </LeftSide>
                <Aside />
            </Main>
        </PageWrapper>
    );
};

export default Home;

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
    margin-top: 30px;
`;

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
