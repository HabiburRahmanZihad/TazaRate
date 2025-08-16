import { FaMapMarkedAlt } from 'react-icons/fa';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export const Content = () => {
    return (
        <section className="bg-base-200 py-16 rounded-xl">
            <div className="container mx-auto px-4">
                <div className="grid gap-10 lg:grid-cols-2 items-center">

                    {/* Left Column: Text */}
                    <div className="space-y-6">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white text-3xl">
                            <FaMapMarkedAlt />
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Let us handle your next{' '}
                            <span className="text-primary">destination</span>
                        </h2>

                        <p className="text-base md:text-lg text-neutral/70">
                            Discover the fastest, simplest, and most secure way to send parcels
                            with Tazarate. We ensure your deliveries reach on time, every time.
                        </p>

                        <Link
                            to="/coverage"
                            className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-focus transition"
                        >
                            Learn more
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                                <path d="M9.707 5.293l-5-5a1 1 0 10-1.414 1.414L7.586 6l-4.293 4.293a1 1 0 101.414 1.414l5-5a1 1 0 000-1.414z" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right Column: Images */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <img
                                className="object-cover rounded-xl shadow-lg w-28 h-28 sm:w-48 sm:h-48 xl:w-56 xl:h-56 hover:scale-105 hover:brightness-110 transition duration-300 ease-in-out"
                                src="https://images.unsplash.com/photo-1521661488642-d86e85a90de2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Parcel Delivery 1"
                            />
                            <img
                                className="object-cover rounded-xl shadow-lg w-20 h-20 sm:w-32 sm:h-32 xl:w-40 xl:h-40 hover:scale-105 hover:brightness-110 transition duration-300 ease-in-out"
                                src="https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Parcel Delivery 2"
                            />
                        </motion.div>

                        <motion.img
                            className="object-cover rounded-xl shadow-lg w-40 h-40 sm:w-64 sm:h-64 xl:w-80 xl:h-80 hover:scale-105 hover:brightness-110 transition duration-300 ease-in-out"
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Parcel Delivery 3"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};
