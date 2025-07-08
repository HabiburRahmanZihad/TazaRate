import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

const NotFound = () => {
    return (
        <motion.div
            className="relative flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-primary text-white overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            role="alert"
            aria-label="404 Page Not Found"
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1de9b6] via-[#00b0ff] to-[#e040fb] opacity-30 animate-background-shift blur-3xl" />

            {/* Floating Blobs */}
            <div className="absolute top-[-60px] right-[-60px] w-60 h-60 bg-white/10 rounded-full blur-2xl animate-float-slow" />
            <div className="absolute bottom-[-80px] left-[-80px] w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float-slower" />

            {/* 404 Text */}
            <motion.h1
                className="text-7xl sm:text-9xl font-extrabold tracking-tight drop-shadow-2xl text-white"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                404
            </motion.h1>

            {/* Lottie Animation */}
            <motion.div
                className="w-48 h-48 sm:w-64 sm:h-64 mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <Player
                    autoplay
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json"
                    style={{ width: '100%', height: '100%' }}
                />
            </motion.div>

            {/* Subtitle */}
            <motion.p
                className="text-center text-lg sm:text-xl md:text-2xl max-w-xl px-4 text-white/90 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                Oops! You seem to be off the map. The page you're looking for doesn't exist.
            </motion.p>

            {/* CTA Button */}
            <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    to="/"
                    className="inline-block px-8 py-3 rounded-full bg-white text-primary font-bold shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                    🏠 Back to Home
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default NotFound;
