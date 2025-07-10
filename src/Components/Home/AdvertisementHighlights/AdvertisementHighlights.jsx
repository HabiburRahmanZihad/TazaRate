import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdvertisementHighlights = () => {
    const axiosSecure = useAxiosSecure();

    const { data: ads = [], isLoading, error } = useQuery({
        queryKey: ['acceptedAds'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertisements/accepted');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center">Loading advertisements...</p>;
    if (error) return <p className="text-red-600 text-center">Failed to load ads</p>;

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">🎯 Advertisement Highlights</h2>

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                loop={true}
            >
                {ads.map(ad => (
                    <SwiperSlide key={ad._id}>
                        <div className="bg-white p-6 rounded shadow flex flex-col md:flex-row items-center gap-6">
                            <img
                                src={ad.imageUrl}
                                alt={ad.adTitle}
                                className="w-full md:w-1/3 rounded object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{ad.adTitle}</h3>
                                <p className="text-gray-600">{ad.shortDescription}</p>
                                <p className="mt-2 text-sm text-gray-500">
                                    By: {ad.vendorName}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AdvertisementHighlights;