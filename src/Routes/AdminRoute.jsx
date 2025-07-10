import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../Pages/Loading/Loading';


const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const { role, roleLoading } = useUserRole();

    // While authentication or role is still loading
    if (authLoading || roleLoading) {
        return <Loading />;
    }

    // If not logged in, redirect to signin
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // If not an admin, redirect to home or access denied page
    if (role !== 'admin') {
        return <Navigate to="/access-denied" replace />;
    }

    // If admin, allow access
    return children;
};

export default AdminRoute;