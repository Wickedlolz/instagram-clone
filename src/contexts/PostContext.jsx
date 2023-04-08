import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import { db } from '../firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import postReducer from '../reducers/postReducer';
import { useFirebaseContext } from './FirebaseContext';

export const PostContext = createContext({});

const initialState = [];

export const PostProvider = ({ children }) => {
    const { user } = useFirebaseContext();
    const [state, dispatch] = useReducer(postReducer, initialState);
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
                dispatch({
                    type: 'LOAD_POSTS',
                    payload: { posts: filteredPosts },
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            getAllPosts();
        }
    }, [user]);

    const addPost = (post) => dispatch({ type: 'ADD_POST', payload: { post } });

    return (
        <PostContext.Provider value={{ posts: state, addPost, isLoading }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const state = useContext(PostContext);
    return state;
};
