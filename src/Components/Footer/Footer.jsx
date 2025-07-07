import { CiTwitter } from "react-icons/ci";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { Link } from "react-router";
import footerImg from '../../assets/AllPic/Bird.png';

const Footer = () => {
    return (
        <footer className="bg-black text-base-100 py-12 px-6">

            <div className="max-w-7xl mx-auto flex flex-col items-center space-y-10 md:flex-row md:justify-between md:items-center md:space-y-0 lg:space-x-20">
                {/* Logo and Branding */}
                <div className="text-center md:text-left md:flex-1 lg:max-w-xs">
                    <Link to={'/'}>
                        <img
                            src={footerImg}
                            alt="ReadRack Logo"
                            className="mx-auto md:mx-0 w-32 h-12 mb-2"
                        />
                        <h1 className="font-bold text-2xl text-primary">ReadRack</h1></Link>
                    <p className="italic text-sm text-secondary">“Stack your stories. Share your shelves.”</p>
                    <p className="text-xs text-base-300 mt-1">Because every book deserves a space.</p>
                </div>

                {/* Navigation Links */}
                <nav className="md:flex-1">
                    <ul className="flex flex-col items-center space-y-3 md:flex-row md:space-y-0 md:space-x-6 md:justify-center lg:justify-start">
                        <li>
                            <Link to="/about-us" className="link link-hover text-base-100">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="link link-hover text-base-100">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/legal-doc" className="link link-hover text-base-100">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Social Media Icons */}
                <div className="md:flex-1   text-lg space-y-1 lg:max-w-xs">

                    <p className="font-semibold pl-12 text-base-100">Follow Us: </p>

                    <div className="mt-10 flex justify-center md:justify-start space-x-6 max-w-7xl mx-auto px-6">
                        <a href="https://twitter.com/readrack" target="_blank" rel="noopener noreferrer">
                            <CiTwitter className="w-8 h-8 text-primary hover:text-secondary transition" />
                        </a>

                        <a href="https://youtube.com/readrack" target="_blank" rel="noopener noreferrer">
                            <FiYoutube className="w-8 h-8 text-primary hover:text-secondary transition" />
                        </a>

                        <a href="https://facebook.com/readrack" target="_blank" rel="noopener noreferrer">
                            <FiFacebook className="w-8 h-8 text-primary hover:text-secondary transition" />
                        </a>
                    </div>

                </div>
            </div>

            {/* Copyright */}
            <aside className="mt-10 text-center text-xs text-base-300">
                <p>© {new Date().getFullYear()} ReadRack. All rights reserved.</p>
            </aside>

        </footer>
    );
};

export default Footer;