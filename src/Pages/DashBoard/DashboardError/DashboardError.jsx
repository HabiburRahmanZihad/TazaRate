import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaTools } from 'react-icons/fa';

const DashboardError = () => {
    return (
        <motion.div
            className="relative flex flex-col items-center justify-center min-h-[80vh] bg-base-100 text-neutral px-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            role="alert"
            aria-label="Dashboard Error"
        >
            {/* Floating Dashboard-themed Blobs */}
            <div className="absolute top-[-60px] left-[-60px] w-60 h-60 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow z-0" />
            <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-float-slower z-0" />

            {/* Icon */}
            <motion.div
                className="z-10 text-accent text-7xl sm:text-8xl drop-shadow-[0_0_15px_rgba(60,122,79,0.4)]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <FaTools />
            </motion.div>

            {/* Title */}
            <motion.h1
                className="z-10 text-4xl sm:text-5xl font-bold pb-4 mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Something's out of place
            </motion.h1>

            {/* Message */}
            <motion.p
                className="z-10 mt-3 text-neutral/70 text-center text-base sm:text-lg max-w-xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
            >
                This dashboard page couldn’t be found or has gone offline for maintenance.
                Let’s steer back to a safe zone.
            </motion.p>

            {/* Fun touch */}
            <motion.div
                className="z-10 mt-3 text-sm text-accent italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                (404 — Maybe the data just needed a coffee break ☕)
            </motion.div>

            {/* CTA Button */}
            <motion.div
                className="z-10 mt-6"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
                <Link
                    to="/dashboard"
                    className="btn bg-accent text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-xl transition-all duration-300"
                >
                    🔧 Back to Dashboard
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default DashboardError;
