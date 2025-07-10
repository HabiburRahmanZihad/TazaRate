import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const AccessDenied = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="text-center max-w-md space-y-6">
                <FaLock className="text-6xl text-red-500 mx-auto" />
                <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
                <p className="text-gray-600">
                    You do not have permission to view this page. Please contact the administrator if you believe this is a mistake.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-focus transition"
                >
                    🔙 Go to Home
                </Link>
            </div>
        </div>
    );
};

export default AccessDenied;
