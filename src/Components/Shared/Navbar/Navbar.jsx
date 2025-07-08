import { useContext, useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthContext';
import { FiLogOut, FiLogIn, FiX } from 'react-icons/fi';
import logo from '../../../assets/AllPic/Logo_noBgColor.png';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const handleCloseMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
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


    const links = (
        <>
            <NavLink to="/" onClick={handleCloseMenu} className={({ isActive }) => `px-4 py-2 rounded text-lg font-semibold transition border ${isActive ? 'text-primary bg-base-200' : 'text-neutral hover:text-primary'}`}>Home</NavLink>
            <NavLink to="/products" onClick={handleCloseMenu} className={({ isActive }) => `px-4 py-2 rounded text-lg font-semibold transition border ${isActive ? 'text-primary bg-base-200' : 'text-neutral hover:text-primary'}`}>All Products</NavLink>
        </>
    );

    return (
        <nav className="sticky top-0 z-50 border-b border-base-300 bg-base-100" role="navigation" aria-label="Primary Navigation">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">

                <div className="flex items-center gap-3">

                    <button onClick={toggleMenu} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" className="lg:hidden text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded">
                        {menuOpen ? <FiX size={28} /> : <GiHamburgerMenu size={28} />}
                    </button>
                    <NavLink to="/" className="flex items-center gap-2">
                        <img src={logo} alt="TazaRate Logo" className="w-28 sm:w-32 md:w-36 lg:w-40" />
                    </NavLink>

                </div>

                <div className="hidden lg:flex gap-4" aria-label="Primary navigation">
                    {links}
                </div>

                <div className="flex items-center gap-4">

                    {user?.role && (
                        <NavLink to={`/${user.role}/dashboard`} onClick={handleCloseMenu} className="hidden md:inline-block px-3 py-1 text-primary border border-primary rounded font-semibold hover:bg-primary hover:text-white transition">Dashboard</NavLink>
                    )}

                    {user?.photoURL && (
                        <img src={user.photoURL} alt={user.displayName || 'User Profile'} title={user.displayName || 'User'} className="w-10 h-10 rounded-full border-2 border-primary object-cover select-none" />
                    )}

                    {!user ? (
                        <NavLink to="/signin" onClick={handleCloseMenu} className={({ isActive }) => `flex items-center gap-1 px-4 py-2 rounded font-semibold transition ${isActive ? 'bg-primary text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}>Sign In <FiLogIn size={20} /></NavLink>
                    ) : (
                        <button onClick={handleSignOut} className="flex items-center gap-1 px-3 py-1 rounded font-semibold bg-primary text-white hover:bg-primary-dark transition focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Sign out">Sign Out <FiLogOut size={20} /></button>
                    )}

                </div>

            </div>

            {menuOpen && (
                <div id="mobile-menu" ref={menuRef} className="lg:hidden bg-base-200 border-t border-base-300 shadow-md transition-all duration-300 ease-in-out" role="menu" aria-label="Mobile menu">
                    <div className="flex flex-col p-4 gap-3">
                        {links}
                        {user?.role && (
                            <NavLink to={`/${user.role}/dashboard`} onClick={handleCloseMenu} className="px-4 py-2 rounded text-lg font-semibold text-neutral hover:text-primary transition">Dashboard</NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;