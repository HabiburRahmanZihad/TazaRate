import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";
import Error from "../../../Pages/Error/Error";

const AdvertisementHighlights = () => {
    const axiosSecure = useAxiosSecure();
    const { data: ads = [], isLoading, error } = useQuery({
        queryKey: ['acceptedAds'],
        queryFn: async () => (await axiosSecure.get('/advertisements/accepted')).data
    });

    if (isLoading) return <Loading></Loading>;
    if (error) return <Error></Error>;

    return (
        <div className="bg-base-100 py-12 rounded-xl">
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center pb-2 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
                Spotlight Offers You Can't Miss!
            </motion.h2>

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3500 }}
                modules={[Autoplay]}
                loop
            >
                {ads.map(ad => (
                    <SwiperSlide key={ad._id}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-base-200 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row md:h-72"
                        >
                            <img
                                src={ad.imageUrl}
                                alt={ad.adTitle}
                                className="w-full md:w-1/2 h-64 md:h-full object-cover object-center"
                            />
                            <div className="p-6 md:p-8 flex flex-col justify-center text-center md:text-left">
                                <motion.h3
                                    className="text-2xl font-bold text-neutral mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    {ad.adTitle}
                                </motion.h3>
                                <motion.p
                                    className="text-base text-neutral/80 mb-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    {ad.shortDescription}
                                </motion.p>
                                <motion.p
                                    className="text-sm text-accent font-medium"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    By: {ad.vendorName}
                                </motion.p>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AdvertisementHighlights;