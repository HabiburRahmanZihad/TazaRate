import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
    FiBarChart, FiTool, FiShoppingCart, FiEdit,
    FiFileText, FiClipboard, FiUsers, FiUser, FiMail, FiShield,
    FiCalendar, FiClock
} from 'react-icons/fi';
import Loading from '../../../Components/Loader/Loading';
import Error from '../../Error/Error';

const DashboardHome = () => {
    const { user } = useAuth();
    const userEmail = user?.email;
    const axiosSecure = useAxiosSecure();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!userEmail) return;

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

        fetchUser();
    }, [userEmail, axiosSecure]);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const commonIcons = {
        PriceTrends: <FiBarChart size={24} />,
        Watchlist: <FiTool size={24} />,
        MyOrders: <FiShoppingCart size={24} />,
        AddProduct: <FiEdit size={24} />,
        MyProducts: <FiFileText size={24} />,
        AddAd: <FiClipboard size={24} />,
        MyAds: <FiClipboard size={24} />,
        AllUsers: <FiUsers size={24} />,
        AllProducts: <FiFileText size={24} />,
        AllAds: <FiClipboard size={24} />,
        AllOrders: <FiShoppingCart size={24} />,
    };

    const roleCards = {
        user: [
            { to: "/dashboard/price-trends", title: "Price Trends", icon: commonIcons.PriceTrends },
            { to: "/dashboard/watchlist", title: "Watchlist", icon: commonIcons.Watchlist },
            { to: "/dashboard/my-orders", title: "My Orders", icon: commonIcons.MyOrders },
        ],
        vendor: [
            { to: "/dashboard/add-product", title: "Add Product", icon: commonIcons.AddProduct },
            { to: "/dashboard/my-products", title: "My Products", icon: commonIcons.MyProducts },
            { to: "/dashboard/add-ad", title: "Add Advertisement", icon: commonIcons.AddAd },
            { to: "/dashboard/my-ads", title: "My Ads", icon: commonIcons.MyAds },
        ],
        admin: [
            { to: "/dashboard/all-users", title: "All Users", icon: commonIcons.AllUsers },
            { to: "/dashboard/all-products", title: "All Products", icon: commonIcons.AllProducts },
            { to: "/dashboard/all-ads", title: "All Ads", icon: commonIcons.AllAds },
            { to: "/dashboard/all-orders", title: "All Orders", icon: commonIcons.AllOrders },
        ],
    };

    if (loading) {
        return <Loading></Loading>;
    }

    if (error || !userData) {
        return <Error />
    }

    const { name, email, role, profilePhoto, createdAt, lastLogin } = userData;
    const cards = roleCards[role] || [];

    return (
        <div className="p-6 space-y-10 bg-base-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Card */}
                <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-8 flex flex-col items-center gap-8 shadow-xl border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="relative">
                        <img
                            src={profilePhoto}
                            alt={name}
                            className="w-48 h-48 md:w-[250px] md:h-[250px] rounded-full object-cover border-4 border-secondary p-1 shadow-lg"
                        />
                        <span className="absolute bottom-0 right-0 bg-gradient-to-br from-secondary to-primary text-white text-[11px] px-3 py-1 rounded-full shadow-md font-semibold uppercase">
                            {role}
                        </span>
                    </div>

                    <div className="space-y-3 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FiUser className="text-primary" /> {name}
                        </h2>
                        <p className="text-gray-600 text-xs md:text-[16px] flex items-center gap-2"><FiMail /> {email}</p>
                        <p className="text-gray-600 text-xs md:text-[16px] flex items-center gap-2"><FiShield /> Role: {role}</p>
                        <p className="text-gray-500 text-xs md:text-[16px] flex items-center gap-2"><FiCalendar /> Joined: {formatDate(createdAt)}</p>
                        <p className="text-gray-500 text-xs md:text-[16px] flex items-center gap-2"><FiClock /> Last Login: {formatDate(lastLogin)}</p>
                    </div>
                </motion.div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white shadow-md hover:shadow-xl border border-gray-200 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-gradient-to-br from-primary to-secondary text-white p-3 rounded-xl shadow">
                                    {card.icon}
                                </div>
                                <span className="text-sm text-gray-400 font-semibold">#{index + 1}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Manage your {card.title.toLowerCase()}.
                            </p>
                            <Link
                                to={card.to}
                                className="text-sm text-secondary font-medium hover:underline focus:outline-none"
                                aria-label={`Go to ${card.title}`}
                            >
                                Go to {card.title} →
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;