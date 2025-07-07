import { useContext, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import logo from '../../assets/AllPic/Logo_noBgColor.png';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

    const links = (
        <div className="flex flex-col lg:flex-row gap-2">
            <NavLink to="/">
                {({ isActive }) => (
                    <p className={`px-4 my-1 text-xl merriweather ${isActive ? 'text-primary' : 'text-black lg:text-white'}`}>Home</p>
                )}
            </NavLink>
        </div>
    );

    const handleSignOut = async () => {
        try {
            // Show loading message while signing out
            Swal.fire({
                title: 'Signing you out...',
                text: 'Please wait a moment.',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading(); // Show the loading spinner
                }
            });

            // Call the sign out function
            await signOutUser();

            // Success message after sign-out
            Swal.fire({
                icon: 'success',
                title: 'Successfully signed out!',
                text: 'You have been logged out. Come back soon!',
                showConfirmButton: false,
                timer: 2000, // Wait 2 seconds before redirecting
            });

            // Redirect to the sign-in page
            navigate('/signin');
        } catch (error) {
            // Show error message if sign-out fails
            Swal.fire({
                icon: 'error',
                title: 'Oops! Something went wrong.',
                text: `Error: ${error.message}. Please try again later.`,
                confirmButtonText: 'Try Again',
            });
        }
    };


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar sticky top-0 z-50 shadow-sm bg-cover bg-center" >
            {/* Navbar left: dropdown menu + logo */}
            <div className="navbar-start">
                <div className="dropdown">
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white pr-2"
                    >
                        <GiHamburgerMenu size={24} />
                    </button>
                    {menuOpen && (
                        <ul
                            className="menu menu-sm dropdown-content bg-base-100 text-white rounded-box z-10 mt-7 w-52 p-2 shadow"
                            onClick={toggleMenu} // Close the menu on click
                        >
                            {links}
                        </ul>
                    )}
                </div>

                <img src={logo} alt="Logo" className="w-34 md:w-56" />
            </div>

            {/* Navbar center: horizontal menu for desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Navbar right: show SignIn or SignOut depending on auth */}
            <div className="navbar-end flex gap-2 items-center">
                {!user ? (
                    <NavLink to="/signin">
                        {({ isActive }) => (
                            <button
                                className={`px-2 py-1 flex items-center gap-2 text-xl merriweather rounded transition ${isActive ? 'bg-primary text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
                            >
                                Sign In
                                <FiLogIn size={20} />
                            </button>
                        )}
                    </NavLink>
                ) : (
                    <button
                        onClick={handleSignOut}
                        className="px-2 py-1 flex items-center gap-2 text-xl merriweather text-white bg-primary rounded hover:bg-primary-dark transition"
                    >
                        Sign Out
                        <FiLogOut size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;