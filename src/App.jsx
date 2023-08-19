import { FirebaseProvider } from './contexts/FirebaseContext';
import { PostProvider } from './contexts/PostContext';
import { NotificationProvider } from './contexts/NotificationContext';

import { Toaster } from 'react-hot-toast';

import Locales from './components/Locales';
import Routes from './routes/Routes';

import './App.css';

function App() {
    return (
        <FirebaseProvider>
            <Locales>
                <NotificationProvider>
                    <Toaster />
                    <PostProvider>
                        <Routes />
                    </PostProvider>
                </NotificationProvider>
            </Locales>
        </FirebaseProvider>
    );
}

export default App;
