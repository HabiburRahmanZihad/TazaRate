import { useContext } from 'react'; // FIX: was `use`, should be `useContext`
import { AuthContext } from '../Provider/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Loading/Loading';


const PrivateRoute = ({ children }) => {
    // Get the current route location
    const location = useLocation();

    // Access user and loading state from AuthContext
    const { user, loading } = useContext(AuthContext); // ✅ FIXED

    // Show a loading spinner while checking auth status
    if (loading) {
        return <Loading />;
    }

    // If not authenticated, redirect to signin page and preserve attempted route
    if (!user) {
        return (
            <Navigate
                to="/signin"
                state={{ from: location }} // Pass the current location so we can redirect back after login
                replace
            />
        );
    }

    // If authenticated, render the protected children
    return children;
};

export default PrivateRoute;