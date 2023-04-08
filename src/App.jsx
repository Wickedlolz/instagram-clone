import { Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { PostProvider } from './contexts/PostContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
    return (
        <FirebaseProvider>
            <PostProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </PostProvider>
        </FirebaseProvider>
    );
}

export default App;
