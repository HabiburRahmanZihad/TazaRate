import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../Pages/Loading/Loading';


const VendorRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (authLoading || roleLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (role !== 'vendor') {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
};

export default VendorRoute;
