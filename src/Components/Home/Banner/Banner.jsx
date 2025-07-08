import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    const bannerData = [
        {
            id: 1,
            title: "Track Fresh Market Prices",
            subtitle: "Get real-time updates on local market prices",
            description: "Compare prices across different markets and make informed shopping decisions",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop",
            cta: "Explore Products"
        },
        {
            id: 2,
            title: "Shop Fresh, Save Money",
            subtitle: "Find the best deals in your area",
            description: "Track price trends and never overpay for fresh produce again",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=600&fit=crop",
            cta: "View Markets"
        },
        {
            id: 3,
            title: "Join Our Vendor Network",
            subtitle: "Are you a market vendor?",
            description: "Register to update prices and reach more customers in your area",
            image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&h=600&fit=crop",
            cta: "Become Vendor"
        }
    ];

    return (
        <div className="relative">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                className="banner-carousel"
            >
                {bannerData.map((slide) => (
                    <div key={slide.id} className="relative h-[500px] lg:h-[600px]">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <motion.div
                                className="text-center text-white max-w-4xl px-4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                                    {slide.title}
                                </h1>
                                <h2 className="text-xl lg:text-2xl mb-4 text-green-300">
                                    {slide.subtitle}
                                </h2>
                                <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                                    {slide.description}
                                </p>
                                <Link
                                    to="/all-products"
                                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                                >
                                    {slide.cta}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
