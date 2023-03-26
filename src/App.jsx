import { Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { PostProvider } from './contexts/postContext';

import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';

import './App.css';

function App() {
    return (
        <FirebaseProvider>
            <PostProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Layout>
            </PostProvider>
        </FirebaseProvider>
    );
}

export default App;
