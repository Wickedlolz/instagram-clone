import React, { useState } from 'react';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';
import NewPost from '../NewPost/NewPost';

const Layout = ({ children }) => {
    const { user } = useFirebaseContext();
    const [showNewPost, setShowNewPost] = useState(false);

    const handleNewPostClick = () => {
        setShowNewPost(true);
    };

    const handleNewPostClose = () => {
        setShowNewPost(false);
    };

    if (!user) {
        return <Welcome />;
    }

    return (
        <main>
            <Navigation handleNewPostClick={handleNewPostClick} />
            {children}
            {showNewPost && <NewPost closeModal={handleNewPostClose} />}
        </main>
    );
};

export default Layout;
