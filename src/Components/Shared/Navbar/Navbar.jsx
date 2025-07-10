import { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FiLogOut, FiLogIn, FiX, FiUserPlus } from 'react-icons/fi';
import logo from '../../../assets/AllPic/Logo_noBgColor.png';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const [dbUser, setDbUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchDbUser = async () => {
            if (user?.email) {
                try {
                    const res = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
                    setDbUser(res.data);
                } catch (error) {
                    console.error('Failed to fetch DB user info:', error);
                }
            }
        };
        fetchDbUser();
    }, [user?.email, axiosSecure]);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const handleCloseMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        if (menuOpen) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => (document.body.style.overflow = '');
    }, [menuOpen]);

    const handleSignOut = async () => {
        try {
            Swal.fire({
                title: 'Signing you out...',
                text: 'Please wait a moment.',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => Swal.showLoading(),
            });
            await signOutUser();
            Swal.fire({
                icon: 'success',
                title: 'Signed Out!',
                text: 'You have been logged out.',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/signin');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Sign Out Failed',
                text: error.message,
            });
        }
    };

    const profilePhoto = dbUser?.profilePhoto;

    const navLinks = (
        <>
            <NavLink
                to="/"
                onClick={handleCloseMenu}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition text-sm sm:text-xl ${isActive ? 'text-primary bg-base-200' : 'text-neutral hover:text-primary'
                    }`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/products"
                onClick={handleCloseMenu}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition text-sm sm:text-xl ${isActive ? 'text-primary bg-base-200' : 'text-neutral hover:text-primary'
                    }`
                }
            >
                All Products
            </NavLink>
            {
                user && (
                    <NavLink
                        to="/dashboard"
                        onClick={handleCloseMenu}
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition text-sm sm:text-xl ${isActive ? 'text-primary bg-base-200' : 'text-neutral hover:text-primary'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                )
            }
        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-base-100 border-b border-base-300 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Left: Logo + Hamburger */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleMenu}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        className="lg:hidden text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    >
                        {menuOpen ? <FiX size={28} /> : <GiHamburgerMenu size={28} />}
                    </button>
                    <NavLink to="/" className="flex items-center">
                        <img src={logo} alt="TazaRate Logo" className="w-30 md:w-36 lg:w-42" />
                    </NavLink>
                </div>

                {/* Center Links */}
                <div className="hidden lg:flex gap-6">{navLinks}</div>

                {/* Right Controls */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <img
                                src={profilePhoto || '/default-avatar.png'}
                                alt={user.displayName || 'User'}
                                title={user.displayName || 'User'}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary object-cover shadow-md"
                            />
                            <button
                                onClick={handleSignOut}
                                className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-md bg-primary text-white hover:bg-green-600 transition text-xl font-semibold cursor-pointer"
                            >
                                Sign Out <FiLogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/signin"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-1.5 rounded-md md:text-xl font-semibold cursor-pointer transition ${isActive
                                        ? 'bg-primary text-white'
                                        : 'bg-primary text-white hover:bg-green-600'
                                    }`
                                }
                            >
                                Sign In <FiLogIn size={18} />
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `hidden md:flex items-center gap-2 px-4 py-1.5 rounded-md md:text-xl font-semibold cursor-pointer transition ${isActive
                                        ? 'bg-secondary text-white'
                                        : 'bg-secondary text-white hover:bg-secondary-focus'
                                    }`
                                }
                            >
                                Sign Up <FiUserPlus size={18} />
                            </NavLink>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        ref={menuRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-base-200 border-t border-base-300 shadow-md"
                    >
                        <div className="flex flex-col gap-2 p-4">
                            {navLinks}
                            {user && (
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium px-3 py-2"
                                >
                                    Sign Out <FiLogOut size={18} />
                                </button>
                            )}
                            {!user && (
                                <NavLink
                                    to="/signup"
                                    onClick={handleCloseMenu}
                                    className="flex items-center gap-2 px-3 py-2 text-secondary hover:text-secondary-focus font-medium"
                                >
                                    Sign Up <FiUserPlus size={18} />
                                </NavLink>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;