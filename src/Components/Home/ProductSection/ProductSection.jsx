import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FaShoppingBasket, FaCalendarAlt, FaSearch, FaStore, FaArrowRight } from 'react-icons/fa';

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/public/products?limit=6&sortBy=createdAt&order=desc`)
            .then(res => setProducts(res.data.products))
            .catch(console.error);
    }, []);

    const isRecent = dateStr => (Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24) <= 3;

    return (
        <section className="py-16 bg-base-200 rounded-xl">
            <div >
                {/* Section Title */}
                <motion.div className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral mb-4">
                        Freshest Market Updates
                    </h2>
                    <p className="text-base md:text-lg text-neutral max-w-2xl mx-auto">
                        Stay on top of local prices with real-time insights from TazaRate.
                    </p>
                </motion.div>

                {/* Product Cards */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((p, i) => (
                        <motion.div
                            key={p._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
                        >
                            <img
                                src={p.imageUrl}
                                alt={p.itemName}
                                className="w-full h-[250px] object-cover object-center"
                            />
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-neutral mb-1 line-clamp-1 capitalize">
                                    {p.itemName}
                                </h3>
                                <p className="text-sm text-neutral flex items-center gap-2 mb-2">
                                    <FaStore className="text-primary" />
                                    {p.marketName}
                                    <FaCalendarAlt className="ml-4 text-primary" />
                                    {new Date(p.date).toLocaleDateString()}
                                    {isRecent(p.date) && <span className="ml-2 text-primary font-medium">• Recent</span>}
                                </p>
                                <ul className="text-sm text-neutral space-y-1 mb-3 flex-grow overflow-hidden">
                                    {p.prices.slice(0, 3).map((e, j) => (
                                        <li key={j} className="flex items-center gap-2">
                                            <FaShoppingBasket className="text-accent" />
                                            {new Date(e.date).toLocaleDateString()} — ৳{e.price}
                                        </li>
                                    ))}
                                    {p.prices.length > 3 && <li className="italic text-neutral">+ more entries</li>}
                                </ul>
                                <button
                                    onClick={() => nav(user ? `/products/${p._id}` : '/signin')}
                                    className="btn btn-primary btn-sm mt-auto w-full flex items-center justify-center gap-2"
                                >
                                    <FaSearch /> View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={() => nav('/products')}
                        className="btn btn-secondary btn-lg flex items-center justify-center gap-2"
                    >
                        View All Products <FaArrowRight />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductSection;