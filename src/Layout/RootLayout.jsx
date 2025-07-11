import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Components/Shared/Footer/Footer';
import Navbar from '../Components/Shared/Navbar/Navbar';
import ScrollToTop from '../hooks/ScrollToTop';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const pageTransition = {
    duration: 0.4,
    ease: 'easeInOut'
};

const Root = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <ScrollToTop />
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={location.key}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                    className="flex-grow w-full container mx-auto px-2 py-6"
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Root;