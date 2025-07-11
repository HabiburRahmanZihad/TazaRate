import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

const AccessDenied = () => {
    return (
        <motion.div
            className="relative min-h-screen flex items-center justify-center bg-base-200 px-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-float-slow z-0" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-[150px] animate-float-slower z-0" />

            {/* Main content */}
            <motion.div
                className="z-10 text-center max-w-md space-y-6 bg-base-100/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-base-300"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.5, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                >
                    <FaLock className="text-6xl text-accent mx-auto drop-shadow-[0_0_10px_rgba(60,122,79,0.4)]" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-4xl font-extrabold text-neutral tracking-tight"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Access Restricted
                </motion.h1>

                {/* Description */}
                <motion.p
                    className="text-neutral/70 text-base leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    You don’t have permission to view this page. It’s like a secret garden — invite only 🌿
                </motion.p>

                {/* Back button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium shadow hover:shadow-lg transition duration-300"
                    >
                        <FaArrowLeft className="text-lg" />
                        Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AccessDenied;