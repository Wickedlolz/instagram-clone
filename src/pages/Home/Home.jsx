import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import styled from 'styled-components';
import Aside from '../../components/Aside/Aside';
import PostItem from '../../components/PostItem/PostItem';
import UserStories from '../../components/UserStories/UserStories';

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const postsCollectionRef = collection(db, 'posts');

    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getDocs(postsCollectionRef);
                const filteredPosts = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setPosts(filteredPosts);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getAllPosts();
    }, []);

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
                    {/* <PostItem />
                    <PostItem /> */}
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
