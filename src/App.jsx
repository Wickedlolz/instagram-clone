import { Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { PostProvider } from './contexts/PostContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import AuthGuard from './utils/guards/AuthGuard';
import UserProfile from './pages/UserProfile';

import './App.css';

function App() {
    return (
        <FirebaseProvider>
            <PostProvider>
                <Routes>
                    <Route element={<AuthGuard />}>
                        <Route path="/login" element={<Login />} />
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
                        <Route
                            path="/*"
                            element={
                                <Layout>
                                    <NotFound />
                                </Layout>
                            }
                        />
                    </Route>
                </Routes>
            </PostProvider>
        </FirebaseProvider>
    );
}

export default App;
