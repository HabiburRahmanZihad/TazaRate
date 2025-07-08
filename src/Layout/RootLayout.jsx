import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../Components/Shared/Footer/Footer';
import Navbar from '../Components/Shared/Navbar/Navbar';

const Root = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex-grow container mx-auto px-2 sm:px-4 lg:px-6"
            >
                <Outlet />
            </motion.div>

            <Footer />
        </div>
    );
};

export default Root;