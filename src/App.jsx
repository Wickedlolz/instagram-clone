import { FirebaseProvider } from './contexts/FirebaseContext';
import { PostProvider } from './contexts/PostContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Routes from './routes/Routes';

import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {
    return (
        <FirebaseProvider>
            <NotificationProvider>
                <Toaster />
                <PostProvider>
                    <Routes />
                </PostProvider>
            </NotificationProvider>
        </FirebaseProvider>
    );
}

export default App;
