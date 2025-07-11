import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const Error = () => {
    return (
        <motion.div
            className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 text-neutral  overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            role="alert"
            aria-label="404 - Page Not Found"
        >
            {/* Themed background blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse-slow z-0" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-[180px] animate-float-slower z-0" />

            {/* Icon */}
            <motion.div
                className="z-10 text-secondary text-8xl sm:text-9xl drop-shadow-[0_0_20px_rgba(255,140,66,0.5)]"
                initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <FaExclamationTriangle />
            </motion.div>

            {/* Title */}
            <motion.h1
                className="z-10 text-5xl sm:text-6xl font-extrabold mt-6 tracking-tight text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Lost in the shelves?
            </motion.h1>

            {/* Subtext */}
            <motion.p
                className="z-10 text-center max-w-2xl mt-4 text-neutral/70 text-base sm:text-lg leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
            >
                It looks like the page you're searching for is lost in the garden. Let’s head back and try again!
            </motion.p>

            {/* Fun note */}
            <motion.div
                className="z-10 mt-4 text-sm text-accent italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                (Don’t worry — even broken links need love.)
            </motion.div>

            {/* CTA Button */}
            <motion.div
                className="z-10 mt-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Link
                    to="/"
                    className="btn bg-primary text-xl text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
                >
                    🏡 Back to Safety
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default Error;