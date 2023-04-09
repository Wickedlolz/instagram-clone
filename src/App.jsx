import { FirebaseProvider } from './contexts/FirebaseContext';
import { PostProvider } from './contexts/PostContext';
import Routes from './routes/Routes';

import './App.css';

//TODO: viktor - separate routes in another file and use it here to keep app component small much as possable

function App() {
    return (
        <FirebaseProvider>
            <PostProvider>
                <Routes />
            </PostProvider>
        </FirebaseProvider>
    );
}

export default App;
