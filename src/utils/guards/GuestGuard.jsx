import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../../contexts/FirebaseContext';

const GuestGuard = ({ children }) => {
    const { user } = useFirebaseContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
            return;
        }
    }, [user]);

    return children ? children : <Outlet />;
};

export default GuestGuard;
