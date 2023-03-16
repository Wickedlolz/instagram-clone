import { FirebaseProvider } from './contexts/FirebaseContext';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import './App.css';

function App() {
    return (
        <FirebaseProvider>
            <div className="App">
                <h1>Instagram Clone</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </FirebaseProvider>
    );
}

export default App;
