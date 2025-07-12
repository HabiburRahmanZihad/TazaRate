import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaBoxOpen, FaInfoCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loader/Loading";
import Error from "../../Error/Error";
import NoFound from "../../../Components/NoFound/NoFound";

const MyOrdersPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["myOrders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <Error />
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-secondary text-center mb-10 flex items-center justify-center gap-2"
            >
                <FaBoxOpen className="text-secondary" />
                My Orders
            </motion.h2>

            {orders.length === 0 ? (
                <NoFound></NoFound>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-5 py-3">Product Name</th>
                                <th className="px-5 py-3">Market</th>
                                <th className="px-5 py-3">Price (৳)</th>
                                <th className="px-5 py-3">Order Date</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {orders.map((order, idx) => (
                                    <motion.tr
                                        key={order._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="border-b border-secondary/30 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-3 font-medium">{order.productName}</td>
                                        <td className="px-5 py-3">{order.marketName}</td>
                                        <td className="px-5 py-3 text-green-600 font-semibold">৳ {order.price}</td>
                                        <td className="px-5 py-3">
                                            {new Date(order.paidAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <Link
                                                to={`/products/${order.productId}`}
                                                className="btn btn-sm bg-secondary text-neutral inline-flex items-center gap-2"
                                                aria-label={`View details of ${order.productName}`}
                                            >
                                                <FaInfoCircle />
                                                View
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;