import { Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Messages from '../pages/Messages';
import NotFound from '../pages/NotFound';
import UserProfile from '../pages/UserProfile';

import AuthGuard from '../utils/guards/AuthGuard';
import GuestGuard from '../utils/guards/GuestGuard';

const AppRoutes = () => (
    <Routes>
        <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthGuard />}>
            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route
                path="/messages"
                element={
                    <Layout>
                        <Messages />
                    </Layout>
                }
            />
            <Route
                path="/profile"
                element={
                    <Layout>
                        <UserProfile />
                    </Layout>
                }
            />
        </Route>
        <Route
            path="/*"
            element={
                <Layout>
                    <NotFound />
                </Layout>
            }
        />
    </Routes>
);

export default AppRoutes;
