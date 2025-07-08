import { Player } from '@lottiefiles/react-lottie-player';

const Loading = () => {
    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
            role="status"
            aria-live="polite"
            aria-label="Loading"
        >
            {/* Branding */}
            <div className="absolute top-8 flex items-center space-x-3">
                <img
                    src="/src/assets/AllPic/Logo_noBgColor.png"
                    alt="App Logo"
                    className="w-full h-20 bg-white rounded-lg shadow-lg"
                />
            </div>

            {/* Main content */}
            <div className="flex flex-col items-center space-y-4">
                <div className="w-36 h-36 sm:w-48 sm:h-48">
                    <Player
                        autoplay
                        loop
                        src="https://assets5.lottiefiles.com/packages/lf20_usmfx6bp.json"
                        style={{ height: '100%', width: '100%' }}
                        aria-label="Loading animation"
                    />
                </div>
                <p className="text-xl sm:text-3xl font-semibold text-white animate-pulse transition-opacity duration-300">
                    Just a moment...
                </p>

                {/* Progress Bar */}
                <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white animate-loading-bar rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default Loading;