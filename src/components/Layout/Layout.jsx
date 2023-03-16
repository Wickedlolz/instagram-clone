import React from 'react';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import Welcome from '../Welcome/Welcome';

const Layout = ({ children }) => {
    const { user } = useFirebaseContext();

    if (!user) {
        return <Welcome />;
    }

    return <main>{children}</main>;
};

export default Layout;
