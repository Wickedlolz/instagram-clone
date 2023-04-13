import React, { createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
    const notifySuccess = (text) => toast.success(text);

    const notifyError = (text) => toast.error(text);

    return (
        <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const state = useContext(NotificationContext);
    return state;
};
