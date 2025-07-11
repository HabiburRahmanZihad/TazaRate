import { motion } from 'framer-motion';
import Banner from '../../Components/Home/Banner/Banner';
import AdvertisementHighlights from '../../Components/Home/AdvertisementHighlights/AdvertisementHighlights';
import ProductSection from '../../Components/Home/ProductSection/ProductSection';
import HowItWorks from '../../Components/Home/HowItWorks/HowItWorks';
import Testimonials from '../../Components/Home/Testimonials/Testimonials';
import FAQs from '../../Components/Home/FAQs/FAQs';


const Home = () => (
    <div className="space-y-16 lg:space-y-28">
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Banner />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <ProductSection />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <AdvertisementHighlights />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <HowItWorks />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Testimonials />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <FAQs />
        </motion.section>
    </div>
);

export default Home;