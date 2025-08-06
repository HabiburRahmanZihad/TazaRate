import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import LogoImg from "../../assets/AllPic/Logo_noBgColor.png";

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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-[3px]"
            role="status"
            aria-live="polite"
        >
            {/* Logo Box with Glow */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-8 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl shadow-md flex items-center gap-3 animate-pulse"
            >
                <img
                    src={LogoImg}
                    alt="TazaRate Logo"
                    className="h-10 w-auto object-contain drop-shadow"
                />
                <p className="text-xl font-bold text-green-300 tracking-tight">TazaRate</p>
            </motion.div>

            {/* Lottie Spinner with Neon Ring */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-36 h-36 sm:w-48 sm:h-48 mb-6 rounded-full ring-4 ring-green-500/30 ring-offset-4 ring-offset-black"
            >
                <Player
                    autoplay
                    loop
                    src="https://assets5.lottiefiles.com/packages/lf20_usmfx6bp.json"
                    style={{ height: '100%', width: '100%' }}
                    aria-label="Loading animation"
                />
            </motion.div>

            {/* Animated Message */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    className="text-white text-center text-sm sm:text-lg font-medium px-6 tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    {messages[index]}
                </motion.p>
            </AnimatePresence>

            {/* Animated Glowing Progress Bar */}
            <div className="w-56 h-2 bg-white/20 mt-6 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 animate-[loadingBar_2s_linear_infinite] bg-gradient-to-r from-green-400 via-green-200 to-green-400 bg-[length:200%] rounded-full" />
            </div>

            {/* Tailwind custom animation */}
            <style>{`
                @keyframes loadingBar {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
};

export default Loading;