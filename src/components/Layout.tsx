'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SessionProvider>
                    {children}
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </SessionProvider>
            </PersistGate>
        </Provider>
    );
};

export default Layout;
