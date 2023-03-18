import React from 'react';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import Welcome from '../Welcome/Welcome';
import Navigation from '../Navigation/Navigation';

const Layout = ({ children }) => {
    const { user } = useFirebaseContext();

    // if (!user) {
    //     return <Welcome />;
    // }

    return (
        <main>
            <Navigation />
            {children}
        </main>
    );
};

export default Layout;
