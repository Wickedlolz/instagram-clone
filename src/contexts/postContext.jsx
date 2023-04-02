import React, { useState, createContext, useContext, useEffect } from 'react';
import { db } from '../firebase-config';
import { getDocs, collection, serverTimestamp } from 'firebase/firestore';

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState();
    const [reloadPosts, setReloadPosts] = useState(false);
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

                //TODO!: add date of creating and sort by date
                setPosts(filteredPosts);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getAllPosts();
    }, [reloadPosts]);

    const addPosts = (posts) => setPosts(posts);

    const reloadConent = () => setReloadPosts((state) => !state);

    return (
        <PostContext.Provider
            value={{ posts, addPosts, reloadConent, isLoading }}
        >
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const state = useContext(PostContext);
    return state;
};
