import { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut, FiLogIn, FiX, FiUserPlus } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import logo from '../../../assets/AllPic/Logo_noBgColor.png';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

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
                    console.error('Error fetching user:', error);
                }
            }
        };
        fetchDbUser();
    }, [user?.email, axiosSecure]);

    const handleSignOut = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to sign out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, sign out',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    title: 'Signing you out...',
                    text: 'Please wait a moment.',
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => Swal.showLoading(),
                });
                await signOutUser();
                Swal.fire({
                    icon: 'success',
                    title: 'Signed Out!',
                    text: 'You have been logged out.',
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate('/signin');
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error signing out',
                    text: error.message,
                });
            }
        }
    };


    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const profilePhoto = dbUser?.profilePhoto;

    const navItemClass = (isActive) =>
        `px-4 py-1 text-xl font-medium transition ${isActive ? 'text-secondary font-semibold' : 'text-primary hover:text-primary-focus'
        }`;

    const navLinks = (
        <div className="flex flex-col lg:flex-row gap-2">
            <NavLink to="/" onClick={closeMenu}>{({ isActive }) => <p className={navItemClass(isActive)}>Home</p>}</NavLink>
            <NavLink to="/products" onClick={closeMenu}>{({ isActive }) => <p className={navItemClass(isActive)}>All Products</p>}</NavLink>
            {user && (
                <NavLink to="/dashboard" onClick={closeMenu}>{({ isActive }) => <p className={navItemClass(isActive)}>Dashboard</p>}</NavLink>
            )}
        </div>
    );

    return (
        <nav className="navbar sticky top-0 z-50 shadow bg-base-200 text-white">
            <div className="container mx-auto flex items-center justify-between ">
                <div className="navbar-start">
                    {/* Mobile Menu Button */}
                    <div className="dropdown" ref={menuRef}>
                        <button
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                            onClick={toggleMenu}
                            className="lg:hidden text-accent hover:text-secondary transition duration-300 focus:outline-none mr-2"
                        >
                            {menuOpen ? <FiX size={28} /> : <GiHamburgerMenu size={28} />}
                        </button>

                        {/* Mobile Dropdown Menu */}
                        <div
                            className={`absolute left-1 mt-6 p-4 bg-base-200 rounded shadow-md w-56 z-50 transition-all duration-300 transform ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                        >
                            {navLinks}
                            {user ? (
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleSignOut();
                                    }}
                                    className="mt-3 ml-4 flex items-center gap-2 text-primary hover:text-red-500"
                                >
                                    <FiLogOut size={18} /> Sign Out
                                </button>
                            ) : (
                                <>
                                    <NavLink
                                        to="/signin"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 mt-3 ml-3 text-primary hover:text-secondary"
                                    >
                                        <FiLogIn size={18} /> Sign In
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 mt-3 ml-3 text-primary hover:text-secondary"
                                    >
                                        <FiUserPlus size={18} /> Sign Up
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Logo */}
                    <NavLink to="/">
                        <img
                            src={logo}
                            alt="Site Logo - YourBrand"
                            className="w-32 md:w-44"
                        />
                    </NavLink>
                </div>

                {/* Desktop Nav */}
                <div className="navbar-center hidden lg:flex">
                    {navLinks}
                </div>

                {/* Right Section */}
                <div className="navbar-end flex items-center gap-3">
                    {user ? (
                        <>
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt={user.displayName || 'User'}
                                    title={user.displayName || 'User'}
                                    className="w-12 h-12 rounded-full border-2 border-primary object-cover shadow"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse border-2 border-white shadow" />
                            )}

                            <button
                                onClick={handleSignOut}
                                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-accent/15 text-primary font-semibold rounded border hover:bg-accent/30 transition"
                            >
                                Sign Out <FiLogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/signin">
                                {({ isActive }) => (
                                    <button
                                        className={`flex items-center gap-2 px-3 py-1.5 font-semibold rounded transition ${isActive
                                            ? 'bg-white text-primary'
                                            : 'bg-accent/15 text-primary hover:bg-accent/30'
                                            }`}
                                    >
                                        Sign In <FiLogIn size={18} />
                                    </button>
                                )}
                            </NavLink>

                            <NavLink to="/signup">
                                {({ isActive }) => (
                                    <button
                                        className={`hidden md:flex items-center gap-2 px-3 py-1.5 font-semibold rounded transition ${isActive
                                            ? 'bg-secondary text-white'
                                            : 'bg-secondary text-white hover:bg-secondary-focus'
                                            }`}
                                    >
                                        Sign Up <FiUserPlus size={18} />
                                    </button>
                                )}
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );

};

export default Navbar;