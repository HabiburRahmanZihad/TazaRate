import { motion } from "framer-motion";
import { FaHome, FaShoppingCart, FaUsers, FaMoneyBillWave } from "react-icons/fa";

// Animation Variants
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (idx) => ({
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 60, delay: idx * 0.15 },
    }),
};

const stats = [
    { icon: <FaHome />, title: "26 warehouses", desc: "all over Bangladesh" },
    { icon: <FaShoppingCart />, title: "5 million orders", desc: "have been delivered" },
    { icon: <FaUsers />, title: "100,000 families", desc: "are being served" },
    { icon: <FaMoneyBillWave />, title: "340 million Taka", desc: "customer savings" },
];

const ImpactStats = () => (
    <section className="bg-base-200 py-16 rounded-xl">
        <div className="container mx-auto text-center">
            {/* Section Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-12">
                Our Impact
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-base-100 p-8 rounded-2xl shadow-md text-center space-y-4 
                      transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        custom={idx}
                        aria-label={`${stat.title}, ${stat.desc}`}
                    >
                        {/* Icon with hover animation */}
                        <motion.div
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            className="text-primary text-4xl flex justify-center"
                        >
                            {stat.icon}
                        </motion.div>
                        <h3 className="text-lg font-semibold text-neutral">{stat.title}</h3>
                        <p className="text-sm text-neutral/70">{stat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default ImpactStats;