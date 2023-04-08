import { Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { PostProvider } from './contexts/PostContext';

import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';

import './App.css';
import Messages from './pages/Messages/Messages';

function App() {
    return (
        <FirebaseProvider>
            <PostProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/messages" element={<Messages />} />
                    </Routes>
                </Layout>
            </PostProvider>
        </FirebaseProvider>
    );
}

export default App;
