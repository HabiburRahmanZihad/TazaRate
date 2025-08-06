import { Link } from 'react-router';
import {
    FaFacebook, FaTwitter, FaLinkedin, FaYoutube,
    FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../../../assets/AllPic/Logo_noBgColor.png';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative z-10">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Logo & Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src={logo} alt="TazaRate Logo" className="w-36 mb-3" />
                        <p className="text-green-400 text-sm font-semibold mb-1">“Track Fresh, Shop Fresh”</p>
                        <p className="text-gray-400 text-sm">
                            Your trusted platform for real-time fresh market prices across local bazaars.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {[{
                                Icon: FaFacebook, to: 'https://www.facebook.com/habiburrahmanzihad.zihad'
                            }, {
                                Icon: FaTwitter, to: 'https://x.com/xihad_xihad'
                            }, {
                                Icon: FaYoutube, to: 'https://www.youtube.com/@xihadxone'
                            }, {
                                Icon: FaLinkedin, to: 'https://linkedin.com/in/habiburrahmanzihad'
                            }].map(({ Icon, to }, index) => (
                                <motion.a
                                    key={index}
                                    href={to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2 }}
                                    className="text-gray-400 hover:text-green-400 transition"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                    >
                        <h3 className="text-lg font-bold mb-4 text-green-400">Quick Links</h3>
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
                                        className="text-gray-300 hover:text-green-400 transition duration-300 hover:underline underline-offset-4"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h3 className="text-lg font-bold mb-4 text-green-400">Legal</h3>
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
                                        className="text-gray-300 hover:text-green-400 transition duration-300 hover:underline underline-offset-4"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h3 className="text-lg font-bold mb-4 text-green-400">Contact Info</h3>
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
                    </motion.div>
                </div>

                {/* Bottom Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400"
                >
                    © {new Date().getFullYear()} <span className="text-green-400 font-semibold">TazaRate</span>. All rights reserved.
                    <br />
                    Built with ❤️ for your local bazaar.
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;