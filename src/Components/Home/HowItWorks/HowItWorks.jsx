import { FaChartLine, FaUsers, FaMobileAlt, FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const HowItWorks = () => (
    <section className="bg-base-200 py-16 rounded-xl">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-8">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                {[
                    {
                        icon: <FaUsers />,
                        title: 'Vendors Update Prices',
                        desc: 'Vendors regularly submit price data from local markets.',
                    },
                    {
                        icon: <FaChartLine />,
                        title: 'Data is Verified',
                        desc: 'Our system processes and filters updated data for accuracy.',
                    },
                    {
                        icon: <FaMobileAlt />,
                        title: 'Users Track in Real-Time',
                        desc: 'Consumers check current prices anytime, anywhere.',
                    },
                    {
                        icon: <FaExchangeAlt />,
                        title: 'Compare & Save',
                        desc: 'Smart comparison helps buyers make better decisions.',
                    },
                ].map((step, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-base-100 p-6 rounded-xl shadow-md text-center space-y-3 transition-transform hover:scale-115 hover:shadow-lg cursor-pointer"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        custom={idx}
                    >
                        <div className="text-primary text-3xl flex justify-center">{step.icon}</div>
                        <h3 className="text-lg font-semibold text-neutral">{step.title}</h3>
                        <p className="text-sm text-neutral/70">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;