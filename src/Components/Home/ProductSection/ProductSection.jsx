import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthContext';



const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/public/products?limit=6&sortBy=createdAt&order=desc`)
            .then(res => setProducts(res.data.products))
            .catch(err => console.error("Failed to load products", err));
    }, []);

    const handleViewDetails = (id) => {
        if (!user) {
            navigate('/signin');
        } else {
            navigate(`/products/${id}`);
        }
    };

    const isRecent = (dateStr) => {
        const productDate = new Date(dateStr);
        const today = new Date();
        const diffTime = today - productDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 3; // show recent (last 3 days)
    };

     return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                        Latest Market Updates
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the freshest prices from local markets across the city
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.itemName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-xl font-semibold capitalize">{product.itemName}</h3>
                                <p className="text-gray-600 text-sm">
                                    🛒 {product.marketName} • 📅 {new Date(product.date).toLocaleDateString()}
                                    {isRecent(product.date) && <span className="ml-2 text-green-600 font-medium">• Recent</span>}
                                </p>

                                <ul className="text-sm text-gray-700 space-y-1">
                                    {product.prices?.slice(0, 3).map((entry, i) => (
                                        <li key={i}>
                                            🧺 {new Date(entry.date).toLocaleDateString()} — ৳{entry.price}
                                        </li>
                                    ))}
                                    {product.prices.length > 3 && (
                                        <li className="text-gray-400 italic">+ more entries</li>
                                    )}
                                </ul>

                                <button
                                    onClick={() => handleViewDetails(product._id)}
                                    className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded transition"
                                >
                                    🔍 View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link
                        to="/products"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                    >
                        View All Products
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductSection;