import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../../assets/AllPic/Logo_noBgColor.png';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold">TazaRate</span>
                                <p className="text-xs text-green-300">"Track Fresh, Shop Fresh"</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Your trusted platform for tracking fresh market prices and making informed shopping decisions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-products" className="text-gray-300 hover:text-green-400 transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/terms" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-green-400" />
                                <span className="text-gray-300">Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-green-400" />
                                <span className="text-gray-300">+880-123-456-789</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-green-400" />
                                <span className="text-gray-300">info@tazarate.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} TazaRate. All rights reserved. Developed with ❤️ for fresh market tracking.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
