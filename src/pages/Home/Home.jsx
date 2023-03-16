import { useFirebaseContext } from '../../contexts/FirebaseContext';
import Welcome from '../../components/Welcome/Welcome';

const Home = () => {
    const { user } = useFirebaseContext();

    if (!user) {
        return <Welcome />;
    }

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;
