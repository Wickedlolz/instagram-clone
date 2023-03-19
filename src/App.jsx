import { FirebaseProvider } from './contexts/FirebaseContext';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';

import './App.css';

function App() {
    return (
        <FirebaseProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Layout>
        </FirebaseProvider>
    );
}

export default App;
