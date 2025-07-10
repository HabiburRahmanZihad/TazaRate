import { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DashboardHome = () => {
    const { user } = useAuth(); // Firebase user
    const userEmail = user?.email;
    const axiosSecure = useAxiosSecure();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosSecure.get(`/users/${userEmail}`);
                setUserData(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) fetchUser();
    }, [userEmail, axiosSecure]);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const roleCards = {
        user: [
            { to: "/dashboard/price-trends", title: "Price Trends", icon: "📈" },
            { to: "/dashboard/watchlist", title: "Manage Watchlist", icon: "🛠️" },
            { to: "/dashboard/my-orders", title: "My Orders", icon: "🛒" },
        ],
        vendor: [
            { to: "/dashboard/add-product", title: "Add Product", icon: "📝" },
            { to: "/dashboard/my-products", title: "My Products", icon: "📄" },
            { to: "/dashboard/add-ad", title: "Add Advertisement", icon: "📢" },
            { to: "/dashboard/my-ads", title: "My Advertisements", icon: "📊" },
        ],
        admin: [
            { to: "/dashboard/all-users", title: "All Users", icon: "👥" },
            { to: "/dashboard/all-products", title: "All Products", icon: "📋" },
            { to: "/dashboard/all-ads", title: "All Advertisements", icon: "📢" },
            { to: "/dashboard/all-orders", title: "All Orders", icon: "🛒" },
        ],
    };

    // Loading and error states
    if (loading) return <p className="p-4 text-gray-500">Loading dashboard...</p>;
    if (error || !userData) return <p className="p-4 text-red-500">⚠️ Failed to load user data</p>;

    const { name, email, role, profilePhoto, createdAt, lastLogin } = userData;
    const cards = roleCards[role] || [];

    return (
        <div className="p-6 space-y-6">
            {/* User Info Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow border">
                <img
                    src={profilePhoto}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover border"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{name}</h2>
                    <p className="text-gray-600">📧 {email}</p>
                    <p className="text-gray-600">🔒 Role: {role}</p>
                    <p className="text-gray-600">🕓 Joined: {formatDate(createdAt)}</p>
                    <p className="text-gray-600">🔄 Last Login: {formatDate(lastLogin)}</p>
                </div>
            </div>

            {/* Role-based Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="border rounded-lg shadow-md p-6 flex flex-col justify-between bg-white">
                        <div>
                            <div className="text-4xl mb-4">{card.icon}</div>
                            <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                        </div>
                        <Link
                            to={card.to}
                            className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Go to {card.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardHome;