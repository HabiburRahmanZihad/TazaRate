import { Link } from 'react-router';
import {
    FaFacebook, FaTwitter, FaLinkedin, FaYoutube,
    FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../../../assets/AllPic/Logo_noBgColor.png';

const Footer = () => {
    return (
        <footer
            className="bg-gray-900 text-white"
        >
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Logo & Info */}
                    <div>
                        <img src={logo} alt="TazaRate Logo" className="w-32 mb-2" />
                        <p className="text-green-300 text-sm font-medium">“Track Fresh, Shop Fresh”</p>
                        <p className="text-gray-400 text-sm mt-2">
                            Your trusted platform for real-time fresh market prices across local bazaars.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <Link
                                to="https://www.facebook.com/habiburrahmanzihad.zihad"
                                target="_blank"
                                className="text-gray-400 hover:text-green-400 transition transform hover:scale-110"
                            >
                                <FaFacebook size={20} />
                            </Link>
                            <Link
                                to="https://x.com/xihad_xihad"
                                target="_blank"
                                className="text-gray-400 hover:text-green-400 transition transform hover:scale-110"
                            >
                                <FaTwitter size={20} />
                            </Link>
                            <Link
                                to="https://www.youtube.com/@xihadxone"
                                target="_blank"
                                className="text-gray-400 hover:text-green-400 transition transform hover:scale-110"
                            >
                                <FaYoutube size={20} />
                            </Link>
                            <Link
                                to="https://linkedin.com/in/habiburrahmanzihad"
                                target="_blank"
                                className="text-gray-400 hover:text-green-400 transition transform hover:scale-110"
                            >
                                <FaLinkedin size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/products', label: 'All Products' },
                                { to: '/aboutUs', label: 'About Us' },
                                { to: '/contact', label: 'Contact' },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-green-400 transition duration-200 border-b border-transparent hover:border-green-400 pb-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { to: '/terms', label: 'Terms & Conditions' },
                                { to: '/privacy', label: 'Privacy Policy' },
                                { to: '/refund', label: 'Refund Policy' },
                                { to: '/help', label: 'Help Center' },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-green-400 transition duration-200 border-b border-transparent hover:border-green-400 pb-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Info</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-green-400 mt-1" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaPhone className="text-green-400 mt-1" />
                                <span>+880-132-945-0000</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaEnvelope className="text-green-400 mt-1" />
                                <span>info@tazarate.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} <span className="text-green-400 font-semibold">TazaRate</span>. All rights reserved.
                    <br />
                    Built with ❤️ for your local bazaar.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
