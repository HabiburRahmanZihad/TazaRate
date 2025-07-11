import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';

const Banner = () => {
    const slides = [
        {
            id: 1,
            title: "Stay Ahead with Live Market Prices on TazaRate",
            subtitle: "Get real-time updates on local market prices",
            description: "Compare prices across different markets and make informed shopping decisions",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop",
        },
        {
            id: 2,
            title: "Fresh Deals Every Day — Only on TazaRate",
            subtitle: "Find the best deals in your area",
            description: "Track price trends and never overpay for fresh produce again",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=600&fit=crop",
        },
        {
            id: 3,
            title: "Real-Time Dashboards, Right in Your Pocket",
            subtitle: "See today's price shifts at a glance",
            description: "Get visual reports and alerts on price spikes or drops across your favorite markets.",
            image: "https://images.unsplash.com/photo-1498579397066-22750a3cb424?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000",
        },
        {
            id: 4,
            title: "Meet Your Local Market Heroes",
            subtitle: "Discover trusted local sellers",
            description: "Explore vendor profiles, their produce specialties, and price history to shop with confidence.",
            image: "https://images.unsplash.com/photo-1688964420317-0c48f1d3781d?q=80&w=1585&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 5,
            title: "Never Miss a Deal Again with TazaRate",
            subtitle: "Never miss a deal again",
            description: "Set alerts for price thresholds on essentials—receive notifications when your items dip below your target price.",
            image: "https://images.unsplash.com/photo-1741651383166-4d7ed487b1d8?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000",
        }
    ];

    return (
        <div className="relative">
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={5000}>
                {slides.map((s) => (
                    <div
                        key={s.id}
                        className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden"
                    >
                        {/* Image with rounded corners */}
                        <img
                            src={s.image}
                            alt={s.title}
                            className="w-full h-full object-cover opacity-80"
                        />

                        {/* Overlay with rounded corners */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                            <div
                                className="text-center text-white max-w-3xl "
                            >
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    {s.title}
                                </h1>

                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl mb-5 text-secondary">
                                    {s.subtitle}
                                </h2>

                                <p className="text-sm sm:text-base md:text-lg mb-5">{s.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;