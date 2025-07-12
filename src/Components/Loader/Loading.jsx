import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import LogoImg from "../../assets/AllPic/Logo_noBgColor.png"; // Adjust the path as necessary

const messages = [
    "Gathering the freshest prices...",
    "Syncing market data...",
    "Waking up the vendors...",
    "Scouting the best rates for you...",
    "Organizing your product shelf...",
    "Brewing the TazaRate experience...",
];

const Loading = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md"
            role="status"
            aria-live="polite"
        >
            {/* Logo Box */}
            <div className="absolute top-8 bg-white rounded-xl shadow-xl px-6 py-2 flex items-center gap-3 border border-base-300">
                <img
                    src={LogoImg}
                    alt="TazaRate Logo"
                    className="h-12 w-auto object-contain"
                />
                <p className="text-lg font-bold text-primary tracking-tight">TazaRate</p>
            </div>

            {/* Lottie Spinner */}
            <div className="w-36 h-36 sm:w-48 sm:h-48 mb-4">
                <Player
                    autoplay
                    loop
                    src="https://assets5.lottiefiles.com/packages/lf20_usmfx6bp.json"
                    style={{ height: '100%', width: '100%' }}
                    aria-label="Loading animation"
                />
            </div>

            {/* Animated Message */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    className="text-white text-base sm:text-lg font-medium tracking-wide text-center px-6"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                >
                    {messages[index]}
                </motion.p>
            </AnimatePresence>

            {/* Animated Progress Bar */}
            <div className="w-56 h-2 bg-white/20 mt-6 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 animate-loading-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%]"></div>
            </div>
        </div>
    );
};

export default Loading;