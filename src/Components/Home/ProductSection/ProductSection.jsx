import { Link } from 'react-router';
import { motion } from 'framer-motion';


const ProductSection = () => {

    return (
        <section className="py-16">
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

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link
                        to="/all-products"
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
