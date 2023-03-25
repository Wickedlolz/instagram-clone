import { useState } from 'react';
import styled from 'styled-components';
import Aside from '../../components/Aside/Aside';
import NewPost from '../../components/NewPost/NewPost';
import PostItem from '../../components/PostItem/PostItem';
import UserStories from '../../components/UserStories/UserStories';

const Home = () => {
    const [showNewPost, setShowNewPost] = useState(false);

    const handleNewPostClick = () => {
        setShowNewPost(true);
    };

    const handleNewPostClose = () => {
        setShowNewPost(false);
    };

    return (
        <PageWrapper>
            <Main>
                <LeftSide>
                    <UserStories />
                    {showNewPost && <NewPost closeModal={handleNewPostClose} />}
                    <NewPostButton onClick={handleNewPostClick}>
                        New Post
                    </NewPostButton>
                    <PostItem />
                    <PostItem />
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
