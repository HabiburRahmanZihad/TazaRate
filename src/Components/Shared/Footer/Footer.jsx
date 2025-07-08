import { Link } from 'react-router';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import logo from '../../../assets/AllPic/Logo_noBgColor.png';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content border-t border-base-300">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo & Name */}
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="TazaRate Logo" className="w-34" />

                    </Link>
                    <p className="text-sm text-gray-600">
                        Real-time local market prices. Stay informed, save smart.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li>Email: <a href="mailto:info@tazarate.com" className="hover:text-primary">info@tazarate.com</a></li>
                        <li>Phone: <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a></li>
                        <li>Location: Dhaka, Bangladesh</li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Legal</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                        <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        <li><Link to="/faq" className="hover:text-primary">FAQs</Link></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-primary transition-transform hover:scale-110">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-primary transition-transform hover:scale-110">
                            <FaGithub size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-primary transition-transform hover:scale-110">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider & Bottom Text */}
            <div className="border-t border-dashed border-base-300 mx-4" />
            <div className="text-center py-6 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-primary">TazaRate</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
