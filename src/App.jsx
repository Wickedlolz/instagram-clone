import { FirebaseProvider } from './contexts/FirebaseContext';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import './App.css';
import Layout from './components/Layout/Layout';

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
