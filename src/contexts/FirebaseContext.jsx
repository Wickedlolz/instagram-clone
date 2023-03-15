import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { auth } from '../firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const signUp = (email, password) =>
        createUserWithEmailAndPassword(email, password);

    const signIn = (email, password) =>
        signInWithEmailAndPassword(email, password);

    const logOut = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <FirebaseContext.Provider value={{ user, signUp, signIn, logOut }}>
            {children ? children : <Outlet />}
        </FirebaseContext.Provider>
    );
};

export const useFirebaseContext = () => {
    return useContext(FirebaseContext);
};
