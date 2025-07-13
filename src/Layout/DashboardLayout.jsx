import { Link, NavLink, Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import {
    FaChartLine,
    FaClipboardList,
    FaBoxOpen,
    FaPlus,
    FaBullhorn,
    FaUsers,
    FaShoppingCart,
    FaEye,
    FaBars,
    FaTimes,
    FaHome,
} from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from '../hooks/ScrollToTop';
import Loading from '../Components/Loader/Loading';
import Footer from '../Components/Shared/Footer/Footer';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    // Track window width for responsive behavior
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar automatically on large screens
    useEffect(() => {
        if (windowWidth >= 1024) {
            setSidebarOpen(false);
        }
    }, [windowWidth]);

    const handleNavClick = () => {
        if (windowWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const navClasses = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded transition font-medium ${isActive ? 'bg-secondary text-white' : 'hover:bg-secondary/10 text-neutral'
        }`;

    const roleBasedLinks = () => {
        if (role === 'user') {
            return (
                <>
                    <NavLink to="/dashboard/price-trends" className={navClasses} onClick={handleNavClick}>
                        <FaChartLine /> Price Trends
                    </NavLink>
                    <NavLink to="/dashboard/watchlist" className={navClasses} onClick={handleNavClick}>
                        <FaEye /> Manage Watchlist
                    </NavLink>
                    <NavLink to="/dashboard/my-orders" className={navClasses} onClick={handleNavClick}>
                        <FaShoppingCart /> My Orders
                    </NavLink>
                </>
            );
        }

        if (role === 'vendor') {
            return (
                <>
                    <NavLink to="/dashboard/add-product" className={navClasses} onClick={handleNavClick}>
                        <FaPlus /> Add Product
                    </NavLink>
                    <NavLink to="/dashboard/my-products" className={navClasses} onClick={handleNavClick}>
                        <FaBoxOpen /> My Products
                    </NavLink>
                    <NavLink to="/dashboard/add-ad" className={navClasses} onClick={handleNavClick}>
                        <FaBullhorn /> Add Advertisement
                    </NavLink>
                    <NavLink to="/dashboard/my-ads" className={navClasses} onClick={handleNavClick}>
                        <FaClipboardList /> My Advertisements
                    </NavLink>
                </>
            );
        }

        if (role === 'admin') {
            return (
                <>
                    <NavLink to="/dashboard/all-users" className={navClasses} onClick={handleNavClick}>
                        <FaUsers /> All Users
                    </NavLink>
                    <NavLink to="/dashboard/all-products" className={navClasses} onClick={handleNavClick}>
                        <FaBoxOpen /> All Products
                    </NavLink>
                    <NavLink to="/dashboard/all-ads" className={navClasses} onClick={handleNavClick}>
                        <FaBullhorn /> All Advertisements
                    </NavLink>
                    <NavLink to="/dashboard/all-orders" className={navClasses} onClick={handleNavClick}>
                        <FaShoppingCart /> All Orders
                    </NavLink>
                </>
            );
        }

        return null;
    };

    // Determine if sidebar should be visible
    const isSidebarVisible = sidebarOpen || windowWidth >= 1024;

    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Navbar />

            {/* Mobile Header */}
            <div className="lg:hidden flex justify-end px-4 py-2 sticky top-[50px] z-30">
                <button
                    type="button"
                    aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={sidebarOpen}
                    onClick={() => setSidebarOpen((prev) => !prev)}
                    className="p-2 rounded-full bg-base-100 shadow text-2xl text-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <div className="flex flex-1 relative">
                {/* Overlay */}
                <AnimatePresence>
                    {sidebarOpen && windowWidth < 1024 && (
                        <motion.button
                            key="overlay"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close sidebar"
                            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            type="button"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar */}
                <AnimatePresence>
                    {isSidebarVisible && (
                        <motion.aside
                            key="sidebar"
                            className="overflow-hidden bg-base-200 border-r border-base-300 p-4 space-y-6 z-20 fixed top-[56px] left-0 w-full lg:max-h-none lg:w-64 lg:static lg:h-auto lg:flex-shrink-0"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <Link to="/dashboard">
                                    <h2 className="text-2xl font-bold text-secondary mt-2">Dashboard</h2>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="lg:hidden text-xl text-secondary"
                                    aria-label="Close menu"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {roleLoading ? (
                                <Loading></Loading>
                            ) : (
                                <nav className="space-y-2">
                                    <NavLink to="/dashboard" end className={navClasses} onClick={handleNavClick}>
                                        <FaHome /> Dashboard Home
                                    </NavLink>
                                    {roleBasedLinks()}
                                </nav>
                            )}
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 p-4 mt-[0px] lg:mt-0 overflow-auto min-h-screen bg-base-100">
                    <Outlet />
                </main>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;