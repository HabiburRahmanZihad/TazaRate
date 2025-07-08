import { motion } from 'framer-motion';
import Banner from '../../Components/Home/Banner/Banner';
import ProductSection from '../../Components/Home/ProductSection/ProductSection';


const Home = () => {
    return (
        <div className="space-y-16 lg:space-y-24">
            {/* Banner Section with Framer Motion */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Banner />
            </motion.section>

            {/* Product Section - Display 6 product cards */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="container mx-auto px-4"
            >
                <ProductSection />
            </motion.section>

        </div>
    );
};

export default Home;