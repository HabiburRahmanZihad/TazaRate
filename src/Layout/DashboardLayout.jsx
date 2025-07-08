import { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Navbar from '../Components/Shared/Navbar/Navbar';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="flex min-h-screen bg-base-100">
                {/* Sidebar */}
                <aside className="w-64 bg-base-200 p-4 border-r border-base-300 hidden lg:block">
                    <Link to='/dashboard'><h2 className="text-2xl font-bold text-primary mb-6 text-center merriweather">📊 Dashboard</h2></Link>
                    <nav className="space-y-2">
                        {/* User Menu */}
                        {/* {user?.role === 'user' && ( */}
                        {user && (
                            <>
                                <NavLink to="/dashboard/price-trends" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">📈 Price Trends</NavLink>
                                <NavLink to="/dashboard/watchlist" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">🛠️ Manage Watchlist</NavLink>
                                <NavLink to="/dashboard/my-orders" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">🛒 My Orders</NavLink>
                            </>
                        )}

                        {/* Vendor Menu */}
                        {/* {user?.role === 'vendor' && ( */}
                        {user && (
                            <>
                                <NavLink to="/dashboard/add-product" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">📝 Add Product</NavLink>
                                <NavLink to="/dashboard/my-products" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">📄 My Products</NavLink>
                                <NavLink to="/dashboard/add-ad" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">📢 Add Advertisement</NavLink>
                                <NavLink to="/dashboard/my-ads" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">📊 My Advertisements</NavLink>
                            </>
                        )}

                        {/* Admin Menu */}
                        {/* {user?.role === 'admin' && ( */}
                        {user && (
                            <>
                                <NavLink to="/dashboard/all-users" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">👥 All Users</NavLink>
                                <NavLink to="/dashboard/all-products" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">📋 All Products</NavLink>
                                <NavLink to="/dashboard/all-ads" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">📢 All Advertisements</NavLink>
                                <NavLink to="/dashboard/all-orders" className="block px-4 py-2 rounded hover:bg-primary hover:text-white">🛒 All Orders</NavLink>
                            </>
                        )}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;